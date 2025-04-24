"use client";

import React, {ChangeEvent, memo, useCallback, useEffect, useMemo, useState} from "react";
import {Box, Dialog, DialogContent, DialogTitle, LinearProgress} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {color} from "@/helpers/resources";
import {debounce} from "@mui/material/utils";
import WebcamScanner from "@/components/primary/WebcamScanner";
import {BookData} from "@/helpers/appType";
import {useLazyGetBooksWithIsbnQuery} from "@/stores/slices/api/book.api.slice";
import Grid from "@mui/material/Grid2";
import {truncateMaxLineTextStyle, truncateTextStyle} from "@/style/text.style";
import {FaBarcode} from "react-icons/fa6";
import appStrings from "@/helpers/appStrings";
import BarcodeScanner from "@/components/primary/Input/BarcodeScanner";
import {appToaster} from "@/components/primary/toaster";
import AiSupport from "@/app/(private)/(in-dash-board)/resources/books/add/AiSupport";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";

function SearchWithScanner({onResult}: { onResult?: (books: BookData) => void }) {
    const [getBooks, {data, error, isFetching}] = useLazyGetBooksWithIsbnQuery();
    const [openAiSupport, setOpenAiSupport] = useState<boolean>(false);

    function onScanDone(code?: string) {
        if (code)
            getBooks({isbn: code})
    };
    useEffect(() => {
        if (error) {
            appToaster.error(appStrings.book.NOT_BOOK_FOUND)
            setOpenAiSupport(true);
        }
    }, [error]);

    useEffect(() => {
        if (data && data.length <= 0) {
            appToaster.error(appStrings.book.NOT_BOOK_FOUND)
        } else if (data && data.length > 0) {
            onResult?.(data[0]);
        }
    }, [data, onResult])

    const [open, setOpen] = useState(false);
    useEffect(() => {
        // if (open) setOpen(false);
    }, [open]);

    return (
        <Grid container spacing={3} width={"100%"} size={12} height={"fit-content"}>
            <AiSupport open={openAiSupport} setOpen={setOpenAiSupport}/>
            <BarcodeScanner onScanDone={onScanDone}/>
            <Grid size={12} height={"fit-content"}>
                <NeumorphicButton loading={isFetching} fullWidth startIcon={<FaBarcode/>} onClick={() => setOpen(true)}
                                  sx={{color: color.LIGHT_TEXT}}>
                    {appStrings.SCAN_BAR_CODE}
                </NeumorphicButton>
            </Grid>
            <Grid size={12}>
                <BookListHint onSelect={onResult}/>
            </Grid>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Quét mã ISBN</DialogTitle>
                <DialogContent style={{textAlign: "center"}}>
                    <WebcamScanner onScanSuccess={onScanDone}/>
                </DialogContent>
            </Dialog>
        </Grid>
    );
}

const BookListHint = memo(({onSelect}: { onSelect?: (book: BookData) => void }) => {
    const [query, setQuery] = useState<string>("");
    const [getBooks, {data, isFetching, error}] = useLazyGetBooksWithIsbnQuery();
    useEffect(() => {
        if (query) {
            getBooks({keyword: query})
        }
    }, [query, getBooks]);


    const debouncedSetInputChange = useMemo(
        () => debounce((value: string) => setQuery(value), 500), []);
    const onInputChange =
        useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            debouncedSetInputChange(e.currentTarget.value);
        }, [debouncedSetInputChange]);

    const onSelected = useCallback((result: BookData) => {
        onSelect?.(result);
    }, [onSelect])

    const listBook = useMemo(() => {
        if (data && data.length > 0)
            return (data.map(b => {
                return (<Box key={b.id} width="100%">
                    <ListItem alignItems="flex-start" onClick={() => {
                        onSelected(b)
                    }}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={b.thumbnail}/>
                        </ListItemAvatar>

                        <Grid width="100%" container>
                            <Grid size={12}>
                                <Typography
                                    component="span"
                                    variant="h6"
                                    sx={{
                                        color: color.DARK_TEXT,
                                        fontWeight: "bold",
                                        display: 'inline', ...truncateTextStyle
                                    }}
                                >
                                    {b.title}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography
                                    component="span"
                                    variant="h6"
                                    sx={{color: color.DARK_TEXT, display: 'inline'}}
                                >
                                    {b.publisher}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography sx={{fontSize: 12, color: color.DARK_LIGHTER_TEXT}}>
                                    {b.version}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography sx={{fontSize: 10, ...truncateMaxLineTextStyle(2)}}>
                                    {b.description}
                                </Typography>
                            </Grid>
                        </Grid>

                    </ListItem>
                    <Divider variant="inset" component="li"/>
                </Box>);
            }))
        return (
            <Box width="100%">
            </Box>)
    }, [data, onSelected]);
    return (
        <Grid container spacing={2} size={12} justifyContent={"start"}>
            <Grid size={12}>
                <NeumorphicTextField
                    onChange={onInputChange}
                    label="Nhập tìm kiếm hoặc quét mã..."
                    size="small"
                    fullWidth
                    variant="outlined"
                    autoComplete={"off"}
                />
            </Grid>
            <Grid size={12} boxShadow={NEUMORPHIC_SHADOW.INNER_SHADOW()} borderRadius={2}>
                {
                    isFetching ? <LinearProgress/> : <></>
                }
                <List
                    sx={{width: '100%', height: 300, overflowY: 'auto'}}>
                    {listBook}
                </List>

            </Grid>

        </Grid>
    );
})
export default memo(SearchWithScanner);

// export default memo(SearchWithScanner);
