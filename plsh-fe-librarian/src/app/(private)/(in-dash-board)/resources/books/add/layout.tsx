"use client"
import React, {JSX, memo} from "react";
import Grid from "@mui/material/Grid2";
import {TabBar} from "@/components/primary/navigation/TabBar";
import BarcodeHelper from "@/components/primary/Input/BarcodeHelper";

type layoutProps = {
    children?: React.ReactNode;
}

function layout({children}: layoutProps): JSX.Element {
    return (
        <Grid container direction={"column"} width={"100%"}>
            <Grid>
                <TabBar left={<Grid container><BarcodeHelper/></Grid>}/>
            </Grid>
            <Grid size={"grow"} sx={{overflowY: "auto"}}>
                {children}
            </Grid>
        </Grid>
    );
}

export default memo(layout);

