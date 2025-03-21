import BookAuthor from "@/app/(private)/(in-dash-board)/resources/books/[id]/BookAuthor";
import BookDetails from "@/app/(private)/(in-dash-board)/resources/books/[id]/BookDetailInformation";
import BookImage from "@/app/(private)/(in-dash-board)/resources/books/[id]/BookImage";
import BookLinks from "@/app/(private)/(in-dash-board)/resources/books/[id]/BookLinks";
import { color } from "@/helpers/resources";
import { getBooks } from "@/request/book";
import { Fab, SxProps } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import React from "react";
import { TbEdit } from "react-icons/tb";
import BookOverviewTabs from "./overviewTabs";

interface IProps{
				params: Promise<{ id: number }>;
}
async function BookDetailPage( props: IProps ){
				const fabStyle = {
								position: 'absolute',
								bottom: 16,
								right: 16,
								color: color.LIGHT_TEXT,
								bgcolor: color.FOUR,
								opacity: .8,
								'&:hover': {
												bgcolor: color.FOUR,
												opacity: 1,
								},
				};
				const fab =
								{
												color: color.PRIMARY,
												sx: fabStyle as SxProps,
												icon: <TbEdit />,
												label: 'Add',
								};
				const { id } = await props.params;
				const bookResponse = await getBooks( id );
				return (
								<Grid direction = "row" container spacing = { 2 }>
												<Grid size = { { xl: 3, xs: 4 } }>
																<BookImage src = { bookResponse.data.thumbnail ?? "" } />
												</Grid>
												<Grid size = { { xl: 5, xs: 8 } }>
																<BookDetails book = { bookResponse.data } />
												</Grid>
												<Grid size = { { xl: 4, sm: 8 } }>
																<BookAuthor />
												</Grid>
												<Grid size = { { xl: 3, sm: 4 } }>
																<BookLinks />
												</Grid>
												<Grid size = { { xl: 9, sm: 12 } }>
																<BookOverviewTabs book = { bookResponse.data } />
												</Grid>
												<Link href = { `/resources/books/${ bookResponse.data.id }/edit` }>
																<Fab sx = { fab.sx } aria-label = { fab.label }>
																				{ fab.icon }
																</Fab>
												</Link>
								</Grid>
				);
}
export default BookDetailPage;
