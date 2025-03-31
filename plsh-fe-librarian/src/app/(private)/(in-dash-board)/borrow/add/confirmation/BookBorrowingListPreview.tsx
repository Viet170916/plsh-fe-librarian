"use client";
import { useAppDispatch } from "@/hooks/useDispatch";
import { useSelector } from "@/hooks/useSelector";
import { setPropToBorrow } from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import { truncateTextStyle } from "@/style/text.style";
import { Avatar, Card, List, ListItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import React, { JSX, memo } from "react";

type BookBorrowingListPreviewProps = {
				children?: React.ReactNode;
}
function BookBorrowingListPreview( { children }: BookBorrowingListPreviewProps ): JSX.Element{
				dayjs.locale( "vi" );
				// dayjs.extend( localizedFormat );
				const booksBorrowed = useSelector( state => state.addEditBorrowData.borrowedBooks );
				const dispatch = useAppDispatch();
				return (
								<Grid container spacing = { 2 } width = { "100%" }>
												<Grid size = { 12 }>
																<Typography variant = "h3">Sách đã mượn</Typography>
												</Grid>
												<List sx = { { width: "100%" } }>
																{ booksBorrowed.map( ( book ) => (
																				<ListItem
																								sx = { { cursor: "pointer" } }
																								key = { book.bookInstance.id }
																								onClick = { () => dispatch( setPropToBorrow( { key: "selectedBookId", value: book.bookInstance.id } ) ) }
																				>
																								<Card sx = { { p: 2, borderRadius: 4 } }>
																												<Grid container width = { "100%" } spacing = { 2 }>
																																<Avatar src = { book.bookInstance.bookThumbnail } />
																																<Grid size = "grow">
																																				<Typography variant = { "h5" } fontWeight = { "bold" } sx = { { ...truncateTextStyle } }>
																																								{ book.bookInstance.bookName }
																																				</Typography>
																																				<Typography variant = { "h6" } fontWeight = { "lighter" } sx = { { ...truncateTextStyle } }>
																																								{ `Thời gian: ${ dayjs( book.borrowDateRange.start ).format( "HH:mm dddd [ngày] D [tháng] M, YYYY" ) } - ${ dayjs( book.borrowDateRange.end ).format( "HH:mm dddd [ngày] D [tháng] M, YYYY" ) }` }
																																				</Typography>
																																</Grid>
																												</Grid>
																								</Card>
																				</ListItem>
																) ) }
												</List>
								</Grid>
				);
}
export default memo( BookBorrowingListPreview );

