import {primaryContainerStyle} from "@/style/container.style";
import React from "react";
import AppActionBar, {NotificationDrawer} from "@/components/AppActionBar";
import NotificationProvider from "@/components/provider/NotificationProvider";
import AppProvider from "@/components/provider/AppProvider";
import ClientBackground from "@/app/(private)/ClientBackground";
import Container from "@/app/(private)/Container";


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
            <ClientBackground sx={{height: "100%", width: "100%"}}>
                {props.children}
            </ClientBackground>
        </Container>
    );
}

export default PrivateLayoutBasic;
