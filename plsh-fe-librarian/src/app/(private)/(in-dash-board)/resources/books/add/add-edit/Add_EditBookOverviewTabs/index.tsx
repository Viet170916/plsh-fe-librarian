"use client"
import React, {memo} from "react";


import {Box, Chip, Link, Paper, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import WithClientOnly from "@/components/primary/WithClientOnly";
import TabBar from "@/components/primary/TabBar";
import {TabItem} from "@/helpers/appType";
import Overview from "@/components/book-page/view-only/overviewTabs/overview";
import appStrings from "@/helpers/appStrings";

interface IProps {
    children?: React.ReactNode;
}

const mockBook = {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    publishDate: "1999-10-20",
    publisher: "Addison-Wesley",
    language: "English",
    pages: 352,
    description:
        "One of the most influential books in software development, providing insights and best practices for programmers to improve their craft.",
};
const BookOverviewTabs = (props: IProps) => {

    const tabs: TabItem[] = [
        {
            kind: "normal",
            title: appStrings.book.OVERVIEW,
            content: <Overview/>,
        },
        // {
        //     kind: "normal",
        //     title: appStrings.book.EDITION,
        //     content: <Typography variant="body2">View 166 Editions content goes here.</Typography>,
        // },
        {
            kind: "normal",
            title: appStrings.book.DETAIL,
            content:
                <Typography variant="body2">Details content goes here.</Typography>
            ,
        },
        // {
        //     kind: "normal",
        //     title: appStrings.book.REVIEW,
        //     content:
        //         <Typography variant="body2">4.1k Reviews content goes here.</Typography>
        //     ,
        // },
        // {
        //     kind: "normal",
        //     title: appStrings.book.LIST,
        //     content:
        //         <Typography variant="body2">Lists content goes here.</Typography>
        //     ,
        // },
        // {
        //     kind: "normal",
        //     title: appStrings.book.RELATED,
        //     content:
        //         <Typography variant="body2">Related Books content goes here.</Typography>
        //     ,
        // },
    ];
    return (
        <Box sx={{width: "100%", height: 381, position: "relative"}}>
            < TabBar tabs={tabs}/>
        </Box>
    );
};


export default memo(BookOverviewTabs);