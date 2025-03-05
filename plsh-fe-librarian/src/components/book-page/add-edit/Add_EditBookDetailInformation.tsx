"use client"
import React, {JSX, memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
    Autocomplete,
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import {FaHeadphones} from "react-icons/fa6";
import {color} from "@/helpers/resources";
import Grid from "@mui/material/Grid2";
import {AvailabilityItem} from "@/components/book-table/BookRowItem";
import {AnyObject, Author, Availability, Resource} from "@/helpers/appType";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {
    addBookAvailability,
    BookBaseInfo,
    modifyBookAvailability, removeBookAvailability,
    setAuthor
} from "@/stores/slices/book-states/book.add-edit.slice";
import appStrings from "@/helpers/appStrings";
import {TiUserAdd} from "react-icons/ti";
import Container from "@/components/primary/Container";
import AuthorSelection from "@/components/author/AuthorSelection";
import BookAuthor from "@/components/book-page/view-only/BookAuthor";
import FormModalAddEditAuthor from "@/components/author/FormModalAddEditAuthor";
import {TextFieldNoBorder} from "@/components/primary/Input/TextFieldNoBorder";
import {BasicButton} from "@/components/primary/Input/BasicButton";
import ModalPanel from "@/components/primary/ModalPanel";
import PdfUploader from "@/components/primary/PdfUpload";
import AudioUpload from "@/components/primary/AudioUpload";

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
                                <PhysicBookAvailability/>
                                <EBookAvailability/>
                                <AudioBookAvailability/>
                            </Grid>

                        </Grid>
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

type AudioBookAvailabilityProps = AnyObject
const AudioBookAvailability =
    memo(function AudioBookAvailability(props: AudioBookAvailabilityProps) {
        const dispatch = useDispatch();
        const availabilities = useSelector((state: RootState) => state.addEditBookData.baseInfo?.availability ?? [])
        const pysicAvaiRef = useRef<Resource | undefined>(undefined);
        useEffect(() => {
            console.log(availabilities)
        }, [availabilities])

        function handleSave() {
            const av = availabilities.find(a => a.kind === "audio");
            const newAv = {...av} as Availability
            if (av) {
                if (newAv.kind === "audio") {
                    newAv.kind = "audio";
                    newAv.isChecked = true;
                    newAv.resource = {...pysicAvaiRef.current, file: undefined} as Resource;
                }
                dispatch(modifyBookAvailability(newAv));
                // baseInfo && (baseInfo.position = value);
            } else {
                dispatch(addBookAvailability({
                    kind: "audio",
                    resource: {...pysicAvaiRef.current, file: undefined} as Resource,
                    isChecked: true,
                    title: appStrings.book.PHYSIC_BOOK,
                }));
            }

        }

        function handleRemove() {
            dispatch(removeBookAvailability("audio"));
        }

        function onAudioUploadChange(event: React.SyntheticEvent, value: Resource | null) {
            pysicAvaiRef.current = value ?? undefined;
        }

        return (
            <Grid container spacing={1}>
                <ModalPanel
                    containerProps={{
                        sx: {
                            maxWidth: 600,
                        }
                    }}
                    buttonContent={

                        <AvailabilityItem kind={"audio"} title={appStrings.book.AUDIO_BOOK}
                                          isChecked={availabilities.find(a => a.kind === "audio")?.isChecked}/>
                    }
                >
                    <Grid container spacing={1} width={"100%"}>
                        <Grid size={12}>
                            <Typography variant="body2" sx={{fontWeight: "bold", fontSize: 35, color: color.DARK_TEXT}}>
                                {appStrings.book.PHYSIC_BOOK}
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            <AudioUpload/>
                        </Grid>
                        <Grid size={3}>
                            <Button onClick={handleSave} variant={"contained"}
                                    sx={{color: color.LIGHT_TEXT, backgroundColor: color.COMFORT}}>
                                {appStrings.SAVE}
                            </Button>

                        </Grid>
                        <Grid size={3}>
                            <Button onClick={handleRemove} variant={"contained"}
                                    sx={{color: color.LIGHT_TEXT, backgroundColor: color.SERIOUS}}>
                                {appStrings.REMOVE}
                            </Button>
                        </Grid>


                    </Grid>

                </ModalPanel>


            </Grid>
        )

    });
type EBookAvailabilityProps = AnyObject
const EBookAvailability =
    memo(function EBookAvailability(props: EBookAvailabilityProps) {
        const dispatch = useDispatch();
        const availabilities = useSelector((state: RootState) => state.addEditBookData.baseInfo?.availability ?? [])
        const eBookAvaiRef = useRef<Resource | undefined>(undefined);

        function handleSave() {
            if (!eBookAvaiRef.current) return;
            const av = availabilities.find(a => a.kind === "e-book");
            const newAv = {...av} as Availability
            if (av) {
                if (newAv.kind === "e-book") {
                    newAv.kind = "e-book";
                    newAv.isChecked = true;
                    newAv.resource = ({...eBookAvaiRef.current, file: undefined} as Resource);
                }
                dispatch(modifyBookAvailability(newAv));
                // baseInfo && (baseInfo.position = value);
            } else {
                dispatch(addBookAvailability({
                    kind: "e-book",
                    resource: ({...eBookAvaiRef.current, file: undefined} as Resource),
                    isChecked: true,
                    title: appStrings.book.E_BOOK,
                }));
            }

        }

        function handleRemove() {
            dispatch(removeBookAvailability("e-book"));
        }

        function eBookChange(value: Resource | undefined) {
            eBookAvaiRef.current = value ?? undefined;
        }

        return (
            <Grid container spacing={1}>
                <ModalPanel
                    containerProps={{
                        sx: {
                            maxWidth: 600,
                        }
                    }}
                    buttonContent={

                        <AvailabilityItem kind={"physical"} title={appStrings.book.E_BOOK}
                                          isChecked={availabilities.find(a => a.kind === "e-book")?.isChecked}/>
                    }
                >
                    <Grid container spacing={1} width={"100%"}>
                        <Grid size={12}>
                            <Typography variant="body2" sx={{fontWeight: "bold", fontSize: 35, color: color.DARK_TEXT}}>
                                {appStrings.book.PHYSIC_BOOK}
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            <PdfUploader onUpload={eBookChange}/>
                        </Grid>
                        <Grid size={3}>
                            <Button onClick={handleSave} variant={"contained"}
                                    sx={{color: color.LIGHT_TEXT, backgroundColor: color.COMFORT}}>
                                {appStrings.SAVE}
                            </Button>

                        </Grid>
                        <Grid size={3}>
                            <Button onClick={handleRemove} variant={"contained"}
                                    sx={{color: color.LIGHT_TEXT, backgroundColor: color.SERIOUS}}>
                                {appStrings.REMOVE}
                            </Button>
                        </Grid>


                    </Grid>

                </ModalPanel>


            </Grid>
        )

    });
type PhysicBookAvailabilityProps = AnyObject
const PhysicBookAvailability =
    memo(function PhysicBookAvailability(props: PhysicBookAvailabilityProps) {
        const dispatch = useDispatch();
        const availabilities = useSelector((state: RootState) => state.addEditBookData.baseInfo?.availability ?? [])
        const pysicAvaiRef = useRef<string | undefined>(undefined);

        function handleSave() {
            if (!pysicAvaiRef.current) return;
            const av = availabilities.find(a => a.kind === "physical");
            const newAv = {...av} as Availability
            if (av) {
                if (newAv.kind === "physical") {
                    newAv.kind = "physical";
                    newAv.isChecked = true;
                    newAv.position = pysicAvaiRef.current ?? undefined;
                }
                dispatch(modifyBookAvailability(newAv));
                // baseInfo && (baseInfo.position = value);
            } else {
                dispatch(addBookAvailability({
                    kind: "physical",
                    position: pysicAvaiRef.current ?? undefined,
                    isChecked: true,
                    title: appStrings.book.PHYSIC_BOOK,
                }));
            }

        }

        function handleRemove() {
            dispatch(removeBookAvailability("physical"));
        }

        function physicSelectChange(event: React.SyntheticEvent, value: string | null) {
            pysicAvaiRef.current = value ?? undefined;
        }

        return (
            <Grid container spacing={1}>
                <ModalPanel
                    containerProps={{
                        sx: {
                            maxWidth: 600,
                        }
                    }}
                    buttonContent={

                        <AvailabilityItem kind={"physical"} title={appStrings.book.PHYSIC_BOOK}
                                          isChecked={availabilities.find(a => a.kind === "physical")?.isChecked}/>
                    }
                >
                    <Grid container spacing={1} width={"100%"}>
                        <Grid size={12}>
                            <Typography variant="body2" sx={{fontWeight: "bold", fontSize: 35, color: color.DARK_TEXT}}>
                                {appStrings.book.PHYSIC_BOOK}
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            <Autocomplete
                                onChange={physicSelectChange}
                                renderInput={(params) => {
                                    return (
                                        <TextField variant={"outlined"} {...params} label={appStrings.book.POSITION}/>)
                                }
                                }
                                options={["A-R1-C1"]}
                            />
                        </Grid>
                        <Grid size={3}>
                            <Button onClick={handleSave} variant={"contained"}
                                    sx={{color: color.LIGHT_TEXT, backgroundColor: color.COMFORT}}>
                                {appStrings.SAVE}
                            </Button>

                        </Grid>
                        <Grid size={3}>
                            <Button onClick={handleRemove} variant={"contained"}
                                    sx={{color: color.LIGHT_TEXT, backgroundColor: color.SERIOUS}}>
                                {appStrings.REMOVE}
                            </Button>
                        </Grid>


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


export default memo(Add_EditBookDetails);