import {Box} from "@mui/material";
import React from "react";

interface IProps {
    children?: React.ReactNode;
}

function ResourceLayout(props: IProps) {
    return (
        <Box sx={{height: "100%", width: "100%", display: "flex"}}>
            {props.children}
        </Box>);
}

export default ResourceLayout;
