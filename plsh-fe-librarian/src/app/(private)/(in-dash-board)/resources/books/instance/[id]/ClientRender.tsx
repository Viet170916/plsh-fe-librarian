"use client"
import React, {JSX, memo, useEffect} from "react";
import {useParams} from "next/navigation";
import {useGetBookInstanceQuery} from "@/stores/slices/api/book.api.slice";
import {LinearProgress} from "@mui/material";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setPropToBookInstanceState} from "@/stores/slices/book-states/book-instance.book.slice";
import {parsErrorToBaseResponse} from "@/helpers/error";


function ClientRender(): JSX.Element {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const {data, isFetching, error} = useGetBookInstanceQuery(id as string);
    useEffect(() => {
        if (data) {
            dispatch(setPropToBookInstanceState({key: "currentBookInstance", value: data.data}));
        }
    }, [data, dispatch]);
    useEffect(() => {
        if (error) {
            throw new Error(parsErrorToBaseResponse(error)?.message)
        }
    }, [error]);
    return (
        <>
            {isFetching && <LinearProgress/>}
        </>
    );
}

export default memo(ClientRender);

