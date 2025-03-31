"use client";
import appStrings from "@/helpers/appStrings";
import { Member } from "@/helpers/appType";
import { color } from "@/helpers/resources";
import { truncateTextStyle } from "@/style/text.style";
import { Avatar, TableCell, TableRow, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import React, { JSX, memo } from "react";

type VerifiedMemberItemProps = {
				member: Member;
				onSelected: ( member: Member ) => void;
};
function VerifiedMemberItem( { member, onSelected }: VerifiedMemberItemProps ): JSX.Element{
				const isActive = member.isVerified;
				return (
								<TableRow
												key = { member.id }
												sx = { {
																backgroundColor: isActive ? "inherit" : "#f0f0f0",
																cursor: isActive ? "pointer" : "not-allowed",
																opacity: isActive ? 1 : 0.6,
												} }
												onClick = { () => isActive && onSelected( member ) }
								>
												<TableCell>
																<Avatar src = { member.avatarUrl } alt = { member.fullName } />
												</TableCell>
												<TableCell>
																<Typography sx = { { ...truncateTextStyle } }>{ member.fullName }</Typography>
												</TableCell>
												<TableCell>
																<Typography sx = { { ...truncateTextStyle } }> { member.phoneNumber }</Typography>
												</TableCell>
												<TableCell>
																<Typography sx = { { ...truncateTextStyle } }>{ member.email }</Typography>
												</TableCell>
												<TableCell>
																<Typography sx = { { ...truncateTextStyle } }>{ member.cardMemberNumber }</Typography>
												</TableCell>
												<TableCell>
																<Grid container spacing = { 1 } alignItems = "center">
																				<Grid>{ member.status }</Grid>
																				<Divider orientation = "vertical" flexItem />
																				<Grid>
																								{ member.isVerified ? (
																												<Typography sx = { { color: color.COMFORT } }>
																																{ appStrings.member.VERIFIED }
																												</Typography>
																								) : (
																												<Typography sx = { { color: color.SERIOUS } }>
																																{ appStrings.member.NOT_VERIFIED }
																												</Typography>
																								) }
																				</Grid>
																</Grid>
												</TableCell>
								</TableRow>
				);
}
export default memo( VerifiedMemberItem );
