"use client"
import React, {memo} from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Link} from "@mui/material";


interface IProps {
    children?: React.ReactNode;
}

function samePageLinkNavigation(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

interface LinkTabProps {
    label?: string;
    href?: string;
    selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            component="a"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                if (samePageLinkNavigation(event)) {
                    event.preventDefault();
                }
            }}
            aria-current={props.selected && 'page'}
            {...props}
        />
    );
}

function AppTabs(props: IProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (
            event.type !== 'click' ||
            (event.type === 'click' &&
                samePageLinkNavigation(
                    event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                ))
        ) {
            setValue(newValue);
        }
    };

    return (
        <Box sx={{width: '100%'}}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                role="navigation"
                sx={{gap:10}}
            >
                <Link href={"/resources/books"}> Books</Link>
                <Link href={"/resources/exams"}> Exams</Link>

            </Tabs>
        </Box>
    );
}

export default memo(AppTabs);