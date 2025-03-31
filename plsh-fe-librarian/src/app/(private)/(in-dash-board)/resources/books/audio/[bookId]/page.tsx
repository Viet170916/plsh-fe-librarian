import Reader from "@/app/(private)/(in-dash-board)/resources/books/audio/TextContainer";
import Grid from "@mui/material/Grid2";
import React from "react";

type pageProps = {
				params: Promise<{ bookId: number }>
}
async function page( { params }: pageProps ){
				const { bookId } = await params;
				return (
								<Grid>
												<Reader />
								</Grid>
				);
}
export default page;

