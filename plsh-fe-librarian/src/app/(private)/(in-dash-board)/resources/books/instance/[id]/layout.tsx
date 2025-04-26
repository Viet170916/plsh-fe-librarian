"use client"
import React, {JSX, memo} from "react";
import Grid from "@mui/material/Grid2";
import {TabBar} from "@/components/primary/navigation/TabBar";
import ClientRender from "@/app/(private)/(in-dash-board)/resources/books/instance/[id]/ClientRender";
import BookInstanceTabs from "@/app/(private)/(in-dash-board)/resources/books/instance/[id]/BookInstanceTabs";
import BaseDisplay from "@/app/(private)/(in-dash-board)/resources/books/instance/[id]/BaseDisplay";
import BookInstanceBreadcrumbs
    from "@/app/(private)/(in-dash-board)/resources/books/instance/[id]/BookInstanceBreadcrumbs";

type layoutProps = {
    children?: React.ReactNode;
}

function layout({children}: layoutProps): JSX.Element {
    return (
        <>
            <ClientRender/>
            <Grid container width={"100%"} height={"100%"} direction={"column"}>
                <Grid width={"100%"}>
                    <TabBar/>
                </Grid>
                <Grid sx={{ml: 2}}>
                    <BookInstanceBreadcrumbs/>
                </Grid>
                <Grid width={"100%"} sx={{px: 2}}>
                    <BaseDisplay/>
                </Grid>
                <Grid width={"100%"} sx={{my: 1, px: 2}}>
                    <BookInstanceTabs/>
                </Grid>
                <Grid size={"grow"} width={"100%"} sx={{px: 2, pb: 2, overflowY: "auto"}}>
                    {children}
                </Grid>
            </Grid>
        </>

    );
}

export default memo(layout);

