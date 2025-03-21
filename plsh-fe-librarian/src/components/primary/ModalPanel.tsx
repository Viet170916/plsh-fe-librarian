"use client";
import Container from "@/components/primary/Container";
import { BasicButton } from "@/components/primary/Input/BasicButton";
import { color } from "@/helpers/resources";
import { Box, ContainerProps, Modal, SxProps, Theme } from "@mui/material";
import { CSSPseudoSelectorProps, CSSSelectorObjectOrCssVariables, SystemCssProperties, SystemStyleObject } from "@mui/system";
import React, { memo, useEffect } from "react";

interface IProps{
  children?: React.ReactNode,
  buttonContent?: React.ReactNode,
  buttonStyle?: SxProps<Theme>,
  containerProps?: ContainerProps,
  close?: boolean
}
type Sx =
  SystemCssProperties<Theme>
  | CSSPseudoSelectorProps<Theme>
  | CSSSelectorObjectOrCssVariables<Theme>
  | null
  | (( theme: Theme ) => SystemStyleObject<Theme>)
  | ReadonlyArray<boolean | SystemStyleObject<Theme> | (( theme: Theme ) => SystemStyleObject<Theme>)>
  | undefined
function ModalPanel( props: IProps & ContainerProps ){
  let style: Sx = {
    position: 'absolute',
    maxHeight: '100%',
    backgroundColor: color.WHITE,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    borderRadius: 10,
    boxShadow: 24,
    p: 4,
  };
  const [ open, setOpen ] = React.useState( false );
  const handleOpen = () => setOpen( true );
  const handleClose = () => setOpen( false );
  useEffect( () => {
    setOpen( false );
  }, [ props.close ] );
  style = { ...style, ...props.containerProps?.sx };
  return (
    <Box>
      <BasicButton onClick = { handleOpen }>
        { props.buttonContent }
      </BasicButton>
      <Modal
        open = { open }
        onClose = { handleClose }
        sx = { { padding: 10 } }
        aria-labelledby = "modal-modal-title"
        aria-describedby = "modal-modal-description"
      >
        <Container
          { ...props.containerProps }
          sx = { style }
        >
          { props.children }
        </Container>
      </Modal>
    </Box>);
}
export default memo( ModalPanel );
