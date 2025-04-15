"use client";
import {FilterParams} from "@/app/(private)/(in-dash-board)/members/ClientRender";
import BorrowTable from "@/components/borrow-page/BorrowTable";
import {appToaster} from "@/components/primary/toaster";
import appStrings from "@/helpers/appStrings";
import {LoanDto, LoanStatus} from "@/helpers/dataTransfer";
import {useLazyGetLoansQuery} from "@/stores/slices/api/borrow.api.slice";
import {Box, LinearProgress, MenuItem, Pagination, Select, Stack, TextField, Typography} from "@mui/material";
import React, {ChangeEvent, JSX, memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {debounce} from "@mui/material/utils";
import {QueryActionCreatorResult, QueryDefinition} from "@reduxjs/toolkit/query";
import {BaseQueryFn} from "@reduxjs/toolkit/query/react";
import {parsErrorToBaseResponse} from "@/helpers/error";

function BorrowRequest(): JSX.Element {
    const subscriptionRef = useRef<QueryActionCreatorResult<QueryDefinition<unknown, BaseQueryFn<unknown>, string, unknown>> | undefined>(undefined);
    const [filter, setFilter] = useState<FilterParams<LoanDto> & { approveStatus: LoanStatus }>({
        keyword: "",
        approveStatus: "pending",
        limit: 10,
        page: 1,
    });
    const [getLoans, {data, error, isFetching,}] = useLazyGetLoansQuery();
    useEffect(() => {
        if (filter) {
            if (subscriptionRef.current) {
                subscriptionRef.current.abort();
            }
            subscriptionRef.current = getLoans(filter);
        }
    }, [getLoans, filter]);
    const handleFilterChange = (field: keyof (FilterParams<LoanDto> & {
        approveStatus: LoanStatus
    }), value: string) => {
        setFilter(prevState => ({...prevState, [field]: value}));
    };
    useEffect(() => {
        const err = parsErrorToBaseResponse(error);
        if (err?.message) {
            appToaster.error(err.message);
        }
    }, [error]);
    const debouncedSetInputChange = useMemo(
        () => debounce((value: string) => setFilter(prevState => ({...prevState, keyword: value})), 300), []);
    const onInputChange =
        useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            debouncedSetInputChange(e.currentTarget.value);
        }, [debouncedSetInputChange]);
    return (
        <Stack sx={{width: "100%", borderRadius: 2}}>
            <Box sx={{flexGrow: 1}}>
                <Typography fontSize={35}>{appStrings.member.BORROW_REQUEST}</Typography>
            </Box>
            <Box sx={{display: "flex", gap: 2, mb: 2}}>
                <TextField
                    label={appStrings.FILTER_KEYWORD}
                    variant="outlined"
                    size="small"
                    onChange={onInputChange}
                />
                <Select
                    size={"small"}
                    displayEmpty
                    defaultValue="pending"
                    onChange={(e) => handleFilterChange("approveStatus", e.target.value)}
                >
                    <MenuItem value="">{appStrings.ALL}</MenuItem>
                    <MenuItem value="pending">{appStrings.borrow.STATUS_PENDING}</MenuItem>
                    <MenuItem value="approved">{appStrings.borrow.STATUS_APPROVED}</MenuItem>
                    <MenuItem value="rejected">{appStrings.borrow.STATUS_REJECTED}</MenuItem>
                </Select>
            </Box>
            <Box sx={{flexGrow: 1}}>
                {isFetching && <LinearProgress/>}
                <BorrowTable items={data?.data ?? []}/>
                {/*{isFetching && <LinearProgress/>}*/}
            </Box>
            <Pagination
                count={data?.pageCount} shape="rounded" size={"small"} page={data?.page ?? 1}
                onChange={async (_, newPage) => {
                    setFilter(prevState => ({...prevState, page: newPage}));
                    // await getLoans(filter);
                }}
            />
        </Stack>
    );
}

export default memo(BorrowRequest);

