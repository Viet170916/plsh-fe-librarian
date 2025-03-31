"use client";
import { appToaster } from "@/components/primary/toaster";
import appStrings from "@/helpers/appStrings";
import { constants } from "@/helpers/constants";
import { LoanStatus } from "@/helpers/dataTransfer";
import { useAppDispatch } from "@/hooks/useDispatch";
import { useUpdateLoanStatusMutation } from "@/stores/slices/api/borrow.api.slice";
import { setPropToLoanState } from "@/stores/slices/borrow-state/loan.slice";
import { RootState } from "@/stores/store";
import { Button, Drawer, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import React, { memo, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";

const LoanDrawer = () => {
				dayjs.locale( "vi" );
				const dispatch = useAppDispatch();
				const loan = useSelector( ( state: RootState ) => state.loanState.currentLoan, shallowEqual );
				const [ updateLoanStatus, { error, data } ] = useUpdateLoanStatusMutation();
				const handleUpdateStatus = async( status: LoanStatus ) => {
								if( loan?.id ){
												const response = await updateLoanStatus( { loanId: loan?.id, status } );
												if( response.data ){
																dispatch( setPropToLoanState( { key: "currentLoan", value: undefined } ) );
												}
								}
				};
				function onClose(){
								dispatch( setPropToLoanState( { key: "currentLoan", value: undefined } ) );
				}
				function handleReturnAll(){
				}
				useEffect( () => {
								if( data ){
												appToaster.success( data.message );
								}
				}, [ data ] );
				useEffect( () => {
								if( error ){
												appToaster.success( appStrings.error.APPROVE_FAIL );
								}
				}, [ error ] );
				return (
								<Grid>
												<Drawer anchor = "right" open = { (loan && true) } onClose = { onClose }>
																<Stack spacing = { 2 } padding = { 2 } width = { 400 }>
																				<Typography variant = "h6">{ appStrings.borrow.INFO }</Typography>
																				<Typography>ID: { loan?.id }</Typography>
																				<Typography>{ appStrings.NOTE }: { loan?.note }</Typography>
																				<Typography>{ appStrings.borrow.BORROWER }: { loan?.borrower?.fullName || "N/A" }</Typography>
																				{/*<Typography>Thủ thư: { loan.librarianId }</Typography>*/ }
																				<Typography>{ appStrings.borrow.BORROW_DATE }: { dayjs( loan?.borrowingDate ).format( constants.dateFormat ) }</Typography>
																				{/*<Typography>Ngày trả: { loan.returnDate || "Chưa trả" }</Typography>*/ }
																				<Typography>{ appStrings.STATUS }: { getLoanStatusText( loan?.aprovalStatus ) }</Typography>
																				<Typography>
																								Số lần gia hạn: { loan?.extensionCount }
																				</Typography>
																				{ loan?.isReturnAll ? null : (
																								<Stack spacing = { 1 }>
																												{ loan?.aprovalStatus === "pending" && (
																																<>
																																				<Button
																																								variant = "contained"
																																								color = "primary"
																																								onClick = { () => handleUpdateStatus( "approved" ) }
																																				>
																																								Duyệt
																																				</Button>
																																				<Button
																																								variant = "contained"
																																								color = "error"
																																								onClick = { () => handleUpdateStatus( "rejected" ) }
																																				>
																																								Từ chối
																																				</Button>
																																</>
																												) }
																												{ loan?.aprovalStatus === "approved" && (
																																<Button
																																				variant = "contained"
																																				color = "success"
																																				onClick = { handleReturnAll }
																																>
																																				Xác nhận trả sách
																																</Button>
																												) }
																												{ loan?.aprovalStatus === "rejected" && (
																																<Button
																																				variant = "contained"
																																				color = "primary"
																																				onClick = { () => handleUpdateStatus( "approved" ) }
																																>
																																				Phê duyệt lại
																																</Button>
																												) }
																								</Stack>
																				) }
																</Stack>
												</Drawer>
								</Grid>
				);
};
const getLoanStatusText = ( status?: LoanStatus ) => {
				switch( status ){
								case "pending":
												return appStrings.borrow.STATUS_PENDING;
								case "approved":
												return appStrings.borrow.APPROVE;
								case "rejected":
												return appStrings.borrow.STATUS_REJECTED;
								default:
												return "Không xác định";
				}
};
export default memo( LoanDrawer );
