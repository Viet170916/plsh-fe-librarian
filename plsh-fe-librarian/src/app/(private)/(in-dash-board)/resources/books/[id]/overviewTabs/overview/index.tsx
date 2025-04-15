"use client";
import About, {AboutSkeleton,} from "@/app/(private)/(in-dash-board)/resources/books/[id]/overviewTabs/overview/About";
import BaseInfo, {
    BaseInfoSkeleton,
} from "@/app/(private)/(in-dash-board)/resources/books/[id]/overviewTabs/overview/BaseInfo";
import Feedback from "@/app/(private)/(in-dash-board)/resources/books/[id]/overviewTabs/overview/Feedback";
import Summary, {
    SummarySkeleton,
} from "@/app/(private)/(in-dash-board)/resources/books/[id]/overviewTabs/overview/Sumary";
import {useSelector} from "@/hooks/useSelector";
import Grid from "@mui/material/Grid2";
import React, {memo} from "react";

function Overview() {
    const book = useSelector((state) => state.bookState.currentBook);
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                {book ? <BaseInfo book={book}/> : <BaseInfoSkeleton/>}
            </Grid>
            <Grid size={12}>
                {book ? <Summary book={book}/> : <SummarySkeleton/>}
            </Grid>
            <Grid size={6}>{book ? <About book={book}/> : <AboutSkeleton/>}</Grid>
            <Grid size={6}>
                <Feedback/>
            </Grid>
        </Grid>
    );
}

export default memo(Overview);
