import {Shelf} from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";
import {BookData, BookInstance} from "@/helpers/appType";
import {RootState} from "@/stores/store";
import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {FieldPathValue} from "react-hook-form";
import {createSelector} from "reselect";
// type
export type BookOnRowShelf = {
    id: number;
    colName?: string;
    rowShelfId: number;
    book?: BookData;
    position: number;
}
export type RowShelf = {
    emptyPositions?: number[]
    description?: string;
    count?: number;
    id: number;
    name?: string;
    bookInstances: BookInstance[];
    shelfId?: number;
    position?: number;
    maxCol: number;
}
export const initRowShelf: RowShelf = {
    id: -1,
    bookInstances: [],
    position: 0,
    maxCol: 12,
};
export type ShelfState = {
    shelfBaseInfo?: Shelf
    rowShelves: RowShelf[];
}
type ShelfStateSlice = Slice<ShelfState, {
    setShelfState: (state: WritableDraft<ShelfState>, action: PayloadAction<ShelfState | undefined>) => void
    setRows: (state: WritableDraft<ShelfState>, action: PayloadAction<RowShelf[]>) => void
    setValueInRow: (state: WritableDraft<ShelfState>, action: PayloadAction<{
        rowId: number,
        key: keyof RowShelf,
        value: FieldPathValue<RowShelf, keyof RowShelf>
    }>) => void
    setBookPosition: (state: WritableDraft<ShelfState>, action: PayloadAction<{
        rowId: number,
        bookOnShelfId: number,
        newPosition: number
    }>) => void
    addRow: (state: WritableDraft<ShelfState>, action: PayloadAction<RowShelf>) => void
    modifyRow: (state: WritableDraft<ShelfState>, action: PayloadAction<RowShelf>) => void
    removeRow: (state: WritableDraft<ShelfState>, action: PayloadAction<number>) => void
    addBookOnRow: (state: WritableDraft<ShelfState>, action: PayloadAction<{
        rowId: number,
        bookOnShelf: BookOnRowShelf
    }>) => void
    modifyBookOnRow: (state: WritableDraft<ShelfState>, action: PayloadAction<{
        rowId: number,
        bookOnShelf: BookOnRowShelf
    }>) => void
    removeBookOnRow: (state: WritableDraft<ShelfState>, action: PayloadAction<{
        rowId: number,
        bookOnShelfId: number,
    }>) => void

    clearData: (state: WritableDraft<ShelfState>) => void;
    setMaxColOnRow: (state: WritableDraft<ShelfState>, action: PayloadAction<{
        rowId: number,
        newMaxCol: number,
    }>) => void;
    setBooksOnRow: (state: WritableDraft<ShelfState>, action: PayloadAction<{
        rowId: number,
        booksOnRow: BookInstance[],
    }>) => void;
},
    "shelfState", "shelfState", SliceSelectors<ShelfState>>
//data
export const initShelfState: ShelfState = {
    shelfBaseInfo: {
        id: NaN,
        x: 0,
        y: 0,
        rowShelves: [],
    },
    rowShelves: [{
        id: 1234567898765,
        name: "A",
        maxCol: 10,
        position: 0,
        bookInstances: [],
    }],
};
//slice
const shelfStateSlice: ShelfStateSlice = createSlice({
        name: "shelfState",
        initialState: initShelfState,
        reducers: {
            setShelfState: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<ShelfState | undefined>) => {
                if (action.payload) {
                    shelfState.shelfBaseInfo = action.payload.shelfBaseInfo;
                    shelfState.rowShelves = action.payload.rowShelves;
                }
            },
            clearData: (shelfState: WritableDraft<ShelfState>) => {
                shelfState.shelfBaseInfo = initShelfState.shelfBaseInfo;
                shelfState.rowShelves = initShelfState.rowShelves;
                // set all being null
            },
            setRows: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<RowShelf[]>) => {
                shelfState.rowShelves = action.payload;
            },
            setBookPosition: (shelfState: WritableDraft<ShelfState>, {
                payload: {
                    rowId,
                    bookOnShelfId,
                    newPosition
                }
            }: PayloadAction<{
                rowId: number,
                bookOnShelfId: number,
                newPosition: number
            }>) => {
                const row = shelfState.rowShelves?.find(r => r.id === rowId);
                const bookOnTheSamePosition = row?.bookInstances.find(b => b.position === newPosition);
                const book = row?.bookInstances.find(b => b.id === bookOnShelfId);
                if (book) {
                    if (bookOnTheSamePosition) {
                        bookOnTheSamePosition.position = book.position;
                    }
                    book.position = newPosition;
                }
            },
            addRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<RowShelf>) => {
                shelfState.rowShelves.push(action.payload);
            },
            addBookOnRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<{
                rowId: number,
                bookOnShelf: BookOnRowShelf
            }>) => {
                const row = shelfState.rowShelves?.find(r => r.id === action.payload.rowId);
                if (row) {
                    row.bookInstances.push(action.payload.bookOnShelf);
                }
            },
            modifyRow: (shelfState: WritableDraft<ShelfState>, {payload}: PayloadAction<RowShelf>) => {
                const row = shelfState.rowShelves?.find(r => r.id === payload.id);
                if (row) {
                    row.bookInstances = payload.bookInstances;
                    row.count = payload.count;
                    row.description = payload.description;
                    row.shelfId = payload.shelfId;
                    row.maxCol = payload.maxCol;
                    row.name = payload.name;
                    row.position = payload.position;
                }
            },
            modifyBookOnRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<
                {
                    rowId: number,
                    bookOnShelf: BookInstance
                }>) => {
                const row = shelfState.rowShelves?.find(r => r.id === action.payload.rowId);
                if (row) {
                    const book = row.bookInstances.find(b => b.id === action.payload.bookOnShelf.id);
                    if (book) {
                        // book = action.payload.bookOnShelf;
                        book.position = action.payload.bookOnShelf.position;
                        // book.colName = action.payload.bookOnShelf.colName;
                        // book.id = action.payload.bookOnShelf.id;
                    }
                }
            },
            removeRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<number>) => {
                shelfState.rowShelves = shelfState.rowShelves?.filter(r => r.id !== action.payload);
            },
            removeBookOnRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<{
                rowId: number,
                bookOnShelfId: number,
            }>) => {
                const row = shelfState.rowShelves?.find(r => r.id === action.payload.rowId);
                if (row) {
                    const books = row.bookInstances.filter(r => r.id !== action.payload.bookOnShelfId);
                    if (books && books.length !== row.bookInstances.length) {
                        row.bookInstances = books;
                    }
                }
            },
            setValueInRow: <K extends keyof RowShelf>(shelfState: WritableDraft<ShelfState>, {
                payload: {
                    rowId,
                    key,
                    value
                }
            }: PayloadAction<{ rowId: number, key: K, value: RowShelf[K] }>) => {
                const row = shelfState.rowShelves?.find(r => r.id === rowId);
                if (row) {
                    row[key] = value;
                }
            },
            setMaxColOnRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<{
                rowId: number,
                newMaxCol: number
            }>) => {
                const row = shelfState.rowShelves?.find(r => r.id === action.payload.rowId);
                if (row) {
                    // shelfState.rowShelves = shelfState.rowShelves.map((r) => {
                    //     if (r.id === action.payload.rowId) {
                    //         return ({...r, maxCol: action.payload.newMaxCol,})
                    //     } else return r;
                    // })
                    row.maxCol = action.payload.newMaxCol;
                }
            },
            setBooksOnRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<{
                rowId: number,
                booksOnRow: BookInstance[]
            }>) => {
                const row = shelfState.rowShelves?.find(r => r.id !== action.payload.rowId);
                if (row) {
                    row.bookInstances = action.payload.booksOnRow;
                }
            },
        },
    })
;
//export
export const {
    setShelfState,
    setRows,
    setBookPosition,
    addBookOnRow,
    setBooksOnRow,
    modifyRow,
    removeBookOnRow,
    setValueInRow,
    setMaxColOnRow,
    clearData,
    addRow,
    modifyBookOnRow,
    removeRow,
} = shelfStateSlice.actions;
export const selectRowByIdInShelfStore = createSelector(
    (state: RootState) => state.shelfState.rowShelves,
    (_, rowId?: number) => rowId,
    (rows: RowShelf[], rowId?: number) => rows.find((r) => r.id === rowId));
const shelfStateSliceReducer = shelfStateSlice.reducer;
export default shelfStateSliceReducer;
//...............

