import React, {memo, ReactNode, useEffect, useRef, useState} from "react";
import {Box, ClickAwayListener} from "@mui/material";
import {AnimatePresence, motion} from "framer-motion";
import {color} from "@/helpers/resources";

type Direction = "up" | "down" | "left" | "right";

interface SmartFloatingMenuProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
}

const getDirection = (rect: DOMRect): Direction => {
    const space = {
        up: rect.top,
        down: window.innerHeight - rect.bottom,
        left: rect.left,
        right: window.innerWidth - rect.right,
    };
    return Object.entries(space).reduce((a, b) => (b[1] > a[1] ? b : a))[0] as Direction;
};

const SmartFloatingMenu: React.FC<SmartFloatingMenuProps> = ({anchorEl, open, onClose, children}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [direction, setDirection] = useState<Direction>("down");
    const [position, setPosition] = useState({top: 0, left: 0});

    useEffect(() => {
        if (!anchorEl || !open) return;

        const updatePosition = () => {
            const rect = anchorEl.getBoundingClientRect();
            const dir = getDirection(rect);
            setDirection(dir);

            const positions = {
                down: {top: rect.bottom + window.scrollY, left: rect.left + window.scrollX},
                up: {top: rect.top + window.scrollY - 150, left: rect.left + window.scrollX},
                left: {top: rect.top + window.scrollY, left: rect.left + window.scrollX - 200},
                right: {top: rect.top + window.scrollY, left: rect.right + window.scrollX},
            };

            setPosition(positions[dir]);
        };

        updatePosition();
        const interval = setInterval(updatePosition, 100);
        return () => clearInterval(interval);
    }, [anchorEl, open]);

    const variants = {
        initial: {opacity: 0, width: 0, height: 0},
        animate: {opacity: 1, width: 200, height: 150},
        exit: {opacity: 0, width: 0, height: 0},
    };

    return (
        <AnimatePresence>
            {open && (
                <ClickAwayListener onClickAway={onClose}>
                    <motion.div
                        ref={menuRef}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={variants}
                        transition={{duration: 0.25}}
                        style={{
                            position: "absolute",
                            top: position.top,
                            left: position.left,
                            background: color.LIGHT_BACKDROP_BLUR,
                            backdropFilter: "blur(8px)",
                            zIndex: 9999,
                            overflow: "hidden",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                            borderRadius: 8,
                        }}
                    >
                        <Box>
                            {children}
                        </Box>
                    </motion.div>
                </ClickAwayListener>
            )}
        </AnimatePresence>
    );
};

export default memo(SmartFloatingMenu);
