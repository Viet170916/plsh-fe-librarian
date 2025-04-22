"use client";
import BorrowTable from "@/components/borrow-page/BorrowTable";
import {appToaster} from "@/components/primary/toaster";
import appStrings from "@/helpers/appStrings";
import {useLazyGetLoansQuery} from "@/stores/slices/api/borrow.api.slice";
import {Box, LinearProgress, MenuItem, Select, Stack, Typography} from "@mui/material";
import React, {ChangeEvent, JSX, memo, useCallback, useEffect, useMemo, useRef} from "react";
import {debounce} from "@mui/material/utils";
import {QueryActionCreatorResult, QueryDefinition} from "@reduxjs/toolkit/query";
import {BaseQueryFn} from "@reduxjs/toolkit/query/react";
import {parsErrorToBaseResponse} from "@/helpers/error";
import AppPagination from "@/components/primary/Input/AppPagination";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useSelector} from "@/hooks/useSelector";
import {shallowEqual} from "react-redux";
import {clearPropInLoanState, setPropToLoanState} from "@/stores/slices/borrow-state/loan.slice";
import AppTextField from "@/components/primary/Input/TextField";
import BarcodeScanner from "@/components/primary/Input/BarcodeScanner";
import AppButton from "@/components/primary/Input/AppButton";
import {color} from "@/helpers/resources";

function BorrowRequest(): JSX.Element {
    const subscriptionRef = useRef<QueryActionCreatorResult<QueryDefinition<unknown, BaseQueryFn<unknown>, string, unknown>> | undefined>(undefined);
    const dispatch = useAppDispatch();
    const loansFilter = useSelector(state => state.loanState.loansFilter, shallowEqual);

    const [getLoans, {data, error, isFetching,}] = useLazyGetLoansQuery();
    useEffect(() => {
        // if (loansFilter) {
        // if (subscriptionRef.current) {
        //     subscriptionRef.current.abort();
        // }
        subscriptionRef.current = getLoans(loansFilter ?? {page: 1, limit: 10,});
        // }
    }, [getLoans, loansFilter]);
    useEffect(() => {
        const err = parsErrorToBaseResponse(error);
        if (err?.message) {
            appToaster.error(err.message);
        }
    }, [error]);
    return (
        <Stack sx={{width: "100%", borderRadius: 2}}>
            <Box sx={{flexGrow: 1}}>
                <Typography fontSize={35}>{appStrings.member.BORROW_REQUEST}</Typography>
            </Box>

            <Box sx={{flexGrow: 1}}>
                {isFetching && <LinearProgress/>}
                <BorrowTable items={data?.data ?? []}/>
                {/*{isFetching && <LinearProgress/>}*/}
            </Box>
            <AppPagination
                count={data?.pageCount} shape="rounded" size={"small"} page={data?.page ?? 1}
                onChange={async (_, newPage) => {
                    dispatch(setPropToLoanState({key: "loansFilter.page", value: newPage}));
                }}
            />
        </Stack>
    );
}


export const LoanFilter = memo(() => {
    const loansFilter = useSelector(state => state.loanState.loansFilter, shallowEqual);
    const dispatch = useAppDispatch();
    const debouncedSetInputChange = useMemo(
        () => debounce((value: string) => dispatch(setPropToLoanState({
            key: "loansFilter.keyword",
            value
        })), 300), [dispatch]);
    const onInputChange =
        useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            debouncedSetInputChange(e.currentTarget.value);
        }, [debouncedSetInputChange]);
    const onScanDone = useCallback((code?: string) => {
        dispatch(setPropToLoanState({
            key: "loansFilter.keyword",
            value: code?.trim(),
        }));
    }, [dispatch]);
    const onReset = useCallback(() => {
        dispatch(clearPropInLoanState("loansFilter"));
    }, [dispatch]);
    return (
        <Box sx={{display: "flex", gap: 2, p: .3}}>
            <BarcodeScanner onScanDone={onScanDone}/>
            <AppTextField
                value={loansFilter?.keyword ?? ""}
                sx={{borderRadius: 12}}
                label={appStrings.FILTER_KEYWORD}
                variant="outlined"
                size="small"
                onChange={onInputChange}
            />
            <Select
                sx={{
                    borderRadius: 12,
                    '& .MuiSelect-select': {
                        py: .3
                    },
                }}
                value={loansFilter?.approveStatus ?? ""}
                size={"small"}
                displayEmpty
                defaultValue=""
                onChange={(e) => dispatch(setPropToLoanState({
                    key: "loansFilter.approveStatus",
                    value: e.target.value
                }))}
            >
                <MenuItem value="">{appStrings.ALL}</MenuItem>
                <MenuItem value="pending">{appStrings.borrow.STATUS_PENDING}</MenuItem>
                <MenuItem value="approved">{appStrings.borrow.STATUS_APPROVED}</MenuItem>
                <MenuItem value="rejected">{appStrings.borrow.STATUS_REJECTED}</MenuItem>
                <MenuItem value="return-all">{appStrings.borrow.STATUS_RETURN_ALL}</MenuItem>
                <MenuItem value="cancel">{appStrings.CANCEL}</MenuItem>
                <MenuItem value="taken">{appStrings.borrow.STATUS_TAKEN}</MenuItem>

            </Select>
            <AppButton variant={"contained"} sx={{borderRadius: 12, color: color.LIGHT_TEXT}} onClick={(event) => {
                onReset();
                event.currentTarget.blur();
            }}>
                {appStrings.RESET}
            </AppButton>
        </Box>)
})

export default memo(BorrowRequest);

