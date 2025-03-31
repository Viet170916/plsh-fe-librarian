"use client";
import { BorrowNote, BorrowStatus, DateRangeEnd, DateRangeStart, ImageSelected, ImagesPreview } from "@/app/(private)/(in-dash-board)/borrow/add/borrow.form.input.components";
import appStrings from "@/helpers/appStrings";
import { color } from "@/helpers/resources";
import { BorrowedBookData, selectCurrentBookBorrowed } from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import { RootState } from "@/stores/store";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";

interface IProps{
				onSubmit?: ( values: BorrowedBookData ) => void;
}
const Form = memo( ( { selectedBook }: { selectedBook?: BorrowedBookData } ) => {
				return (
								<Grid container spacing = { 2 }>
												{ selectedBook?.bookInstance ? <><TextField
																				fullWidth margin = "dense"
																				value = { selectedBook.bookInstance.code }
																				disabled
																				label = { appStrings.book.CODE }
																				variant = "outlined"
																/>
																				<TextField
																								fullWidth margin = "dense"
																								value = { selectedBook.bookInstance.bookName }
																								disabled label = { appStrings.book.NAME }
																								variant = "outlined"
																				/>
																				<Grid container spacing = { 2 } size = { 12 }>
																								<DateRangeStart bookInstanceId = { selectedBook.bookInstance.id as number } />
																								<DateRangeEnd bookInstanceId = { selectedBook.bookInstance.id as number } />
																								<Grid width = { "100%" } container spacing = { 2 }>
																												<Typography variant = { "h2" } fontWeight = { "bold" }>
																																{ appStrings.borrow.BOOK_DAMAGE_BEFORE_BORROW }
																												</Typography>
																												<BorrowNote bookInstanceId = { selectedBook.bookInstance.id as number } />
																												<BorrowStatus bookInstanceId = { selectedBook.bookInstance.id as number } />
																												<Typography variant = { "h5" }>
																																{ appStrings.borrow.BOOK_IMAGE_BEFORE_BORROW }
																												</Typography>
																												<ImageSelected selectedBookId = { selectedBook.bookInstance.id as number } />
																												<ImagesPreview selectedBookId = { selectedBook.bookInstance.id as number } />
																								</Grid>
																				</Grid>
																</> :
																<Typography variant = { "h4" } sx = { { color: color.PRIMARY, fontWeight: "bold" } }>
																				{ appStrings.borrow.NO_BOOK_SELECTED }
																</Typography>
												}
								</Grid>
				);
} );
function AddEditBorrowForm(){
				const selectedBook = useSelector( ( state: RootState ) => selectCurrentBookBorrowed( state ), shallowEqual );
				return (
								<Grid>
												<Form selectedBook = { selectedBook } />
								</Grid>
				);
}
export default memo( AddEditBorrowForm );
