"use client";
import HandleSaveChangeButton from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/HandleSaveChangeButton";
import AddAuthor from "@/app/(private)/(in-dash-board)/resources/books/add/author/AddAuthor";
import AudioBookAvailability from "@/app/(private)/(in-dash-board)/resources/books/add/availability/AudioBookAvai";
import EBookAvailability from "@/app/(private)/(in-dash-board)/resources/books/add/availability/EBookAvai";
import PhysicBookAvailability from "@/app/(private)/(in-dash-board)/resources/books/add/availability/HardBookAvai";
import { TextFieldNoBorder } from "@/components/primary/Input/TextFieldNoBorder";
import appStrings from "@/helpers/appStrings";
import { color } from "@/helpers/resources";
import { useAppDispatch } from "@/hooks/useDispatch";
import { useGetCategoriesQuery } from "@/stores/slices/api/book.api.slice";
import { Category, setValueInBookBaseInfo } from "@/stores/slices/book-states/book.add-edit.slice";
import { RootState, useAppStore } from "@/stores/store";
import { Autocomplete, Box, Checkbox, TextField, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { debounce } from "@mui/material/utils";
import React, { JSX, memo, useCallback, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

interface IProps{
				children?: React.ReactNode;
}
function Add_EditBookDetails(): JSX.Element{
				const bookAuthors = useSelector( ( state: RootState ) => state.addEditBookData.authors );
				return (
								<Grid container sx = { { width: "100%", minHeight: 381 } }>
												<Grid size = { 12 } sx = { {} }>
																<Grid sx = { {} } container size = { 12 }>
																				<TitleEdit />
																				<VersionEdit />
																				<Grid size = { 12 } container sx = { { color: color.DARK_TEXT, gap: 1 } }>
																								{ `${ appStrings.WRITE_BY }: ` }
																								<Grid size = { "grow" } maxHeight = { 70 } sx = { { overflowX: "hidden", overflowY: "auto" } }>
																												<Box
																																display = { "flex" } flexWrap = { "wrap" } width = { "100%" } height = { "fit-content" }
																																sx = { { mt: .5 } }
																												>
																																{ bookAuthors ? bookAuthors.map( author => (
																																				<Typography
																																								width = { "max-content" } variant = { "h5" }
																																								key = { `${ author.id }-${ author.fullName }` }
																																				>{ `${ author.fullName }, ` } </Typography>
																																) ) : <></> }
																												</Box>
																								</Grid>
																								<AddAuthor>
																												<span style = { { textDecoration: "underline" } }>{ appStrings.ADD_AN_AUTHOR }</span>
																								</AddAuthor>
																				</Grid>
																</Grid>
												</Grid>
												<Grid sx = { {} } size = { 6 }>
																<Typography
																				variant = "body2"
																				sx = { { fontWeight: "bold", color: color.DARK_TEXT } }
																>
																				{ appStrings.book.AVAILABILITY }
																</Typography>
																<Grid container>
																				<Grid>
																								<PhysicBookAvailability />
																								<EBookAvailability />
																								<AudioBookAvailability />
																				</Grid>
																</Grid>
												</Grid>
												<Grid sx = { {} } size = { 6 }>
																<Typography
																				variant = "body2"
																				sx = { { fontWeight: "bold", color: color.DARK_TEXT } }
																>
																				{ appStrings.book.OVERVIEW }
																</Typography>
																<Grid container spacing = { 1 }>
																				<CategoryEdit />
																				<NewCategoryEdit />
																</Grid>
												</Grid>
												<Grid
																container
																width = { "100%" }
																spacing = { 3 }
																justifySelf = { "end" }
																alignSelf = { "end" }
												>
																<Grid size = { 12 }>
																				<HandleSaveChangeButton />
																</Grid>
												</Grid>
								</Grid>
				);
}
const TitleEdit = memo( () => {
				const dispatch = useDispatch();
				const title = useSelector( ( state: RootState ) => state.addEditBookData.baseInfo.title, shallowEqual );
				return (
								<TextFieldNoBorder
												placeholder = { appStrings.TITLE }
												value = { title ?? "" }
												onChange = { ( e ) => {
																dispatch( setValueInBookBaseInfo( { key: "title", value: e.target.value } ) );
												} }
												multiline
												maxRows = { 2 }
												fullWidth
												fontSize = { 35 }
												padding = { 0 }
												textColor = { color.DARK_TEXT }
								/>
				);
} );
const VersionEdit = memo( () => {
				const dispatch = useDispatch();
				const version = useSelector( ( state: RootState ) => state.addEditBookData.baseInfo.version, shallowEqual );
				return (
								<TextFieldNoBorder
												placeholder = { appStrings.VERSION }
												value = { version ?? "" }
												onChange = { ( e ) => {
																dispatch( setValueInBookBaseInfo( { key: "version", value: e.target.value } ) );
												} }
												padding = { 0 }
												textColor = { color.DARK_LIGHTER_TEXT }
								/>
				);
} );
const CategoryEdit = memo( () => {
				const [ keyword, setKeyword ] = useState( "" );
				const dispatch = useAppDispatch();
				const { data, isLoading } = useGetCategoriesQuery( { keyword }, { refetchOnReconnect: true } );
				const debouncedSetKeyWord = useMemo(
								() => debounce( ( value: string ) => setKeyword( value ), 300 ), [] );
				const onInputChange =
								useCallback( ( value?: string ) => {
												debouncedSetKeyWord( value ?? "" );
								}, [ debouncedSetKeyWord ] );
				const onSelect = function( category?: Category ){
								dispatch( setValueInBookBaseInfo( { key: "category", value: category } ) );
				};
				const store = useAppStore();
				const category = useSelector((state: RootState) => state.addEditBookData.baseInfo.category, shallowEqual);
				// const defaultCategory = useMemo( () => store.getState().addEditBookData.baseInfo.category, [ store ] );
				const newCategoryIsChosen = useSelector( ( state: RootState ) => state.addEditBookData.baseInfo.newCategory?.chosen, shallowEqual );
				return (
								<Autocomplete
												disabled = { newCategoryIsChosen }
												disablePortal
												value = { category }
												fullWidth
												size = { "small" }
												loading = { isLoading }
												onChange = { ( _, category ) => onSelect( category ?? undefined ) }
												getOptionLabel = { ( option ) => `${ option?.name ?? "" }` }
												renderOption = { ( { key, ..._ }, option: Category ) => {
																return (
																				<Grid key = { `${ option.id }-${ option.name }` } { ..._ } padding = { "0 10px" } component = { "li" } container>
																								<Grid size = { "grow" }>{ option.name }</Grid><Grid size = { 3 }></Grid>
																				</Grid>);
												} }
												onInputChange = { ( _, value ) => onInputChange( value ) }
												options = { data ?? [] }
												sx = { { mt: 1 } }
												renderInput = { ( params ) => <TextField { ...params }
												                                         label = { appStrings.book.CATEGORY }
												/> }
								/>
				);
} );
const NewCategoryEdit = memo( () => {
				const dispatch = useDispatch();
				const newCategory = useSelector( ( state: RootState ) => state.addEditBookData.baseInfo.newCategory, shallowEqual );
				return (
								<Grid container direction = "row" spacing = { 2 }>
												<Grid size = { "grow" }>
																<TextField
																				fullWidth sx = { { mt: 1 } }
																				value = { newCategory?.name ?? "" }
																				onChange = { ( e ) => {
																								dispatch( setValueInBookBaseInfo( {
																												key: "newCategory",
																												value: { ...newCategory, name: e.target.value },
																								} ) );
																				} }
																				disabled = { !newCategory?.chosen }
																				size = { "small" }
																				label = { appStrings.book.CATEGORY }
																/>
												</Grid>
												<Tooltip title = { appStrings.guide.NEW_CATEGORY_CHOSEN }>
																<Checkbox
																				checked = { newCategory?.chosen ?? false } onChange = { ( _, value ) =>
																				dispatch( setValueInBookBaseInfo( {
																								key: "newCategory",
																								value: { ...newCategory, chosen: value },
																				} ) ) }
																/>
												</Tooltip>
								</Grid>
				);
} );
export default memo( Add_EditBookDetails );
