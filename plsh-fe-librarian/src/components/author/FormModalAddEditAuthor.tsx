import React, {JSX, memo, useRef} from "react";
import {Box, Button, IconButton, Modal, TextField, Typography} from "@mui/material";
import {TiUserAdd} from "react-icons/ti";
import Container from "@/components/primary/Container";
import Grid from "@mui/material/Grid2";
import dayjs from 'dayjs';
import {color} from "@/helpers/resources";
import appStrings from "@/helpers/appStrings";
import {FaUserPen} from "react-icons/fa6";
import {SubmitHandler, useForm} from "react-hook-form";
import {Author, Resource} from "@/helpers/appType";
import {DatePicker} from "@mui/x-date-pickers";
import UploadImageButton from "@/components/primary/Input/UploadImageButton";
import {useAddAuthorMutation} from "@/stores/slices/api/author.api.slice";
import {setAuthor} from "@/stores/slices/book-states/book.add-edit.slice";
import {useDispatch} from "react-redux";
import {objectToFormData} from "@/helpers/convert";
import {toast} from "sonner";

interface IProps {
    children?: React.ReactNode;
    editMode?: boolean;
    buttonColor?: string;
    buttonBorderRadius?: string | number;
    buttonTextColor?: string;
    buttonWidth?: string | number;
    buttonHeight?: string | number;

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

function FormModalAddEditAuthor(props: IProps): JSX.Element {
    const dispatch = useDispatch();
    const [addAuthor, {isLoading, error}] = useAddAuthorMutation();
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
    const onSubmit: SubmitHandler<Author> = async (data) => {
        console.log(data);
        const response = await addAuthor(objectToFormData(data));
        if (response?.error) {
            toast.error(appStrings.author.error.ADD_FAILURE);
        } else if (response?.data?.data) {
            dispatch(setAuthor(response.data?.data));
        }
        setOpen(false);
    };
    const formRef = useRef<HTMLFormElement>(null);

    function onImageChange(resource: Resource) {
        setValue("authorImageResource", resource.file)
        setValue("resource", resource)
    }

    return (
        <Box width={"100%"}>
            <IconButton onClick={handleOpen} sx={{
                width: props.buttonWidth ?? "100%",
                height: props.buttonHeight ?? "fit-content",
                padding: "5px",
                backgroundColor: props.buttonColor + "!important",
                borderRadius: props.buttonBorderRadius + "!important",
                color: props.buttonTextColor + "!important",
            }}>
                {props.children}
                {props.editMode ? <FaUserPen color={props.buttonTextColor}/> :
                    <TiUserAdd color={props.buttonTextColor}/>}
            </IconButton>
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
                                    {props.editMode ? appStrings.EDIT_AUTHOR : appStrings.ADD_AN_AUTHOR}
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
                                    form={"modal-add-edit-author-form"}
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