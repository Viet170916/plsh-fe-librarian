"use client";
import VerifiedMemberItem from "@/app/(private)/(in-dash-board)/borrow/add/borrower/VerifiedMemberItem";
import appStrings from "@/helpers/appStrings";
import {Member} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {memo} from "react";
import {useTheme} from "@mui/material/styles";

type VerifiedMemberTableProps = {
    members: Member[],
    onSelected: (member: Member) => void;
}
const VerifiedMemberTable = ({members, onSelected}: VerifiedMemberTableProps) => {
    const theme = useTheme();
    return (
        <Box width={"100%"}>
            <Box width={"100%"} borderRadius={3} overflow={"hidden"}>
                <TableContainer component={Paper} sx={{ bgcolor: theme.palette.background.default}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{appStrings.member.AVATAR}</TableCell>
                                <TableCell>{appStrings.member.FULLNAME}</TableCell>
                                <TableCell>{appStrings.member.PHONE}</TableCell>
                                <TableCell>{appStrings.member.EMAIL}l</TableCell>
                                <TableCell>{appStrings.member.CARD_NUMBER}</TableCell>
                                <TableCell>{appStrings.member.STATUS}</TableCell>
                                {/*<TableCell>{ appStrings.ACTION }</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {members.map((member) => (
                                <VerifiedMemberItem key={member.id} member={member} onSelected={onSelected}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};
export default memo(VerifiedMemberTable);

