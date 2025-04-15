"use client";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import {appToaster} from "@/components/primary/toaster";
import appStrings from "@/helpers/appStrings";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {color} from "@/helpers/resources";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useSelector} from "@/hooks/useSelector";
import {useLazyGetBookQuery} from "@/stores/slices/api/book.api.slice";
import {clearPropInBookState, setPropToBookState} from "@/stores/slices/book-states/book.slice";
import {Dialog, IconButton, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import React, {memo, useEffect} from "react";
import {CgClose} from "react-icons/cg";
import {shallowEqual} from "react-redux";
import LoadingModal from "@/components/primary/LoadingModal";

export const BookSelectedModal = memo(() => {
    const bookSelected = useSelector(state => state.bookState.currentBook, shallowEqual);
    const [getBook, {data, isFetching, error}] = useLazyGetBookQuery();
    const dispatch = useAppDispatch();

    function onClose() {
        dispatch(clearPropInBookState("currentBook"));
    }

    useEffect(() => {
        if (data) {
            dispatch(setPropToBookState({key: "currentBook", value: data}))
        }
    }, [data, dispatch]);
    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);
    useEffect(() => {
        if (bookSelected?.id)
            getBook(bookSelected.id);
    }, [bookSelected?.id, getBook]);
    return (
        <Dialog
            open={(bookSelected !== undefined)} onClose={onClose} sx={{
            "& .MuiDialog-paper": {
                maxWidth: "none",
                maxHeight: "none",
                width: `calc(100vw - 400px)`, height: `calc(100vh - 30px)`,
            },
        }}
        >
            <LoadingModal open={isFetching}/>
            <Grid width={"100%"} container sx={{bgcolor: color.WHITE, p: 5, pt: 3}} height={"100%"}>
                <Grid size={12} justifyContent={"end"} container><IconButton onClick={onClose}><CgClose
                    color={color.PRIMARY}/></IconButton> </Grid>
                <Grid size={3}>
                    <ImageWithBgCover src={bookSelected?.coverImageUrl ?? bookSelected?.thumbnail} sx={{height: 400}}/>
                    <Typography variant="body1">
                        <strong>{appStrings.book.PUBLISHER}:</strong> {bookSelected?.publisher}
                    </Typography>
                    <Typography variant="body1">
                        <strong>{appStrings.book.PUBLISH_AT}:</strong> {bookSelected?.publishDate}
                    </Typography>
                    <Typography variant="body1">
                        <strong>{appStrings.book.PAGE_COUNT}:</strong> {bookSelected?.pageCount}
                    </Typography>
                    <Typography variant="body1">
                        <strong>{appStrings.book.ISBN13}:</strong> {bookSelected?.isbnNumber13}
                    </Typography>
                    <Typography variant="body1">
                        <strong>{appStrings.book.ISBN10}:</strong> {bookSelected?.isbnNumber10}
                    </Typography>
                </Grid>
                <Grid size={9} sx={{pr: 5, pl: 5, pb: 20, overflowY: "auto"}} height={"100%"}>
                    <Grid size={12}>
                        <Link href={`/resources/books/${bookSelected?.id}`}>
                            <Typography variant="h3" sx={{color: color.PRIMARY, textDecoration: "underline"}}
                                        fontWeight={"bold"}>
                                {bookSelected?.title}
                            </Typography>
                        </Link>
                        <Typography variant="body1">
                            <strong>{appStrings.AUTHOR}:</strong> {bookSelected?.authors.map((author) => author.fullName).join(", ")}
                        </Typography>
                        <Typography variant="body1">
                            <strong>{appStrings.DESCRIPTION}:</strong> {bookSelected?.description}
                        </Typography>
                    </Grid>
                </Grid>
                {
                    bookSelected?.id &&
                    <Grid sx={{position: "absolute", bottom: 20, right: 20}} container alignItems={"center"}>
                                <Grid container>
                                            <Typography fontWeight={"bold"} sx={{}} variant={"h6"}>
                                                {appStrings.book.AVAILABILITY}:{" "}
                                            </Typography>
                                            <Typography variant={"h6"}
                                                        sx={{color: bookSelected.availableBookCount <= 0 ? color.SERIOUS : color.COMFORT}}>
                                                {bookSelected.availableBookCount}
                                            </Typography>
                                </Grid>
                    </Grid>
                }
            </Grid>
        </Dialog>
    );
});
