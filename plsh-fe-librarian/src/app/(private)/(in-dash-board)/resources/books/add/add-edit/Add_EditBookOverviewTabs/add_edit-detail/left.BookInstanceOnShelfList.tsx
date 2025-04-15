"use client";
import ListTransfer from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add_edit-detail/ListTransfer";
import appStrings from "@/helpers/appStrings";
import { BookInstance } from "@/helpers/appType";
import { useAppDispatch } from "@/hooks/useDispatch";
import { useSelector } from "@/hooks/useSelector";
import { useGetBooksOnShelfQuery, useRemoveBooksOutOffShelfMutation } from "@/stores/slices/api/library-room.api.slice";
import { selectRowByIdInLibStore, setBookToRow } from "@/stores/slices/lib-room-state/lib-room.slice";
import { RowShelf } from "@/stores/slices/lib-room-state/shelf.slice";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { skipToken } from "@reduxjs/toolkit/query";
import React, { JSX, memo, useCallback, useEffect, useRef } from "react";
import { shallowEqual } from "react-redux";
import { toast } from "sonner";

type BookInstanceInStoreListProps = {
				bookId: number;
				rowShelfId?: number;
				shelfId?: number;
}
function BookInstanceInStoreList( { bookId, rowShelfId, shelfId }: BookInstanceInStoreListProps ): JSX.Element{
				const bookInstanceRef = useRef<BookInstance[]>( [] );
				const { data: booksResponse, error: booksError } = useGetBooksOnShelfQuery( rowShelfId ? { rowShelfId, bookId } : skipToken, { refetchOnFocus: true } );
				const [ removeBooksOutOfShelf ] = useRemoveBooksOutOffShelfMutation();
				const dispatch = useAppDispatch();
				const row: RowShelf | undefined = useSelector( state => selectRowByIdInLibStore( state, { rowId: rowShelfId, shelfId } ), shallowEqual );
				const onChange = useCallback( ( value: BookInstance[] ) => {
								bookInstanceRef.current = value;
				}, [] );
				useEffect( () => {
								if( booksResponse?.data && shelfId && rowShelfId ){
												dispatch( setBookToRow( {
																rowId: rowShelfId, shelfId, value: booksResponse.data.length ? booksResponse.data : [],
												} ) );
								}
				}, [ booksResponse?.data, shelfId, rowShelfId, dispatch ] );
				useEffect( () => {
								if( booksError && shelfId && rowShelfId ){
												dispatch( setBookToRow( {
																rowId: rowShelfId, shelfId, value: [],
												} ) );
								}
				}, [ booksError, dispatch, rowShelfId, shelfId ] );
				const onRemove = async function(){
								const bookInstanceIds = bookInstanceRef.current.map( b => b.id );
								if( rowShelfId && shelfId ){
												try{
																const removeRes =
																				await removeBooksOutOfShelf( bookInstanceRef.current.map( b => b.id ?? 0 ) ?? [] );
																if( removeRes.data ){
																				toast.success( appStrings.success.DELETE_SUCCESS );
																				dispatch( setBookToRow( {
																								rowId: rowShelfId, shelfId, value: row?.bookInstances.filter( bI => !bookInstanceIds.includes( bI.id ) ) ?? [],
																				} ) );
																}else{
																				toast.error( appStrings.error.REMOVE_FAIL );
																}
												}catch{
																toast.error( appStrings.error.REMOVE_FAIL );
												}
								}
				};
				return (
								<Grid>
												<Button variant = { "outlined" } onClick = { onRemove } disabled = { !row && true }>{ appStrings.REMOVE }</Button>
												{ rowShelfId && <ListTransfer noDisable items = { row?.bookInstances ?? [] } disableItems = { [] } onChange = { onChange } /> }
								</Grid>
				);
}
export default memo( BookInstanceInStoreList );

