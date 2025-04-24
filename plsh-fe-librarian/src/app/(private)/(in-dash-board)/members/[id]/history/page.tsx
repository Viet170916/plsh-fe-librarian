import React from "react";

interface IProps {
    children?: React.ReactNode;
}

import {Avatar, Box, Button, Tab, Tabs, Typography} from "@mui/material";

import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";
import appStrings from "@/helpers/appStrings";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";

const Card = () => {
    // const [tabIndex, setTabIndex] = useState(0);

    return (
        <Box sx={{maxWidth: 800, mx: "auto", p: 3, border: "1px solid #ddd", borderRadius: 2, bgcolor: "white", marginTop: 15}}>
            {/*<Tabs>*/}
            {/*    <Tab label={appStrings.member.BASE_INFO} sx={{textTransform: "none", fontWeight: 600}}/>*/}
            {/*    <Tab label="Login & Security" sx={{textTransform: "none"}}/>*/}
            {/*    <Tab label="Notifications" sx={{textTransform: "none"}}/>*/}
            {/*    <Tab label="Interface" sx={{textTransform: "none"}}/>*/}
            {/*</Tabs>*/}
            <Box sx={{mt: 3}}>
                <Grid container spacing={2} alignItems="center">
                    <Grid>
                        <Avatar sx={{width: 80, height: 80}} src="/profile.jpg"/>
                    </Grid>
                    <Grid>
                        <NeumorphicButton variant="text" sx={{textTransform: "none"}}>Upload New photo</NeumorphicButton>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid size={6}>
                        <Box sx={{bgcolor: color.PRIMARY, p: 2, borderRadius: 2, textAlign: "center", color: "white"}}>
                            <Typography color={"text.primary"} variant="h6">120</Typography>
                            <Typography color={"text.primary"}>Readings</Typography>
                        </Box>
                    </Grid>
                    <Grid size={6}>
                        <Box sx={{bgcolor: color.FOUR, p: 2, borderRadius: 2, textAlign: "center", color: "white"}}>
                            <Typography color={"text.primary"} variant="h6">10</Typography>
                            <Typography color={"text.primary"}>Contributions</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid size={6}>
                        <NeumorphicTextField fullWidth label="Full fullName" defaultValue="Reinhard Kenson" disabled/>
                    </Grid>
                    <Grid size={6}>
                        <NeumorphicTextField fullWidth label="College Email ID" defaultValue="Kensoncs.official@college.com"
                                   disabled/>
                    </Grid>
                    <Grid size={6}>
                        <NeumorphicTextField fullWidth label="Register Number" defaultValue="6022020" disabled/>
                    </Grid>
                    <Grid size={6}>
                        <NeumorphicTextField fullWidth label="Phone number" defaultValue="+91 9952508995" disabled/>
                    </Grid>
                    <Grid size={12}>
                        <NeumorphicTextField fullWidth label="Bio" defaultValue="I'm a Student" multiline rows={3}/>
                    </Grid>
                </Grid>
                <Box sx={{mt: 3, display: "flex", gap: 2}}>
                    <NeumorphicButton variant="contained" color="primary">Update Profile</NeumorphicButton>
                    <NeumorphicButton variant="text">Reset</NeumorphicButton>
                </Box>
            </Box>
        </Box>
    );
};


export default Card;
