"use client";
import React, {memo} from "react";
import {Box, Drawer, IconButton} from "@mui/material";
import {styled} from "@mui/material/styles";
import {AnimatePresence, motion} from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

interface RightDrawerProps {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const MotionBox = motion(Box);

const StyledDrawerPaper = styled("div")(({theme}) => ({
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    height: "100%",
    // width: 360,
    padding: theme.spacing(2),
    paddingRight: theme.spacing(12),
    backgroundColor: theme.palette.background.paper,
    overflow: "hidden",
}));

const RightDrawer: React.FC<RightDrawerProps> = ({open, onClose, children}) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        background: "transparent",
                        boxShadow: "none",
                        overflow: "visible",
                    },
                },
            }}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <AnimatePresence>
                {open && (
                    <MotionBox
                        key="drawer-right-content"
                        initial={{x: "100%", opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        exit={{x: "100%", opacity: 0}}
                        transition={{type: "spring", stiffness: 150, damping: 15}}
                        sx={{my: 6, mr: -12}}
                    >
                        <StyledDrawerPaper>
                            <Box display="flex" justifyContent="flex-end">
                                <IconButton onClick={onClose}>
                                    <CloseIcon/>
                                </IconButton>
                            </Box>
                                {children}
                        </StyledDrawerPaper>
                    </MotionBox>
                )}
            </AnimatePresence>
        </Drawer>
    );
};

export default memo(RightDrawer);
