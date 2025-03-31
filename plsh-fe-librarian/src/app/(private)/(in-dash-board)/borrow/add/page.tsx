import AddEditBorrowForm from "@/app/(private)/(in-dash-board)/borrow/add/AddEditBorrowForm";
import BookSearch from "@/app/(private)/(in-dash-board)/borrow/add/book.search";
import SelectedBooks from "@/app/(private)/(in-dash-board)/borrow/add/SelectedBooks";
import appStrings from "@/helpers/appStrings";
import { color } from "@/helpers/resources";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

interface IProps{
				children?: React.ReactNode;
}
async function AddBorrowPage( {} ){
				return (
								<Grid spacing = { 2 } container sx = { { p: 4, width: "100%" } }>
												{/* Form Section */ }
												<Grid size = { 4.5 } sx = { { p: 3, bgcolor: color.WHITE, borderRadius: 2 } } minHeight = { 400 }>
																<Typography variant = "h2" gutterBottom>{ appStrings.borrow.EDIT_BOOK_SELECTED }</Typography>
																<AddEditBorrowForm />
												</Grid>
												{/* Contribution List */ }
												<Grid size = { "grow" }>
																<Typography variant = "h4" fontWeight = "bold">
																				Your <span style = { { color: "#e66a4e" } }>Contribution</span>
																</Typography>
																<Typography variant = "h4" gutterBottom>Helps Other to Learn</Typography>
																<Typography variant = "h6" gutterBottom>Your Previous Contributions</Typography>
																<BookSearch />
																<SelectedBooks />
												</Grid>
								</Grid>
				);
}
export default AddBorrowPage;
