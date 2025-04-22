import React from "react";
import BookDisplay from "@/app/(private)/(in-dash-board)/resources/books/(page)/BookDisplay";
import Grid from "@mui/material/Grid2";

function BookPage() {
    return (
        <Grid sx={{p: 2}}>
            <BookDisplay/>
        </Grid>
    );
}

export default BookPage;
