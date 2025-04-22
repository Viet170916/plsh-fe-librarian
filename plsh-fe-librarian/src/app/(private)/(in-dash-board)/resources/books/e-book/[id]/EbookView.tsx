"use client";
import {color} from "@/helpers/resources";
import {ArrowBack, Favorite, Fullscreen} from "@mui/icons-material";
import {Box, IconButton, SxProps, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useSelector} from "@/hooks/useSelector";
import {motion} from "framer-motion";
import React, {useEffect, useRef} from "react";

const bookPaperStyle: SxProps = {
    "h1": {
        color: color.PRIMARY,
        fontWeight: "bold",
    },
    "h2": {
        color: color.PRIMARY,
        fontWeight: "bold",
        fontSize: 20,
    },
    "p": {
        margin: "10px 0 20px 0",
        fontWeight: "lighter",
    },
};

const MotionGrid = motion(Grid);
export default function EbookView() {
    const ebookSettings = useSelector(state => state.eBookState.ebookSettings)
    const ebook = useSelector(state => state.eBookState.currentEBook);
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current?.scrollTo({top: 0, behavior: "smooth"});
        }
    }, [ebook]);
    return (
        <MotionGrid
            size={12} container direction={"column"} sx={{
            width: "100%", height: "100%",
            fontSize: ebookSettings.fontSize,
        }}
            animate={{
                backgroundColor: ebookSettings.theme.bgcolor ?? color.WHITE,
                color: ebookSettings.theme.color ?? color.PRIMARY,
            }}
            transition={{duration: 0.4}}>
            <Box display="flex" alignItems="center" mb={2}>
                <IconButton><ArrowBack/></IconButton>
                <Typography variant="h6" sx={{flexGrow: 1, textAlign: "center"}}></Typography>
                <IconButton><Favorite/></IconButton>
                <IconButton><Fullscreen/></IconButton>
            </Box>
            <Grid ref={containerRef} size={"grow"} sx={{overflowY: "auto", px: 3,}}>
                <Box
                    sx={{...bookPaperStyle, width: "100%", height: "100%", pb: 6, mb: 8}}
                    dangerouslySetInnerHTML={{__html: (ebook?.htmlContent + "<div style='height: 100px'></div>")}}
                />
            </Grid>
        </MotionGrid>
    );
}
