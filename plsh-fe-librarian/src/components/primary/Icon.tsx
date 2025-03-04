import { color } from "@/helpers/resources";
import { Box } from "@mui/material";
import React, { memo } from "react";

interface IProps{
  children?: React.ReactNode;
  icon?: React.ReactNode;
  color?: string;
}

function Icon( props: IProps ){
  return (
    <Box sx={ {
      color: props.color ?? color.PRIMARY,
      justifyItems: "center",
      alignContent: "center",
      width: "100%",
    } }>
      { props.icon }
    </Box> );
}
export default memo( Icon );