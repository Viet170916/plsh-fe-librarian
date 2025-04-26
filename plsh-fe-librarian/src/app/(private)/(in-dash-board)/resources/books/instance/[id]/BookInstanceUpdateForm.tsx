"use client"
import React, {JSX, memo} from "react";
import Grid from "@mui/material/Grid2";
import PositionSelection from "@/app/(private)/(in-dash-board)/resources/books/instance/[id]/PositionSelection";

type BookInstanceUpdateFormProps = {
    children?: React.ReactNode;
}

function BookInstanceUpdateForm({children}: BookInstanceUpdateFormProps): JSX.Element {
    return (
        <Grid container>
            <PositionSelection/>


        </Grid>
    );
}


export default memo(BookInstanceUpdateForm);

