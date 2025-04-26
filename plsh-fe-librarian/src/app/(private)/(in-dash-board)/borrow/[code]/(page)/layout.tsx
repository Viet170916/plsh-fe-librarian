"use client"
import React, {JSX, memo} from "react";
import Grid from "@mui/material/Grid2";
import BorrowCodeBreadcrumbs from "@/app/(private)/(in-dash-board)/borrow/[code]/(page)/breadcrumbs";
import {TabBar} from "@/components/primary/navigation/TabBar";

type layoutProps = {
    children?: React.ReactNode;
}

function layout({children}: layoutProps): JSX.Element {
    return (
        <Grid container width={"100%"} height={"100%"} direction={"column"}>
            <Grid width={"100%"}>
                <TabBar/>
            </Grid>
            <Grid sx={{ml: 2, pb: 1}}>
                <BorrowCodeBreadcrumbs/>
            </Grid>
            <Grid size={"grow"} sx={{overflowY: "auto"}}>
                {children}
            </Grid>
        </Grid>
    );
}

export default memo(layout);

