import BookBorrowingListPreview from "@/app/(private)/(in-dash-board)/borrow/add/confirmation/BookBorrowingListPreview";
import BorrowingInformationPreview from "@/app/(private)/(in-dash-board)/borrow/add/confirmation/BorrowingInformationPreview";
import Grid from "@mui/material/Grid2";
import React, { JSX } from "react";

function page(): JSX.Element{
				return (
								<Grid width = { "100%" } container padding = { 4 }>
												<Grid size = { 6 }>
																<BookBorrowingListPreview />
												</Grid>
												<Grid size = { 6 }>
																<BorrowingInformationPreview />
												</Grid>
								</Grid>
				);
}
export default page;

