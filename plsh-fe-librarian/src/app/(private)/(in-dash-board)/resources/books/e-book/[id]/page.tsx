import EbookView from "@/app/(private)/(in-dash-board)/resources/books/e-book/[id]/EbookView";
import appStrings from "@/helpers/appStrings";
import { Box } from "@mui/material";
import React from "react";

export const metadata = {
				title: appStrings.book.E_BOOK,
				icons: {
								icon: "/images/logo.svg",
				},
};
type IProps = {
				params: Promise<{ id: number }>
}
export default async function page( { params }: IProps ){
				const { id } = await params;
				return (
								<Box minHeight = { "100%" } maxHeight = { "100%" } flexGrow = { 1 }>
												<EbookView bookId = { id } />
								</Box>
				);
}
