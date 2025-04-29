"use client";
import RegisterFormSmall from "@/app/(public)/auth/register/google/RegisterFormSmall";
import Container from "@/components/primary/Container";
import {BOTH_STUDENTS_N_TEACHERS, REGISTER} from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import {signInContainerStyle} from "@/style/container.style";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {JSX} from "react";

function page(): JSX.Element {
    return (
        <Container sx={signInContainerStyle} maxWidth="sm">
            <Grid container>
                <Grid size={12} justifyContent={"center"} alignItems={"center"}>
                    <Typography
                        fontSize={20} sx={{color: color.DARK_TEXT, justifySelf: "center"}} variant="body2"
                        gutterBottom
                    >
                        {REGISTER}
                    </Typography>
                </Grid>
                <Grid size={12} justifyContent={"center"} alignItems={"center"}>
                    <Typography
                        fontSize={15} sx={{color: color.DARK_LIGHTER_TEXT, justifySelf: "center"}} variant="body2"
                        gutterBottom
                    >
                        {BOTH_STUDENTS_N_TEACHERS}
                    </Typography>
                </Grid>
            </Grid>
            <RegisterFormSmall/>
        </Container>
    );
}

export default page;

