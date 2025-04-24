import appStrings from "@/helpers/appStrings";
import { color } from "@/helpers/resources";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { memo } from "react";
import { IoCamera } from "react-icons/io5";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

interface IProps{
  children?: React.ReactNode;
}
function BookCoverImageScanner( props: IProps ){
  return (
    <Grid container size = { 12 }>
      <NeumorphicButton fullWidth startIcon = { <IoCamera color = { color.LIGHT_TEXT } /> }>
        { appStrings.book.SCAN_COVER_IMAGE }
      </NeumorphicButton>
    </Grid>
  );
}
export default memo( BookCoverImageScanner );
