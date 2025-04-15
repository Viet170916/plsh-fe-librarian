"use client";
import React, {memo, ReactNode, useState} from "react";
import {Box, IconButton} from "@mui/material";
import {motion} from "framer-motion";
import {ChevronLeft, ChevronRight,} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";


type Position = "right" | "left" | "top" | "bottom" | "center";

interface SlidePanelProps {
    position?: Position;
    width?: number;
    height?: number;
    children: ReactNode;
    transform?: string;
}

const SlidePanel = ({
    children,
    width = 300,
    height = 100,
    position = "right",
    transform,
}: SlidePanelProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Box
            sx={{
                transform,
                position: "absolute",
                bottom: 0,
                right: 0,
                height: 100,
                display: "flex",
                alignItems: "center",
                zIndex: 10,
            }}
        >
            <motion.div
                initial={{x: 100}}
                animate={{x: open ? 0 : "calc(100% - 40px)"}}
                transition={{type: "spring", stiffness: 200, damping: 20}}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#fff",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    borderRadius: "20px 0 0 20px",
                    padding: "0 16px 0 0",
                    position: "relative",
                }}
            >
                <IconButton
                    onClick={() => {
                        setOpen(!open)
                    }}
                    sx={{
                        height: "60px",
                        color: color.PRIMARY,
                        borderRadius: "20px 0 0 20px",
                        position: "relative",
                        zIndex: 10,
                    }}
                >
                    {open ? <ChevronRight/> : <ChevronLeft/>}
                </IconButton>
                <Grid container sx={{p: 1, color: color.PRIMARY}} spacing={2}>
                    {children}
                </Grid>
            </motion.div>
        </Box>
    );
};




export default memo(SlidePanel);
