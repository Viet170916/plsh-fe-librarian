"use client";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import appStrings from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useSelector} from "@/hooks/useSelector";
import {
    BorrowedBookData,
    deleteBorrowedBook,
    setPropToBorrow
} from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import {truncateTextStyle} from "@/style/text.style";
import {CardContent, IconButton, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {memo} from "react";
import {shallowEqual} from "react-redux";
import {Zoom} from "@/components/Animation/animation";
import {HiOutlineTrash} from "react-icons/hi";
import {useDeleteBookBorrowingMutation} from "@/stores/slices/api/borrow.api.slice";
import useFetchingToast from "@/hooks/useFetchingToast";
import {useTheme} from "@mui/material/styles";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";

function SelectedBook() {
    const dispatch = useAppDispatch();
    const [deleteBook, {data, isLoading, error}] = useDeleteBookBorrowingMutation();
    const bookSelected = useSelector(state => state.addEditBorrowData.borrowedBooks, shallowEqual);
    const bookSelectedId = useSelector(state => state.addEditBorrowData.selectedBookId, shallowEqual);

    function onBookSelected(book: BorrowedBookData) {
        dispatch(setPropToBorrow({key: "selectedBookId", value: book.bookInstance.id}));
    }

    async function onBookRemove(book: BorrowedBookData) {
        if (book.id) {
            const response = await deleteBook(book.id);
            if (response.data && book?.bookInstance?.id) {
                dispatch(deleteBorrowedBook(book.bookInstance.id));
            }
        } else if (!book.id && book?.bookInstance?.id)
            dispatch(deleteBorrowedBook(book.bookInstance.id));
    }

    useFetchingToast(data, error);
    const theme = useTheme();

    return (
        <Grid container spacing={2}>
            {bookSelected.map((book, index) => (
                <Grid size={4} key={index}
                      onClick={() => onBookSelected(book)}>
                    <Zoom index={index} style={{position: "relative", height: "100%"}}>
                        <Grid
                            sx={{
                                // ...shadowStyle,
                                borderRadius: 2,
                                bgcolor: theme.palette.background.default,
                                height: "100%",
                                cursor: "pointer",
                                p: 2,
                                pb: 0,
                                boxShadow: bookSelectedId === book.bookInstance.id ? NEUMORPHIC_SHADOW.INNER_SHADOW() : NEUMORPHIC_SHADOW.SHADOW()
                            }}>

                            <IconButton loading={isLoading} sx={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                zIndex: 100,
                                bgcolor: color.WHITE,
                                color: color.DARK_TEXT
                            }} onClick={(e) => {
                                e.stopPropagation();
                                onBookRemove(book).then();
                            }}><HiOutlineTrash/></IconButton>
                            <ImageWithBgCover src={book.bookInstance.bookThumbnail} sx={{width: "100%", height: 200}}/>
                            <CardContent sx={{p: 0, pt: 1}}>
                                <Typography color={"text.primary"} variant="h5" fontWeight={"bold"}
                                            sx={{...truncateTextStyle}}>{book.bookInstance.bookName}</Typography>
                                <Typography color={"text.primary"}
                                            variant="caption">{book.bookInstance.code}</Typography>
                                <Typography color={"text.primary"} variant="h6"
                                            fontWeight={"lighter"}>{book.bookInstance.bookVersion}</Typography>
                                <Typography color={"text.primary"} variant="h6"
                                            fontWeight={"lighter"}>{appStrings.shelf.POSITION}: {book.bookInstance.shelfPosition}</Typography>
                            </CardContent>
                        </Grid>

                    </Zoom>

                </Grid>

            ))}
        </Grid>);
}

export default memo(SelectedBook);
