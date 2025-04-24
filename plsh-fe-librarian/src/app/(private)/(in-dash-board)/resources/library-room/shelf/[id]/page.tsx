import Grid from "@mui/material/Grid2";
import React from "react";
import Client from "@/app/(private)/(in-dash-board)/resources/library-room/shelf/[id]/Client";


async function ShelfPage() {
    return (
        <Grid container direction="column" spacing={2} width="100%" padding={5}>
            <Client/>
        </Grid>);
}

export default ShelfPage;
