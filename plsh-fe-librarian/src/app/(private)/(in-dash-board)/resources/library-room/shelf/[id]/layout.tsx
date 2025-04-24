"use client"
import React, {JSX, memo} from "react";
import {TabBar} from "@/components/primary/navigation/TabBar";
import Grid from "@mui/material/Grid2";
import ShelfTabs from "@/app/(private)/(in-dash-board)/resources/library-room/shelf/[id]/ShelfTabs";

type layoutProps = {
    children?: React.ReactNode;
}

function layout({children}: layoutProps): JSX.Element {

    return (
        <Grid container width={"100%"} height={"100%"} direction={"column"}>
            <Grid>
                <ShelfTabs/>

            </Grid>
            <Grid size={"grow"}>
                {children}
            </Grid>
        </Grid>
    );
}

export default memo(layout);

