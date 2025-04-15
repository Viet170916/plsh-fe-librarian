"use client";
import {styled} from "@mui/material/styles";
import {SvgIconProps} from "@mui/material/SvgIcon";
import {TreeItem2GroupTransition, TreeItem2IconContainer, TreeItem2Root,} from "@mui/x-tree-view/TreeItem2";
import {UseTreeItem2Parameters} from "@mui/x-tree-view/useTreeItem2";
import React, {JSX} from "react";

export const CustomTreeItemRoot = styled(TreeItem2Root)(({theme}) => ({
    color: theme.palette.text.secondary,
}));
export const CustomTreeItemIconContainer = styled(TreeItem2IconContainer)(
    ({theme}) => ({
        marginRight: theme.spacing(1),
    }),
);
export const CustomTreeItemGroupTransition = styled(TreeItem2GroupTransition)(
    ({theme}) => ({
        marginLeft: 0,
        [`& .content`]: {
            paddingLeft: theme.spacing(2),
        },
    }),
);

export interface StyledTreeItemProps
    extends Omit<UseTreeItem2Parameters, "rootRef">,
        React.HTMLAttributes<HTMLLIElement> {
    bgColor?: string;
    bgColorForDarkMode?: string;
    color?: string;
    colorForDarkMode?: string;
    labelIcon?: React.ElementType<SvgIconProps>;
    render?: JSX.Element;
    labelInfo?: string;
}
