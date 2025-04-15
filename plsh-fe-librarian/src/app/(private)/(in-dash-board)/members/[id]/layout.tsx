import TabLink from "@/app/(private)/(in-dash-board)/members/[id]/TabLink";
import {Box, Stack} from "@mui/material";
import React from "react";
import SaveToStore from "@/app/(private)/(in-dash-board)/members/[id]/SaveToStore";

interface IProps {
    children?: React.ReactNode;
}

function MemberLayout(props: IProps) {
    return (
        <Stack direction={"column"} height={"100%"}>
            <SaveToStore/>
            <Box flexGrow={0}>
                <TabLink/>
            </Box>
            <Box flexGrow={1} bottom={0} overflow={"auto"} sx={{p: 5, pt: 0}}>
                {props.children}
            </Box>
        </Stack>);
}

export default MemberLayout;
