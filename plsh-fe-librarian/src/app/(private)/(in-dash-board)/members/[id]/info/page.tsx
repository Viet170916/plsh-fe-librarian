import React from "react";

interface IProps {
    children?: React.ReactNode;
}

import {Avatar, Box, Button, Tab, Tabs, TextField, Typography} from "@mui/material";

import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";
import appStrings from "@/helpers/appStrings";

const ProfileSettings = () => {
    // const [tabIndex, setTabIndex] = useState(0);

    return (
        <Box sx={{maxWidth: 800, mx: "auto", p: 3, border: "1px solid #ddd", borderRadius: 2, bgcolor: "white",}}>
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
                        <Button variant="text" sx={{textTransform: "none"}}>Upload New photo</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid size={6}>
                        <Box sx={{bgcolor: color.PRIMARY, p: 2, borderRadius: 2, textAlign: "center", color: "white"}}>
                            <Typography variant="h6">120</Typography>
                            <Typography>Readings</Typography>
                        </Box>
                    </Grid>
                    <Grid size={6}>
                        <Box sx={{bgcolor: color.FOUR, p: 2, borderRadius: 2, textAlign: "center", color: "white"}}>
                            <Typography variant="h6">10</Typography>
                            <Typography>Contributions</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid size={6}>
                        <TextField fullWidth label="Full name" defaultValue="Reinhard Kenson" disabled/>
                    </Grid>
                    <Grid size={6}>
                        <TextField fullWidth label="College Email ID" defaultValue="Kensoncs.official@college.com"
                                   disabled/>
                    </Grid>
                    <Grid size={6}>
                        <TextField fullWidth label="Register Number" defaultValue="6022020" disabled/>
                    </Grid>
                    <Grid size={6}>
                        <TextField fullWidth label="Phone number" defaultValue="+91 9952508995" disabled/>
                    </Grid>
                    <Grid size={12}>
                        <TextField fullWidth label="Bio" defaultValue="I'm a Student" multiline rows={3}/>
                    </Grid>
                </Grid>
                <Box sx={{mt: 3, display: "flex", gap: 2}}>
                    <Button variant="contained" color="primary">Update Profile</Button>
                    <Button variant="text">Reset</Button>
                </Box>
            </Box>
        </Box>
    );
};


export default ProfileSettings;