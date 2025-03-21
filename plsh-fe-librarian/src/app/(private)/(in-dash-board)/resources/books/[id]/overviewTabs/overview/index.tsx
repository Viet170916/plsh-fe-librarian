"use client";
import About from "@/app/(private)/(in-dash-board)/resources/books/[id]/overviewTabs/overview/About";
import BaseInfo from "@/app/(private)/(in-dash-board)/resources/books/[id]/overviewTabs/overview/BaseInfo";
import Feedback from "@/app/(private)/(in-dash-board)/resources/books/[id]/overviewTabs/overview/Feedback";
import Sumary from "@/app/(private)/(in-dash-board)/resources/books/[id]/overviewTabs/overview/Sumary";
import { BookData } from "@/helpers/appType";
import Grid from "@mui/material/Grid2";
import React, { memo } from "react";

interface IProps{
  book: BookData;
}
function Overview( { book }: IProps ){
  return (
    <Grid container spacing = { 2 }>
      <Grid size = { 12 }>
        <BaseInfo book = { book } />
      </Grid>
      <Grid size = { 12 }>
        <Sumary book={book} />
      </Grid>
      <Grid size = { 6 }>
        <About book = { book } />
      </Grid>
      <Grid size = { 6 }>
        <Feedback />
      </Grid>
    </Grid>
  )
    ;
}
export default memo( Overview );


