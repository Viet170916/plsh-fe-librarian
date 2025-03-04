import {color} from "@/helpers/resources";
import {DashboardLayoutSlotProps} from "@toolpad/core/DashboardLayout";
import React from "react";
import {
    Box, Stack,

} from "@mui/material";
import MenuDashboard from "@/components/primary/MenuDashboard";
import {NAVIGATION} from "@/configs/navigation.config";

interface IProps {
    children?: React.ReactNode;
}

const slotProps: DashboardLayoutSlotProps | undefined = {};

function DashboardLayoutBasic(props: IProps) {


    return (
        <Stack
            direction="row"
            sx={{
                display: "flex",
                width: '100%',
                height: "100%",
                position: "relative",
            }}
        >
            <Box width={"fit-content"} sx={{
                flexGrow: 1,
                minHeight: "fit-content",
            }}>
                <MenuDashboard items={NAVIGATION}/>
            </Box>
            <Box sx={{
                background: `linear-gradient(to bottom, ${color.WHITE},${color.PAGE_BACKGROUND}, ${color.PAGE_BACKGROUND})`,
                flexGrow: 0,
                overflowY: 'auto',
                width: "100%",
                height: "100%",
            }}>
                {props.children}
            </Box>
        </Stack>

    );
}

export default DashboardLayoutBasic;
