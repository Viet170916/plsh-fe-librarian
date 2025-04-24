import React from "react";
import {Avatar, Box, Button, Typography} from "@mui/material";

import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";
import {useTheme} from "@mui/material/styles";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";

interface IProps {
    children?: React.ReactNode;
}

const Card = () => {
    // const [tabIndex, setTabIndex] = useState(0);
    const theme = useTheme();

    return (
        <Box sx={{
            maxWidth: 800,
            mx: "auto",
            p: 3,
            border: "1px solid #ddd",
            borderRadius: 2,
            bgcolor: "white",
            marginTop: 15
        }}>
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
                        <Box sx={{
                            bgcolor: theme.palette.primary.main,
                            p: 2,
                            borderRadius: 2,
                            textAlign: "center",
                            color: theme.palette.text.secondary
                        }}>
                            <Typography variant="h6">120</Typography>
                            <Typography>Readings</Typography>
                        </Box>
                    </Grid>
                    <Grid size={6}>
                        <Box sx={{
                            bgcolor: color.FOUR,
                            p: 2,
                            borderRadius: 2,
                            textAlign: "center",
                            color: theme.palette.text.secondary
                        }}>
                            <Typography variant="h6">10</Typography>
                            <Typography>Contributions</Typography>
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
