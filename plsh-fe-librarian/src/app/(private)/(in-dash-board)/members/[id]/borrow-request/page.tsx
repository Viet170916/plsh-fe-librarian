import BorrowTable from "@/components/borrow-page/BorrowTable";
import appStrings from "@/helpers/appStrings";
import { LoanDto } from "@/helpers/dataTransfer";
import { Box, Stack, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React from "react";

interface IProps{
				children?: React.ReactNode;
}
const Card = async() => {
				// const [tabIndex, setTabIndex] = useState(0);
				const response: AxiosResponse<LoanDto[]> = await axios.get( `borrowing?borrowerId=2`, {
								baseURL: `http://localhost:3000/api/v1`,
				} );
				return (
								<Stack sx = { { width: "100%", borderRadius: 2 } }>
												<Box sx = { { flexGrow: 1 } }>
																<Typography fontSize = { 35 }>{ appStrings.member.BORROW_REQUEST }</Typography>
												</Box>
												<Box sx = { { flexGrow: 1 } }>
																<BorrowTable items = { response.data } />
												</Box>
								</Stack>
				);
};
export default Card;
