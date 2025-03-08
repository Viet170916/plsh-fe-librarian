import React from "react";

interface IProps {
    children?: React.ReactNode;
}

import {Avatar, Box, Button, Stack, Tab, Tabs, TextField, Typography} from "@mui/material";

import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";
import appStrings from "@/helpers/appStrings";
import BorrowTable from "@/components/borrow-page/BorrowTable";
import {BorrowItemData} from "@/helpers/appType";
import axios, {AxiosResponse} from "axios";

const Card = async () => {
    // const [tabIndex, setTabIndex] = useState(0);
    const response: AxiosResponse<BorrowItemData[]> = await axios.get(`borrowing?borrowerId=2`, {
        baseURL: `http://localhost:3000/api/v1`,
    })

    return (
        <Stack sx={{width: "100%", borderRadius: 2}}>
            <Box sx={{flexGrow: 1}}>
                <Typography fontSize={35}>{appStrings.member.BORROW_REQUEST}</Typography>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <BorrowTable items={response.data}/>
            </Box>

        </Stack>
    );
};


export default Card;