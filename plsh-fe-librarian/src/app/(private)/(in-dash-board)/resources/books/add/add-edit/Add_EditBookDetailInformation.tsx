"use client";
import AddAuthor from "@/app/(private)/(in-dash-board)/resources/books/add/author/AddAuthor";
import AudioBookAvailability from "@/app/(private)/(in-dash-board)/resources/books/add/availability/AudioBookAvai";
import EBookAvailability from "@/app/(private)/(in-dash-board)/resources/books/add/availability/EBookAvai";
import PhysicBookAvailability from "@/app/(private)/(in-dash-board)/resources/books/add/availability/HardBookAvai";
import { TextFieldNoBorder } from "@/components/primary/Input/TextFieldNoBorder";
import appStrings from "@/helpers/appStrings";
import { BookData } from "@/helpers/appType";
import { deepCleanObject, objectToFormData, urlToFile } from "@/helpers/convert";
import { color } from "@/helpers/resources";
import { isInternalUrl } from "@/helpers/text";
import { useAppDispatch } from "@/hooks/useDispatch";
import { bookApi, useAddUpdateBookMutation, useGetCategoriesQuery, useLazyCheckCategoryNameIsDuplicatedQuery, useUploadBookResourceMutation } from "@/stores/slices/api/book.api.slice";
import { AddEditBookData, Category, setValueInBookBaseInfo } from "@/stores/slices/book-states/book.add-edit.slice";
import { RootState, useAppStore } from "@/stores/store";
import { Autocomplete, Box, Button, Checkbox, Dialog, List, ListItem, ListItemText, ListSubheader, TextField, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { debounce } from "@mui/material/utils";
import React, { JSX, memo, useCallback, useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

interface IProps{
				children?: React.ReactNode;
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
				// const category = useSelector((state: RootState) => state.addEditBookData.baseInfo.category, shallowEqual);
				const defaultCategory = useMemo( () => store.getState().addEditBookData.baseInfo.category, [ store ] );
				const newCategoryIsChosen = useSelector( ( state: RootState ) => state.addEditBookData.baseInfo.newCategory?.chosen, shallowEqual );
				return (
								<Autocomplete
												disabled = { newCategoryIsChosen }
												disablePortal
												value = { defaultCategory }
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
const CategorySuggestion = memo( ( { suggestions, onAddBook, setSuggestions }: {
				suggestions: Category[],
				onAddBook: ( category?: Category ) => void,
				setSuggestions?: ( value: ((( prevState: (Category[] | undefined) ) => (Category[] | undefined)) | Category[] | undefined) ) => void
} ) => {
				const dispatch = useDispatch();
				const store = useAppStore();
				const category = useSelector( ( state: RootState ) => state.addEditBookData.baseInfo.category );
				const onCancel = () => {
								const newCategory = store.getState().addEditBookData.baseInfo.newCategory;
								dispatch( setValueInBookBaseInfo( {
												key: "newCategory", value: { ...newCategory, chosen: true },
								} ) );
								setSuggestions?.( undefined );
								onAddBook( { ...newCategory, chosen: false } );
				};
				const onAccept = () => {
								const newCategory = store.getState().addEditBookData.baseInfo.newCategory;
								dispatch( setValueInBookBaseInfo( {
												key: "newCategory", value: { ...newCategory, chosen: false },
								} ) );
								setSuggestions?.( undefined );
								onAddBook( { ...newCategory, chosen: false } );
				};
				return (
								<Dialog open = { (suggestions.length > 0) }>
												<Grid container padding = { 2 } width = { 400 } justifyContent = { "center" }>
																<Grid size = { 6 }>
																				<List
																								sx = { { width: '100%', gap: 1, height: 300, overflowY: 'auto' } }
																								component = "nav"
																								aria-labelledby = "nested-list-subheader"
																								subheader = {
																												<ListSubheader component = "div" id = "nested-list-subheader">
																																{ appStrings.book.SUGGESTION_CATEGORY }
																												</ListSubheader>
																								}
																				>
																								{ suggestions.map( ( item ) => (
																												<ListItem
																																key = { item.id } sx = { { borderRadius: 2 } } secondaryAction = {
																																<Checkbox
																																				edge = "end"
																																				onChange = { () => {
																																								dispatch( setValueInBookBaseInfo( { key: "category", value: item } ) );
																																				} }
																																				checked = { item.id === category?.id }
																																/>
																												}
																												>
																																<ListItemText primary = { item?.name ?? "" } />
																												</ListItem>
																								) ) }
																				</List>
																</Grid>
																<Grid size = { 6 }>
																				<Typography variant = { "h6" } fontWeight = { "lighter" }>
																								{ appStrings.guide.SUGGESTION_CATEGORY }
																				</Typography>
																</Grid>
																<Grid size = { 12 } spacing = { 2 }>
																				<Button variant = { "outlined" } fullWidth onClick = { onCancel }>
																								{ appStrings.CONTINUE_WITHOUT_CHANGE }
																				</Button>
																</Grid>
																<Grid size = { 12 }>
																				<Button variant = { "outlined" } fullWidth onClick = { onAccept }>
																								{ appStrings.CONTINUE_WITH_CHANGE }
																				</Button>
																</Grid>
												</Grid>
								</Dialog>
				);
} );
function Add_EditBookDetails( props: IProps ): JSX.Element{
				const bookAuthors = useSelector( ( state: RootState ) => state.addEditBookData.authors );
				const store = useAppStore();
				const dispatch = useDispatch();
				const [ addBook, { data: bookData, isLoading: isBookLoading, error: bookError } ] = useAddUpdateBookMutation( {} );
				const [ uploadResource ] = useUploadBookResourceMutation( {} );
				const [ checkCategory, {
								data: dataCategory,
								error: errorCategory,
				} ] = useLazyCheckCategoryNameIsDuplicatedQuery();
				const onAddBook = useCallback( async( newCategory?: Category ) => {
								const data: AddEditBookData = store.getState().addEditBookData;
								const eBook = data.baseInfo.availability.find( ( f ) => f.kind === "e-book" );
								const audioBook = data.baseInfo.availability.find( ( f ) => f.kind === "audio" );
								const physicBook = data.baseInfo.availability.find( ( f ) => f.kind === "physical" );
								const coverImage = data.resource.coverImage;
								const coverImageUrl = data.resource.coverImage.localUrl;
								const payload: BookData = {
												...data.baseInfo,
												...data.overview,
												pageCount: data.overview.pageCount ?? 0,
												categoryId: undefined,
												category: data.baseInfo.newCategory.chosen ? data.baseInfo.newCategory : data.baseInfo.category,
												authors: data.authors,
												id: data.id,
												quantity: physicBook?.kind === "physical" ? physicBook.quantity : 0,
												contentPdfName: eBook?.kind === "e-book" && eBook.resource?.localUrl ? eBook.resource?.name : undefined,
												previewPdfResource: eBook?.kind === "e-book" && eBook.resource?.localUrl ? eBook.resource : undefined,
												audioName: audioBook?.kind === "audio" && audioBook.resource?.localUrl ? audioBook.resource?.name : undefined,
												audioResource: audioBook?.kind === "audio" && audioBook.resource?.localUrl ? audioBook.resource : undefined,
												availabilities: [],
												coverImageResource: coverImage ?? undefined,
												thumbnail: isInternalUrl( coverImageUrl ) === "unknown" ? coverImageUrl : undefined,
								};
								if( newCategory && newCategory.chosen ){
												payload.categoryId = undefined;
												payload.category = newCategory;
								}else if( data.baseInfo.newCategory && data.baseInfo.newCategory.chosen ){
												payload.category = data.baseInfo.newCategory;
								}else if( data.baseInfo.category && data.baseInfo.category.id && !data.baseInfo.newCategory.chosen ){
												payload.category = data.baseInfo.category;
								}
								console.log( deepCleanObject( payload ) );
								const bookResponse = await addBook( objectToFormData( deepCleanObject( payload ) as object ) );
								if( !bookResponse.data || !bookResponse.data.id ) return;
								if( eBook?.kind === "e-book" && eBook.resource && eBook.resource.localUrl ){
												try{
																eBook.resource.file = await urlToFile( eBook.resource.localUrl, eBook.resource.name ?? "unknown", eBook.resource.fileType ?? "application/epub+zip" );
																await uploadResource( { bookId: bookResponse.data.id, data: objectToFormData( deepCleanObject( eBook.resource ) as object ) } );
												}catch{
																toast.error( appStrings.error.FAIL_TO_UPLOAD_EBOOK );
												}
								}
								if( audioBook?.kind === "audio" && audioBook.resource && audioBook.resource.localUrl ){
												try{
																audioBook.resource.file = await urlToFile( audioBook.resource.localUrl, audioBook.resource.name ?? "unknown", audioBook.resource.fileType ?? "audio/mpeg" );
																await uploadResource( { bookId: bookResponse.data.id, data: objectToFormData( deepCleanObject( audioBook.resource ) as object ) } );
												}catch{
																toast.error( appStrings.error.FAIL_TO_UPLOAD_AUDIO_BOOK );
												}
								}
								if( coverImage && coverImage.localUrl && isInternalUrl( coverImage.localUrl ) === "blob" ){
												try{
																coverImage.file = await urlToFile( coverImage.localUrl, coverImage.name ?? "unknown", coverImage.fileType ?? "image/png" );
																await uploadResource( { bookId: bookResponse.data.id, data: objectToFormData( deepCleanObject( coverImage ) as object ) } );
												}catch{
																toast.error( appStrings.error.FAIL_TO_UPLOAD_COVER );
												}
								}
								dispatch( bookApi.util.resetApiState() );
				}, [ store, addBook, dispatch, uploadResource ] );
				const
								onSubmit = async() => {
												const newCategory: Category = store.getState().addEditBookData.baseInfo.newCategory;
												if( newCategory && newCategory.chosen ){
																const dataCheck = await checkCategory( { name: store.getState().addEditBookData.baseInfo.newCategory.name } );
																if( dataCheck.data && dataCheck.data.status === "duplicated" ){
																				setSuggestions( dataCheck.data?.suggestions );
																				return;
																}
												}
												await onAddBook();
								};
				const [ suggestions, setSuggestions ] = useState<Category[] | undefined>();
				useEffect( () => {
								if( bookError )
												toast.error( appStrings.error.REQUEST_ERROR );
				}, [ bookError ] );
				useEffect( () => {
								if( errorCategory )
												toast.error( appStrings.error.REQUEST_ERROR );
				}, [ errorCategory ] );
				useEffect( () => {
								if( bookData )
												toast.success( appStrings.success.SAVE_SUCCESS );
				}, [ bookData ] );
				useEffect( () => {
								if( dataCategory && dataCategory.status === "duplicated" ){
												toast.warning( appStrings.warning.CATEGORY_MIGHT_BE_DUPLICATED );
												setSuggestions( dataCategory.suggestions );
								}
				}, [ dataCategory ] );
				return (
								<Grid container sx = { { width: "100%", minHeight: 381 } }>
												{ suggestions ? (<CategorySuggestion
																onAddBook = { onAddBook } suggestions = { suggestions }
																setSuggestions = { setSuggestions }
												/>) : <></> }
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
																				<Button
																								onClick = { onSubmit }
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
																												{ appStrings.SAVE }
																								</Typography>
																				</Button>
																</Grid>
												</Grid>
								</Grid>
				);
}
export default memo( Add_EditBookDetails );
