import React, {memo} from "react";
import {Box, ContainerProps, Modal, ModalProps, SxProps} from "@mui/material";
import {BasicButton} from "@/components/primary/Input/BasicButton";
import Container from "@/components/primary/Container";
import {color} from "@/helpers/resources";

interface IProps {
    children?: React.ReactNode;
    buttonContent?: React.ReactNode;
    buttonStyle?: SxProps;
}

const style = {
    position: 'absolute',
    backgroundColor: color.WHITE,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    borderRadius: 10,
    boxShadow: 24,
    p: 4,
};

function ModalPanel(props: IProps & ContainerProps) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box>
            <BasicButton onClick={handleOpen}>
                {props.buttonContent}
            </BasicButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Container
                    sx={style}
                    {...props}
                >
                    {props.children}
                </Container>
            </Modal>

        </Box>);
}

export default memo(ModalPanel);