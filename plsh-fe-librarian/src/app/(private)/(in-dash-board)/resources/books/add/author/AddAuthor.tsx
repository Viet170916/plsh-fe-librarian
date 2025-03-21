"use client";
import AuthorSelection from "@/components/author/AuthorSelection";
import FormModalAddEditAuthor from "@/components/author/FormModalAddEditAuthor";
import Container from "@/components/primary/Container";
import { BasicButton } from "@/components/primary/Input/BasicButton";
import appStrings from "@/helpers/appStrings";
import { Author } from "@/helpers/appType";
import { color } from "@/helpers/resources";
import { setAuthor } from "@/stores/slices/book-states/book.add-edit.slice";
import { Box, Modal, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { memo, useCallback, useState } from "react";
import { TiUserAdd } from "react-icons/ti";
import { useDispatch } from "react-redux";

const AddAuthor =
  memo( function AddAuthor( props: { children?: React.ReactNode } ){
    const dispatch = useDispatch();
    const style = {
      position: 'absolute',
      backgroundColor: color.WHITE,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      borderRadius: 10,
      boxShadow: 24,
      p: 4,
    };
    const [ authorState, setAuthorState ] = useState<Author[] | null>( null );
    const handleSelected = useCallback( ( author: Author[] | null | undefined ) => {
      if( author ){
        setAuthorState( author );
      }
    }, [] );
    const handleSave = useCallback( () => {
      if( authorState )
        dispatch( setAuthor( authorState ) );
      setOpen( false );
    }, [ authorState, dispatch ] );
    const [ open, setOpen ] = React.useState( false );
    const handleOpen = () => setOpen( true );
    const handleClose = () => setOpen( false );
    const onAddSuccess = useCallback( ( author: Author ) => {
      setAuthorState( prev => prev ? [ ...prev, author ] : [ author ] );
    }, [] );
    return (
      <Box>
        <BasicButton onClick = { handleOpen }>
          { props.children }
          <TiUserAdd />
        </BasicButton>
        <Modal
          open = { open }
          onClose = { handleClose }
          aria-labelledby = "modal-modal-title"
          aria-describedby = "modal-modal-description"
        >
          <Container sx = { style }>
            <Grid container spacing = { 1 }>
              <Grid size = { 12 }>
                <Typography
                  id = "modal-modal-title"
                  sx = { { color: color.DARK_TEXT, fontSize: 30 } }
                >
                  { appStrings.ADD_AN_AUTHOR }
                </Typography>
              </Grid>
              <Grid size = { "grow" }>
                <AuthorSelection onSelected = { handleSelected } />
              </Grid>
              <Grid width = { 50 }>
                <FormModalAddEditAuthor
                  buttonHeight = { 25 }
                  buttonColor = { color.PRIMARY }
                  buttonTextColor = { color.LIGHT_TEXT }
                  buttonBorderRadius = { "5px" }
                  // onAddSuccess={onAddSuccess}
                />
              </Grid>
              {/*<Grid size={12}>*/ }
              {/*    <BookAuthor*/ }
              {/*        authors={authorState ?? undefined}*/ }
              {/*    />*/ }
              {/*</Grid>*/ }
              {/*<Grid size={12}>*/ }
              {/*    <Button variant={"contained"}*/ }
              {/*            sx={{color: color.WHITE}}*/ }
              {/*            onClick={handleSave}>*/ }
              {/*        {appStrings.SAVE}*/ }
              {/*    </Button>*/ }
              {/*</Grid>*/ }
            </Grid>
          </Container>
        </Modal>
      </Box>);
  } );
export default AddAuthor;
