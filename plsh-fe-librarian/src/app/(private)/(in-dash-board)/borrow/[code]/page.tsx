import Borrower from "@/app/(private)/(in-dash-board)/borrow/[code]/Borrower";
import ClientRender from "@/app/(private)/(in-dash-board)/borrow/[code]/ClientRender";
import LoanInfo from "@/app/(private)/(in-dash-board)/borrow/[code]/LoanInfo";
import { color } from "@/helpers/resources";
import Grid from "@mui/material/Grid2";
import React from "react";

interface IProps{
				children?: React.ReactNode;
}
async function BorrowInfoPage( props: {
				params: Promise<{ code: number }>
} ){
				const params = await props.params;
				// const response: AxiosResponse<BorrowItemData> = await axios.get( `http://localhost:3000/api/v1/borrowing/${ params.code }`, {
				// 				// baseURL: "http://localhost:3000/api/v1/",
				// } );
				// const statusInfo = (() => {
				// 				switch( response.data.status.kind ){
				// 								case "partially-returned":
				// 												return (
				// 																<Box sx = { { paddingLeft: 5 } }>
				// 																				<Typography variant = "body2">
				// 																								{ appStrings.borrow.LEFT }: { response.data.status.leftCount }
				// 																				</Typography>
				// 																				<Typography variant = "body2">
				// 																								{ appStrings.borrow.RETURNED }: { response.data.status.returnedCount }
				// 																				</Typography>
				// 																				<Typography variant = "body2">
				// 																								{ appStrings.TOTAL_BOOK }: { response.data.status.total }
				// 																				</Typography>
				// 																</Box>
				// 												);
				// 				}
				// })();
				function getStatusColor( kind: "partially-returned" | "returned" | "overdue" | "on-loan" ){
								switch( kind ){
												case "partially-returned":
																return color.WARNING;
												case "returned":
																return color.COMFORT;
												case "on-loan":
																return color.PRIMARY;
												case "overdue":
																return color.SERIOUS;
								}
				}
				return (
								<Grid container spacing = { 2 }>
												<ClientRender code = { params.code } />
												<Grid size = { 12 } container width = { "100%" } padding = { 4 }>
																<Grid size = { { xl: 12 } }>
																				<a href = { "" }>
																								{/*<Typography variant = "h1" fontWeight = { "bold" } sx = { { textDecoration: "underline" } } paddingBottom = { 2 }>*/ }
																								{/*				{ response.data.code }*/ }
																								{/*</Typography>*/ }
																				</a>
																				{/*<Typography variant = "h4">*/ }
																				{/*				{ appStrings.borrow.BORROW_DATE }: { formatDate( response.data.borrowDate ) }*/ }
																				{/*</Typography>*/ }
																				{/*<Box sx={{paddingTop: 1, paddingBottom: 1}}>*/ }
																				{/*    {statusInfo}*/ }
																				{/*    <Typography variant="h4" sx={{*/ }
																				{/*        borderRadius: 1,*/ }
																				{/*        padding: "12px 20px",*/ }
																				{/*        width: "fit-content",*/ }
																				{/*        color: color.LIGHT_TEXT,*/ }
																				{/*        background: getStatusColor(response.data.status.kind)*/ }
																				{/*    }}>*/ }
																				{/*        {response.data.status.title}*/ }
																				{/*    </Typography>*/ }
																				{/*</Box>*/ }
																				{/*<Button fullWidth variant="contained" sx={{color: color.LIGHT_TEXT}}>*/ }
																				{/*    a*/ }
																				{/*</Button>*/ }
																</Grid>
																<Grid size = { 12 }>
																				<Borrower />
																</Grid>
												</Grid>
												<LoanInfo />
								</Grid>
				);
}
export default BorrowInfoPage;
