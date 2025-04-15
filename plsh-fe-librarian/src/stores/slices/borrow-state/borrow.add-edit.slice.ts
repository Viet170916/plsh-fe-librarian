import {Account} from "@/app/(public)/auth/store/account.slice";
import {BookDamageStatus, BookInstance, Resource} from "@/helpers/appType";
import {RootState} from "@/stores/store";
import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {get, Path, PathValue, set} from "react-hook-form";
import {createSelector} from "reselect";
// type
export type BorrowBaseInfo = {
    borrowDate?: string;
    id?: number;
    code?: string;
    note?: string;
}
export type BorrowedBookData = {
    borrowingStatus: BorrowStatusData;
    id?: number;
    bookInstance: BookInstance;
    beforeBorrow: {
        images?: Resource[];
        note?: string;
        status?: BookDamageStatus;
    };
    afterBorrow: {
        images?: Resource[];
        note?: string;
        status: BookDamageStatus;
    };
    borrowDateRange: {
        start?: string;
        end?: string;
    };
}
export type BorrowStatusData = "overdue" | "on-loan" | "returned" | "partially-returned";
export type AddEditBorrowData = {
    id?: number;
    baseInfo: BorrowBaseInfo;
    borrower: Account;
    status: BorrowStatusData;
    borrowedBooks: BorrowedBookData[];
    selectedBookId?: number;
}
type AddEditBorrowDataSlice = Slice<AddEditBorrowData, {
    modifyBorrowedBook: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<{
        id: number,
        value: BorrowedBookData
    }>) => void;
    setAddEditBorrowData: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<AddEditBorrowData>) => void
    setPropToBorrow: <K extends Path<AddEditBorrowData>>(state: WritableDraft<AddEditBorrowData>, action: PayloadAction<{
        key: K, value: PathValue<AddEditBorrowData, K>
    }>) => void,
    clearPropToBorrow: <K extends keyof AddEditBorrowData>(state: WritableDraft<AddEditBorrowData>, action: PayloadAction<K>) => void,
    setPropToBaseInfoBorrow: <K extends keyof BorrowBaseInfo>(state: WritableDraft<AddEditBorrowData>, action: PayloadAction<{
        key: K, value: BorrowBaseInfo[K]
    }>) => void,
    setPropToAccountBorrow: <K extends keyof Account>(state: WritableDraft<AddEditBorrowData>, action: PayloadAction<{
        key: K, value: Account[K]
    }>) => void,
    setPropToBorrowedBook: <K extends Path<BorrowedBookData>>(state: WritableDraft<AddEditBorrowData>, action: PayloadAction<{
        idBorrowedBookOrBookInstance: number,
        key: K, value: PathValue<BorrowedBookData, K>,
    }>) => void,
    clearData: (state: WritableDraft<AddEditBorrowData>) => void;
    addBorrowedBook: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<BookInstance>) => void,
},
    "addEditBorrowData", "addEditBorrowData", SliceSelectors<AddEditBorrowData>>
//data
export const initAddEditBorrowData: AddEditBorrowData = {
    baseInfo: {},
    borrower: {},
    status: "on-loan",
    borrowedBooks: [],
};
//slice
const addEditBorrowDataSlice: AddEditBorrowDataSlice = createSlice({
        name: "addEditBorrowData",
        initialState: initAddEditBorrowData,
        reducers: {
            modifyBorrowedBook: (state, action: PayloadAction<{ value: BorrowedBookData, id: number }>) => {
                const borrowedBook = state.borrowedBooks.find(b => b.bookInstance.id === action.payload.id);
                if (borrowedBook) {
                    borrowedBook.beforeBorrow = action.payload.value.beforeBorrow;
                    borrowedBook.afterBorrow = action.payload.value.afterBorrow;
                    borrowedBook.borrowDateRange = action.payload.value.borrowDateRange;
                }
            },
            addBorrowedBook: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<BookInstance>) => {
                const borrowedBook = state.borrowedBooks.find(b => b.bookInstance.id === action.payload.id);
                if (!borrowedBook) {
                    state.borrowedBooks.push({
                        borrowingStatus: "on-loan",
                        bookInstance: action.payload,
                        beforeBorrow: {},
                        afterBorrow: {status: "normal"},
                        borrowDateRange: {},
                    });
                }
            },
            setPropToAccountBorrow: <K extends keyof Account>(
                state: WritableDraft<AddEditBorrowData>,
                action: PayloadAction<{ key: K, value: Account[K] }>,
            ) => {
                if (state.borrower) {
                    state.borrower[action.payload.key] = action.payload.value;
                }
            },
            setPropToBorrow: <K extends Path<AddEditBorrowData>>(
                state: WritableDraft<AddEditBorrowData>,
                action: PayloadAction<{ key: K, value: PathValue<AddEditBorrowData, K> }>,
            ) => {
                set(state, action.payload.key, action.payload.value);
            },
            clearPropToBorrow: <K extends Path<AddEditBorrowData>>(
                state: WritableDraft<AddEditBorrowData>,
                action: PayloadAction<K>,
            ) => {
                if (get(state, action.payload) !== undefined) {
                    set(state, action.payload, undefined);
                }
            },
            setPropToBaseInfoBorrow: <K extends keyof BorrowBaseInfo>(
                state: WritableDraft<AddEditBorrowData>,
                action: PayloadAction<{ key: K, value: BorrowBaseInfo[K] }>,
            ) => {
                if (state.baseInfo) {
                    state.baseInfo[action.payload.key] = action.payload.value;
                }
            },
            setPropToBorrowedBook: <K extends Path<BorrowedBookData>>(state: WritableDraft<AddEditBorrowData>, {
                payload: {
                    idBorrowedBookOrBookInstance,
                    key,
                    value
                }
            }: PayloadAction<{
                idBorrowedBookOrBookInstance: number,
                key: K, value: PathValue<BorrowedBookData, K>,
            }>) => {
                const borrowedBook = state.borrowedBooks.find(b => b.id === idBorrowedBookOrBookInstance || b.bookInstance.id === idBorrowedBookOrBookInstance);
                if (borrowedBook) {
                    set(borrowedBook, key, value);
                }
            },
            setAddEditBorrowData: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<AddEditBorrowData>) => {
                state.id = action.payload.id;
                state.baseInfo = action.payload.baseInfo;
                state.borrowedBooks = action.payload.borrowedBooks;
                state.borrower = action.payload.borrower;
                state.status = action.payload.status;
            },
            clearData: (state: WritableDraft<AddEditBorrowData>) => {
                state.id = initAddEditBorrowData.id;
                state.baseInfo = initAddEditBorrowData.baseInfo;
                state.borrowedBooks = initAddEditBorrowData.borrowedBooks;
                state.borrower = initAddEditBorrowData.borrower;
                state.status = initAddEditBorrowData.status;
                // set all being null
            },
        },
    })
;
//export
export const {
    setAddEditBorrowData,
    addBorrowedBook,
    modifyBorrowedBook,
    setPropToBaseInfoBorrow,
    setPropToBorrowedBook,
    setPropToBorrow, clearPropToBorrow, setPropToAccountBorrow,
    clearData,
} = addEditBorrowDataSlice.actions;
export const selectBookBorrowedByInstanceId = createSelector(
    (state: RootState) => state.addEditBorrowData.borrowedBooks,
    (_, instanceId?: number) => instanceId,
    (borrowedBooks: BorrowedBookData[], instanceId?: number) => borrowedBooks.find((s) => s.bookInstance.id === instanceId));
export const selectCurrentBookBorrowed = createSelector(
    (state: RootState) => state.addEditBorrowData.borrowedBooks,
    (state: RootState) => state.addEditBorrowData.selectedBookId,
    (borrowedBooks, selected) => borrowedBooks.find((s) => s.bookInstance.id === selected),
);
const addEditBorrowDataReducer = addEditBorrowDataSlice.reducer;
export default addEditBorrowDataReducer;
//...............

