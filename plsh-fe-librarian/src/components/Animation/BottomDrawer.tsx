"use client"
import React, {memo} from "react";
import {Box, Drawer, IconButton} from "@mui/material";
import {styled} from "@mui/material/styles";
import {AnimatePresence, motion} from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

interface BottomDrawerProps {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const MotionBox = motion(Box);

const StyledDrawerPaper = styled("div")(({theme}) => ({
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(12),
    backgroundColor: theme.palette.background.paper,
    overflow: "hidden",
}));

const BottomDrawer: React.FC<BottomDrawerProps> = ({open, onClose, children}) => {
    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            // hideBackdrop
            slotProps={{
                paper: {
                    sx: {
                        background: "transparent",
                        boxShadow: "none",
                        overflow: "visible"
                    },
                }
            }}
            ModalProps={{
                keepMounted: true,
            }}
        >

            <AnimatePresence>
                {open && (
                    <MotionBox
                        key="drawer-content"
                        initial={{y: "100%", opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: "100%", opacity: 0}}
                        transition={{type: "spring", stiffness: 150, damping: 15}}
                        sx={{mx: 6, mb: -12}}
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


export default memo(BottomDrawer);

