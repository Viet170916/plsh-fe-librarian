import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {FileType} from "next/dist/lib/file-exists";
import {
    Author,
    Availability, BookDamageStatus, BookData,
    BorrowedBook,
    Borrower,
    BorrowStatus,
    Language,
    Resource,
    ShortBookInfo
} from "@/helpers/appType";
// type
export type BorrowBaseInfo = {
    borrowDate?: string;
    id?: number;
    code?: string;
    note?: string;
}
export type BorrowedBookData = {
    id?: number;
    code?: string;
    bookId?: number;
    bookTitle?: string;
    bookCode?: number;
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
        start?: Date;
        end?: Date;
    };

}
export type BorrowerData =
    {
        aboutRole?: {
            kind: "student",
            classRoom?: string;
            address?: string
        } | {
            kind: "teacher",
            address?: string;
        } | {
            kind: "guest",
            address?: string;
        } | {
            who?: string;
            kind: "other",
            address?: string;
        }
        identityCardNumber?: number;
        id?: number;
        name?: string;
        email?: string;
        phone?: string;
    }
export type BorrowStatusData = "overdue" | "on-loan" | "returned" | "partially-returned";
export type AddEditBorrowData = {
    id?: number;
    baseInfo: BorrowBaseInfo;
    borrower: BorrowerData;
    status: BorrowStatusData;
    borrowedBooks: BorrowedBookData[];
    selectedBookId?: number;

}
type AddEditBorrowDataSlice = Slice<AddEditBorrowData, {
    setAddEditBorrowData: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<AddEditBorrowData>) => void
    setAddEditBorrowBaseInfo: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<BorrowBaseInfo>) => void;
    modifyStatus: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<BorrowStatusData>) => void;
    resetStatus: (state: WritableDraft<AddEditBorrowData>) => void;
    setBorrower: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<BorrowerData>) => void;
    clearBorrower: (state: WritableDraft<AddEditBorrowData>) => void;
    addBorrowedBook: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<BorrowedBookData>) => void;
    removeBorrowedBook: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<string | number>) => void;
    modifyBorrowedBook: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<BorrowedBookData>) => void;
    setSelectedBookId: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<number>) => void;
    setImagesBeforeBorrow: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<{
        selectedBookId: number,
        resource: Resource[]
    }>) => void;
    setImagesAfterBorrow: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<{
        selectedBookId: number,
        resource: Resource[]
    }>) => void;
    clearData: (state: WritableDraft<AddEditBorrowData>) => void;
},
    "addEditBorrowData", "addEditBorrowData", SliceSelectors<AddEditBorrowData>>
//data
export const initAddEditBorrowData: AddEditBorrowData = {
    baseInfo: {},
    borrower: {},
    status: "on-loan",
    borrowedBooks: []
};
//slice
const addEditBorrowDataSlice: AddEditBorrowDataSlice = createSlice({
        name: "addEditBorrowData",
        initialState: initAddEditBorrowData,
        reducers: {
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
            setAddEditBorrowBaseInfo: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<BorrowBaseInfo | undefined>): void => {
                if (action.payload)
                    state.baseInfo = action.payload;
            },
            setBorrower: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<BorrowerData | undefined>): void => {
                if (action.payload)
                    state.borrower = action.payload;
            },
            addBorrowedBook: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<BorrowedBookData | undefined>): void => {
                if (action.payload && !state.borrowedBooks.find(bb => bb.bookId === action.payload?.bookId)) {
                    state.borrowedBooks.push(action.payload);
                }
            },
            modifyBorrowedBook: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<BorrowedBookData | undefined>): void => {
                const borrowed = state.borrowedBooks.find(bb => bb.bookId === action.payload?.bookId);
                if (action.payload && borrowed) {
                    borrowed.bookId = action.payload.bookId;
                    borrowed.afterBorrow = action.payload.afterBorrow;
                    borrowed.beforeBorrow = action.payload.beforeBorrow;
                    borrowed.bookCode = action.payload.bookCode;
                    borrowed.borrowDateRange = action.payload.borrowDateRange;
                    borrowed.id = action.payload.id;
                }
            },
            removeBorrowedBook: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<string | number | undefined>): void => {
                if (action.payload) {
                    state.borrowedBooks = state.borrowedBooks.filter(bb => bb.bookId !== action.payload);
                }
            },
            modifyStatus: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<BorrowStatusData | undefined>): void => {
                if (action.payload) {
                    state.status = action.payload;
                }
            },
            setSelectedBookId: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<number | undefined>): void => {
                if (action.payload) {
                    state.selectedBookId = action.payload;
                }
            },
            setImagesAfterBorrow: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<{
                selectedBookId: number,
                resource: Resource[]
            } | undefined>): void => {
                if (action.payload) {
                    const selectedBook = state.borrowedBooks.find(bb => bb.bookId === action.payload?.selectedBookId);
                    if (selectedBook) {
                        selectedBook.afterBorrow.images = action.payload.resource
                    }
                }
            },
            setImagesBeforeBorrow: (state: WritableDraft<AddEditBorrowData>, action: PayloadAction<{
                selectedBookId: number,
                resource: Resource[]
            } | undefined>): void => {
                if (action.payload) {
                    const selectedBook = state.borrowedBooks.find(bb => bb.bookId === action.payload?.selectedBookId);
                    if (selectedBook) {
                        selectedBook.beforeBorrow.images = action.payload.resource
                    }
                }
            },
            clearBorrower: (state: WritableDraft<AddEditBorrowData>): void => {
                state.borrower = {};
            },
            resetStatus: (state: WritableDraft<AddEditBorrowData>): void => {
                state.status = initAddEditBorrowData.status;
            },

        }
    })
;
//export
export const {
    setAddEditBorrowData,
    clearData,
    setBorrower,
    setAddEditBorrowBaseInfo,
    modifyStatus,
    modifyBorrowedBook,
    setImagesAfterBorrow,
    setImagesBeforeBorrow,
    removeBorrowedBook,
    resetStatus,
    clearBorrower,
    setSelectedBookId

} = addEditBorrowDataSlice.actions;
const addEditBorrowDataReducer = addEditBorrowDataSlice.reducer;
export default addEditBorrowDataReducer;
//...............

