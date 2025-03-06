"use client"
import React, {memo, useState} from "react";
import {Box} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import {TabItem} from "@/helpers/appType";
import Tab from "@mui/material/Tab";
import useLastSegment from "@/hooks/useGetEnpoint";
import {usePathname, useRouter} from "next/navigation";

interface IProps {
    children?: React.ReactNode;
}

type NavTabsProps = {
    tabs: TabItem[];
}

interface LinkTabProps {
    label?: string;
    href?: string;
    selected?: boolean;
}

function samePageLinkNavigation(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
    return !(event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey);

}

function LinkTab(props: LinkTabProps) {
    const router = useRouter();
    return (
        <Tab
            component="a"
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                // Routing libraries handle this, you can remove the onClick handle when using them.
                if (samePageLinkNavigation(event)) {
                    event.preventDefault();
                    if (props.href) {
                        router.push(props.href);

                    }

                }
            }}
            aria-current={props.selected && 'page'}
            {...props}
        />
    );
}

const NavTabs = ({tabs}: NavTabsProps) => {
    const [value, setValue] = useState<number>(0);
    const pathname = usePathname();
    const router = useRouter();

    // Lấy segment cuối của route
    const currentSegment = pathname.split("/").filter(Boolean).pop() || "";

    // Tìm index của segment hiện tại trong danh sách tab
    const currentIndex = tabs.findIndex(tab => tab.kind === "link" && tab.segment === currentSegment);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        const newSegment = tabs[newValue].kind === "link" ? tabs[newValue].segment : undefined;
        router.push(`/${newSegment}`); // Chuyển route khi đổi tab
    };

    return (
        <Box sx={{width: '100%', mb: 3}}>
            <Tabs value={currentIndex >= 0 ? currentIndex : 0} onChange={handleChange}>
                {tabs.map((tab, index) => {
                    if (tab.kind === "link") {
                        return <LinkTab key={tab.title} label={tab.title} href={tab.segment}/>
                        // <Tab key={index} label={tab.title}/>}
                    }
                })}
            </Tabs>
        </Box>
    );
};

export default memo(NavTabs);