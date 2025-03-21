"use client";
import AddEditOverview from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add-edit-overview";
import TabBar from "@/components/primary/TabBar";
import appStrings from "@/helpers/appStrings";
import { TabItem } from "@/helpers/appType";
import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

interface IProps{
  children?: React.ReactNode;
}
const BookOverviewTabs = ( props: IProps ) => {
  const tabs: TabItem[] = [
    {
      kind: "normal",
      title: appStrings.book.OVERVIEW,
      content: <AddEditOverview />,
    },
    {
      kind: "normal",
      title: appStrings.book.DETAIL,
      content:
        <Typography variant = "body2">Details content goes here.</Typography>
      ,
    },
  ];
  return (
    <Box sx = { { width: "100%", height: 381, position: "relative" } }>
      < TabBar tabs = { tabs } />
    </Box>
  );
};
export default memo( BookOverviewTabs );
