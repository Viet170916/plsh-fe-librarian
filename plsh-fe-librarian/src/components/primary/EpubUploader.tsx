"use client";
import EpubReaderView from "@/components/primary/EpubReadView";
import appStrings from "@/helpers/appStrings";
import {Resource} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {Book, CloudUpload, Visibility} from "@mui/icons-material";
import {Box, LinearProgress, Modal, Typography} from "@mui/material";
import React, {memo, useState} from "react";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

interface IProps {
    children?: React.ReactNode;
    onUpload?: (resource?: Resource) => void;
}

const formatFileSize = (size: number) => {
    const units = ["Bytes", "KB", "MB", "GB"];
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
};

function EpubUploader(props: IProps) {
    const [file, setFile] = useState<File | null>(null);
    const [fileURL, setFileURL] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [openPreview, setOpenPreview] = useState(false);
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile && uploadedFile.type === "application/epub+zip") {
            props.onUpload?.(undefined);
            setFileURL(null);
            setFile(null);
            setProgress(0);
            const fakeUpload = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress >= 100) {
                        clearInterval(fakeUpload);
                        props.onUpload?.({
                            file: uploadedFile,
                            localUrl: URL.createObjectURL(uploadedFile),
                            name: uploadedFile.name,
                            type: "epub",
                            fileType: uploadedFile.type,
                        });
                        setFileURL(URL.createObjectURL(uploadedFile));
                        setFile(uploadedFile);
                        return 100;
                    }
                    return oldProgress + 10;
                });
            }, 300);
        } else {
            alert("Please upload a valid EPUB file.");
        }
    };
    return (
        <Box sx={{width: "100%", p: 2, border: "1px solid #ccc", borderRadius: 2}}>
            <input
                type="file" accept="application/epub+zip" onChange={handleFileUpload} style={{display: "none"}}
                id="epub-upload"
            />
            <label htmlFor="epub-upload">
                <NeumorphicButton variant_2={"primary"} color="primary"
                                  component="span" startIcon={<CloudUpload/>}
                                  fullWidth>
                    Tải EPUB
                </NeumorphicButton>
            </label>
            {progress > 0 && progress < 100 && (
                <Box sx={{mt: 2}}>
                    <LinearProgress variant="determinate" value={progress}/>
                    <Typography variant="body2" sx={{textAlign: "center", mt: 1}}>
                        {progress}%
                    </Typography>
                </Box>
            )}
            {file && (
                <Box sx={{mt: 2, display: "flex", alignItems: "center", gap: 1}}>
                    <Book color="primary"/>
                    <Typography variant="body1">{file.name}</Typography>
                    <Typography variant="body2" sx={{ml: "auto", color: "gray"}}>
                        {formatFileSize(file.size)}
                    </Typography>
                </Box>
            )}
            {fileURL && (
                <NeumorphicButton
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    startIcon={<Visibility/>}
                    sx={{mt: 2}}
                    onClick={() => setOpenPreview(true)}
                >
                    Xem trước EPUB
                </NeumorphicButton>
            )}
            <Modal
                open={openPreview} onClose={() => setOpenPreview(false)}
                sx={{display: "flex", alignItems: "center", justifyContent: "center", padding: 10}}
            >
                <Box
                    sx={{
                        bgcolor: color.WHITE,
                        p: 3,
                        borderRadius: 2,
                        width: "100%",
                        height: "100%",
                        overflowX: "hidden",
                        overflowY: "auto",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6">{appStrings.EPUB_PREVIEW}</Typography>

                    {fileURL ? <EpubReaderView file={file}/> : <></>}
                    {/*<EpubReaderView file={file} />*/}
                </Box>
            </Modal>
        </Box>
    );
}

export default memo(EpubUploader);
