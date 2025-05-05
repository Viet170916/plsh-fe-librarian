import SignInForm from "@/components/auth/sign-in-form";
import Container from "@/components/primary/Container";
import appStrings, {BOTH_STUDENTS_N_TEACHERS} from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import {signInContainerStyle} from "@/style/container.style";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

export default async function Element(): Promise<React.JSX.Element> {
    // const session: Session | null = await getServerSession( authOptions );
    return (<div>
        <Container sx={signInContainerStyle} maxWidth="sm" >
            <Grid container>
                <Grid size={12} justifyContent={"center"} alignItems={"center"}>
                    <Typography fontSize={20} sx={{color: color.DARK_TEXT, justifySelf: "center"}} variant="body2"
                                gutterBottom>
                        {appStrings.LOGIN}
                    </Typography>
                </Grid>
                <Grid size={12} justifyContent={"center"} alignItems={"center"}>
                    <Typography fontSize={15} sx={{color: color.DARK_LIGHTER_TEXT, justifySelf: "center"}}
                                variant="body2"
                                gutterBottom>
                        {"Dành cho thủ thư"}

                    </Typography>

                </Grid>
            </Grid>
            <SignInForm/>
        </Container>
    </div>);
}
