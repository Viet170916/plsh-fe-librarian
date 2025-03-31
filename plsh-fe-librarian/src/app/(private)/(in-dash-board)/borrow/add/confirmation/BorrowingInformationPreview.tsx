"use client";
import appStrings from "@/helpers/appStrings";
import { useSelector } from "@/hooks/useSelector";
import { selectCurrentBookBorrowed } from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import { Avatar, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import React, { JSX, memo } from "react";
import { shallowEqual } from "react-redux";

type BorrowingInfomationPreviewProps = {
				children?: React.ReactNode;
}
function BorrowingInformationPreview( { children }: BorrowingInfomationPreviewProps ): JSX.Element{
				const borrower = useSelector( state => state.addEditBorrowData.borrower, shallowEqual );
				return (
								<Card sx = { { borderRadius: 4, width: "100%", p: 4 } }>
												<Grid size = { 8 } width = { "100%" } spacing = { 2 }>
																<Grid>
																				<Avatar src = { borrower.avatarUrl } />
																</Grid>
																<Grid>
																				<Typography variant = "h4" fontWeight = { "bold" }>{ appStrings.member.INFORMATION }</Typography>
																				<Typography fontWeight = { "bold" }>{ appStrings.member.FULLNAME }: </Typography><Typography>{ borrower.fullName }</Typography>
																				<Typography fontWeight = { "bold" }>{ appStrings.member.EMAIL }: </Typography><Typography>{ borrower.email }</Typography>
																				<Typography fontWeight = { "bold" }>{ appStrings.member.PHONE }: </Typography><Typography>{ borrower.phoneNumber }</Typography>
																				<Typography fontWeight = { "bold" }>{ appStrings.member.CARD_NUMBER }: </Typography><Typography>{ borrower.cardMemberNumber }</Typography>
																				<Typography fontWeight = { "bold" }>{ appStrings.member.CARD_STATUS }: </Typography><Typography>{ borrower.cardMemberStatus }</Typography>
																</Grid>
																<SelectedBook />
												</Grid>
								</Card>
				);
}
const SelectedBook = memo( () => {
								const bookSelected = useSelector( state => selectCurrentBookBorrowed( state ), shallowEqual );
								return (
												bookSelected && (
																<Grid>
																				<Typography variant = "h4" sx = { { mt: 2 } } fontWeight = { "bold" }>Chi tiết sách</Typography>
																				<Typography fontWeight = { "bold" }>{ appStrings.TITLE }: </Typography><Typography>{ bookSelected.bookInstance.bookName }</Typography>
																				<Typography fontWeight = { "bold" }>{ appStrings.book.CODE }: </Typography><Typography>{ bookSelected.bookInstance.code }</Typography>
																				<Typography fontWeight = { "bold" }>{ appStrings.borrow.BORROW_RANGE }: </Typography><Typography>{ `${ dayjs( bookSelected.borrowDateRange.start ).format( "HH:mm dddd [ngày] D [tháng] M, YYYY" ) } - ${ dayjs( bookSelected.borrowDateRange.end )
																.format( "HH:mm dddd [ngày] D [tháng] M, YYYY" ) }` }</Typography>
																				<Typography fontWeight = { "bold" }>{ appStrings.NOTE } </Typography><Typography>{ bookSelected.beforeBorrow.note }</Typography>
																</Grid>
												));
				},
);
export default memo( BorrowingInformationPreview );

