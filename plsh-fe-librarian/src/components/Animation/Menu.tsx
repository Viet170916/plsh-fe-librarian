"use client"
import React, {JSX, memo, useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";

type AnimatedMenuProps = {
    children: React.ReactNode,
    open: boolean,
    initHeight?: number | string,
    maxHeight?: number | string,
    maxWidth?: number | string,
    onClose?: () => void;
}
const MotionBox = motion.div;

function AnimatedMenu({children, open, maxHeight, maxWidth, initHeight}: AnimatedMenuProps): JSX.Element {
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

    if (!shouldRender) return <></>;

    const getAnimateProps = () => {
        switch (phase) {
            case 'width':
                return {
                    width: maxWidth ?? 400,
                    height: initHeight ?? 50,
                    opacity: 1,
                    transition: {type: 'spring', stiffness: 350, damping: 20},
                };
            case 'height':
                return {
                    width: maxWidth ?? 400,
                    height: maxHeight ?? 600,
                    opacity: 1,
                    transition: {height: {type: 'spring', stiffness: 150, damping: 15}},
                };
            case 'closingHeight':
                return {
                    width: maxWidth ?? 400,
                    height: initHeight ?? 50,
                    opacity: 1,
                    transition: {height: {type: 'spring', stiffness: 150, damping: 15}},
                };
            case 'closingWidth':
                return {
                    width: 0,
                    height: initHeight ?? 50,
                    opacity: 0,
                    transition: {type: 'spring', stiffness: 350, damping: 20},
                };
            default:
                return {};
        }
    };

    return (
        <MotionBox
            initial={{width: 0, height: 50, opacity: 0}}
            animate={getAnimateProps()}
            onAnimationComplete={handleAnimationComplete}
            style={{
                overflow: 'hidden',
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                position: 'absolute',
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <Grid container width={"100%"}
                  height={"100%"}
                  sx={{position: "relative", bgcolor: color.WHITE}}>
                {children}
            </Grid>
        </MotionBox>
    );
}

export default memo(AnimatedMenu);
