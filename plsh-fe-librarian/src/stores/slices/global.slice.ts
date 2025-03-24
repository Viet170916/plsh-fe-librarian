import { Shelf } from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";
import { IUser } from "@/app/api/auth/[...nextauth]/config";
import { BookData } from "@/helpers/appType";
import { AddEditBookData } from "@/stores/slices/book-states/book.add-edit.slice";
import { createSlice, PayloadAction, Slice, SliceSelectors } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";

type AppGlobal = {
				openDialog: boolean,
				editedBook_g: AddEditBookData,
				libRoom_g: Shelf[];
}
export const initAppGlobal: AppGlobal = {
				openDialog: false,
				editedBook_g: {
								resource: {
												coverImage: { type: "image" }, previewPdf: { type: "pdf" },
								}, baseInfo: {
												availability: [], "category": {}, newCategory: {},
								},
								authors: [], overview: {},
				},
				libRoom_g: [],
};
type GlobalSlice = Slice<AppGlobal, {
				setEditedBook_g: ( state: WritableDraft<AppGlobal>, action: PayloadAction<BookData> ) => void,
				setLibRoom_g: ( state: WritableDraft<AppGlobal>, action: PayloadAction<Shelf[]> ) => void,
				setOpenDialog: ( state: WritableDraft<AppGlobal>, action: PayloadAction<{ open: boolean }> ) => void,
				openDialog: ( state: WritableDraft<AppGlobal> ) => void,
				closeDialog: ( state: WritableDraft<AppGlobal> ) => void,
				clear: ( state: WritableDraft<AppGlobal> ) => void,
}, "global", "global", SliceSelectors<AppGlobal>>
const globalSlice: GlobalSlice = createSlice( {
				name: "global",
				initialState: initAppGlobal,
				reducers: {
								setLibRoom_g: ( state: WritableDraft<AppGlobal>, action: PayloadAction<Shelf[]> ) => {
												state.libRoom_g = action.payload;
								},
								setEditedBook_g: ( state, action: PayloadAction<BookData> ) => {
												state.editedBook_g.id = action.payload.id;
												state.editedBook_g.resource.coverImage.localUrl = action.payload.thumbnail;
												state.editedBook_g.authors = action.payload.authors;
												state.editedBook_g.baseInfo.title = action.payload.title;
												state.editedBook_g.baseInfo.version = action.payload.version;
												if( action.payload.category?.id && action.payload.category.id !== 0 ){
																state.editedBook_g.baseInfo.category = action.payload.category;
												}else{
																state.editedBook_g.baseInfo.newCategory = action.payload.category;
												}
												state.editedBook_g.baseInfo.quantity = action.payload.quantity;
												state.editedBook_g.overview.description = action.payload.description;
												state.editedBook_g.overview.language = action.payload.language;
												state.editedBook_g.overview.pageCount = action.payload.pageCount;
												state.editedBook_g.overview.isbnNumber10 = action.payload.isbnNumber10;
												state.editedBook_g.overview.isbnNumber13 = action.payload.isbnNumber13;
												state.editedBook_g.overview.otherIdentifier = action.payload.otherIdentifier;
												state.editedBook_g.overview.publishDate = action.payload.publishDate;
												state.editedBook_g.overview.publisher = action.payload.publisher;
								},
								setOpenDialog: ( state, action: PayloadAction<{ open: boolean }> ) => {
												state.openDialog = action.payload.open;
								},
								openDialog: ( state ) => {
												state.openDialog = true;
								},
								closeDialog: ( state ) => {
												state.openDialog = false;
								},
								clear: ( state ) => {
												state.openDialog = initAppGlobal.openDialog;
								},
				},
} );
export const {
				setOpenDialog,
				setLibRoom_g,
				setEditedBook_g,
				openDialog,
				closeDialog,
				clear,
} = globalSlice.actions;
const globalReducer = globalSlice.reducer;
export default globalReducer;
//...............
export type AppSession = { user: null | IUser; isAuthenticated?: boolean; accessToken: string | null };
