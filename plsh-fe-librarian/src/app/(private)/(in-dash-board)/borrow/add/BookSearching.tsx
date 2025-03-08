"use client";

import React, {useState, useRef, useEffect, memo, useCallback, useMemo, SyntheticEvent} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    TextField,
    Autocomplete,
    Box,
    AutocompleteInputChangeReason
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Webcam from "react-webcam";
import {BrowserMultiFormatReader, BarcodeFormat, DecodeHintType} from "@zxing/library";
import {color} from "@/helpers/resources";
import {debounce} from "@mui/material/utils";

function SearchWithScanner() {
    const [query, setQuery] = useState<string>("");
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (query && query !== "") {
            if (open) setOpen(false);
            console.log(query)
            // props.onScanSuccess(query);
        }
    }, [query, open]);
    const debouncedSetInputChange = useMemo(
        () => debounce((value: string) => setQuery(value), 500), []);
    const onInputChange =
        useCallback((e: SyntheticEvent<Element, Event>, value: string, reason: AutocompleteInputChangeReason) => {
            debouncedSetInputChange(value)
        }, [debouncedSetInputChange]);
    return (
        <div style={{display: "flex", gap: 10, alignItems: "center"}}>
            <Autocomplete
                id="country-select-demo"
                // inputValue={query}
                // value={query}
                onInputChange={onInputChange}
                sx={{width: 300}}
                options={[{title: "this is title", image: "image"}]}
                autoHighlight
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => {
                    const {key, ...optionProps} = props;
                    return (
                        <Box
                            key={key}
                            component="li"
                            sx={{'& > img': {mr: 2, flexShrink: 0}}}
                            {...optionProps}
                        >
                            <Box width={20} height={20} sx={{backgroundColor: color.PRIMARY}}>

                            </Box>

                            {option.title} ({option.image})
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Nhập ISBN hoặc quét mã..."
                        size="small"
                        fullWidth
                        variant="outlined"
                        slotProps={{
                            htmlInput: {
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            },
                        }}
                    />
                )}
            />
            <IconButton onClick={() => setOpen(true)} color="primary">
                <PhotoCameraIcon/>
            </IconButton>

            {/* Modal Camera */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Quét mã ISBN</DialogTitle>
                <DialogContent style={{textAlign: "center"}}>
                    <WebcamScanner onScanSuccess={setQuery}/>
                </DialogContent>
            </Dialog>
        </div>
    );
}

const WebcamScanner = memo(function WebcamScanner({onScanSuccess}: { onScanSuccess: (result: string) => void }) {
        const webcamRef = useRef<Webcam>(null);
        // console.log("webcamRef", webcamRef.current?.video);

        useEffect(() => {
            const hints = new Map();
            hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13, BarcodeFormat.QR_CODE]); // Chỉ quét ISBN (EAN-13)
            const codeReader = new BrowserMultiFormatReader(hints);
            const scan = async () => {
                if (!webcamRef.current?.video) return;
                try {
                    const result = await codeReader.decodeFromVideoElement(webcamRef.current.video);
                    onScanSuccess(result.getText()); // Lưu ISBN vào input
                } catch (err) {
                    console.log("Scan failed:", err);
                }
            };
            if (webcamRef.current?.video) {
                scan().then((result) => {
                });
            }
            return () => {
                codeReader.stopContinuousDecode();
                codeReader.stopAsyncDecode();
                codeReader.reset();
            };
        }, [webcamRef.current?.video, onScanSuccess]);

        return (<Webcam
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={{facingMode: "environment"}}
            style={{width: "100%"}}
        />)
    }
)
export default memo(SearchWithScanner);

// export default memo(SearchWithScanner);
