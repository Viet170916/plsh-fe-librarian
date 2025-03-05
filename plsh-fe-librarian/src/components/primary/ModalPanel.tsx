"use client"
import React, {memo} from "react";

import {Box, ContainerProps, Modal, ModalProps, SxProps, Theme} from "@mui/material";
import {BasicButton} from "@/components/primary/Input/BasicButton";
import Container from "@/components/primary/Container";
import {color} from "@/helpers/resources";
import {
    CSSPseudoSelectorProps,
    CSSSelectorObjectOrCssVariables,
    SystemCssProperties,
    SystemStyleObject
} from "@mui/system";

interface IProps {
    children?: React.ReactNode;
    buttonContent?: React.ReactNode;
    buttonStyle?: SxProps<Theme>;
    containerProps?: ContainerProps;
}

type Sx =
    SystemCssProperties<Theme>
    | CSSPseudoSelectorProps<Theme>
    | CSSSelectorObjectOrCssVariables<Theme>
    | null
    | ((theme: Theme) => SystemStyleObject<Theme>)
    | ReadonlyArray<boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)>
    | undefined

function ModalPanel(props: IProps & ContainerProps) {
    let style: Sx = {
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    style = {...style, ...props.containerProps?.sx};
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
                    {...props.containerProps}
                    sx={style}
                >
                    {props.children}
                </Container>
            </Modal>

        </Box>);
}

export default memo(ModalPanel);