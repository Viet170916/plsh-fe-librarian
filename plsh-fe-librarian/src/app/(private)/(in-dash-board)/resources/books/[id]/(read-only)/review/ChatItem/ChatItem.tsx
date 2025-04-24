"use client";
import {
    CustomTreeItemGroupTransition,
    CustomTreeItemIconContainer,
    CustomTreeItemRoot,
    StyledTreeItemProps,
} from "@/app/(private)/(in-dash-board)/resources/books/[id]/(read-only)/review/ChatItem/style";
import {color} from "@/helpers/resources";
import {styled, useTheme} from "@mui/material/styles";
import {TreeItem2Content} from "@mui/x-tree-view/TreeItem2";
import {TreeItem2Icon} from "@mui/x-tree-view/TreeItem2Icon";
import {TreeItem2Provider} from "@mui/x-tree-view/TreeItem2Provider";
import {useTreeItem2} from "@mui/x-tree-view/useTreeItem2";
import clsx from "clsx";
import React, {memo} from "react";

const TreeChatItem = React.forwardRef(function CustomTreeItem(
    props: StyledTreeItemProps,
    ref: React.Ref<HTMLLIElement>,
) {
    const theme = useTheme();
    const {
        id,
        itemId,
        label,
        disabled,
        children,
        bgColor,
        color,
        labelIcon: LabelIcon,
        render: Render,
        labelInfo,
        colorForDarkMode,
        bgColorForDarkMode,
        ...other
    } = props;
    const {
        getRootProps,
        getContentProps,
        getIconContainerProps,
        getLabelProps,
        getGroupTransitionProps,
        status,
    } = useTreeItem2({id, itemId, children, label, disabled, rootRef: ref});
    const style = {
        "--tree-view-color":
            theme.palette.mode !== "dark" ? color : colorForDarkMode,
        "--tree-view-bg-color":
            theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode,
    };
    return (
        <TreeItem2Provider itemId={itemId}>
            <CustomTreeItemRoot {...getRootProps({...other, style})}>
                <CustomTreeItemContent
                    {...getContentProps({
                        className: clsx("content", {
                            expanded: status.expanded,
                            // selected: status.selected,
                            // focused: status.focused,
                        }),
                    })}
                >
                    <CustomTreeItemIconContainer {...getIconContainerProps()}>
                        <TreeItem2Icon status={status}/>
                    </CustomTreeItemIconContainer>
                    {Render}
                </CustomTreeItemContent>
                {children && (
                    <CustomTreeItemGroupTransition {...getGroupTransitionProps()} />
                )}
            </CustomTreeItemRoot>
        </TreeItem2Provider>
    );
});
const CustomTreeItemContent = styled(TreeItem2Content)(({theme}) => ({
    marginBottom: theme.spacing(0.3),
    color: theme.palette.text.secondary,
    borderRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: color.PAGE_BACKGROUND,
    "&.expanded": {
        fontWeight: theme.typography.fontWeightRegular,
        backgroundColor: color.PAGE_BACKGROUND,
    },
    "&:hover": {
        backgroundColor: color.PAGE_BACKGROUND,
    },
    "&.focused, &.selected, &.selected.focused": {
        backgroundColor: color.PAGE_BACKGROUND,
    },
}));
export default memo(TreeChatItem);
