import React from "react";
import Grid from "@mui/material/Grid2";
import RoomDashboard from "@/app/(private)/(in-dash-board)/resources/library-room/RoomDashboard";
import axios, {AxiosResponse} from "axios";
import {LibraryRoomState} from "@/stores/slices/lib-room-state/lib-room.slice";
import {apiGetLibraryRoom} from "@/request/library-room.api";


async function LibraryRoomPage() {
    let libraryRoom: LibraryRoomState | undefined = undefined;
    try {
        const libraryRoomRes: AxiosResponse<LibraryRoomState> = await apiGetLibraryRoom();
        libraryRoom = libraryRoomRes.data;
    } catch {
    }
    return (
        <Grid container spacing={2} width={"100%"} height={"100%"}>
            <Grid size={12} height={"100%"}>
                <RoomDashboard libraryRoom={libraryRoom}/>
            </Grid>
        </Grid>)
        ;
}

export default LibraryRoomPage;
