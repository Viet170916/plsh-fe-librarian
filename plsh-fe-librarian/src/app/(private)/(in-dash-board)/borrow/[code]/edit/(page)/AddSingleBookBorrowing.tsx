"use client"
import React, {JSX, memo, useCallback, useEffect, useRef} from "react";
import AppButton from "@/components/primary/Input/AppButton";
import Grid from "@mui/material/Grid2";
import {useModifySingleBookBorrowingMutation} from "@/stores/slices/api/borrow.api.slice";
import appStrings from "@/helpers/appStrings";
import Helper from "@/components/primary/display/Helper";
import {Typography} from "@mui/material";
import {color} from "@/helpers/resources";
import useFetchingToast from "@/hooks/useFetchingToast";
import {useAppStore} from "@/stores/store";
import {BorrowedBookData, selectCurrentBookBorrowed} from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import {compressImage, urlToFile} from "@/helpers/convert";
import {deepEqual} from "@/helpers/comparation";
import {appToaster} from "@/components/primary/toaster";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

function ModifySingleBookBorrowing(): JSX.Element {
    const store = useAppStore();
    // const selectedBook = useSelector((state: RootState) => selectCurrentBookBorrowed(state), shallowEqual);
    const getSelectedBook = useCallback(() => {
        return selectCurrentBookBorrowed(store.getState());
    }, [store]);
    const [modify, {data, error, isLoading}] = useModifySingleBookBorrowingMutation();
    useFetchingToast(data, error);
    const onSave = async () => {
        const selectedBook = getSelectedBook();
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
        return () => {
            // onSave();
        }
    }, []);
    return (
        <Grid>
            <NeumorphicButton loading={isLoading} onClick={onSave}>
                {appStrings.borrow.SAVE_THIS_BOOK_BORROWING}
            </NeumorphicButton>
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

