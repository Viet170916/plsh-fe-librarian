"use client";
import ListTransfer from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add_edit-detail/ListTransfer";
import appStrings from "@/helpers/appStrings";
import { BookInstance } from "@/helpers/appType";
import { useAppDispatch } from "@/hooks/useDispatch";
import { useSelector } from "@/hooks/useSelector";
import { useGetBookInstancesQuery } from "@/stores/slices/api/book.api.slice";
import { usePutBooksOntoShelfMutation } from "@/stores/slices/api/library-room.api.slice";
import { addBooksToRow, selectEntireRowInLibStore } from "@/stores/slices/lib-room-state/lib-room.slice";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { JSX, memo, useCallback, useRef } from "react";
import { toast } from "sonner";

type BookInstanceInStoreListProps = {
				bookId: number;
				rowShelfId?: number;
				shelfId?: number;
}
function RightBookInstanceInStoreList( { bookId, shelfId, rowShelfId }: BookInstanceInStoreListProps ): JSX.Element{
				console.log( rowShelfId );
				const { data: bookInstancesResponse, refetch: bookInstancesRefetch } = useGetBookInstancesQuery( { bookId } );
				const [ modifyBooksOnShelfPut ] = usePutBooksOntoShelfMutation();
				const bookInstanceRef = useRef<BookInstance[]>( [] );
				const dispatch = useAppDispatch();
				const bookInstancesInEntireLib = useSelector( state => selectEntireRowInLibStore( state ) );
				const onChange = useCallback( ( value: BookInstance[] ) => {
								bookInstanceRef.current = value;
				}, [] );
				const onAdd = async function(){
								const bookShelfRows = bookInstanceRef.current
								                                     .filter( bI => !bookInstancesInEntireLib.map( b => b.id ).includes( bI.id ) )
								                                     .map( sh => ({ ...sh, rowShelfId: rowShelfId }) )
												?? [];
								if( bookShelfRows ){
												const booksOnShelfRes = await modifyBooksOnShelfPut( bookShelfRows );
												if( booksOnShelfRes?.data ){
																toast.success( appStrings.success.SAVE_SUCCESS );
																if( rowShelfId && shelfId ){
																				dispatch( addBooksToRow( {
																								rowId: rowShelfId,
																								shelfId: shelfId,
																								value: booksOnShelfRes.data.data
																												?? [],
																				} ) );
																}
												}else{
																toast.error( appStrings.error.EDIT_FAIL );
												}
								}
				};
				function onReload(){
								bookInstancesRefetch();
				}
				return (
								<Grid>
												<Button
																onClick = { onAdd }
																variant = { "outlined" }
																disabled = { !bookInstancesResponse?.data && true }
												>{ appStrings.ADD }</Button>
												<Button
																onClick = { onReload }
																variant = { "outlined" }
												>{ appStrings.RELOAD }</Button>
												<ListTransfer items = { bookInstancesResponse?.data ?? [] } disableItems = { bookInstancesInEntireLib ?? [] } onChange = { onChange } />
								</Grid>
				);
}
export default memo( RightBookInstanceInStoreList );

