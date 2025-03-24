import { GRID_SIZE_HEIGHT, GRID_SIZE_WIDTH } from "@/app/(private)/(in-dash-board)/resources/library-room/shelf/row-component/config";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import appStrings from "@/helpers/appStrings";
import { BookInstance } from "@/helpers/appType";
import { color } from "@/helpers/resources";
import { truncateTextStyle } from "@/style/text.style";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Box, Card, IconButton, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { memo } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";

export const BookComponent = memo( ( { book }: { book: BookInstance } ) => {
				// const [coverWidth, setCoverWidth] = useState<number>(0);
				const { attributes, listeners, setNodeRef, transform } = useDraggable( { id: `${ book.id }` } );
				const style = {
								zIndex: 10,
								transform: transform ? `translate3d(${ transform.x }px, 0, 0)` : "none",
								width: GRID_SIZE_WIDTH,
								height: GRID_SIZE_HEIGHT,
				};
				return (
								<motion.div ref = { setNodeRef } style = { style }  { ...attributes }>
												<Box
																onMouseEnter = { () => {
																				// setCoverWidth(100)
																} }
																onMouseLeave = { () => {
																				// setCoverWidth(0)
																} }
																sx = { {
																				borderRadius: 1,
																				textAlign: "center",
																				height: GRID_SIZE_HEIGHT,
																				display: "flex",
																				alignItems: "center",
																				justifyContent: "center",
																				position: "relative",
																} }
												>
																<Tooltip
																				title = { <Grid container spacing = { 1 }>
																								<Grid size = { "grow" } justifyContent = { "center" } alignItems = { "center" }>
																												<Link href = { `/resources/books/${ book.bookId }` }>
																																<Typography sx = { { textDecoration: "underline", fontWeight: "bold" } } variant = { "h6" }>{ appStrings.book.NAME }: { book.bookName }</Typography>
																												</Link>
																												<Typography variant = { "h6" }>{ appStrings.book.CATEGORY }: { book.bookCategory }</Typography>
																												<Typography variant = { "h6" }>{ appStrings.book.VERSION }: { book.bookVersion }</Typography>
																												<Typography variant = { "h6" }>{ appStrings.book.CODE }: { book.code }</Typography>
																								</Grid>
																								<ImageWithBgCover sx = { { width: 70, height: 100 } } src = { book.bookThumbnail ?? "" } />
																				</Grid> }
																>
																				<Card
																								sx = { {
																												display: "flex",
																												width: GRID_SIZE_WIDTH, height: "100%",
																												justifyContent: "center",
																												alignItems: "center",
																								} }
																				>
																								<Typography
																												variant = "body2"
																												sx = { {
																																transform: 'rotate(90deg)',
																																textAlign: "center",
																																justifySelf: "center",
																																alignItems: "center",
																																...truncateTextStyle,
																												} }
																								>{ book.bookName }</Typography>
																				</Card>
																</Tooltip>
																<IconButton
																				sx = { { position: 'absolute', transform: 'rotate(90deg)', right: -10, top: -10 } }  { ...listeners }>
																				<RxDragHandleDots2 />
																</IconButton>
																{/*<Box sx={{*/ }
																{/*    width: coverWidth,*/ }
																{/*    height: "100%",*/ }
																{/*    backgroundColor: color.WHITE,*/ }
																{/*    position: "absolute",*/ }
																{/*    left: 0,*/ }
																{/*    transition: 300,*/ }
																{/*    zIndex: 999,*/ }
																{/*}}*/ }
																{/*     onMouseLeave={() => {*/ }
																{/*         setCoverWidth(0)*/ }
																{/*     }}>*/ }
																{/*</Box>*/ }
												</Box>
								</motion.div>
				);
} );
export const DroppableGrid = memo( ( { index, bookOnRowShelf }: { index: number; bookOnRowShelf?: BookInstance } ) => {
				const { setNodeRef } = useDroppable( { id: `${ index }` } );
				// const bookInSlot = books.find((b) => b.position === index);
				return (
								<Grid
												ref = { setNodeRef }
												sx = { {
																width: GRID_SIZE_WIDTH,
																height: GRID_SIZE_HEIGHT,
																border: "1px dashed",
																borderColor: color.PRIMARY,
																borderRadius: 1,
																display: "flex",
																alignItems: "center",
																justifyContent: "center",
																position: "relative",
												} }
								>
												{ bookOnRowShelf ? <BookComponent book = { bookOnRowShelf } /> : index }
								</Grid>
				);
} );
