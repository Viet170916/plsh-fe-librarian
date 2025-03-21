import EbookView from "@/app/(private)/(in-dash-board)/resources/books/e-book/[id]/EbookView";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

type IProps = {
				params: Promise<{ id: number }>
}
export default async function page( { params }: IProps ){
				const { id } = await params;
				return (
								<Box minHeight = { "100%" } maxHeight = { "100%" } flexGrow={1}>
												<EbookView />
								</Box>
				);
}
