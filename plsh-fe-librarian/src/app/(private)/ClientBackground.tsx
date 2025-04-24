"use client"
import React, {JSX, memo} from "react";
import {Box, BoxProps} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";

type ClientBackgroundProps = {
    children?: React.ReactNode;
} & BoxProps

function ClientBackground({children, ...other}: ClientBackgroundProps): JSX.Element {
    const theme = useTheme();
    return (
        <Box {...other} bgcolor={theme.palette.background.default} >
            {children}
        </Box>
    );
}

export default memo(ClientBackground);

