"use client";
import { color } from "@/helpers/resources";
import { useGetEpubResourceQuery } from "@/stores/slices/api/resource.static.slice";
import { ArrowBack, ArrowForward, Favorite, Fullscreen } from "@mui/icons-material";
import { Box, Button, IconButton, Paper, SxProps, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";

const bookPaperStyle: SxProps = {
				"h1": {
								color: color.PRIMARY,
								fontSize: 24,
								fontWeight: "bold",
				},
				"p": {
								marginBottom: "5px!important",
								fontSize: 24,
				},
};
// const BOOK_API = "https://book-hive-api.space/static/v1/preview/book/epub/smith-vortex-blaster.epub?chapter=4";
interface EbookViewProps{bookId: number;}
export default function EbookView( { bookId }: EbookViewProps ){
				const [ chapter, setChapter ] = useState<number>( 1 );
				const { data } = useGetEpubResourceQuery( { bookId, chapter: chapter } );
				const [ pages, setPages ] = useState<string[][]>( [] );
				const [ currentPage, setCurrentPage ] = useState( 0 );
				useEffect( () => {
								console.log( data );
								if( data ){
												const container = document.createElement( "div" );
												container.innerHTML = data;
												console.log( data );
												paginateContent( container.innerHTML );
								}
				}, [ data ] );
				const paginateContent = ( html: string ) => {
								const pageSize = 1000; // Adjust this value based on content length
								const pages = [];
								for( let i = 0; i < html.length; i += pageSize * 2 ){
												pages.push( [
																html.slice( i, i + pageSize ),
																html.slice( i + pageSize, i + pageSize * 2 ),
												] );
								}
								setPages( pages );
								setCurrentPage( 0 );
				};
				return (
								<Grid container direction = { "column" } sx = { { py: 4, width: "100%", height: "100%" } }>
												<Box display = "flex" alignItems = "center" mb = { 2 }>
																<IconButton><ArrowBack /></IconButton>
																<Typography variant = "h6" sx = { { flexGrow: 1, textAlign: "center" } }>INTRODUCTION</Typography>
																<IconButton><Favorite /></IconButton>
																<IconButton><Fullscreen /></IconButton>
												</Box>
												<Grid size = { "grow" }>
																<Paper elevation = { 3 } sx = { { ...bookPaperStyle, p: 4, height: "100%", display: "flex", gap: 2 } }>
																				<Box
																								sx = { { width: "50%", height: "100%", pr: 2, borderRight: "1px solid #ddd" } }
																								dangerouslySetInnerHTML = { { __html: pages.length > 0 ? pages[currentPage][0] : "Loading..." } }
																				/>
																				<Box
																								sx = { { width: "50%", height: "100%", pl: 2 } }
																								dangerouslySetInnerHTML = { { __html: pages.length > 0 ? pages[currentPage][1] : "" } }
																				/>
																</Paper>
												</Grid>
												<Box display = "flex" justifyContent = "space-between" mt = { 2 }>
																<Button
																				variant = "contained"
																				onClick = { () => setChapter( ( prev ) => prev - 1 ) }
																>
																				<ArrowBack /> Prev Chapter
																</Button>
																<Button
																				variant = "contained"
																				disabled = { currentPage === 0 }
																				onClick = { () => setCurrentPage( ( prev ) => prev - 1 ) }
																>
																				<ArrowBack /> Prev
																</Button>
																<Typography>Page { currentPage + 1 } / { pages.length }</Typography>
																<Button
																				variant = "contained"
																				disabled = { currentPage === pages.length - 1 }
																				onClick = { () => setCurrentPage( ( prev ) => prev + 1 ) }
																>
																				Next <ArrowForward />
																</Button>
																<Button
																				variant = "contained"
																				onClick = { () => setChapter( ( prev ) => prev + 1 ) }
																>
																				Next Chapter <ArrowForward />
																</Button>
												</Box>
								</Grid>
				);
}
