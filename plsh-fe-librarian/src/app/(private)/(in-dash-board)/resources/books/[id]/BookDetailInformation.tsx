"use client";
import { AvailabilityItem } from "@/components/book-table/BookRowItem";
import StarRating from "@/components/primary/StarRating";
import appStrings from "@/helpers/appStrings";
import { BookData } from "@/helpers/appType";
import { color } from "@/helpers/resources";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import React, { JSX, memo } from "react";
import { FaHeadphones } from "react-icons/fa6";

interface IProps{
				book: BookData;
}
function BookDetails( { book }: IProps ): JSX.Element{
				return (
								<Box sx = { { width: "100%", position: "relative" } }>
												<Box
																sx = { {
																				display: "flex",
																				flexDirection: "column",
																				marginBottom: 3,
																} }
												>
																<Box
																				sx = { {
																								display: "flex",
																								flexDirection: "column",
																				} }
																>
																				<Typography fontSize = { 35 } sx = { { color: color.DARK_TEXT } }>
																								{ book.title }
																				</Typography>
																				<Grid width = { "100%" } container sx = { { color: color.DARK_TEXT, gap: 1 } }>
																								{ `${ appStrings.WRITE_BY }: ` }
																								<Grid size = { "grow" } maxHeight = { 70 } sx = { { overflowX: "hidden", overflowY: "auto" } }>
																												<Box
																																display = { "flex" } flexWrap = { "wrap" } width = { "100%" } height = { "fit-content" }
																																sx = { { mt: .5 } }
																												>
																																{ book.authors ? book.authors.map( author => (
																																				<Typography
																																								width = { "max-content" } variant = { "h5" }
																																								key = { `${ author.id }-${ author.fullName }` }
																																				>{ `${ author.fullName }, ` } </Typography>
																																) ) : <></> }
																												</Box>
																								</Grid>
																				</Grid>
																</Box>
																<Typography variant = "body2" sx = { { color: color.DARK_TEXT } }>
																				{ book.version }
																</Typography>
												</Box>
												<Grid
																container
																spacing = { 3 }
																justifyContent = "start"
																alignItems = "center"
												>
																<Box sx = { { display: "flex", alignItems: "center", gap: 1 } }>
																				<StarRating value = { 4 } />
																				<Typography variant = "body2" sx = { { color: "#4c4c4c" } }>
																								5.0 Ratings
																				</Typography>
																</Box>
																<Typography variant = "body2" sx = { { color: "#333333" } }>
																				25 Currently reading
																</Typography>
																<Typography variant = "body2" sx = { { color: "#333333" } }>
																				119 Have read
																</Typography>
												</Grid>
												<Box
																sx = { {
																				display: "flex",
																} }
												>
																<Box>
																				<Typography
																								variant = "body2"
																								sx = { { fontWeight: "bold", color: "#4c4c4c" } }
																				>
																								Availability
																				</Typography>
																				<List>
																								<AvailabilityItem kind = { "physical" } title = { appStrings.book.PHYSIC_BOOK } isChecked = { (book.quantity ?? 0) > 0 } />
																								<Link href = { `/resources/books/e-book/${ book.id }` } aria-disabled = { !(book.epubResource && true) }>
																												<AvailabilityItem kind = { "epub" } title = { appStrings.book.E_BOOK } isChecked = { book.epubResource && true } />
																								</Link>
																								<AvailabilityItem kind = { "audio" } title = { appStrings.book.AUDIO_BOOK } isChecked = { book.audioResource && true } />
																				</List>
																</Box>
																<Box>
																				<Typography
																								variant = "body2"
																								sx = { { fontWeight: "bold", color: "#4c4c4c" } }
																				>
																								Status
																				</Typography>
																				<List>
																								<ListItem>
																												<Button
																																variant = "contained"
																																color = "success"
																																sx = { { textTransform: "none" } }
																												>
																																In-Shelf
																												</Button>
																								</ListItem>
																								<ListItem>
																												<ListItemIcon>
																																<LocationOnIcon sx = { { color: "#4c4c4c" } } />
																												</ListItemIcon>
																												<ListItemText primary = "CS A-15" />
																								</ListItem>
																				</List>
																</Box>
												</Box>
												<Grid
																container
																width = { "100%" }
																spacing = { 3 }
												>
																<Grid size = { 6 }>
																				<Button
																								fullWidth
																								variant = "contained"
																								color = { "primary" }
																								sx = { {
																												background: color.PRIMARY + "!important",
																												height: 61,
																												borderRadius: 1,
																								} }
																				>
																								<Typography variant = "h6" sx = { { color: "white" } }>
																												BORROW
																								</Typography>
																				</Button>
																</Grid>
																<Grid size = { 6 }>
																				<Button
																								fullWidth
																								color = { "secondary" }
																								variant = "contained"
																								sx = { {
																												background: color.SECONDARY + "!important",
																												height: 61,
																												borderRadius: 1,
																								} }
																				>
																								<Grid container justifyContent = { "center" } alignItems = { "center" } spacing = { 1 }>
																												<Typography variant = "h6" sx = { { color: "white" } }>
																																Read Now
																												</Typography>
																												<FaHeadphones color = { color.WHITE } />
																								</Grid>
																				</Button>
																</Grid>
												</Grid>
								</Box>
				);
}
export default memo( BookDetails );
