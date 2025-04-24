"use client"
import React, {JSX, memo, useEffect} from "react";
import {useParams} from "next/navigation";
import {useGetShelfQuery} from "@/stores/slices/api/library-room.api.slice";
import ShelfContext from "@/app/(private)/(in-dash-board)/resources/library-room/shelf/ShelfContext";
import {LinearProgress} from "@mui/material";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {appToaster} from "@/components/primary/toaster";

function Client(): JSX.Element {
    const {id} = useParams();
    const {data, error, isFetching} = useGetShelfQuery(Number.parseInt(id as string));
    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);

    return (
        <>
            {isFetching && <LinearProgress/>}
            <ShelfContext data={data}/>

        </>
    );
}

export default memo(Client);

