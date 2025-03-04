"use client"
import React, {JSX, memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
    Box,
    Button,
    IconButton,
    Input,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Modal, TextField,
    Typography,
} from "@mui/material";
import {FaHeadphones} from "react-icons/fa6";
import {color} from "@/helpers/resources";
import Grid from "@mui/material/Grid2";
import {theme} from "@/components/BasicLayout";
import StarRating from "@/components/primary/StarRating";
import {AvailabilityItem} from "@/components/book-table/BookRowItem";
import {Author, Availability} from "@/helpers/appType";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {BookBaseInfo, setAuthor} from "@/stores/slices/book-states/book.add-edit.slice";
import appStrings from "@/helpers/appStrings";
import {TiUserAdd} from "react-icons/ti";
import Container from "@/components/primary/Container";
import WithClientOnly from "@/components/primary/WithClientOnly";
import AuthorSelection from "@/components/author/AuthorSelection";
import BookAuthor from "@/components/book-page/view-only/BookAuthor";
import FormModalAddEditAuthor from "@/components/author/FormModalAddEditAuthor";
import {TextFieldNoBorder} from "@/components/primary/Input/TextFieldNoBorder";
import {BasicButton} from "@/components/primary/Input/BasicButton";
import ModalPanel from "@/components/primary/ModalPanel";

interface IProps {
    children?: React.ReactNode;
}

function Add_EditBookDetails(props: IProps): JSX.Element {
    const bookBaseInfoData = useSelector((state: RootState) => state.addEditBookData.baseInfo);
    const bookAuthor = useSelector((state: RootState) => state.addEditBookData.author);
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<BookBaseInfo>()
    const onSubmit: SubmitHandler<BookBaseInfo> = (data) => console.log(data)


    const availability = useMemo<Availability[]>(() => [{
        kind: "physical",
        title: "Sách vật lý",
        isChecked: true,
    }, {
        kind: "e-book",
        title: "Sách điện tử",
        isChecked: true,
    }, {
        kind: "audio",
        title: "Sách nói",
        isChecked: false,
    },], [])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{width: "100%", height: 381, position: "relative"}}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 3,
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <TextFieldNoBorder placeholder={appStrings.TITLE}
                                           {...register("title")}
                                           fontSize={35}
                                           padding={0}
                                           textColor={color.DARK_TEXT}
                        />
                        <Box display={"flex"} sx={{color: color.DARK_TEXT, gap: 1}}>
                            {`${appStrings.WRITE_BY} `}
                            {bookAuthor ? bookAuthor.name : <></>}
                            <AddAuthor>
                                <span style={{textDecoration: "underline"}}>{appStrings.ADD_AN_AUTHOR}</span>
                            </AddAuthor>
                            {/*, {appStrings.LIFE_SPAN}*/}
                        </Box>
                    </Box>
                    <TextFieldNoBorder placeholder={appStrings.VERSION}
                                       padding={0}
                                       {...register("version")}
                                       textColor={color.DARK_LIGHTER_TEXT}/>
                </Box>
                <Box sx={{
                    display: "flex",
                }}>
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{fontWeight: "bold", color: "#4c4c4c"}}>
                            Availability
                        </Typography>
                        <Grid container>
                            <Grid>
                                <BasicButton>
                                    <AvailabilityItem kind={"physical"} title={appStrings.book.PHYSIC_BOOK}
                                                      isChecked={false}/>
                                </BasicButton>

                            </Grid>

                        </Grid>

                        <List>
                            {availability
                                .map(i => (
                                    <ListItem key={i.title}>
                                        <AvailabilityItem kind={i.kind} title={i.title} isChecked={i.isChecked}/>
                                    </ListItem>
                                ))}
                            {/*</Grid>*/}
                        </List>
                    </Box>
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{fontWeight: "bold", color: "#4c4c4c"}}
                        >
                            Status
                        </Typography>
                        <List>
                            <ListItem>
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{textTransform: "none"}}
                                >
                                    In-Shelf
                                </Button>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOnIcon sx={{color: "#4c4c4c"}}/>
                                </ListItemIcon>
                                <ListItemText primary="CS A-15"/>
                            </ListItem>
                        </List>
                    </Box>
                </Box>

                <Grid
                    container
                    width={"100%"}
                    spacing={3}
                >
                    <Grid size={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color={"primary"}
                            sx={{
                                background: color.PRIMARY + "!important",
                                height: 61,
                                borderRadius: 1,
                            }}
                        >
                            <Typography variant="h6" sx={{color: "white"}}>
                                BORROW
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid size={6}>
                        <Button
                            fullWidth
                            color={"secondary"}
                            variant="contained"
                            sx={{
                                background: color.SECONDARY + "!important",
                                height: 61,
                                borderRadius: 1,
                            }}
                        >
                            <Grid container justifyContent={"center"} alignItems={"center"} spacing={1}>
                                <Typography variant="h6" sx={{color: "white"}}>
                                    Read Now
                                </Typography>
                                <FaHeadphones color={color.WHITE}/>
                            </Grid>

                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </form>

    );
}

type PhysicBookAvailabilityProps = {}
const PhysicBookAvailability =
    memo(function PhysicBookAvailability(props: PhysicBookAvailabilityProps) {
        return (
            <Grid container spacing={1}>

                <ModalPanel
                    buttonContent={<BasicButton>
                        <AvailabilityItem kind={"physical"} title={appStrings.book.PHYSIC_BOOK} isChecked={false}/>
                    </BasicButton>}>
                    <Grid container spacing={1}>


                    </Grid>

                </ModalPanel>


            </Grid>
        )

    });
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
            authorState && dispatch(setAuthor(authorState));
            setOpen(false);
        }, [authorState]);
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


export default memo(Add_EditBookDetails);