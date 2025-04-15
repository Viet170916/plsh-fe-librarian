import Container from "@/components/primary/Container";
import {primaryContainerStyle} from "@/style/container.style";
import {DashboardLayoutSlotProps} from "@toolpad/core/DashboardLayout";
import React from "react";
import AppActionBar, {NotificationDrawer} from "@/components/AppActionBar";
import NotificationProvider from "@/components/provider/NotificationProvider";
import AppProvider from "@/components/provider/AppProvider";


interface IProps {
    children?: React.ReactNode;
}
function PrivateLayoutBasic(props: IProps) {


    return (
        <Container sx={primaryContainerStyle} maxWidth="xl">
            <NotificationProvider/>
            <AppProvider/>
            <AppActionBar/>
            <NotificationDrawer/>
            {props.children}
        </Container>
    );
}

export default PrivateLayoutBasic;
