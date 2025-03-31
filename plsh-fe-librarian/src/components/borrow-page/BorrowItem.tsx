"use client";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import { appToaster } from "@/components/primary/toaster";
import appStrings from "@/helpers/appStrings";
import { constants } from "@/helpers/constants";
import { LoanDto, LoanStatus } from "@/helpers/dataTransfer";
import { color } from "@/helpers/resources";
import { useUpdateLoanStatusMutation } from "@/stores/slices/api/borrow.api.slice";
import { truncateTextStyle } from "@/style/text.style";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import Link from "next/link";
import React, { memo, useEffect } from "react";

const BorrowItem = ( { borrowItem, onSelected }: { borrowItem: LoanDto, onSelected: ( borrowItem: LoanDto ) => void } ) => {
				const [ updateStatus, { error, isLoading, data } ] = useUpdateLoanStatusMutation();
				useEffect( () => {
								if( data ){
												appToaster.success( data.message );
								}
				}, [ data ] );
				useEffect( () => {
								if( error ){
												appToaster.success( appStrings.error.REQUEST_ERROR );
								}
				}, [ error ] );
				async function onApprove(){
								await updateStatus( { loanId: borrowItem.id, status: "approved" } );
				}
				return (
								<Box
												sx = { {
																borderRadius: 2,
																width: "100%",
																p: 2,
																bgcolor: "white",
																display: "flex",
																alignItems: "center",
																cursor: "pointer",
												} }
												onClick = { () => onSelected?.( borrowItem ) }
								>
												<Grid container spacing = { 2 } alignItems = "center" width = { "100%" }>
																<Grid size = { 1 }>
																				<Box
																								sx = { {
																												width: 60,
																												height: 80,
																												display: "flex",
																												position: "relative",
																												alignItems: "center",
																												justifyContent: "center",
																								} }
																				>
																								<ImageWithBgCover src = { borrowItem.borrower?.avatarUrl } sx = { { width: "100%", height: "100%" } } />
																				</Box>
																</Grid>
																<Grid size = { 3 }>
																				<Link href = { `/borrow/${ borrowItem.id }` } onClick = { ( e ) => {e.stopPropagation();} }>
																								<Typography sx = { { textDecoration: "underline" } } variant = "h6">{ dayjs( borrowItem.borrowingDate ).format( constants.dateFormat ) }</Typography>
																				</Link>
																				<Typography variant = "body2">{ borrowItem.borrower?.fullName }, { borrowItem.borrower?.email }</Typography>
																				<Typography variant = "body2" sx = { { ...truncateTextStyle } }>{ borrowItem.note }</Typography>
																</Grid>
																{/* Usage, Format, Penalties, Charges */ }
																<Grid size = { 1 }>
																				<Typography>{ `${ borrowItem.dayUsageCount } ${ appStrings.unit.DAY }` }</Typography>
																</Grid>
																<Grid size = { 1 }>
																				<Typography>{ `${ borrowItem.bookBorrowings.length } ${ appStrings.unit.BOOK }` }</Typography>
																</Grid>
																<Grid size = { 1.5 }>
																				<Box
																								sx = { {
																												backgroundColor: getColorApprovalStatus( borrowItem.aprovalStatus ?? "pending" ),
																												width: "100%",
																												padding: "10px",
																												borderRadius: "5px",
																								} }
																				>
																								<Typography
																												sx = { { color: color.LIGHT_TEXT } }
																												fontSize = { 10 }
																												textAlign = { "center" }
																								>{ borrowItem.aprovalStatus }</Typography>
																				</Box>
																</Grid>
																<Grid size = { 2 }>
																				{/*{ status }*/ }
																</Grid>
																<Grid>
																				<Button onClick = { onApprove } loading = { isLoading } variant = "outlined" size = "small" sx = { { color: color.COMFORT, borderColor: color.COMFORT } }>
																								{ appStrings.borrow.APPROVE }
																				</Button>
																</Grid>
												</Grid>
								</Box>
				);
};
function getColorApprovalStatus( kind: LoanStatus ){
				switch( kind ){
								case "rejected":
												return color.SERIOUS;
								case "approved":
												return color.COMFORT;
								case "pending":
												return color.WARNING;
				}
}
function getColorForBorrowStatus( kind: "overdue" | "on-loan" | "returned" | "partially-returned" ){
				switch( kind ){
								case "overdue":
												return color.SERIOUS;
								case "on-loan":
												return color.PRIMARY;
								case "returned":
												return color.COMFORT;
								case "partially-returned":
												return color.WARNING;
				}
}
export default memo( BorrowItem );
