"use client"
import React, {memo, useCallback, useMemo} from "react";
import {useForm} from "react-hook-form";
import {Button, TextField, Typography} from "@mui/material";
import {
    BorrowedBookData, modifyBorrowedBook, setImagesBeforeBorrow,
} from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import {DateTimePicker} from "@mui/x-date-pickers";
import Grid from "@mui/material/Grid2";
import appStrings from "@/helpers/appStrings";
import dayjs from "dayjs";
import {color} from "@/helpers/resources";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores/store";
import UploadOrTakeImage from "@/components/primary/UploadOrTakeImage";
import {Resource} from "@/helpers/appType";
import {getDayFromNow} from "@/helpers/time";

interface IProps {
    children?: React.ReactNode;
    onSubmit?: (values: BorrowedBookData) => void;
}


function AddEditBorrowForm(props: IProps) {
    const selectedBookId = useSelector((state: RootState) => state.addEditBorrowData.selectedBookId);
    const borrowedBooks = useSelector((state: RootState) => state.addEditBorrowData.borrowedBooks)
    const selectedBook = useMemo(() => borrowedBooks.find(selected => selected.id === selectedBookId), [selectedBookId, borrowedBooks]);
    const dispatch = useDispatch();
    const {handleSubmit, control, register, setValue} = useForm<BorrowedBookData>();
    const onSubmit = (data: BorrowedBookData) => {
        const canalizedData = {...selectedBook, ...data};
        dispatch(modifyBorrowedBook(canalizedData));
    };
    const onPreBorrowImageChange =
        useCallback((imageResource: Resource[]) => {
            if (selectedBookId) {
                dispatch(setImagesBeforeBorrow({selectedBookId: selectedBookId, resource: imageResource}))
            }
        }, [selectedBookId, dispatch]);
    return (
        <Grid container spacing={2}>
            {selectedBook ? <><TextField
                    defaultValue={selectedBook?.bookCode}
                    fullWidth margin="dense" disabled label={appStrings.book.CODE}
                    variant="outlined"/>
                    <TextField
                        defaultValue={selectedBook?.bookTitle}
                        fullWidth margin="dense" disabled label={appStrings.book.NAME}
                        variant="outlined"/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <DateTimePicker
                                defaultValue={dayjs(selectedBook?.borrowDateRange?.start ?? new Date())}
                                sx={{width: "100%"}}
                                label={appStrings.borrow.BORROW_DATE}
                                onChange={(datePiked) => {
                                    setValue("borrowDateRange.start", datePiked?.toDate())
                                }}/>
                            <DateTimePicker
                                defaultValue={dayjs(selectedBook?.borrowDateRange?.end ?? (getDayFromNow(1)))}
                                sx={{width: "100%"}}
                                label={appStrings.borrow.RETURN_DATE}
                                onChange={(datePiked) => {
                                    setValue("borrowDateRange.end", datePiked?.toDate())
                                }}/>

                            <Grid width={"100%"} container spacing={2}>
                                <Typography variant={"h2"} fontWeight={"bold"}>
                                    {appStrings.borrow.BOOK_DAMAGE_BEFORE_BORROW}
                                </Typography>
                                <TextField
                                    {...register("beforeBorrow.note")}
                                    defaultValue={selectedBook?.beforeBorrow.note}
                                    multiline
                                    rows={4}
                                    label={appStrings.NOTE}
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"/>
                                <TextField
                                    label={appStrings.borrow.BORROW_STATUS}
                                    defaultValue={selectedBook?.beforeBorrow.status ?? "on-loan"}
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                />
                                <Typography variant={"h5"}>
                                    {appStrings.borrow.BOOK_IMAGE_BEFORE_BORROW}
                                </Typography>
                                <UploadOrTakeImage maxImages={5} onImageChange={onPreBorrowImageChange}/>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained"
                                    sx={{mt: 2, color: color.LIGHT_TEXT}}>{appStrings.SAVE}
                            </Button>
                        </Grid>
                    </form>
                </> :
                <Typography variant={"h4"} sx={{color: color.PRIMARY, fontWeight: "bold"}}>
                    {appStrings.borrow.NO_BOOK_SELECTED}
                </Typography>
            }

        </Grid>
    );

}

export default memo(AddEditBorrowForm);