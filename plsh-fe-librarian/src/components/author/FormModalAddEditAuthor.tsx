import React, {JSX, memo, useEffect, useRef} from "react";
import {Box, Button, IconButton, Modal, TextField, Tooltip, Typography} from "@mui/material";
import {TiUserAdd} from "react-icons/ti";
import Container from "@/components/primary/Container";
import Grid from "@mui/material/Grid2";
import dayjs from 'dayjs';
import {color} from "@/helpers/resources";
import appStrings from "@/helpers/appStrings";
import {FaUserPen} from "react-icons/fa6";
import {SubmitHandler, useForm} from "react-hook-form";
import {Author, ErrorMessages, Resource} from "@/helpers/appType";
import {DatePicker} from "@mui/x-date-pickers";
import UploadImageButton from "@/components/primary/Input/UploadImageButton";
import {useAddAuthorMutation} from "@/stores/slices/api/author.api.slice";
import {useDispatch} from "react-redux";
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {compressImage, objectToFormData} from "@/helpers/convert";
import {toast} from "sonner";
import {toastError} from "@/helpers/error";
import {addAuthor} from "@/stores/slices/book-states/book.add-edit.slice";

interface IProps {
    children?: React.ReactNode,
    editMode?: boolean,
    buttonColor?: string,
    buttonBorderRadius?: string | number,
    buttonTextColor?: string,
    buttonWidth?: string | number,
    buttonHeight?: string | number,
}

const currentYear = dayjs();
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    minHeight: 500,
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: color.WHITE,
    borderRadius: 10,
    boxShadow: 24,
    p: 4,
};

function FormModalAddEditAuthor({
                                    editMode,
                                    buttonWidth,
                                    buttonColor,
                                    buttonTextColor,
                                    buttonBorderRadius,
                                    buttonHeight,
                                    children,
                                }: IProps): JSX.Element {
    const [addAuthorApi, {isLoading, data}] = useAddAuthorMutation();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
    } = useForm<Author>();
    useEffect(() => {
        if (data) {
            dispatch(addAuthor(data))
            toast.success(appStrings.author.ADD_SUCCESS)
            setOpen(false);
        }
    }, [data, dispatch])
    const onSubmit: SubmitHandler<Author> = async (data) => {
        console.log(data);
        const preSend: Author = data;
        preSend.resource = undefined;
        if (data.authorImageResource) {
            preSend.authorImageResource = await compressImage(data.authorImageResource, "SD_480P");
        }
        const response = await addAuthorApi(objectToFormData(preSend));
        if (response?.error) {
            const messages: ErrorMessages = {
                FETCH_ERROR_MESSAGE: appStrings.author.error.ADD_FAILURE,
            }
            toastError(response.error, messages);
            setOpen(false);
        }
    };
    const formRef = useRef<HTMLFormElement>(null);

    function onImageChange(resource: Resource) {
        setValue("authorImageResource", resource.file)
        setValue("resource", resource)
    }

    return (
        <Box width={"100%"}>
            <Tooltip title={appStrings.author.ADD_AN_AUTHOR}>
                <IconButton onClick={handleOpen} sx={{
                    width: buttonWidth ?? "100%",
                    height: buttonHeight ?? "fit-content",
                    padding: "5px",
                    backgroundColor: buttonColor + "!important",
                    borderRadius: buttonBorderRadius + "!important",
                    color: buttonTextColor + "!important",
                }}>
                    {children}
                    {editMode ? <FaUserPen color={buttonTextColor}/> :
                        <TiUserAdd color={buttonTextColor}/>}
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container sx={style}>
                    <form id="modal-add-edit-author-form" ref={formRef} onSubmit={handleSubmit(onSubmit)}>

                        <Grid container spacing={1}>
                            <Grid size={12}>
                                <Typography id="modal-modal-title"
                                            sx={{color: color.DARK_TEXT, fontSize: 30}}>
                                    {editMode ? appStrings.EDIT_AUTHOR : appStrings.ADD_AN_AUTHOR}
                                </Typography>
                            </Grid>
                            <Grid size={12} container spacing={1} width={"100%"}>
                                <Grid width={"100%"}>
                                    <TextField
                                        {...register("fullName")}
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        required
                                        label={appStrings.author.properties.AUTHOR_NAME}
                                        defaultValue={undefined}
                                    />
                                </Grid>
                                <Grid width={"100%"}>

                                    <TextField
                                        {...register("description")}
                                        multiline
                                        maxRows={6}
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        required
                                        label={appStrings.author.properties.AUTHOR_DESCRIPTION}
                                        defaultValue={undefined}
                                    />
                                </Grid>
                                <Grid width={"100%"}>
                                    <DatePicker
                                        sx={{width: "100%"}}
                                        defaultValue={undefined}
                                        yearsOrder="desc"
                                        maxDate={currentYear}
                                        onChange={(value) => setValue("birthYear", value?.year().toString())}
                                        label={appStrings.author.properties.BIRTH_YEAR}
                                        views={['year']}/>
                                </Grid>
                                <Grid width={"100%"}>
                                    <DatePicker
                                        sx={{width: "100%"}}
                                        maxDate={currentYear}
                                        yearsOrder="desc"
                                        defaultValue={undefined}
                                        onChange={(value) => setValue("deathYear", value?.year().toString())}
                                        label={appStrings.author.properties.DEAD_YEAR}
                                        views={['year']}/>
                                </Grid>

                            </Grid>
                            <Grid size={6} alignSelf={"end"}>
                                <Button
                                    loading={isLoading}
                                    fullWidth
                                    sx={{
                                        background: color.PRIMARY + "!important",
                                        color: color.LIGHT_TEXT
                                    }}
                                    form={"modal-add-edit-authors-form"}
                                    onClick={() => {
                                        handleSubmit(onSubmit)();
                                    }}>
                                    {appStrings.SAVE}
                                </Button>
                            </Grid>
                            <Grid height={150} size={6} container spacing={1}>
                                <UploadImageButton
                                    onImageChange={onImageChange}/>
                            </Grid>
                        </Grid>
                    </form>

                </Container>
            </Modal>

        </Box>);
}

export default memo(FormModalAddEditAuthor);