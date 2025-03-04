import Container from "@/components/primary/Container";
import React, {memo} from "react";
import PrimarySearchAppBar from "@/components/AppBar";
import AppTabs from "@/components/AppTab";

interface IProps {
    children?: React.ReactNode;
}

function ResourceLayout(props: IProps) {
    return (
        <Container maxWidth={"xl"} sx={{padding: "10!important"}}>
            <PrimarySearchAppBar/>
            {/*<AppTabs/>*/}
            {props.children}
        </Container>);
}

export default ResourceLayout;