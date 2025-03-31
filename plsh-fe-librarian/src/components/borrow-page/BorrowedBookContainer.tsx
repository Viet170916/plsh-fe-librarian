import BookBorrowingDrawer from "@/app/(private)/(in-dash-board)/borrow/[code]/BookBorrowingEditForm";
import BorrowedBookItem from "@/components/borrow-page/BorrowedBookItem";
import { BookBorrowingDto } from "@/helpers/dataTransfer";
import { color } from "@/helpers/resources";
import { useAppDispatch } from "@/hooks/useDispatch";
import { setPropToLoanState } from "@/stores/slices/borrow-state/loan.slice";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { memo, useCallback } from "react";

interface IProps{
				borrowedBook: BookBorrowingDto[];
}
function BorrowedBookContainer( props: IProps ){
				const dispatch = useAppDispatch();
				const handleSelect = useCallback( ( bookSelected: BookBorrowingDto ) => {
								dispatch( setPropToLoanState( { key: "currenBookBorrowing", value: bookSelected } ) );
				}, [ dispatch ] );
				return (
								<Container>
												<BookBorrowingDrawer />
												<Typography variant = "h5" fontWeight = "bold" mt = { 3 } mb = { 2 }>
																Sách đ<span style = { { color: color.PRIMARY } }>ã mượn</span>
												</Typography>
												<Grid container spacing = { 3 }>
																{ props.borrowedBook.map( ( book ) => (
																				<Grid key = { book.id } spacing = { 2 } size = { { xs: 12, sm: 7, md: 5, lg: 4 } }>
																								<BorrowedBookItem borrowedBook = { book } onSelected = { handleSelect } />
																				</Grid>
																) ) }
												</Grid>
								</Container>);
}
const EditBookSelected = memo( () => {
				return (
								<></>
				);
} );
export default memo( BorrowedBookContainer );
