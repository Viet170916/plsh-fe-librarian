"use client";
import {useGetMemberQuery} from "@/stores/slices/api/member.api.slice";
import {clearPropToMemberState, setStateToMemberState} from "@/stores/slices/member-states/member.slice";
import {useAppDispatch} from "@/hooks/useDispatch";
import {skipToken} from "@reduxjs/toolkit/query";
import React, {JSX, memo, useEffect} from "react";
import {useParams} from "next/navigation";

function SaveToStore(): JSX.Element {
    const {id} = useParams() as { id?: number };
    const dispatch = useAppDispatch();
    const {data, error} = useGetMemberQuery(id ? {id: id} : skipToken);
    useEffect(() => {
        if (data?.data) {
            dispatch(setStateToMemberState({key: "currentMember", value: data.data}));
        }
        return () => {
            dispatch(clearPropToMemberState("currentMember"));
        };
    }, [data, dispatch]);
    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);
    return (
        <>
        </>
    );
}

export default memo(SaveToStore);

