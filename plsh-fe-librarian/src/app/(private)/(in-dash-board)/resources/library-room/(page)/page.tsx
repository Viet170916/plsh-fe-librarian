import React from "react";
import Grid from "@mui/material/Grid2";
import {AxiosResponse} from "axios";
import {LibraryRoomState} from "@/stores/slices/lib-room-state/lib-room.slice";
import {apiGetLibraryRoom} from "@/request/library-room.api";
import ReadingRoomMenu, {GridRoom, PropsItem} from "@/app/(private)/(in-dash-board)/resources/library-room/(page)/room";
import RoomMap from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";
import HandleFetch from "@/app/(private)/(in-dash-board)/resources/library-room/(page)/handle-fetch";
import BottomMenu from "@/components/Animation/BottomMenu";


async function LibraryRoomPage() {
    let libraryRoom: LibraryRoomState | undefined = undefined;
    try {
        const libraryRoomRes: AxiosResponse<LibraryRoomState> = await apiGetLibraryRoom();
        libraryRoom = libraryRoomRes.data;
    } catch {
    }
    return (
        <Grid container spacing={2} width={"100%"} height={"100%"} direction={"column"}
              sx={{position: "relative", overflow: "hidden"}}>
            <HandleFetch/>
            <BottomMenu>
                <Grid container spacing={2} sx={{overflowY: "auto"}} height={"100%"}>
                    <Grid size={12} container>
                        <ReadingRoomMenu/>
                    </Grid>
                    <Grid size={12} sx={{px: 2, pb: 2}}>
                        <PropsItem/>
                    </Grid>
                </Grid>
            </BottomMenu>
            <RoomMap>
                <GridRoom/>
            </RoomMap>
        </Grid>)
        ;
}

export default LibraryRoomPage;
