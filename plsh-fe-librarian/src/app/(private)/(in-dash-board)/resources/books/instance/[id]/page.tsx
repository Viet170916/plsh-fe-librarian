"use client"
import React, {JSX, memo} from "react";
import Grid from "@mui/material/Grid2";
import BookInstanceUpdateForm
    from "@/app/(private)/(in-dash-board)/resources/books/instance/[id]/BookInstanceUpdateForm";

function page(): JSX.Element {
    return (
        <Grid container width={"100%"} sx={{mt: 3}}>
            <Grid size={12}>
                <BookInstanceUpdateForm/>
            </Grid>
        </Grid>
    );
}

export default memo(page);

