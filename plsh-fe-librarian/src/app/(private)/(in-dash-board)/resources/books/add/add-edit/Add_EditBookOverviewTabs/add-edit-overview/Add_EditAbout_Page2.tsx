import { EditCom } from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add-edit-overview/Add_EditAbout";
import appStrings from "@/helpers/appStrings";
import { color } from "@/helpers/resources";
import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

interface IProps{
  children?: React.ReactNode;
}
function Add_EditAbout_Page2( props: IProps ){
  return (<Box
    sx = { {
      width: "100%",
      height: "fit-content",
      bgcolor: color.WHITE,
      border: 1,
      borderColor: color.SHADOW,
      borderRadius: 1,
      p: 2,
    } }
  >
    <Typography variant = "h6" fontWeight = "bold" color = "textSecondary">
      { appStrings.book.PHYSIC_DESCRIPTION }
    </Typography>
    <Box sx = { { mt: 2, gap: 2 } } display = "flex" flexDirection = "row" alignItems = "center">
      <Typography variant = "body2" fontWeight = "bold" color = "textSecondary">
        { appStrings.book.HEIGHT }
      </Typography>
      <Box>
        <EditCom overviewKey = { "height" } editType = { "number" } />
      </Box>
    </Box>
    <Box sx = { { mt: 2, gap: 2 } } display = "flex" flexDirection = "row" alignItems = "center">
      <Typography variant = "body2" fontWeight = "bold" color = "textSecondary">
        { appStrings.book.WIDTH }
      </Typography>
      <Box>
        <EditCom overviewKey = { "width" } editType = { "number" } />
      </Box>
    </Box>
    <Box sx = { { mt: 2, gap: 2 } } display = "flex" flexDirection = "row" alignItems = "center">
      <Typography variant = "body2" fontWeight = "bold" color = "textSecondary">
        { appStrings.book.THICKNESS }
      </Typography>
      <Box>
        <EditCom overviewKey = { "thickness" } editType = { "number" } />
      </Box>
    </Box>
    <Box sx = { { mt: 2, gap: 2 } } display = "flex" flexDirection = "row" alignItems = "center">
      <Typography variant = "body2" fontWeight = "bold" color = "textSecondary">
        { appStrings.book.WEIGHT }
      </Typography>
      <Box>
        <EditCom overviewKey = { "weight" } editType = { "number" } />
      </Box>
    </Box>
  </Box>);
}
export default memo( Add_EditAbout_Page2 );
