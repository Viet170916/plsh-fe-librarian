import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {Shelf} from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";
// type
export type LibraryRoomState = {
    shelves: Shelf[];
    gridSize: number;
    columSize: number;
    rowSize: number;
}

type ShelfStateSlice = Slice<LibraryRoomState, {
    setLibraryRoomState: (state: WritableDraft<LibraryRoomState>, action: PayloadAction<LibraryRoomState>) => void
    setShelves: (state: WritableDraft<LibraryRoomState>, action: PayloadAction<Shelf[]>) => void
    addShelf: (state: WritableDraft<LibraryRoomState>, action: PayloadAction<Shelf>) => void
    modifyShelf: (state: WritableDraft<LibraryRoomState>, action: PayloadAction<Shelf>) => void
    removeShelf: (state: WritableDraft<LibraryRoomState>, action: PayloadAction<string>) => void
    setGridSize: (state: WritableDraft<LibraryRoomState>, action: PayloadAction<number>) => void
    setColumSize: (state: WritableDraft<LibraryRoomState>, action: PayloadAction<number>) => void
    setRowSize: (state: WritableDraft<LibraryRoomState>, action: PayloadAction<number>) => void
    clearData: (state: WritableDraft<LibraryRoomState>) => void;
},
    "libraryRoomState", "libraryRoomState", SliceSelectors<LibraryRoomState>>
//data
export const initShelfState: LibraryRoomState = {
    shelves: [],
    gridSize: 100,
    columSize: 6,
    rowSize: 3,
};
//slice
const libraryRoomStateSlice: ShelfStateSlice = createSlice({
        name: "libraryRoomState",
        initialState: initShelfState,
        reducers: {

            setLibraryRoomState: (shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<LibraryRoomState | undefined>) => {
                if (action.payload) {
                    shelfState.shelves = action.payload.shelves;
                    // shelfState.gridSize = action.payload.gridSize;
                    shelfState.columSize = action.payload.columSize;
                    shelfState.rowSize = action.payload.rowSize;
                }
            },
            clearData: (shelfState: WritableDraft<LibraryRoomState>) => {
                shelfState.shelves = initShelfState.shelves;
                shelfState.gridSize = initShelfState.gridSize;
                shelfState.columSize = initShelfState.columSize;
                shelfState.rowSize = initShelfState.rowSize;
                // set all being null
            },
            setShelves: (shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<Shelf[]>) => {
                shelfState.shelves = action.payload;
            },
            addShelf: (shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<Shelf>) => {
                shelfState.shelves.push(action.payload);
            },
            modifyShelf: (shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<Shelf>) => {
                const shelf = shelfState.shelves.find(shelve => shelve.id === action.payload.id);
                if (shelf) {
                    shelf.name = action.payload.name;
                    shelf.label = action.payload.label;

                }
            },
            removeShelf: (shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<string>) => {
                shelfState.shelves = shelfState.shelves.filter((sh) => sh.id !== action.payload);
            },
            setColumSize: (shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<number>) => {
                shelfState.columSize = action.payload;
            },
            setRowSize: (shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<number>) => {
                shelfState.rowSize = action.payload;
            },
            setGridSize: (shelfState: WritableDraft<LibraryRoomState>, action: PayloadAction<number>) => {
                shelfState.gridSize = action.payload;
            },


        }
    })
;
//export
export const {
    setShelves,
    setGridSize,
    setColumSize,
    setRowSize,
    clearData,
    setLibraryRoomState,
    modifyShelf,
    addShelf,
    removeShelf,
} = libraryRoomStateSlice.actions;
const libraryRoomStateSliceReducer = libraryRoomStateSlice.reducer;
export default libraryRoomStateSliceReducer;
//...............

