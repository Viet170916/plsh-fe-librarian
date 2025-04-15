"use client";
import {useLazyGetMyAccountQuery} from "@/app/(public)/auth/store/account.api.slice";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setPropToGlobal} from "@/stores/slices/global.slice";
import React, {JSX, memo, useEffect} from "react";

function AppProvider(): JSX.Element {
    const dispatch = useAppDispatch();
    const [getMyAccount, {data: me}] = useLazyGetMyAccountQuery();
    useEffect(() => {
        getMyAccount();
    }, [getMyAccount]);
    useEffect(() => {
        if (me?.data) {
            dispatch(setPropToGlobal({key: "me", value: me.data}));
        }
    }, [dispatch, me?.data]);
    return <></>;
}

export default memo(AppProvider);
