"use client";
import WebcamScanner from "@/components/primary/WebcamScanner";
import appStrings from "@/helpers/appStrings";
import { BookInstance } from "@/helpers/appType";
import { color } from "@/helpers/resources";
import { useAppDispatch } from "@/hooks/useDispatch";
import { useLazyGetBookInstancesQuery } from "@/stores/slices/api/book.api.slice";
import { addBorrowedBook } from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import { truncateMaxLineTextStyle, truncateTextStyle } from "@/style/text.style";
import { Box, Button, Dialog, LinearProgress, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import React, { JSX, memo, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

function BookSearch(): JSX.Element{
				const [ open, setOpen ] = useState<boolean>( false );
				const dispatch = useAppDispatch();
				const [ getInstancesGet, { data: InstancesData, isLoading, error } ] = useLazyGetBookInstancesQuery();
				const { control, handleSubmit } = useForm<{ isbnOrBookCode?: string, keyword?: string }>();
				async function setIsbn( value: string ){
								if( value ){
												await getInstancesGet( { isbnOrBookCode: value } );
												setOpen( false );
								}
				}
				async function submitSearch( value: { isbnOrBookCode?: string, keyword?: string } ){
								if( value.isbnOrBookCode ){
												await getInstancesGet( { isbnOrBookCode: value.isbnOrBookCode } );
								}else if( value.keyword ){
												await getInstancesGet( { keyword: value.keyword } );
								}
				}
				const bookList = useMemo( () => {
								function onSelected( instance: BookInstance ){
												dispatch( addBorrowedBook( instance ) );
								}
								return InstancesData?.data.map( instance => (
												<Box key = { instance.id } width = "100%">
																<ListItem
																				alignItems = "flex-start" onClick = { () => {
																				if( !instance.isInBorrowing ){
																								onSelected( instance );
																				}
																} }
																				sx = { {
																								cursor: instance.isInBorrowing ? "not-allowed" : "pointer",
																								opacity: instance.isInBorrowing ? .6 : 1,
																				} }
																>
																				<ListItemAvatar>
																								<Avatar alt = "Remy Sharp" src = { instance.bookThumbnail } />
																				</ListItemAvatar>
																				<Grid width = "100%" container>
																								<Grid size = { 12 } container>
																												<Grid size = { "grow" }>
																																<Typography
																																				component = "span"
																																				variant = "h6"
																																				sx = { {
																																								color: color.DARK_TEXT,
																																								fontWeight: "bold",
																																								display: 'inline', ...truncateTextStyle,
																																				} }
																																>
																																				{ instance.bookName }
																																</Typography>
																												</Grid>
																												{ instance.isInBorrowing ?
																																<Typography sx = { { color: color.SERIOUS } }>{ appStrings.CHECKED_OUT__UNAVAILABLE }</Typography> :
																																<Typography sx = { { color: color.COMFORT } }>{ appStrings.AVAILABLE }</Typography> }
																								</Grid>
																								<Grid size = { 12 }>
																												<Typography
																																component = "span"
																																variant = "h6"
																																sx = { { color: color.DARK_TEXT, display: 'inline' } }
																												>
																																{ instance.code }
																												</Typography>
																								</Grid>
																								<Grid size = { 12 }>
																												<Typography sx = { { fontSize: 12, color: color.DARK_LIGHTER_TEXT } }>
																																{ instance.bookVersion }
																												</Typography>
																								</Grid>
																								<Grid size = { 12 }>
																												<Typography sx = { { fontSize: 10, ...truncateMaxLineTextStyle( 2 ) } }>
																																{ instance.bookCategory }
																												</Typography>
																								</Grid>
																				</Grid>
																</ListItem>
																<Divider variant = "inset" component = "li" />
												</Box>
								) );
				}, [ InstancesData, dispatch ] );
				return (
								<Grid>
												<Button onClick = { () => setOpen( true ) }>{ appStrings.SCAN_BAR_CODE }</Button>
												<form onSubmit = { handleSubmit( submitSearch ) }>
																<Controller
																				control = { control } name = { "isbnOrBookCode" }
																				render = { ( { field } ) => (<TextField
																								value = { field.value ?? "" }
																								onChange = { ( e ) => field.onChange( e.target.value ) }
																								label = { appStrings.book.ENTER_ISBN }
																				/>) }
																/>
																<Button type = { "submit" }>{ appStrings.SEARCH }</Button>
												</form>
												<Dialog open = { open } onClose = { () => setOpen( false ) }>
																<WebcamScanner onScanSuccess = { setIsbn } />
												</Dialog>
												{ isLoading && <LinearProgress /> }
												{ error && <Typography>{ appStrings.error.GET_BOOK_FAIL }</Typography> }
												<List>
																{ bookList }
												</List>
								</Grid>
				);
}
export default memo( BookSearch );

