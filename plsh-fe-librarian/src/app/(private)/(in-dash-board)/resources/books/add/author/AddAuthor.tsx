"use client"
import React, {memo, useCallback, useState} from "react";
import {
    Box,
    Button,
    Modal,
    Typography,
} from "@mui/material";
import {color} from "@/helpers/resources";
import Grid from "@mui/material/Grid2";
import {Author} from "@/helpers/appType";
import {useDispatch, useSelector} from "react-redux";
import {
    setAuthor
} from "@/stores/slices/book-states/book.add-edit.slice";
import appStrings from "@/helpers/appStrings";
import {TiUserAdd} from "react-icons/ti";
import Container from "@/components/primary/Container";
import AuthorSelection from "@/components/author/AuthorSelection";
import BookAuthor from "@/components/book-page/view-only/BookAuthor";
import FormModalAddEditAuthor from "@/components/author/FormModalAddEditAuthor";
import {BasicButton} from "@/components/primary/Input/BasicButton";

const AddAuthor =
    memo(function AddAuthor(props: { children?: React.ReactNode }) {
        const dispatch = useDispatch();
        // const author = useSelector((state: RootState) => state.addEditBookData.author);
        const style = {
            position: 'absolute',
            backgroundColor: color.WHITE,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            borderRadius: 10,
            boxShadow: 24,
            p: 4,
        };
        const [authorState, setAuthorState] = useState<Author | null>(null);

        const handleSelected = useCallback((author: Author | null | undefined) => {
            if (author) {
                setAuthorState(author);
            }
        }, [])
        const handleSave = useCallback(() => {
            if (authorState)
                dispatch(setAuthor(authorState));
            setOpen(false);
        }, [authorState, dispatch]);
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        return (
            <Box>
                <BasicButton onClick={handleOpen}>
                    {props.children}
                    <TiUserAdd/>
                </BasicButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Container sx={style}>
                        <Grid container spacing={1}>
                            <Grid size={12}>
                                <Typography id="modal-modal-title"
                                            sx={{color: color.DARK_TEXT, fontSize: 30}}>
                                    {appStrings.ADD_AN_AUTHOR}
                                </Typography>
                            </Grid>
                            <Grid size={{xl: 10}}>
                                <AuthorSelection onSelected={handleSelected}/>
                            </Grid>
                            <Grid size={{xl: 2}}>
                                <FormModalAddEditAuthor
                                    buttonHeight={25}
                                    buttonColor={color.PRIMARY}
                                    buttonTextColor={color.LIGHT_TEXT}
                                    buttonBorderRadius={"5px"}
                                />
                            </Grid>
                            <Grid size={12}>
                                <BookAuthor
                                    author={authorState ?? undefined}
                                />
                            </Grid>
                            <Grid size={12}>
                                <Button variant={"contained"}
                                        sx={{color: color.WHITE}}
                                        onClick={handleSave}>
                                    {appStrings.SAVE}
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Modal>

            </Box>)
    })


export default AddAuthor;