import React, {memo} from "react";
import Container from "@/components/primary/Container";
import Grid from "@mui/material/Grid2";
import {Box, Chip, Link, Paper, Stack, Typography} from "@mui/material";
import BaseInfo from "@/components/book-page/view-only/overviewTabs/overview/BaseInfo";
import Sumary from "@/components/book-page/view-only/overviewTabs/overview/Sumary";
import About from "@/components/book-page/view-only/overviewTabs/overview/About";
import Feedback from "@/components/book-page/view-only/overviewTabs/overview/Feedback";

interface IProps {
    children?: React.ReactNode;
}


function Overview(props: IProps) {
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <BaseInfo/>
            </Grid>
            <Grid size={12}>
                <Sumary/>
            </Grid>
            <Grid size={6}>
                <About/>
            </Grid>
            <Grid size={6}>
                <Feedback/>
            </Grid>


        </Grid>
    );
}

export default memo(Overview);


