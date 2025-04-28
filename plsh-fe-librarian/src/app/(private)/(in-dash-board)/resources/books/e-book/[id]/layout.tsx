"use client"
import React, {JSX, memo} from "react";
import Grid from "@mui/material/Grid2";
import Navigation from "@/app/(private)/(in-dash-board)/resources/books/e-book/[id]/Navigation";
import EbookSettings from "@/app/(private)/(in-dash-board)/resources/books/e-book/[id]/Settings";
import Overview from "@/app/(private)/(in-dash-board)/resources/books/e-book/[id]/Overview";

type layoutProps = {
    children?: React.ReactNode;
}

function layout({children}: layoutProps): JSX.Element {
    return (
        <Grid container direction={"column"} width={"100%"} position={"relative"}>
            <Grid width={"100%"}>
                <EbookSettings/>
            </Grid>
            <Grid size={"grow"} width={"100%"} sx={{position: "relative"}}>
                {children}

            </Grid>
            <Grid width={"100%"}><Overview/></Grid>
            <Grid width={"100%"}>
                <Navigation/>
            </Grid>
        </Grid>
    );
}

// <Grid size={"grow"} sx={{overflowY: "auto"}} width={"20%"}>
//     <Grid>
//         <Overview/>
//     </Grid>
// </Grid>
export default memo(layout);

