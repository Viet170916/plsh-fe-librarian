import appStrings from "@/helpers/appStrings";
import { color } from "@/helpers/resources";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { memo } from "react";
import { IoCamera } from "react-icons/io5";

interface IProps{
  children?: React.ReactNode;
}
function BookCoverImageScanner( props: IProps ){
  return (
    <Grid container size = { 12 }>
      <Button fullWidth startIcon = { <IoCamera color = { color.LIGHT_TEXT } /> }>
        { appStrings.book.SCAN_COVER_IMAGE }
      </Button>
    </Grid>
  );
}
export default memo( BookCoverImageScanner );
