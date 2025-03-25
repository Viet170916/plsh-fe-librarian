"use client";
import MemberTableItem from "@/app/(private)/(in-dash-board)/members/components/MemberTableItem";
import appStrings from "@/helpers/appStrings";
import { Member } from "@/helpers/appType";
import { Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { memo } from "react";

type MemberTableProps = {
				members: Member[]
}
const MemberTable = ( { members }: MemberTableProps ) => {
				return (
								<Card>
												<CardContent>
																<TableContainer component = { Paper }>
																				<Table>
																								<TableHead>
																												<TableRow>
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
																												{ members.map( ( member ) => (
																																<MemberTableItem key = { member.id } member = { member } />
																												) ) }
																								</TableBody>
																				</Table>
																</TableContainer>
												</CardContent>
								</Card>
				);
};
export default memo( MemberTable );

