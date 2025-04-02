"use client";
import appStrings from "@/helpers/appStrings";
import { BookInstance } from "@/helpers/appType";
import { Box, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { JSX, memo, useEffect, useState } from "react";

type ListTransferProps = {
				items: readonly BookInstance[],
				disableItems: readonly BookInstance[];
				onChange?: ( value: BookInstance[] ) => void;
				noDisable?: boolean;
}
function ListTransfer( { items, disableItems, onChange, noDisable }: ListTransferProps ): JSX.Element{
				const [ checked, setChecked ] = useState<(BookInstance)[]>( [] );
				useEffect( () => {
								onChange?.( checked );
				}, [ checked, onChange ] );
				const handleToggle = ( value: BookInstance ) => () => {
								const currentIndex = checked.indexOf( value );
								const newChecked = [ ...checked ];
								if( currentIndex === -1 ){
												newChecked.push( value );
								}else{
												newChecked.splice( currentIndex, 1 );
								}
								setChecked( newChecked );
				};
				return (
								<Box>
												<List dense component = "div" role = "list">
																{ items.length > 0 ? items.map( ( value: BookInstance ) => {
																				const labelId = `transfer-list-item-${ value }-label`;
																				const isDisable = !noDisable ? ((value.rowShelfId && true) || disableItems.map( item => item.id ).includes( value.id )) : false;
																				return (
																								<ListItemButton
																												key = { value.id }
																												role = "listitem"
																												onClick = { !isDisable ? handleToggle( value ) : undefined }
																												disabled = { isDisable }
																								>
																												<ListItemText
																																id = { labelId } primary = { `${ appStrings.book.BOOK_CODE }: ${ value.code }` }
																																secondary = { `${ value.shelfPosition }` }
																												/>
																												<ListItemIcon>
																																<Checkbox
																																				checked = { checked.map( item => item.id ).includes( value.id ) }
																																				tabIndex = { -1 }
																																				disableRipple
																																				disabled = { isDisable }
																																/>
																												</ListItemIcon>
																								</ListItemButton>
																				);
																} ) : <Typography>
																				{ appStrings.shelf.SHELF_EMPTY }
																</Typography> }
												</List>
								</Box>
				);
}
export default memo( ListTransfer );

