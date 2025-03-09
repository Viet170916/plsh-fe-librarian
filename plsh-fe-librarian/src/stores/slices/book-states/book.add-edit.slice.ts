import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {FileType} from "next/dist/lib/file-exists";
import {Author, Availability, Language, Resource, ShortBookInfo} from "@/helpers/appType";
// type
export type BookResources = {
    coverImage?: Resource;
    previewPdf?: Resource;
}
export type BookBaseInfo = {
    title?: "Clean Code",
    position?: string,
    description?: string,
    version?: string,
    summaryDescription?: string,
    availability: Availability[],
}
export type BookOverview = {
    language?: Language,
    pageCount?: number,
}
export type AddEditBookData = {
    id?: number;
    resource: BookResources,
    baseInfo: BookBaseInfo,
    author: Author,
    overview: BookOverview,
}
type AddEditBookDataSlice = Slice<AddEditBookData, {
    setAddEditBookData: (state: WritableDraft<AddEditBookData>, action: PayloadAction<AddEditBookData>) => void
    setResource: (state: WritableDraft<AddEditBookData>, action: PayloadAction<BookResources>) => void;
    setAuthor: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Author>) => void;
    setBookBaseInfo: (state: WritableDraft<AddEditBookData>, action: PayloadAction<BookBaseInfo>) => void;
    setBookAvailabilities: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Availability[]>) => void;
    addBookAvailability: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Availability>) => void;
    removeBookAvailability: (state: WritableDraft<AddEditBookData>, action: PayloadAction<"e-book" | "audio" | "physical">) => void;
    modifyBookAvailability: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Availability>) => void;
    clearData: (state: WritableDraft<AddEditBookData>) => void;


},
    "addEditBookData", "addEditBookData", SliceSelectors<AddEditBookData>>
//data
export const initAddEditBookData: AddEditBookData = {
    resource: {},
    baseInfo: {
        availability: []
    },
    author: {},
    overview: {}
};
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
            state.resource = {};
            state.author = {};
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
        },
        setBookBaseInfo: (state: WritableDraft<AddEditBookData>, action: PayloadAction<BookBaseInfo | undefined>): void => {
            console.log(action.payload);
            if (action.payload) {
                state.baseInfo = action.payload;
            }
        },
        setBookAvailabilities: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Availability[] | undefined>): void => {
            console.log(action.payload);
            if (action.payload) {
                if (state.baseInfo) {
                    state.baseInfo.availability = action.payload;
                }
            }
        },
        addBookAvailability: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Availability | undefined>): void => {
            if (action.payload) {
                if (state.baseInfo) {
                    if (action.payload.kind === "physical")
                        state.baseInfo.availability?.push(action.payload);
                    else {
                        state.baseInfo.availability?.push({
                            ...action.payload,
                            resource: ({...action.payload.resource, file: undefined} as Resource)
                        });
                    }
                }
            }

        },
        removeBookAvailability: (state: WritableDraft<AddEditBookData>, action: PayloadAction<"e-book" | "audio" | "physical">): void => {
            if (action.payload) {
                if (state.baseInfo) {

                    state.baseInfo.availability = state.baseInfo.availability?.filter(a => a.kind !== action.payload);
                }
            }
        },

        modifyBookAvailability: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Availability | undefined>): void => {
            console.log(action.payload);
            if (action.payload) {
                if (state.baseInfo) {
                    const av = state.baseInfo.availability?.find(a => a.kind === action.payload?.kind);
                    if (av) {
                        av.isChecked = action.payload.isChecked;
                        if (av.kind === "physical" && action.payload.kind === "physical") {
                            av.position = action.payload.position;
                        } else if (av.kind === "e-book" && action.payload.kind === "e-book") {
                            av.resource = ({...action.payload.resource, file: undefined} as Resource);
                        } else if (av.kind === "audio" && action.payload.kind === "audio") {
                            av.resource = ({...action.payload.resource, file: undefined} as Resource);
                        }
                    }

                }
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
    setBookBaseInfo,
    setBookAvailabilities,
    addBookAvailability,
    removeBookAvailability,
    modifyBookAvailability,
} = addEditBookDataSlice.actions;
const addEditBookDataReducer = addEditBookDataSlice.reducer;
export default addEditBookDataReducer;
//...............

