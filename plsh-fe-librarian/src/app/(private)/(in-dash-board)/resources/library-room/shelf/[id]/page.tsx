import React from "react";
import Grid from "@mui/material/Grid2";
import ShelfContext from "@/app/(private)/(in-dash-board)/resources/library-room/shelf/ShelfContext";
import {initShelfState, ShelfState} from "@/stores/slices/lib-room-state/shelf.slice";
import axios, {AxiosResponse} from "axios";
import {apiGetShelf} from "@/request/library-room.api";

interface IProps {
    params: Promise<{
        id: number;
    }>

}

async function ShelfPage(props: IProps) {
    const params = await props.params;
    let shelf: ShelfState | undefined = undefined;
    try {
        const response: AxiosResponse<ShelfState> = await apiGetShelf({id: params.id});
        shelf = response.data;
    } catch {
    }
    return (
        <Grid container direction="column" spacing={2} width="100%" padding={5}>
            <ShelfContext data={shelf}/>
        </Grid>);
}

export default ShelfPage;