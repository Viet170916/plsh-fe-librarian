"use client"
import React, {JSX, memo, useEffect} from "react";
import {useLazyGetBookInstancesQuery} from "@/stores/slices/api/book.api.slice";
import {useSelector} from "@/hooks/useSelector";
import Grid from "@mui/material/Grid2";
import BookInstanceTable from "@/app/(private)/(in-dash-board)/resources/books/[id]/(read-only)/instances/Table";
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";

function ClientRender(): JSX.Element {
    const bookId = useSelector(state => state.bookState.currentBook?.id);
    const [getInstances, {data, error, isFetching}] = useLazyGetBookInstancesQuery();
    useEffect(() => {
        if (bookId) {
            getInstances({bookId});
        }
    }, [bookId, getInstances]);
    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);
    return (
        <Grid width={"100%"}>
            <BookInstanceTable bookInstances={data?.data} isFetching={isFetching}/>
        </Grid>
    );
}

export default memo(ClientRender);

