"use client";
import ClientRender from "@/app/(private)/(in-dash-board)/resources/books/[id]/overviewTabs/review/ClientRender";
import {ReviewBox} from "@/app/(private)/(in-dash-board)/resources/books/[id]/overviewTabs/review/review.input";
import ReviewContainer from "@/app/(private)/(in-dash-board)/resources/books/[id]/overviewTabs/review/ReviewContainer";
import {useSelector} from "@/hooks/useSelector";
import Grid from "@mui/material/Grid2";
import React, {JSX, memo} from "react";

function Index(): JSX.Element {
    const isAccountHasReviewForThisBook = useSelector(
        (state) => state.bookState.isAccountHasReviewForThisBook,
    );
    return (
        <Grid width={"100%"} container spacing={2}>
            <ClientRender/>
            <Grid size={12}>{!isAccountHasReviewForThisBook && <ReviewBox/>}</Grid>
            <Grid size={11}>
                <ReviewContainer/>
            </Grid>
        </Grid>
    );
}

export default memo(Index);
