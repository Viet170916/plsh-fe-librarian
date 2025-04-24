"use client"
import React, {memo} from "react";
import {Container as MUIContainer, ContainerOwnProps} from "@mui/material";

type IProps = {
    children?: React.ReactNode;
} & ContainerOwnProps

function Container({children, ...props}: IProps) {
    return (<div>
        <MUIContainer {...props}>{children}</MUIContainer>
    </div>);
}

export default memo(Container);
