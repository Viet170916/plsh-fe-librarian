"use client";
import appStrings from "@/helpers/appStrings";
import {Member} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {Avatar, TableCell, TableRow, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import React, {JSX, memo} from "react";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

type MemberTableItemProps = {
    member: Member
}

function MemberTableItem({member}: MemberTableItemProps): JSX.Element {
    return (
        <TableRow key={member.id}>
            <TableCell>
                <Avatar src={member.avatarUrl} alt={member.fullName}/>
            </TableCell>
            <TableCell>{member.fullName}</TableCell>
            <TableCell>{member.phoneNumber}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{member.cardMemberNumber}</TableCell>
            <TableCell>
                <Grid container spacing={1}>
                    <Grid size={"grow"}>
                        {member.status}
                    </Grid>
                    <Divider orientation="vertical" flexItem/>
                    <Grid>
                        {member.isVerified ?
                            <Typography sx={{color: color.COMFORT}}>{appStrings.member.VERIFIED}</Typography> :
                            <Typography sx={{color: color.SERIOUS}}>{appStrings.member.NOT_VERIFIED}</Typography>}
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell>
                <NeumorphicButton variant="outlined">
                    <Link href={`/members/${member.id}`}>
                        {appStrings.VIEW}
                    </Link>
                </NeumorphicButton>
            </TableCell>
        </TableRow>
    );
}

export default memo(MemberTableItem);

