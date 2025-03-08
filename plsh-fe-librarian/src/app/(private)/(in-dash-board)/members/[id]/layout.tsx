import React, {memo} from "react";
import Grid from "@mui/material/Grid2";
import AppTabs from "@/components/AppTab";
import NavTabs from "@/components/primary/TabLink";
import {TabItem} from "@/helpers/appType";
import appStrings from "@/helpers/appStrings";
import {useRouter} from "next/router";
import {getParams} from "next/dist/export/helpers/get-params";
import {getParamKeys} from "next/dist/server/request/fallback-params";
import {Box, Stack} from "@mui/material";

interface IProps {
    children?: React.ReactNode;
}

const tabLinks: TabItem[] = [{
    kind: "link",
    segment: "info",
    title: appStrings.member.BASE_INFO,
}, {
    kind: "link",
    segment: "card",
    title: appStrings.member.CARD,
}, {
    kind: "link",
    segment: "borrow-request",
    title: appStrings.member.BORROW_REQUEST,
}, {
    kind: "link",
    segment: "history",
    title: appStrings.member.HISTORY,
}, {
    kind: "link",
    segment: "reading",
    title: appStrings.member.READING,
}, {
    kind: "link",
    segment: "setting",
    title: appStrings.member.SETTING,
}];

function MemberLayout(props: IProps) {
    // const router = useRouter()
    // const [id] = router.query.[id];
    // const tabs = tabLinks.map((tab, index) => {
    //     return {...tab, segment: `${[id]}${tab.kind === "link" && tab.segment ? `/${tab.segment}` : undefined}`};
    // })
    return (
        <Stack direction={"column"} height={"100%"}>
            <Box flexGrow={0}>
                <NavTabs tabs={tabLinks}/>
            </Box>
            <Box flexGrow={1} bottom={0} overflow={"auto"} padding={"40px"}>
                {props.children}
            </Box>


        </Stack>);
}

export default MemberLayout;