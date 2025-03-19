"use client"
import React, {memo, useCallback, useEffect} from "react";
import Container from "@/components/primary/Container";
import Grid from "@mui/material/Grid2";
import {Box, Button, Chip, Link, Paper, Stack, Typography} from "@mui/material";
import BaseInfo from "@/components/book-page/view-only/overviewTabs/overview/BaseInfo";
import Sumary from "@/components/book-page/view-only/overviewTabs/overview/Sumary";
import About from "@/components/book-page/view-only/overviewTabs/overview/About";
import Feedback from "@/components/book-page/view-only/overviewTabs/overview/Feedback";
import Add_EditBaseInfo
    from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add-edit-overview/Add_EditBaseInfo";
import Add_EditSummary
    from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add-edit-overview/Add_EditSummary";
import Add_EditBookDetails
    from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookDetailInformation";
import Add_EditFeedback
    from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add-edit-overview/Add_EditFeedback";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {BookOverview, setAddEditBookData, setBookOverview} from "@/stores/slices/book-states/book.add-edit.slice";
import Add_EditAbout
    from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add-edit-overview/Add_EditAbout";
import {toast} from "sonner";
import appStrings from "@/helpers/appStrings";
import Add_EditAbout_Page2
    from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add-edit-overview/Add_EditAbout_Page2";

interface IProps {
    children?: React.ReactNode;
}


function Overview(props: IProps) {

    return (
    <Grid container spacing={2}>
        <Grid size={12}>
            <Add_EditBaseInfo/>
        </Grid>
        <Grid size={12}>
            <Add_EditSummary/>
        </Grid>
        <Grid size={6}>
            <Add_EditAbout/>
        </Grid>
        <Grid size={6}>
            <Add_EditAbout_Page2/>
        </Grid>
    </Grid>
)
    ;
}

export default memo(Overview);


