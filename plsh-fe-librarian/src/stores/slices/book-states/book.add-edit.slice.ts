import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {FileType} from "next/dist/lib/file-exists";
import {Author, Availability, Language, Resource, ShortBookInfo} from "@/helpers/appType";
// type
export type BookResources = {
    coverImage?: Resource;
    pdf?: Resource;
}
export type BookBaseInfo = {
    title?: "Clean Code",
    description?: string,
    version?: string,
    summaryDescription?: string,
    availability?: Availability[],
}
export type BookOverview = {
    language?: Language,
    pageCount?: number,
}
export type AddEditBookData = {
    id?: number;
    resource?: BookResources,
    baseInfo?: BookBaseInfo,
    author?: Author,
    overview?: BookOverview,
}
type AddEditBookDataSlice = Slice<AddEditBookData, {
    setAddEditBookData: (state: WritableDraft<AddEditBookData>, action: PayloadAction<AddEditBookData>) => void
    setResource: (state: WritableDraft<AddEditBookData>, action: PayloadAction<BookResources>) => void;
    setAuthor: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Author>) => void;
    clearData: (state: WritableDraft<AddEditBookData>) => void;


},
    "addEditBookData", "addEditBookData", SliceSelectors<AddEditBookData>>
//data
export const initAddEditBookData: AddEditBookData = {};
//slice
const addEditBookDataSlice: AddEditBookDataSlice = createSlice({
    name: "addEditBookData",
    initialState: initAddEditBookData,
    reducers: {
        setAddEditBookData: (state: WritableDraft<AddEditBookData>, action: PayloadAction<AddEditBookData>) => {
            state.id = action.payload.id;
            state.resource = action.payload.resource;
            state.author = action.payload.author;

        },
        clearData: (state: WritableDraft<AddEditBookData>) => {
            state.id = undefined;
            state.resource = undefined;
            state.author = undefined;
            // set all being null
        },
        setResource: (state: WritableDraft<AddEditBookData>, action: PayloadAction<BookResources | undefined>): void => {
            if (action.payload)
                state.resource = action.payload;
        },
        setAuthor: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Author | undefined>): void => {
            console.log(action.payload);
            if (action.payload) {
                state.author = action.payload;

            }
        }
    },
});
//export
export const {
    setAddEditBookData,
    clearData,
    setResource,
    setAuthor,
} = addEditBookDataSlice.actions;
const addEditBookDataReducer = addEditBookDataSlice.reducer;
export default addEditBookDataReducer;
//...............

