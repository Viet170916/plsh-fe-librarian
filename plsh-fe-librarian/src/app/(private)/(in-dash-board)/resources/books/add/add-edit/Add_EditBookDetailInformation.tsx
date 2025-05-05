"use client";
import {
    CategoryEdit,
    NewCategoryEdit
} from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/component/CategorySelection";
import HandleSaveChangeButton
    from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/HandleSaveChangeButton";
import AddAuthor from "@/app/(private)/(in-dash-board)/resources/books/add/author/AddAuthor";
import AudioBookAvailability from "@/app/(private)/(in-dash-board)/resources/books/add/availability/AudioBookAvai";
import EBookAvailability from "@/app/(private)/(in-dash-board)/resources/books/add/availability/EBookAvai";
import PhysicBookAvailability from "@/app/(private)/(in-dash-board)/resources/books/add/availability/HardBookAvai";
import appStrings from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import {setValueInBookBaseInfo} from "@/stores/slices/book-states/book.add-edit.slice";
import {RootState} from "@/stores/store";
import {Box, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {JSX, memo} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";

function Add_EditBookDetails(): JSX.Element {
    const bookAuthors = useSelector((state: RootState) => state.addEditBookData.authors);
    return (
        <Grid container sx={{width: "100%", minHeight: 381}}>
            <Grid size={12} sx={{}}>
                <Grid sx={{}} container size={12}>
                    <TitleEdit/>
                    <VersionEdit/>
                    <Grid size={12} container sx={{color: color.DARK_TEXT, gap: 1}} alignItems={"center"}>
                        <Grid size={"grow"} maxHeight={70} sx={{overflowX: "hidden", overflowY: "auto"}}>
                            <Box
                                display={"flex"} flexWrap={"wrap"} width={"100%"} height={"fit-content"}
                                sx={{mt: .5}}
                            >
                                {`${appStrings.WRITE_BY}: `}{bookAuthors ? bookAuthors?.map(author => (author.fullName)).join(", ") : <></>}
                            </Box>
                        </Grid>
                        <AddAuthor>
                            <Typography color={"primary"}
                                        sx={{textDecoration: "underline"}}>{appStrings.ADD_AN_AUTHOR}</Typography>
                        </AddAuthor>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={{}} size={6}>
                <Typography
                    variant="body2"
                    sx={{fontWeight: "bold", color: color.DARK_TEXT}}
                >
                    {appStrings.book.AVAILABILITY}
                </Typography>
                <Grid container>
                    <Grid>
                        <PhysicBookAvailability/>
                        <EBookAvailability/>
                        {/*<AudioBookAvailability/>*/}
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={{}} size={6}>
                <Typography
                    variant="body2"
                    sx={{fontWeight: "bold", color: color.DARK_TEXT}}
                >
                    {appStrings.book.OVERVIEW}
                </Typography>
                <Grid container spacing={1}>
                    <CategoryEdit/>
                    <NewCategoryEdit/>
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
                    <HandleSaveChangeButton/>
                </Grid>
            </Grid>
        </Grid>
    );
}

const TitleEdit = memo(() => {
    const dispatch = useDispatch();
    const title = useSelector((state: RootState) => state.addEditBookData.baseInfo.title, shallowEqual);
    return (
        <NeumorphicTextField
            label={appStrings.TITLE}
            sx={{
                mt: 3,
                '& .MuiInputLabel-root': {
                    fontSize: 35,
                },
                '& .MuiInputLabel-shrink': {
                    fontSize: 15,
                },
                '& .MuiInputBase-input': {
                    p: 0,
                    fontSize: 35,
                    lineHeight: '1.75',
                },
            }}
            value={title ?? ""}
            onChange={(e) => {
                dispatch(setValueInBookBaseInfo({key: "title", value: e.target.value}));
            }}
            multiline
            maxRows={2}
            fullWidth
        />
    );
});
const VersionEdit = memo(() => {
    const dispatch = useDispatch();
    const version = useSelector((state: RootState) => state.addEditBookData.baseInfo.version, shallowEqual);
    return (
        <NeumorphicTextField
            size={"small"}
            sx={{
                mt: 3,
                '& .MuiInputBase-input': {
                    // p: 0,
                    fontSize: 16,
                },
            }}
            label={appStrings.VERSION}
            value={version ?? ""}
            onChange={(e) => {
                dispatch(setValueInBookBaseInfo({key: "version", value: e.target.value}));
            }}
        />
    );
});
export default memo(Add_EditBookDetails);
