"use client"
import React, {JSX, memo} from "react";
import {Container as MUIContainer, ContainerOwnProps} from "@mui/material";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import {useTheme} from "@mui/material/styles";

type ContainerProps = {
    children?: React.ReactNode;
} & ContainerOwnProps

function Container({children, ...props}: ContainerProps): JSX.Element {
    const theme = useTheme();
    return (
        <MUIContainer {...props} sx={{
            ...props.sx,
            boxShadow: NEUMORPHIC_SHADOW.SHADOW({
                light: theme.palette.primary.light,
                dark: theme.palette.primary.dark
            })
        }}>{children}</MUIContainer>
    );
}

export default memo(Container);

