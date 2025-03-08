"use client"
import React, {memo} from "react";
import {Avatar, Box, Button, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";
import {Borrower} from "@/helpers/appType";
import appStrings from "@/helpers/appStrings";
import {shadowContainerStyle} from "@/style/container.style";
import {CgEreader} from "react-icons/cg";
import {PiPlantBold} from "react-icons/pi";
import Link from "next/link";

interface IProps {
    children?: React.ReactNode;
    profile: Borrower
}


const Profile = (props: IProps) => {

    return (
        <Box sx={{
            ...shadowContainerStyle,
            mx: "auto",
            maxWidth: 800,
            borderRadius: 2,
            bgcolor: color.WHITE,
            padding: 5
        }}>
            <Box sx={{mt: 3}}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={6} container>
                        <Grid>
                            <Avatar sx={{width: 80, height: 80}} src={props.profile.avatarUrl ?? ""}/>
                        </Grid>
                        <Grid size={"grow"}>
                            <Box sx={{
                                bgcolor: color.PRIMARY,
                                p: 2,
                                borderRadius: 2,
                                textAlign: "center",
                                color: "white"
                            }}>
                                <Grid container>
                                    <Grid size={4}>
                                        <Box height={30} width={30} sx={{
                                            background: color.WHITE,
                                            borderRadius: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <CgEreader color={color.PRIMARY}/>
                                        </Box>
                                    </Grid>
                                    <Grid size={8}>
                                        <Typography
                                            variant="h4">{props.profile.analytics?.bookReading?.count ?? 0}</Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography textAlign={"start"}>{appStrings.READING}</Typography>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Grid>
                        <Grid size={"grow"}>
                            <Box sx={{bgcolor: color.FOUR, p: 2, borderRadius: 2, textAlign: "center", color: "white"}}>
                                <Grid container>
                                    <Grid size={4}>
                                        <Box height={30} width={30} sx={{
                                            background: color.WHITE,
                                            borderRadius: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <PiPlantBold color={color.FOUR}/>
                                        </Box>
                                    </Grid>
                                    <Grid size={8}>
                                        <Typography
                                            variant="h4">{props.profile.analytics?.contribution?.count ?? 0}</Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography>{appStrings.CONTRIBUTION}</Typography>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Grid>
                    </Grid>
                    <Grid size={6} alignSelf={"end"}>
                        <TextField fullWidth label={appStrings.FULL_NAME} defaultValue={props.profile.name} disabled/>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{mt: 2}}>

                    <Grid size={6}>
                        <TextField fullWidth label={appStrings.EMAIL} defaultValue={props.profile.email}
                                   disabled/>
                    </Grid>
                    <Grid size={6}>
                        <TextField fullWidth label={appStrings.member.IDENTITY_CARD_NUMBER}
                                   defaultValue={props.profile.identityCardNumber}
                                   disabled/>
                    </Grid>
                    <Grid size={6}>
                        <TextField fullWidth label={appStrings.PHONE_NUMBER} defaultValue={props.profile.phone}
                                   disabled/>
                    </Grid>
                    <Grid size={6}>
                        <TextField fullWidth label={appStrings.ROLE_IN_SCHOOL}
                                   defaultValue={props.profile.aboutRole?.title} disabled rows={3}/>
                    </Grid>
                    <Grid size={6}>
                        <TextField fullWidth label={appStrings.ADDRESS} defaultValue={props.profile.aboutRole?.address}
                                   disabled/>
                    </Grid>
                    <Grid size={6}>
                        <TextField fullWidth label={appStrings.CLASS_ROOM}
                                   defaultValue={props.profile.aboutRole?.kind === "student" ? props.profile.aboutRole.classRoom : ""}
                                   disabled/>
                    </Grid>
                </Grid>
                <Box sx={{mt: 3, display: "flex", gap: 2}}>
                    <Link href={`/members/${props.profile.id}`}>
                        <Button variant="contained" color="primary">{appStrings.SEE_PROFILE}</Button>
                    </Link>
                    {/*<Button variant="text">Reset</Button>*/}
                </Box>
            </Box>
        </Box>
    );
};


export default memo(Profile);