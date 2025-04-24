"use client";
import {
    BorrowNote,
    DateRangeEnd,
    DateRangeStart,
    ImageSelected,
    ImagesPreview
} from "@/app/(private)/(in-dash-board)/borrow/add/(page)/borrow.form.input.components";
import appStrings from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import {
    applyDateRangeForAll,
    BorrowedBookData,
    clearPropToBorrow,
    selectCurrentBookBorrowed,
    setPropToBorrowedBook
} from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import {RootState, useAppStore} from "@/stores/store";
import {MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {memo, useCallback, useEffect, useRef} from "react";
import {shallowEqual, useSelector} from "react-redux";
import BottomDrawer from "@/components/Animation/BottomDrawer";
import {useAppDispatch} from "@/hooks/useDispatch";
import AppButton from "@/components/primary/Input/AppButton";
import {appToaster} from "@/components/primary/toaster";
import dayjs from "dayjs";
import Helper from "@/components/primary/display/Helper";
import {useModifyAllBookBorrowingMutation} from "@/stores/slices/api/borrow.api.slice";
import {parsErrorToBaseResponse} from "@/helpers/error";
import AddSingleBookBorrowing from "@/app/(private)/(in-dash-board)/borrow/[code]/edit/(page)/AddSingleBookBorrowing";
import {deepEqual} from "@/helpers/comparation";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";

const Form = memo(({selectedBook}: { selectedBook?: BorrowedBookData }) => {
    return (
        <Grid container spacing={2} sx={{mb: 5}}>
            {selectedBook?.bookInstance ? <>
                    <Grid size={6} spacing={2} container>
                        <Typography color={"text.primary"} variant={"h4"} fontWeight={"bold"} sx={{color: color.DARK_TEXT}}>
                            {appStrings.borrow.EDIT_BOOK_SELECTED}
                        </Typography>
                        <NeumorphicTextField
                            fullWidth
                            value={selectedBook.bookInstance.code}
                            disabled
                            label={appStrings.book.CODE}
                            variant="outlined"
                        />
                        <NeumorphicTextField
                            fullWidth
                            value={selectedBook.bookInstance.bookName}
                            disabled label={appStrings.book.NAME}
                            variant="outlined"
                        />
                        <Grid size={12} container alignItems={"center"} spacing={2}>
                            <Grid size={"grow"} container spacing={2}>
                                <DateRangeStart bookInstanceId={selectedBook.bookInstance.id as number}/>
                                <DateRangeEnd bookInstanceId={selectedBook.bookInstance.id as number}/>
                            </Grid>
                            <Grid size={3} container spacing={1}>
                                <GetTodayButton/>
                                <SelectAddDays/>
                                <ApplyRangefinderAllButton/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} size={6}>
                        <Grid width={"100%"} container spacing={1}>
                            <Typography color={"text.primary"} variant={"h4"} fontWeight={"bold"} sx={{color: color.DARK_TEXT}}>
                                {appStrings.borrow.BOOK_DAMAGE_BEFORE_BORROW}
                            </Typography>
                            <BorrowNote bookInstanceId={selectedBook.bookInstance.id as number}/>
                            <Typography color={"text.primary"} variant={"h5"}>
                                {appStrings.borrow.BOOK_IMAGE_BEFORE_BORROW}
                            </Typography>
                            <Grid size={12} container>
                                <ImageSelected selectedBookId={selectedBook.bookInstance.id as number}/>
                                <ImagesPreview selectedBookId={selectedBook.bookInstance.id as number}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </> :
                <Typography color={"primary"} variant={"h4"} sx={{color: color.PRIMARY, fontWeight: "bold"}}>
                    {appStrings.borrow.NO_BOOK_SELECTED}
                </Typography>
            }
            {selectedBook?.id && <Grid justifySelf={"end"}><AddSingleBookBorrowing/></Grid>}
        </Grid>
    );
});

const options = [
    {label: "7 ngày", value: 7},
    {label: "14 ngày", value: 14},
    {label: "21 ngày", value: 21},
];

const SelectAddDays = memo(() => {
    const [value, setValue] = React.useState("");
    const start = useSelector((state: RootState) => selectCurrentBookBorrowed(state)?.borrowDateRange.start);
    const selectedBook = useSelector((state: RootState) => selectCurrentBookBorrowed(state), shallowEqual);
    const dispatch = useAppDispatch();

    const handleChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        setValue(selectedValue);
        const daysToAdd = parseInt(selectedValue);
        const newDate = dayjs(start).add(daysToAdd, "day");
        if (selectedBook?.bookInstance?.id) {
            dispatch(
                setPropToBorrowedBook({
                    idBorrowedBookOrBookInstance: selectedBook.bookInstance.id,
                    key: "borrowDateRange.end",
                    value: newDate.toISOString(),
                }),
            )
        }

    };

    return (
        <>
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                fullWidth
                size="small"
                sx={{borderRadius: 12, p: 0}}
            >
                <MenuItem disabled value="">
                    Chọn số ngày mượn
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value.toString()}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
})
const GetTodayButton = memo(() => {
    const selectedBook = useSelector((state: RootState) => selectCurrentBookBorrowed(state), shallowEqual);
    const dispatch = useAppDispatch();

    function onGetToday() {
        if (selectedBook?.bookInstance?.id)
            dispatch(
                setPropToBorrowedBook({
                    idBorrowedBookOrBookInstance: selectedBook.bookInstance.id,
                    key: "borrowDateRange.start",
                    value: dayjs().toISOString(),
                }),
            );
    }

    return (
        <NeumorphicButton
            fullWidth
            sx={{borderColor: color.FOUR, color: color.FOUR, borderRadius: 12, height: "fit-content"}}
            variant={"outlined"}
            onClick={onGetToday}
        >{appStrings.GET_NOW}</NeumorphicButton>
    );
});

const ApplyRangefinderAllButton = memo(() => {
    const loan = useSelector((state: RootState) => state.addEditBorrowData);
    const selectedBook = useSelector((state: RootState) => selectCurrentBookBorrowed(state), shallowEqual);
    const [applyDateForAll, {isLoading}] = useModifyAllBookBorrowingMutation();
    const dispatch = useAppDispatch();

    async function onApplyForAll() {
        if (selectedBook?.borrowDateRange) {
            if (loan.id) {
                const response = await applyDateForAll({
                    loanId: loan.id, bookBorrowings: loan.borrowedBooks.map(b => ({
                        bookBorrowingId: b.id as number,
                        borrowedDate: selectedBook.borrowDateRange.start as string,
                        returnDate: selectedBook.borrowDateRange.end as string,
                    }))
                })
                if (response.data) {
                    dispatch(applyDateRangeForAll(selectedBook.borrowDateRange));
                    appToaster.success(response.data.message)
                } else if (response.error) {
                    appToaster.error(parsErrorToBaseResponse(response.error)?.message)
                }
            }
            if (!loan.id) {
                dispatch(applyDateRangeForAll(selectedBook.borrowDateRange));
                appToaster.success(appStrings.APPLY_SUCCESS);
            }
        } else {
            if (!loan.id)
                appToaster.error(appStrings.error.APPLY_FAIL);
        }
    }

    return (
        <Grid container size={12}>
            <Grid size={"grow"}>
                <NeumorphicButton
                    loading={isLoading}
                    sx={{borderColor: color.FOUR, color: color.FOUR}}
                    variant={"outlined"}
                    onClick={onApplyForAll}
                >{appStrings.APPLY_FOR_ALL}</NeumorphicButton>
            </Grid>

            <Helper title={
                <Grid container>
                    <Typography color={"text.primary"}>{appStrings.guide.APPLY_FOR_ALL_DATE_RANGE}</Typography>
                    <Typography
                        color={"warning"}
                        sx={{color: color.WARNING}}>{appStrings.guide.ONLY_APPLY_FOR_ALL_DATE_RANGE}</Typography>
                </Grid>}/>
        </Grid>

    );
});

function AddEditBorrowForm() {
    // const store = useAppStore();
    // const getSelectedBook = useCallback(() => {
    //     return selectCurrentBookBorrowed(store.getState());
    // }, [store]);
    const selectedBook = useSelector((state: RootState) => selectCurrentBookBorrowed(state), shallowEqual);
    const dispatch = useAppDispatch();
    // const oldSelectedBook = useRef<BorrowedBookData | null>(null);
    // const firstRender = useRef<boolean>(true);
    // useEffect(() => {
    //     if (selectedBook && firstRender.current) {
    //         oldSelectedBook.current = selectedBook ?? null;
    //         firstRender.current = false;
    //     }
    //     return () => {
    //         firstRender.current = true;
    //     }
    // }, [selectedBook]);
    return (
        <Grid>
            <BottomDrawer open={(selectedBook && true) as boolean} onClose={() => {
                // console.log(deepEqual(selectedBook, oldSelectedBook.current))
                // console.log(selectedBook)
                // console.log(oldSelectedBook.current)
                // if (oldSelectedBook.current && selectedBook && !deepEqual(selectedBook, oldSelectedBook.current)) {
                //     appToaster.warning("1234567", "top-center");
                // }
                dispatch(clearPropToBorrow("selectedBookId"))
            }}>
                <Form selectedBook={selectedBook}/>
            </BottomDrawer>
        </Grid>
    );
}

export default memo(AddEditBorrowForm);
