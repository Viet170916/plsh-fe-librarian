import React from "react";
import BookDisplay from "@/app/(private)/(in-dash-board)/resources/books/(page)/BookDisplay";
import Grid from "@mui/material/Grid2";
import WithClientOnly from "@/components/primary/WithClientOnly";
import {BookAnalyticContainer} from "@/app/(private)/(in-dash-board)/resources/books/(page)/BookAnalytic";

async function BookPage() {
    return (
        <WithClientOnly>
            <Grid sx={{p: 2}}>
                <BookAnalyticContainer/>
                <BookDisplay/>
            </Grid>
        </WithClientOnly>
    );
}

export default BookPage;
