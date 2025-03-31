"use client";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import appStrings from "@/helpers/appStrings";
import { constants } from "@/helpers/constants";
import { BookBorrowingDto } from "@/helpers/dataTransfer";
import { color } from "@/helpers/resources";
import { truncateTextStyle } from "@/style/text.style";
import { Box, Button, ButtonGroup, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import Link from "next/link";
import React, { memo, useMemo } from "react";
// import { FaBook, FaBookAtlas, FaHeadphones } from "react-icons/fa6";
interface IProps{
				borrowedBook: BookBorrowingDto;
				onSelected?: ( borrowedBook: BookBorrowingDto ) => void;
}
function BorrowedBookItem( { borrowedBook, onSelected }: IProps ){
				const handleSelected = () => {
								onSelected?.( borrowedBook );
				};
				const avaiButtons = useMemo( () => {
								return (<></>);
								// return (borrowedBook.book?.availabilities.map( a => {
								// 								if( a.kind === "epub" ) return (
								// 												<Tooltip key = { a.kind } title = { appStrings.book.E_BOOK }>
								// 																<Button variant = "outlined" color = "primary" fullWidth>
								// 																				<FaBookAtlas />
								// 																</Button>
								// 												</Tooltip>
								// 								);
								// 								else if( a.kind === "audio" ) return (
								// 												<Tooltip key = { a.kind } title = { appStrings.book.AUDIO_BOOK }>
								// 																<Button variant = "outlined" color = "primary" fullWidth>
								// 																				{ (a.kind === "audio" && <FaHeadphones />) }
								// 																</Button>
								// 												</Tooltip>);
								// 								else if( a.kind === "physical" ) return (
								// 												<Tooltip key = { a.kind } title = { appStrings.book.PHYSIC_BOOK }>
								// 																<Button variant = "outlined" color = "primary" fullWidth>
								// 																				<FaBook />
								// 																</Button>
								// 												</Tooltip>
								// 								);
								// 				},
								// ));
				}, [] );
				return (
								<Card sx = { { maxWidth: 400, p: 2, borderRadius: 3, boxShadow: 3, cursor: "pointer" } } onClick = { handleSelected }>
												<Grid container spacing = { 2 }>
																<Grid size = { 5.5 } container spacing = { 1 }>
																				<ImageWithBgCover sx = { { height: 200, with: "100%" } } src = { borrowedBook.bookInstance?.bookThumbnail } />
																				<Link href = { `/resources/books/${ borrowedBook.bookInstance?.bookId }` }>
																								<Typography
																												sx = { { textDecoration: "underline", ...truncateTextStyle } } variant = "h5"
																												fontWeight = "normal"
																								>
																												{ borrowedBook.bookInstance?.bookName }
																								</Typography>
																								<Typography variant = "h6" fontWeight = { "lighter" } color = "text.secondary">
																												{ `${ borrowedBook.bookInstance?.bookAuthor }`
																																// ${ borrowedBook.book?.authors?.[0]?.birthYear && borrowedBook.book?.authors[0]?.deathYear ? `,${ borrowedBook.book?.authors[0]?.birthYear }-${ borrowedBook.book?.authors[0]?.deathYear }` : (borrowedBook.book?.authors[0]?.birthYear ? `,${ borrowedBook.book?.authors[0]?.birthYear }` : "") }`
																												}
																								</Typography>
																				</Link>
																</Grid>
																<Grid size = { "grow" }>
																				<CardContent
																								sx = { {
																												padding: 0,
																												paddingBottom: "0!important",
																												display: "grid",
																												alignItems: "space-between",
																												height: "100%",
																								} }
																				>
																								<Box>
																												<Typography variant = "body2" fontWeight = "normal">
																																{ appStrings.book.CODE }
																												</Typography>
																												<Typography variant = "body2" fontWeight = { "lighter" } color = "text.secondary">
																																{ borrowedBook.bookInstance?.code }
																												</Typography>
																								</Box>
																								<Box>
																												<Typography variant = "body2" fontWeight = "normal">
																																{ appStrings.borrow.BORROW_DATE }
																												</Typography>
																												<Typography variant = "body2" fontWeight = { "lighter" } color = "text.secondary">
																																{ dayjs( borrowedBook.borrowDate ).format( constants.dateFormat ) }
																												</Typography>
																								</Box>
																								<Box>
																												<Typography variant = "body2" fontWeight = "normal">
																																{ appStrings.borrow.DUE_DATE }
																												</Typography>
																												<Typography variant = "body2" fontWeight = { "lighter" } color = "text.secondary">
																																{ dayjs( borrowedBook.returnDates?.[borrowedBook.returnDates.length - 1] ).format( constants.dateFormat ) }
																												</Typography>
																												{
																																(dayjs( borrowedBook.returnDates[borrowedBook.returnDates.length - 1] )) < (dayjs()) ?
																																				<Typography fontSize = { 10 } fontWeight = { "lighter" } sx = { { color: color.SERIOUS } }>
																																								({ appStrings.OVERDUE })
																																				</Typography> : <></>
																												}
																								</Box>
																								<Grid container spacing = { 2 }>
																												{
																																(() => {
																																				switch( borrowedBook.borrowingStatus ){
																																								case "on-loan":
																																												return (
																																																<Button
																																																				variant = "contained"
																																																				sx = { { backgroundColor: color.WARNING, color: color.LIGHT_TEXT } }
																																																				fullWidth
																																																>
																																																				{ borrowedBook.borrowingStatus }
																																																				{/*<Typography*/ }
																																																				{/*    variant={"h6"}>({appStrings.borrow.DUE_DATE}: {borrowedBook.borrowStatus.dayLeftCount}){appStrings.unit.DAY}*/ }
																																																				{/*</Typography>*/ }
																																																</Button>);
																																								case "returned":
																																												return (
																																																<Button
																																																				variant = "contained"
																																																				sx = { { background: color.COMFORT, color: color.LIGHT_TEXT } }
																																																				fullWidth
																																																>
																																																				{ borrowedBook.borrowingStatus }
																																																</Button>);
																																								case "overdue":
																																												return (
																																																<Button
																																																				variant = "contained"
																																																				sx = { { background: color.SERIOUS, color: color.LIGHT_TEXT } }
																																																				fullWidth
																																																>
																																																				{ borrowedBook.borrowingStatus }
																																																				<Typography
																																																								fontSize = { 9 }
																																																				> ({ borrowedBook.overdueDays ?? 0 } { appStrings.unit.DAY })
																																																				</Typography>
																																																</Button>);
																																				}
																																})()
																												}
																												{/*<Button variant="contained" color="success" fullWidth>*/ }
																												{/*    {borrowedBook.borrowStatus?.title}*/ }
																												{/*</Button>*/ }
																												<ButtonGroup size = "small" fullWidth>
																																{ avaiButtons }
																												</ButtonGroup>
																								</Grid>
																				</CardContent>
																</Grid>
												</Grid>
								</Card>
				);
}
export default memo( BorrowedBookItem );
