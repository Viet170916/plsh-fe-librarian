"use client"
import React, {JSX, memo} from "react";
import {Box, BoxProps} from "@mui/material";
import {useTheme} from "@mui/material/styles";

type ClientBackgroundProps = {
    children?: React.ReactNode;
} & BoxProps

function ClientBackground({children, ...other}: ClientBackgroundProps): JSX.Element {
    const theme = useTheme();
    return (
        <Box {...other} bgcolor={theme.palette.primary.main}>
            {children}
        </Box>
    );
}

export default memo(ClientBackground);

