"use client";
import MemberTableItem from "@/app/(private)/(in-dash-board)/members/components/MemberTableItem";
import appStrings from "@/helpers/appStrings";
import {Member} from "@/helpers/appType";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {memo} from "react";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import {useTheme} from "@mui/material/styles";

type MemberTableProps = {
    members: Member[]
}
const MemberTable = ({members}: MemberTableProps) => {
    const theme = useTheme();
    return (
        <Box width={"100%"}>
            <Box width={"100%"} borderRadius={3}>
                <TableContainer sx={{overflow: "visible"}}>
                    <Table>
                        <TableHead sx={{overflow: "visible"}}>
                            <TableRow
                                sx={{boxShadow: NEUMORPHIC_SHADOW.SHADOW(), borderRadius: 3, overflow: "visible"}}>
                                <TableCell>{appStrings.member.AVATAR}</TableCell>
                                <TableCell>{appStrings.member.FULLNAME}</TableCell>
                                <TableCell>{appStrings.member.PHONE}</TableCell>
                                <TableCell>{appStrings.member.EMAIL}l</TableCell>
                                <TableCell>{appStrings.member.CARD_NUMBER}</TableCell>
                                <TableCell>{appStrings.member.STATUS}</TableCell>
                                <TableCell>{appStrings.ACTION}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {members.map((member) => (
                                <MemberTableItem key={member.id} member={member}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};
export default memo(MemberTable);



