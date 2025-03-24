import LeftBookInstanceOnShelfList from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add_edit-detail/left.BookInstanceOnShelfList";
import RightBookInstanceInStoreList from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add_edit-detail/right.BookInstanceInStoreList";
import ShelfSelection from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add_edit-detail/ShelfSelection";
import appStrings from "@/helpers/appStrings";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import React, { memo, useCallback, useState } from "react";

interface IProps{
				bookId: number;
}
function Detail( { bookId }: IProps ){
				const [ rowShelfInfo, setRowShelfInfo ] = useState<{ rowShelfId: number; shelfId: number } | undefined>();
				const onSelect = useCallback( ( value: string | null ) => {
								if( value?.includes( "row" ) ){
												const ids = value?.split( "-" ).map( s => Number( s ) );
												setRowShelfInfo( { shelfId: ids[0], rowShelfId: ids[1] } );
								}
				}, [] );
				return (
								<Grid width = { "100%" } container spacing = { 2 } sx = { {} }>
												<Grid minWidth = { 250 }>
																<ShelfSelection onSelect = { onSelect } />
												</Grid>
												<Grid size = { "grow" }>
																<Typography variant = { "h4" } fontWeight = { "bold" } color = { "primary" }>{ appStrings.book.BOOK_ON_SHELF }</Typography>
																<LeftBookInstanceOnShelfList bookId = { bookId } shelfId = { rowShelfInfo?.shelfId } rowShelfId = { rowShelfInfo?.rowShelfId } />
												</Grid>
												<Divider orientation = "vertical" flexItem />
												<Grid size = { "grow" }>
																<Typography variant = { "h4" } fontWeight = { "bold" } color = { "primary" }>{ appStrings.book.BOOK_IN_STORE }</Typography>
																<RightBookInstanceInStoreList bookId = { bookId } shelfId = { rowShelfInfo?.shelfId } rowShelfId = { rowShelfInfo?.rowShelfId } />
												</Grid>
								</Grid>
				);
}
export default memo( Detail );
