"use client"
import React, {JSX, memo} from "react";
import Grid from "@mui/material/Grid2";
import {TabBar} from "@/components/primary/navigation/TabBar";

type layoutProps = {
    children?: React.ReactNode;
}

function layout({children}: layoutProps): JSX.Element {

    return (
        <Grid container direction={"column"} width={"100%"}>
            <Grid>
                <TabBar/>
            </Grid>
            <Grid size={"grow"} sx={{overflowY: "auto"}}>
                {children}
            </Grid>
        </Grid>
    );
}

export default memo(layout);

