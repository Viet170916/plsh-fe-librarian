"use client"
import React, {JSX, memo} from "react";
import {Box, CircularProgress, Modal, Typography} from "@mui/material";

type LoadingModalProps = {
    open: boolean;
    text?: string;
}

function LoadingModal({open, text}: LoadingModalProps): JSX.Element {
    return (
        <Modal open={open} disableAutoFocus>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                top="50%"
                left="50%"
                sx={{
                    transform: "translate(-50%, -50%)",
                    bgcolor: "transparent",
                    p: 4,
                }}
            >
                <CircularProgress color="primary"/>
                {text && (
                    <Typography variant="body1" sx={{mt: 2}}>
                        {text}
                    </Typography>
                )}
            </Box>
        </Modal>
    );
};

export default memo(LoadingModal);

