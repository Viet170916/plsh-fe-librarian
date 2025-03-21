import Container from "@/components/primary/Container";
import { Box } from "@mui/material";
import React, {memo} from "react";
import PrimarySearchAppBar from "@/components/AppBar";
import AppTabs from "@/components/AppTab";

interface IProps {
    children?: React.ReactNode;
}

function ResourceLayout(props: IProps) {
    return (
        <Box sx={{padding: 5, minHeight:"100%", maxWidth:"100%", display:"flex"}}>
            {/*<PrimarySearchAppBar/>*/}
            {/*<AppTabs/>*/}
            {props.children}
        </Box>);
}

export default ResourceLayout;
