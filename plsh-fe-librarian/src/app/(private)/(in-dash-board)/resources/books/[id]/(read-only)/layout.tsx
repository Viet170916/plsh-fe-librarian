"use client"
import React, {JSX, memo} from "react";
import Grid from "@mui/material/Grid2";
import {TabBar} from "@/components/primary/navigation/TabBar";
import ClientRender from "@/app/(private)/(in-dash-board)/resources/books/[id]/(read-only)/ClientRender";
import BookImage from "@/app/(private)/(in-dash-board)/resources/books/[id]/(read-only)/BookImage";
import BookDetails from "@/app/(private)/(in-dash-board)/resources/books/[id]/(read-only)/BookDetailInformation";
import BookAuthors from "@/app/(private)/(in-dash-board)/resources/books/[id]/(read-only)/BookAuthor";
import BookTab from "@/app/(private)/(in-dash-board)/resources/books/[id]/(read-only)/BookTab";

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
                <Grid direction="row" container spacing={2} width={"100%"} sx={{p: 2}}>
                    <ClientRender/>
                    <Grid>
                        <BookImage/>
                    </Grid>
                    <Grid size={{xl: "grow", lg: "grow", md: "grow", sm: 8, xs: 8}}>
                        <BookDetails/>
                    </Grid>
                    <Grid size={{xl: 4, lg: 4, md: 4, sm: 12}}><BookAuthors/></Grid>
                    <Grid size={12} sx={{mb: 2}}>
                        <BookTab/>
                    </Grid>
                    <Grid size={12}>
                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default memo(layout);

