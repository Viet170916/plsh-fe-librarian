"use client";
import BorrowItem from "@/components/borrow-page/BorrowItem";
import LoanDrawer from "@/components/borrow-page/LoanDrawer";
import appStrings from "@/helpers/appStrings";
import { LoanDto } from "@/helpers/dataTransfer";
import { useAppDispatch } from "@/hooks/useDispatch";
import { setPropToLoanState } from "@/stores/slices/borrow-state/loan.slice";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { memo } from "react";

interface IProps{
				children?: React.ReactNode;
				items: LoanDto[];
}
const BorrowTable = ( props: IProps ) => {
				const dispatch = useAppDispatch();
				function onSelected( loan: LoanDto ){
								dispatch( setPropToLoanState( { key: "currentLoan", value: loan } ) );
				}
				return (
								<Box sx = { { width: "100%" } }>
												<LoanDrawer />
												<Grid container spacing = { 2 } sx = { { borderRadius: 1 } }>
																<Grid size = { 4 }>
																				<Typography variant = "subtitle1">{ appStrings.TITLE }</Typography>
																</Grid>
																<Grid size = { 1 }>
																				<Typography variant = "subtitle1">{ appStrings.borrow.USAGE_DATE_COUNT }</Typography>
																</Grid>
																<Grid size = { 1 }>
																				<Typography variant = "subtitle1">{ appStrings.book.BOOK_COUNT }</Typography>
																</Grid>
																<Grid size = { 1.5 }>
																				<Typography variant = "subtitle1">{ appStrings.borrow.STATUS }</Typography>
																</Grid>
																<Grid size = { 2 }>
																				<Typography variant = "subtitle1">{ appStrings.OTHER }</Typography>
																</Grid>
																<Grid size = { 1 }>
																				<Typography variant = "subtitle1">Action</Typography>
																</Grid>
												</Grid>
												{ props.items.map( borrowed => (
																<Box key = { borrowed.id } sx = { { mb: 1 } }>
																				<BorrowItem borrowItem = { borrowed } onSelected = { onSelected } />
																</Box>
												) ) }
								</Box>
				);
};
export default memo( BorrowTable );
