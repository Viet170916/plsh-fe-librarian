"use client"
import React, {JSX, memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    Box,
    Button, Stack, TextField,
    Typography,
} from "@mui/material";
import {color} from "@/helpers/resources";
import Grid from "@mui/material/Grid2";
import {Availability} from "@/helpers/appType";
import {useSelector} from "react-redux";
import {RootState} from "@/stores/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {
    BookBaseInfo,
} from "@/stores/slices/book-states/book.add-edit.slice";
import appStrings from "@/helpers/appStrings";
import {TextFieldNoBorder} from "@/components/primary/Input/TextFieldNoBorder";
import AudioBookAvailability from "@/app/(private)/(in-dash-board)/resources/books/add/availability/AudioBookAvai";
import EBookAvailability from "@/app/(private)/(in-dash-board)/resources/books/add/availability/EBookAvai";
import PhysicBookAvailability from "@/app/(private)/(in-dash-board)/resources/books/add/availability/HardBookAvai";
import AddAuthor from "@/app/(private)/(in-dash-board)/resources/books/add/author/AddAuthor";

interface IProps {
    children?: React.ReactNode;
}

function Add_EditBookDetails(props: IProps): JSX.Element {
    console.log(process.env.NEXT_PUBLIC_SERVER_API_URL);
    const bookBaseInfoData = useSelector((state: RootState) => state.addEditBookData.baseInfo);
    const bookAuthors = useSelector((state: RootState) => state.addEditBookData.authors);
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<BookBaseInfo>()
    const onSubmit: SubmitHandler<BookBaseInfo> = (data) => {
        console.log(data)
    }

    function onAddBook(){

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container sx={{width: "100%", minHeight: 381}}>
                <Grid size={12} sx={{}}>
                    <Grid sx={{}} container size={12}>
                        <TextFieldNoBorder placeholder={appStrings.TITLE}
                                           {...register("title")}
                                           defaultValue={bookBaseInfoData.title ?? ""}
                                           fullWidth
                                           fontSize={35}
                                           padding={0}
                                           textColor={color.DARK_TEXT}
                        />
                        <TextFieldNoBorder placeholder={appStrings.VERSION}
                                           defaultValue={bookBaseInfoData.version ?? ""}

                                           padding={0}
                                           {...register("version")}
                                           textColor={color.DARK_LIGHTER_TEXT}/>
                        <Grid size={12} container sx={{color: color.DARK_TEXT, gap: 1}}>
                            {`${appStrings.WRITE_BY}: `}
                            <Grid size={"grow"} maxHeight={70} sx={{overflowX: "hidden", overflowY: "auto"}}>
                                <Box display={"flex"} flexWrap={"wrap"} width={"100%"} height={"fit-content"}
                                     sx={{mt: .5}}>
                                    {bookAuthors ? bookAuthors.map(author => (
                                        <Typography width={"max-content"} variant={"h5"}
                                                    key={`${author.id}-${author.fullName}`}>{`${author.fullName}, `} </Typography>
                                    )) : <></>}
                                </Box>
                            </Grid>

                            <AddAuthor>
                                <span style={{textDecoration: "underline"}}>{appStrings.ADD_AN_AUTHOR}</span>
                            </AddAuthor>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid sx={{}} size={6}>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: "bold", color: color.DARK_TEXT}}>
                        {appStrings.book.AVAILABILITY}
                    </Typography>
                    <Grid container>
                        <Grid>
                            <PhysicBookAvailability/>
                            <EBookAvailability/>
                            <AudioBookAvailability/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid sx={{}} size={6}>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: "bold", color: color.DARK_TEXT}}>
                        {appStrings.book.OVERVIEW}
                    </Typography>
                    <Grid container spacing={1}>
                        <TextField fullWidth sx={{mt: 1}} size={"small"} {...register("category.name")}
                                   label={appStrings.book.CATEGORY}/>
                        <TextField fullWidth sx={{mt: 1}} size={"small"} {...register("category.name")}
                                   label={appStrings.book.CATEGORY}/>
                    </Grid>
                </Grid>

                <Grid
                    container
                    width={"100%"}
                    spacing={3}
                    justifySelf={"end"}
                    alignSelf={"end"}
                >
                    <Grid size={12}>
                        <Button
                            onClick={onAddBook}
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
                                {appStrings.SAVE}
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>

    );
}


export default memo(Add_EditBookDetails);