"use client";
import {appToaster} from "@/components/primary/toaster";
import appStrings from "@/helpers/appStrings";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useGetLoanByIdQuery} from "@/stores/slices/api/borrow.api.slice";
import {setPropToLoanState} from "@/stores/slices/borrow-state/loan.slice";
import {LinearProgress} from "@mui/material";
import React, {JSX, memo, useEffect} from "react";
import {BorrowedBookData, setPropToBorrow} from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import {BookInstance} from "@/helpers/appType";
import {useParams} from "next/navigation";

function ClientRender(): JSX.Element {
    const {code} = useParams();
    const {data, isFetching, error} = useGetLoanByIdQuery(Number.parseInt(code as string));
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data?.data) {
            dispatch(setPropToLoanState({key: "currentLoan", value: data.data}));
            if (data.data?.aprovalStatus === "pending" || data.data?.aprovalStatus === "approved") {
                const {
                    id,
                    note,
                    borrower,
                    bookBorrowings,
                } = data.data
                dispatch(setPropToBorrow({key: "id", value: id}));
                dispatch(setPropToBorrow({key: "note", value: note}));
                dispatch(setPropToBorrow({key: "borrower", value: borrower}));
                dispatch(setPropToBorrow({
                    key: "borrowedBooks",
                    value: bookBorrowings.map(b => ({
                        id: b.id, bookInstance: (b.bookInstance as BookInstance),
                        borrowingStatus: b.borrowingStatus,
                        beforeBorrow: {
                            note: b.noteBeforeBorrow,
                            status: "normal"
                        },
                        afterBorrow: {
                            note: b.noteAfterBorrow,
                            status: "normal"
                        },
                        borrowDateRange: {
                            start: b.borrowDate,
                            end: b.returnDates[0]
                        },
                    } as BorrowedBookData))
                }));

            }
        }
    }, [data?.data, dispatch]);
    useEffect(() => {
        if (error) {
            appToaster.error(appStrings.error.REQUEST_ERROR);
            throw new Error(appStrings.error.LOAN_NOT_FOUND);
        }
    }, [error]);

    if (isFetching)
        return (<LinearProgress/>);
    return <></>


}

export default memo(ClientRender);

