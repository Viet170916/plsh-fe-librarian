"use client";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import { color } from "@/helpers/resources";
import { useAppDispatch } from "@/hooks/useDispatch";
import { useSelector } from "@/hooks/useSelector";
import { BorrowedBookData, setPropToBorrow } from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import { truncateTextStyle } from "@/style/text.style";
import { CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { memo } from "react";
import { shallowEqual } from "react-redux";

interface IProps{
				children?: React.ReactNode;
}
function SelectedBook( props: IProps ){
				const dispatch = useAppDispatch();
				const bookSelected = useSelector( state => state.addEditBorrowData.borrowedBooks, shallowEqual );
				function onBookSelected( book: BorrowedBookData ){
								dispatch( setPropToBorrow( { key: "selectedBookId", value: book.bookInstance.id } ) );
				}
				return (
								<Grid container spacing = { 2 }>
												{ bookSelected.map( ( book, index ) => (
																<Grid size = { 4 } key = { index } sx = { { borderRadius: 2, bg: color.WHITE, cursor: "pointer" } } onClick = { () => onBookSelected( book ) }>
																				<ImageWithBgCover src = { book.bookInstance.bookThumbnail } sx = { { width: "100%", height: 200 } } />
																				<CardContent>
																								<Typography variant = "h5" fontWeight = { "bold" } sx = { { ...truncateTextStyle } }>{ book.bookInstance.bookName }</Typography>
																								<Typography variant = "caption">{ book.bookInstance.code }</Typography>
																								<Typography variant = "h6" fontWeight = { "lighter" }>{ book.bookInstance.bookVersion }</Typography>
																				</CardContent>
																</Grid>
												) ) }
								</Grid>);
}
export default memo( SelectedBook );
