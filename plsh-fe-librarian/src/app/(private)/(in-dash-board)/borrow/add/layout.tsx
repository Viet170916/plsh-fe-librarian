"use client";
import BorrowStepper from "@/app/(private)/(in-dash-board)/borrow/add/BorrowStepper";
import {color} from "@/helpers/resources";
import Grid from "@mui/material/Grid2";
import React, {JSX, memo} from "react";

type layoutProps = {
    children?: React.ReactNode;
}

function BorrowLayout({children}: layoutProps): JSX.Element {
    return (
        <Grid container width={"100%"} minHeight={"100%"} height={"100%"} direction={"column"}>
            <Grid container size={"grow"} width={"100%"} sx={{overflowX: "auto"}}>
                {children}
            </Grid>
            <Grid sx={{bg: color.WHITE}}>
                <BorrowStepper/>
            </Grid>
        </Grid>
    );
}

export default memo(BorrowLayout);

