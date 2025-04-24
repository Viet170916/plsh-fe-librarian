"use client";
import appStrings from "@/helpers/appStrings";
import {getRoleTitle, Member} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {shadowContainerStyle} from "@/style/container.style";
import {Avatar, Box, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import React, {memo} from "react";
import {CgEreader} from "react-icons/cg";
import {PiPlantBold} from "react-icons/pi";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";

interface IProps {
    children?: React.ReactNode;
    profile?: Member;
}

const Profile = (props: IProps) => {
    return (
        <Box
            sx={{
                ...shadowContainerStyle,
                mx: "auto",
                maxWidth: 800,
                borderRadius: 2,
                bgcolor: color.WHITE,
                padding: 5,
            }}
        >
            <Box sx={{mt: 3}}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={6} container>
                        <Grid>
                            <Avatar sx={{width: 80, height: 80}} src={props.profile?.avatarUrl ?? ""}/>
                        </Grid>
                        <Grid size={"grow"}>
                            <Box
                                sx={{
                                    bgcolor: color.PRIMARY,
                                    p: 2,
                                    borderRadius: 2,
                                    textAlign: "center",
                                    color: "white",
                                }}
                            >
                                <Grid container>
                                    <Grid size={4}>
                                        <Box
                                            height={30} width={30} sx={{
                                            background: color.WHITE,
                                            borderRadius: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        >
                                            <CgEreader color={color.PRIMARY}/>
                                        </Box>
                                    </Grid>
                                    <Grid size={8}>
                                        <Typography
                                            color={"text.primary"}
                                            variant="h4"
                                        >{props.profile?.analytics?.bookReading?.count ?? 0}</Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography color={"text.primary"} textAlign={"start"}>{appStrings.READING}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid size={"grow"}>
                            <Box sx={{bgcolor: color.FOUR, p: 2, borderRadius: 2, textAlign: "center", color: "white"}}>
                                <Grid container>
                                    <Grid size={4}>
                                        <Box
                                            height={30} width={30} sx={{
                                            background: color.WHITE,
                                            borderRadius: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        >
                                            <PiPlantBold color={color.FOUR}/>
                                        </Box>
                                    </Grid>
                                    <Grid size={8}>
                                        <Typography
                                            color={"text.primary"}
                                            variant="h4"
                                        >{props.profile?.analytics?.contribution?.count ?? 0}</Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography color={"text.primary"}>{appStrings.CONTRIBUTION}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid size={6} alignSelf={"end"}>
                        <NeumorphicTextField fullWidth label={appStrings.FULL_NAME} value={props.profile?.fullName ?? ""}
                                   disabled/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid size={6}>
                        <NeumorphicTextField
                            fullWidth label={appStrings.EMAIL} value={props.profile?.email ?? ""}
                            disabled
                        />
                    </Grid>
                    <Grid size={6}>
                        <NeumorphicTextField
                            fullWidth label={appStrings.member.IDENTITY_CARD_NUMBER}
                            value={props.profile?.identityCardNumber ?? ""}
                            disabled
                        />
                    </Grid>
                    <Grid size={6}>
                        <NeumorphicTextField
                            fullWidth label={appStrings.PHONE_NUMBER} value={props.profile?.phoneNumber ?? ""}
                            disabled
                        />
                    </Grid>
                    <Grid size={6}>
                        <NeumorphicTextField
                            fullWidth label={appStrings.ROLE_IN_SCHOOL}
                            value={getRoleTitle(props.profile?.role ?? "undefined")} disabled rows={3}
                        />
                    </Grid>
                    <Grid size={6}>
                        <NeumorphicTextField
                            fullWidth label={appStrings.ADDRESS} value={props.profile?.address ?? ""}
                            disabled
                        />
                    </Grid>
                    <Grid size={6}>
                        <NeumorphicTextField
                            fullWidth label={appStrings.CLASS_ROOM}
                            value={props.profile?.role === "student" ? props.profile?.classRoom : ""}
                            disabled
                        />
                    </Grid>
                </Grid>
                <Box sx={{mt: 3, display: "flex", gap: 2}}>
                    <Link href={`/members/${props.profile?.id}`}>
                        <NeumorphicButton variant="contained"
                                          color="primary">{appStrings.SEE_PROFILE}</NeumorphicButton>
                    </Link>
                    {/*<Button variant="text">Reset</Button>*/}
                </Box>
            </Box>
        </Box>
    );
};
export default memo(Profile);
