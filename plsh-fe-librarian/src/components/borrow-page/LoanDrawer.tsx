"use client";
import appStrings from "@/helpers/appStrings";
import {constants} from "@/helpers/constants";
import {LoanStatus} from "@/helpers/dataTransfer";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setPropToLoanState} from "@/stores/slices/borrow-state/loan.slice";
import {RootState} from "@/stores/store";
import {Button, Drawer, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import React, {memo} from "react";
import {shallowEqual, useSelector} from "react-redux";
import ChangeStatusButton from "@/app/(private)/(in-dash-board)/borrow/[code]/ChangeStatusButton";
import Link from "next/link";
import AppButton from "@/components/primary/Input/AppButton";

const LoanDrawer = () => {
    const dispatch = useAppDispatch();
    const loan = useSelector((state: RootState) => state.loanState.currentLoan, shallowEqual);

    function onClose() {
        dispatch(setPropToLoanState({key: "currentLoan", value: undefined}));
    }

    return (
        <Grid>
            <Drawer anchor="right" open={(loan && true)} onClose={onClose}>
                <Stack spacing={2} padding={2} width={400}>
                    <Typography variant="h6">{appStrings.borrow.INFO}</Typography>
                    <Typography>ID: {loan?.id}</Typography>
                    <Typography>{appStrings.NOTE}: {loan?.note}</Typography>
                    <Typography>{appStrings.borrow.BORROWER}: {loan?.borrower?.fullName || "N/A"}</Typography>
                    <Typography>{appStrings.borrow.BORROW_DATE}: {dayjs(loan?.borrowingDate).format(constants.dateFormat)}</Typography>
                    <Typography>{appStrings.STATUS}: {getLoanStatusText(loan?.aprovalStatus)}</Typography>
                    <Typography>
                        Số lần gia hạn: {loan?.extensionCount}
                    </Typography>
                    {loan?.isReturnAll ? null : (
                        <Stack spacing={1}>
                            <ChangeStatusButton/>
                        </Stack>
                    )}
                    <Link href={`/borrow/${loan?.id}`}>
                        <AppButton fullWidth variant={"outlined"}>
                            {appStrings.SEE_DETAIL}
                        </AppButton>
                    </Link>
                </Stack>
            </Drawer>
        </Grid>
    );
};
const getLoanStatusText = (status?: LoanStatus) => {
    switch (status) {
        case "pending":
            return appStrings.borrow.STATUS_PENDING;
        case "approved":
            return appStrings.borrow.APPROVE;
        case "rejected":
            return appStrings.borrow.STATUS_REJECTED;
        default:
            return "Không xác định";
    }
};
export default memo(LoanDrawer);
