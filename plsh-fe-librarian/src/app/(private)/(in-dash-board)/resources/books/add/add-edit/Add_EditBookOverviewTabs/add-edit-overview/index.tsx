import Add_EditAbout from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add-edit-overview/Add_EditAbout";
import Add_EditAbout_Page2 from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add-edit-overview/Add_EditAbout_Page2";
import Add_EditBaseInfo from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add-edit-overview/Add_EditBaseInfo";
import Add_EditSummary from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add-edit-overview/Add_EditSummary";
import Grid from "@mui/material/Grid2";
import React, { memo } from "react";

interface IProps{
  children?: React.ReactNode;
}
function AddEditOverview( props: IProps ){
  return (
    <Grid container spacing = { 2 }>
      <Grid size = { 12 }>
        <Add_EditBaseInfo />
      </Grid>
      <Grid size = { 12 }>
        <Add_EditSummary />
      </Grid>
      <Grid size = { 6 }>
        <Add_EditAbout />
      </Grid>
      <Grid size = { 6 }>
        <Add_EditAbout_Page2 />
      </Grid>
    </Grid>
  );
}
export default memo( AddEditOverview );


