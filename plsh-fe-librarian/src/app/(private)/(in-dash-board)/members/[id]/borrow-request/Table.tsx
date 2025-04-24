"use client"
import React, {JSX, memo, useEffect, useRef} from "react";
import {useSelector} from "@/hooks/useSelector";
import {QueryActionCreatorResult, QueryDefinition} from "@reduxjs/toolkit/query";
import {BaseQueryFn} from "@reduxjs/toolkit/query/react";
import {shallowEqual} from "react-redux";
import {useLazyGetLoansQuery} from "@/stores/slices/api/borrow.api.slice";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {appToaster} from "@/components/primary/toaster";
import BorrowTable from "@/components/borrow-page/BorrowTable";


function Table(): JSX.Element {
    const memberId = useSelector((state) => state.memberState.currentMember?.id);
    const subscriptionRef = useRef<QueryActionCreatorResult<QueryDefinition<unknown, BaseQueryFn<unknown>, string, unknown>> | undefined>(undefined);
    const loansFilter = useSelector(state => state.loanState.loansFilter, shallowEqual);

    const [getLoans, {data, error, isFetching,}] = useLazyGetLoansQuery();
    useEffect(() => {
        if (memberId){
            subscriptionRef.current = getLoans(loansFilter ? {...loansFilter, userId: memberId} : {
                page: 1,
                limit: 10,
                userId: memberId
            });
        }
    }, [getLoans, loansFilter, memberId]);
    useEffect(() => {
        const err = parsErrorToBaseResponse(error);
        if (err?.message) {
            appToaster.error(err.message);
        }
    }, [error]);
    return (
        <BorrowTable items={data?.data ?? []}/>
    );
}

export default memo(Table);

