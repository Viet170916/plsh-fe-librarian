import { Shelf } from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";
import { BookInstance } from "@/helpers/appType";
import { RootState } from "@/stores/store";
import { createSlice, PayloadAction, Slice, SliceSelectors } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { createSelector } from "reselect";
// type
export type LibraryRoomState = {
				shelves: Shelf[];
				columnSize: number;
				rowSize: number;
}
type ShelfStateSlice = Slice<LibraryRoomState, {
				setLibraryRoomState: ( state: WritableDraft<LibraryRoomState>, action: PayloadAction<LibraryRoomState> ) => void
				setShelves: ( state: WritableDraft<LibraryRoomState>, action: PayloadAction<Shelf[]> ) => void
				setBookToRow: ( state: WritableDraft<LibraryRoomState>, action: PayloadAction<{ rowId: number, shelfId: number, value: BookInstance[] }> ) => void
				addBooksToRow: ( state: WritableDraft<LibraryRoomState>, action: PayloadAction<{ rowId: number, shelfId: number, value: BookInstance[] }> ) => void
				addShelf: ( state: WritableDraft<LibraryRoomState>, action: PayloadAction<Shelf> ) => void
				modifyShelf: ( state: WritableDraft<LibraryRoomState>, action: PayloadAction<Shelf> ) => void
				removeShelf: ( state: WritableDraft<LibraryRoomState>, action: PayloadAction<number> ) => void
				setGridSize: ( state: WritableDraft<LibraryRoomState>, action: PayloadAction<number> ) => void
				setColumSize: ( state: WritableDraft<LibraryRoomState>, action: PayloadAction<number> ) => void
				setRowSize: ( state: WritableDraft<LibraryRoomState>, action: PayloadAction<number> ) => void
				clearData: ( state: WritableDraft<LibraryRoomState> ) => void;
},
				"libraryRoomState", "libraryRoomState", SliceSelectors<LibraryRoomState>>
//data
export const initShelfState: LibraryRoomState = {
				shelves: [],
				columnSize: 6,
				rowSize: 3,
};
//slice
const libraryRoomStateSlice: ShelfStateSlice = createSlice( {
								name: "libraryRoomState",
								initialState: initShelfState,
								reducers: {
												setBookToRow: ( state: WritableDraft<LibraryRoomState>, { payload: { rowId, shelfId, value } }: PayloadAction<{ rowId: number, shelfId: number, value: BookInstance[] }> ) => {
																const row = state.shelves.find( sh => sh.id === shelfId )?.rowShelves.find( rS => rS.id === rowId );
																if( row ){
																				row.bookInstances = value;
																}
												},
												addBooksToRow: ( state: WritableDraft<LibraryRoomState>, { payload: { rowId, shelfId, value } }: PayloadAction<{ rowId: number, shelfId: number, value: BookInstance[] }> ) => {
																const row = state.shelves.find( sh => sh.id === shelfId )?.rowShelves.find( rS => rS.id === rowId );
																if( row ){
																				row.bookInstances = row.bookInstances.concat( value.filter( b => !row.bookInstances.map( b2 => b2.id ).includes( b.id ) ) );
																}
												},
												setLibraryRoomState: ( shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<LibraryRoomState | undefined> ) => {
																if( action.payload ){
																				shelfState.shelves = action.payload.shelves;
																				// shelfState.gridSize = action.payload.gridSize;
																				shelfState.columnSize = action.payload.columnSize;
																				shelfState.rowSize = action.payload.rowSize;
																}
												},
												clearData: ( shelfState: WritableDraft<LibraryRoomState> ) => {
																shelfState.shelves = initShelfState.shelves;
																shelfState.columnSize = initShelfState.columnSize;
																shelfState.rowSize = initShelfState.rowSize;
																// set all being null
												},
												setShelves: ( shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<Shelf[]> ) => {
																shelfState.shelves = action.payload;
												},
												addShelf: ( shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<Shelf> ) => {
																shelfState.shelves.push( action.payload );
												},
												modifyShelf: ( shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<Shelf> ) => {
																const shelf = shelfState.shelves.find( shelve => shelve.id === action.payload.id );
																if( shelf ){
																				shelf.name = action.payload.name;
																				shelf.label = action.payload.label;
																}
												},
												removeShelf: ( shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<number> ) => {
																shelfState.shelves = shelfState.shelves.filter( ( sh ) => sh.id !== action.payload );
												},
												setColumSize: ( shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<number> ) => {
																shelfState.columnSize = action.payload;
												},
												setRowSize: ( shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<number> ) => {
																shelfState.rowSize = action.payload;
												},
												setGridSize: ( shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<number> ) => {
												},
								},
				} )
;
//export
export const {
				setShelves,
				setGridSize,
				setColumSize,
				setRowSize,
				clearData,
				addBooksToRow,
				setBookToRow,
				setLibraryRoomState,
				modifyShelf,
				addShelf,
				removeShelf,
} = libraryRoomStateSlice.actions;
export const selectShelfById = createSelector(
				( state: RootState ) => state.libraryRoomState.shelves,
				( _, shelfId?: number ) => shelfId,
				( shelves: Shelf[], shelfId?: number ) => shelves.find( ( s ) => s.id === shelfId ) );
export const selectRowByIdInLibStore = createSelector(
				( state: RootState ) => state.libraryRoomState.shelves,
				( _, param: { shelfId?: number, rowId?: number } ) => param,
				( shelves: Shelf[], param: { shelfId?: number, rowId?: number } ) => shelves.find( ( s ) => s.id === param.shelfId )?.rowShelves.find( r => r.id === param.rowId ) );
export const selectEntireRowInLibStore = createSelector(
				( state: RootState ) => state.libraryRoomState.shelves,
				( shelves: Shelf[] ) => shelves.map( sh => sh.rowShelves ).flat().map( rS => rS.bookInstances ).flat() );
const libraryRoomStateSliceReducer = libraryRoomStateSlice.reducer;
export default libraryRoomStateSliceReducer;
//...............

