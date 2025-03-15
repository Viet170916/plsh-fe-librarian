"use client"
import React, {JSX, memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    Box,
    Button,
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
    const bookBaseInfoData = useSelector((state: RootState) => state.addEditBookData.baseInfo);
    const bookAuthor = useSelector((state: RootState) => state.addEditBookData.author);
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<BookBaseInfo>()
    const onSubmit: SubmitHandler<BookBaseInfo> = (data) => {
        console.log(data)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container sx={{width: "100%", minHeight: 381}}>
                <Grid size={12} sx={{}}>
                    <Grid sx={{}} size={12}>
                        <TextFieldNoBorder placeholder={appStrings.TITLE}
                                           {...register("title")}
                                           defaultValue={bookBaseInfoData.title ?? ""}
                                           fullWidth
                                           fontSize={35}
                                           padding={0}
                                           textColor={color.DARK_TEXT}
                        />
                        <Box display={"flex"} sx={{color: color.DARK_TEXT, gap: 1}}>
                            {`${appStrings.WRITE_BY} `}
                            {bookAuthor ? bookAuthor.fullName : <></>}
                            <AddAuthor>
                                <span style={{textDecoration: "underline"}}>{appStrings.ADD_AN_AUTHOR}</span>
                            </AddAuthor>
                        </Box>
                    </Grid>
                    <TextFieldNoBorder placeholder={appStrings.VERSION}
                                       defaultValue={bookBaseInfoData.version ?? ""}

                                       padding={0}
                                       {...register("version")}
                                       textColor={color.DARK_LIGHTER_TEXT}/>
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

                <Grid
                    container
                    width={"100%"}
                    spacing={3}
                    justifySelf={"end"}
                    alignSelf={"end"}
                >
                    <Grid size={12}>
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