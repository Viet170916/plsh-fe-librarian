import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {Shelf} from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";
import {BookData} from "@/helpers/appType";
import {createSelector} from "reselect";
import {RootState} from "@/stores/store";
// type
export type BookOnRowShelf = {
    id: number;
    colName?: string;
    book?: BookData;
    position: number;

}
export type RowShelf = {
    id: number;
    name?: string;
    booksOnRowShelf: BookOnRowShelf[];
    position?: number;
    maxCol: number;
}
export const initRowShelf: RowShelf = {
    id: -1,
    booksOnRowShelf: [],
    position: 0,
    maxCol: 12,
}
export type ShelfState = {
    shelfBaseInfo?: Shelf
    rowShelves: RowShelf[];
}

type ShelfStateSlice = Slice<ShelfState, {
    setShelfState: (state: WritableDraft<ShelfState>, action: PayloadAction<ShelfState | undefined>) => void
    setRows: (state: WritableDraft<ShelfState>, action: PayloadAction<RowShelf[]>) => void
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
        booksOnRow: BookOnRowShelf[],
    }>) => void;
},
    "shelfState", "shelfState", SliceSelectors<ShelfState>>
//data
export const initShelfState: ShelfState = {
    shelfBaseInfo: {
        id: NaN,
        x: 0,
        y: 0,
    },
    rowShelves: [{
        id: 1234567898765,
        name: "A",
        maxCol: 10,
        position: 0,
        booksOnRowShelf: []
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
            setBookPosition: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<{
                rowId: number,
                bookOnShelfId: number,
                newPosition: number
            }>) => {
                const row = shelfState.rowShelves?.find(r => r.id === action.payload.rowId);
                const book = row?.booksOnRowShelf.find(b => b.id === action.payload.bookOnShelfId);
                if (book) {
                    book.position = action.payload.newPosition;
                }
            },
            addRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<RowShelf>) => {

            },
            addBookOnRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<{
                rowId: number,
                bookOnShelf: BookOnRowShelf
            }>) => {
                const row = shelfState.rowShelves?.find(r => r.id === action.payload.rowId);
                if (row) {
                    row.booksOnRowShelf.push(action.payload.bookOnShelf);
                }
            },
            modifyRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<RowShelf>) => {

            },
            modifyBookOnRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<
                {
                    rowId: number,
                    bookOnShelf: BookOnRowShelf
                }>) => {
                const row = shelfState.rowShelves?.find(r => r.id === action.payload.rowId);
                if (row) {
                    const book = row.booksOnRowShelf.find(b => b.id === action.payload.bookOnShelf.id);
                    if (book) {
                        book.book = action.payload.bookOnShelf.book;
                        book.position = action.payload.bookOnShelf.position;
                        book.colName = action.payload.bookOnShelf.colName;
                        // book.id = action.payload.bookOnShelf.id;
                    }
                }
            },
            removeRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<number>) => {
                shelfState.rowShelves = shelfState.rowShelves?.filter(r => r.id !== action.payload)
            },
            removeBookOnRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<{
                rowId: number,
                bookOnShelfId: number,
            }>) => {
                const row = shelfState.rowShelves?.find(r => r.id === action.payload.rowId);
                if (row) {
                    const books = row.booksOnRowShelf.filter(r => r.id !== action.payload.bookOnShelfId)
                    if (books && books.length !== row.booksOnRowShelf.length) {
                        row.booksOnRowShelf = books;

                    }
                }
            },
            setMaxColOnRow: (shelfState: WritableDraft<ShelfState>, action: PayloadAction<{
                rowId: number,
                newMaxCol: number
            }>) => {
                console.log(action.payload)
                const row = shelfState.rowShelves?.find(r => r.id === action.payload.rowId);
                // console.log(row)
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
                booksOnRow: BookOnRowShelf[]
            }>) => {
                const row = shelfState.rowShelves?.find(r => r.id !== action.payload.rowId)
                if (row) {
                    row.booksOnRowShelf = action.payload.booksOnRow;
                }
            },
        }
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
    setMaxColOnRow,
    clearData,
    addRow,
    modifyBookOnRow,
    removeRow,
} = shelfStateSlice.actions;
export const selectRowById = createSelector(
    (state: RootState) => state.shelfState.rowShelves,
    (_, rowId: number) => rowId,
    (rows: RowShelf[], rowId: number) => rows.find((r) => r.id === rowId));
const shelfStateSliceReducer = shelfStateSlice.reducer;
export default shelfStateSliceReducer;
//...............

