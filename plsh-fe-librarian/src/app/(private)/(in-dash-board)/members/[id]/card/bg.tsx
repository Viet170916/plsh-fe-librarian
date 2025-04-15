"use client"
import React, {JSX, memo} from "react";
import LibAnimation from "@/components/Animation/lotties/Library";
import {Box} from "@mui/material";

function LibraryBg(): JSX.Element {
    return (
        <Box sx={{position: "absolute", width: "100%", height: "100%"}}>
            <LibAnimation height={"100%"} width={"100%"}/>
        </Box>
    );
}

export default memo(LibraryBg);

