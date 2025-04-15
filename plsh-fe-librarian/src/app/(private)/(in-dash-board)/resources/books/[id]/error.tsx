"use client";
import NotFound from "@/components/primary/NotFound";
import {color} from "@/helpers/resources";
import Grid from "@mui/material/Grid2";
import React, {JSX} from "react";

type ErrorProps = {
    error: Error;
    reset: () => void;
};

function Error({error, reset}: ErrorProps): JSX.Element {
    return (
        <Grid height={"100%"} bgcolor={color.WHITE}>
            <NotFound reset={reset} message={error.message}/>
        </Grid>
    );
}

export default Error;
