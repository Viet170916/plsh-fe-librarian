import React from "react";

interface IProps {
    children?: React.ReactNode;
}

import {Avatar, Box, Button, Stack, Tab, Tabs, TextField, Typography} from "@mui/material";

import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";
import appStrings from "@/helpers/appStrings";

const Card = () => {
    // const [tabIndex, setTabIndex] = useState(0);

    return (
        <Stack sx={{width: "100%", mx: "auto", p: 3, border: "1px solid #ddd", borderRadius: 2, bgcolor: "white",}}>
            <Box sx={{flexGrow: 1}}>
                <Typography fontSize={35}>{appStrings.member.BORROW_REQUEST}</Typography>
            </Box>
        </Stack>
    );
};


export default Card;