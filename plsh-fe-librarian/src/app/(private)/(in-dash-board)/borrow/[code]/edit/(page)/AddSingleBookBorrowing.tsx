"use client"
import React, {JSX, memo, useEffect} from "react";
import AppButton from "@/components/primary/Input/AppButton";
import Grid from "@mui/material/Grid2";
import {useModifySingleBookBorrowingMutation} from "@/stores/slices/api/borrow.api.slice";
import appStrings from "@/helpers/appStrings";
import Helper from "@/components/primary/display/Helper";
import {Typography} from "@mui/material";
import {color} from "@/helpers/resources";
import useFetchingToast from "@/hooks/useFetchingToast";
import {RootState, useAppStore} from "@/stores/store";
import {shallowEqual, useSelector} from "react-redux";
import {selectCurrentBookBorrowed} from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import {compressImage, urlToFile} from "@/helpers/convert";

function ModifySingleBookBorrowing(): JSX.Element {
    const selectedBook = useSelector((state: RootState) => selectCurrentBookBorrowed(state), shallowEqual);
    const [modify, {data, error, isLoading}] = useModifySingleBookBorrowingMutation();
    useFetchingToast(data, error);

    const onSave = async () => {
        if (selectedBook?.id && selectedBook.borrowDateRange.start && selectedBook.borrowDateRange.end) {

            const files = await Promise.all(
                selectedBook.beforeBorrow.images
                    ?.filter((r) => (r.localUrl !== undefined))
                    .map(async (r) => {
                        return await compressImage(await urlToFile(r.localUrl ?? "", r.name ?? "", r.fileType ?? "image/png"), "LOW_360P");
                    }) ?? []
            );
            const body = {
                borrowedDate: selectedBook.borrowDateRange.start,
                returnDate: selectedBook.borrowDateRange.end,
                bookBorrowingId: selectedBook.id,
                imagesBeforeBorrow: files,
                noteBeforeBorrow: selectedBook.beforeBorrow.note,
            }
            modify(body);
        }
    }
    useEffect(() => {
        return()=>{
            // onSave();
        }
    }, []);
    return (
        <Grid>
            <AppButton variant={"outlined"} loading={isLoading} onClick={onSave}>
                {appStrings.borrow.SAVE_THIS_BOOK_BORROWING}
            </AppButton>
            <Helper title={<Grid>
                <Typography>{appStrings.guide.SAVE_THIS_BOOK_BORROWING}</Typography>
                <Typography sx={{color: color.WARNING}}>
                    {appStrings.guide.NOTICE_SAVE_THIS_BOOK_BORROWING}
                </Typography>
            </Grid>}/>
        </Grid>

    );
}

export default memo(ModifySingleBookBorrowing);

