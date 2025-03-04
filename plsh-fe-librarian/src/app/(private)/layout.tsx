import Container from "@/components/primary/Container";
import {primaryContainerStyle} from "@/style/container.style";
import {DashboardLayoutSlotProps} from "@toolpad/core/DashboardLayout";
import React from "react";


interface IProps {
    children?: React.ReactNode;
}

const slotProps: DashboardLayoutSlotProps | undefined = {};

function PrivateLayoutBasic(props: IProps) {


    return (
        <Container sx={primaryContainerStyle} maxWidth="xl">
            {props.children}
        </Container>
    );
}

export default PrivateLayoutBasic;
