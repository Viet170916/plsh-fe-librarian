import appStrings from "@/helpers/appStrings";
import {Box, Stack, Typography} from "@mui/material";
import React from "react";
import Table from "@/app/(private)/(in-dash-board)/members/[id]/borrow-request/Table";

const BorrowRequest = async () => {

    return (
        <Stack sx={{width: "100%", borderRadius: 2}}>
            <Box sx={{flexGrow: 1}}>
                <Typography fontSize={35}>{appStrings.member.BORROW_REQUEST}</Typography>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <Table/>
            </Box>
        </Stack>
    );
};
export default BorrowRequest;
