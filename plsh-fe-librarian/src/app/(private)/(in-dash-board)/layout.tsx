import {DashboardLayoutSlotProps} from "@toolpad/core/DashboardLayout";
import React from "react";
import {Box, Stack,} from "@mui/material";
import AppNavigation from "@/app/(private)/(in-dash-board)/navigation";
import ClientBackground from "@/app/(private)/(in-dash-board)/ClientBackground";

interface IProps {
    children?: React.ReactNode;
}
function DashboardLayoutBasic(props: IProps) {


    return (
        <>
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
                    <AppNavigation/>
                    {/*<MenuDashboard items={NAVIGATION}/>*/}
                </Box>

                <ClientBackground sx={{
                    flexGrow: 0,
                    overflowY: 'auto',
                    width: "100%",
                    height: "100%",
                }}>
                    {props.children}
                </ClientBackground>
            </Stack>
        </>
    );
}

export default DashboardLayoutBasic;
