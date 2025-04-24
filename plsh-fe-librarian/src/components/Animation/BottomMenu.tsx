"use client";
import React, {memo, ReactNode, useEffect, useRef, useState} from "react";
import {Box, IconButton} from "@mui/material";
import {motion} from "framer-motion";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";
import {useTheme} from "@mui/material/styles";

const MotionBox = motion.div;

interface CornerSlideMenuProps {
    children: ReactNode;
    maxWidth?: number;
    maxHeight?: number;
    initHeight?: number;
    iconSize?: number;
}

const BottomMenu = ({
    children,
    maxWidth = 400,
    maxHeight = 500,
    initHeight = 50,
    iconSize = 60,
}: CornerSlideMenuProps) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [phase, setPhase] = useState<'closed' | 'width' | 'height' | 'closingHeight' | 'closingWidth'>('closed');
    const [shouldRender, setShouldRender] = useState(false);
    const phaseRef = useRef(phase);
    useEffect(() => {
        phaseRef.current = phase;
    }, [phase]);
    useEffect(() => {
        if (open) {
            setShouldRender(true);
            setPhase('width');
        } else {
            if (phaseRef.current !== 'closed') setPhase('closingHeight');
        }
    }, [open]);

    const handleAnimationComplete = () => {
        if (phase === 'width') {
            setPhase('height');
        } else if (phase === 'closingHeight') {
            setPhase('closingWidth');
        } else if (phase === 'closingWidth') {
            setPhase('closed');
            setShouldRender(false);
        }
    };

    const getAnimateProps = () => {
        switch (phase) {
            case 'width':
                return {
                    width: maxWidth,
                    height: initHeight,
                    opacity: 1,
                    transition: {type: 'spring', stiffness: 350, damping: 20},
                };
            case 'height':
                return {
                    width: maxWidth,
                    height: maxHeight,
                    opacity: 1,
                    transition: {height: {type: 'spring', stiffness: 150, damping: 15}},
                };
            case 'closingHeight':
                return {
                    width: maxWidth,
                    height: initHeight,
                    opacity: 1,
                    transition: {height: {type: 'spring', stiffness: 150, damping: 15}},
                };
            case 'closingWidth':
                return {
                    width: 0,
                    height: initHeight,
                    opacity: 0,
                    transition: {type: 'spring', stiffness: 350, damping: 20},
                };
            default:
                return {};
        }
    };

    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                zIndex: 100,
            }}
        >
            <IconButton
                onClick={() => setOpen(!open)}
                sx={{
                    width: iconSize,
                    height: iconSize,
                    backgroundColor: "#fff",
                    border: `1px solid ${color.PRIMARY}`,
                    color: color.PRIMARY,
                    borderRadius: "50%",
                    marginRight: "8px",
                    marginBottom: "8px",
                    zIndex: 101,
                }}
            >
                {open ? <ChevronRight/> : <ChevronLeft/>}
            </IconButton>


            <MotionBox
                initial={{width: 0, height: initHeight, opacity: 0}}
                animate={getAnimateProps()}
                onAnimationComplete={handleAnimationComplete}
                style={{
                    overflow: 'hidden',
                    borderRadius: 12,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    position: 'relative',
                    background: theme.palette.background.default,
                }}
            >
                <Grid container width={"100%"} height={"100%"}>
                    {children}
                </Grid>
            </MotionBox>
            
        </Box>
    );
};

export default memo(BottomMenu);
