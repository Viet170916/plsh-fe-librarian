import React, {memo} from "react";
import {Box, LinearProgress} from "@mui/material";

interface IProps {
    children?: React.ReactNode;
}

function E(props: IProps) {
  return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>);
}

export default memo(E);