"use client";
import DetailTab from "@/app/(private)/(in-dash-board)/resources/books/[id]/Detail";
import Overview from "@/app/(private)/(in-dash-board)/resources/books/[id]/overviewTabs/overview";
import TabBar from "@/components/primary/TabBar";
import { BookData, TabItem } from "@/helpers/appType";
import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

interface IProps{
  book: BookData;
}
const BookOverviewTabs = ( { book }: IProps ) => {
  const tabs: TabItem[] = [ {
    kind: "normal",
    title: "Overview",
    content: <Overview book = { book } />,
  }, {
    kind: "normal",
    title: "Editions",
    content: <Typography variant = "body2">View 166 Editions content goes here.</Typography>,
  }, {
    kind: "normal",
    title: "Details",
    content:
      <DetailTab />
    ,
  }, {
    kind: "normal",
    title: "Reviews",
    content:
      <Typography variant = "body2">4.1k Reviews content goes here.</Typography>
    ,
  }, {
    kind: "normal",
    title: "Lists",
    content:
      <Typography variant = "body2">Lists content goes here.</Typography>
    ,
  }, {
    kind: "normal",
    title: "Related Books",
    content:
      <Typography variant = "body2">Related Books content goes here.</Typography>
    ,
  } ];
  return (
    <Box sx = { { width: "100%", height: 381, position: "relative" } }>
      < TabBar tabs = { tabs } />
    </Box>
  );
};
export default memo( BookOverviewTabs );
