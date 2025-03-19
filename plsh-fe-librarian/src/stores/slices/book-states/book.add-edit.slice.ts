import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {Author, Availability, BookData, LanguageCode, Resource} from "@/helpers/appType";
import {FieldPathValue} from "react-hook-form";
// type
export type BookResources = {
    coverImage: Resource;
    previewPdf: Resource;
}
export type BookBaseInfo = {
    title?: string,
    position?: string,
    version?: string,
    summaryDescription?: string,
    availability: Availability[],
    "quantity"?: number,
    "category": Category
}
export type Category = {
    id?: number,
    name?: string,
}
export type BookOverview = {
    language?: LanguageCode,
    pageCount?: number,
    description?: string,
    price?: number,
    isbNumber13?: string,
    isbNumber10?: string,
    otherIdentifier?: string,
    publisher?: string,
    publishDate?: string,
    series?: string,
    seriesId?: number,
    height?: number,
    width?: number,
    thickness?: number,
    weight?: number,
}
export type AddEditBookData = {
    id?: number;
    resource: BookResources,
    baseInfo: BookBaseInfo,
    authors: Author[],
    overview: BookOverview,
}
type AddEditBookDataSlice = Slice<AddEditBookData, {
    setAddEditBookWithBookData: (state: WritableDraft<AddEditBookData>, action: PayloadAction<BookData>) => void,
    setAddEditBookData: (state: WritableDraft<AddEditBookData>, action: PayloadAction<AddEditBookData>) => void
    setResource: (state: WritableDraft<AddEditBookData>, action: PayloadAction<BookResources>) => void;
    setAuthor: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Author[]>) => void;
    addAuthor: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Author>) => void;
    deleteAuthor: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Author>) => void;
    toggleAuthor: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Author>) => void;
    setBookBaseInfo: (state: WritableDraft<AddEditBookData>, action: PayloadAction<BookBaseInfo>) => void;
    setBookAvailabilities: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Availability[]>) => void;
    addBookAvailability: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Availability>) => void;
    removeBookAvailability: (state: WritableDraft<AddEditBookData>, action: PayloadAction<"e-book" | "audio" | "physical">) => void;
    modifyBookAvailability: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Availability>) => void;
    setBookOverview: (state: WritableDraft<AddEditBookData>, action: PayloadAction<BookOverview>) => void;
    clearData: (state: WritableDraft<AddEditBookData>) => void;
    setValueInOverview: (state: WritableDraft<AddEditBookData>, action: PayloadAction<{
        key: keyof BookOverview,
        value: FieldPathValue<BookOverview, keyof BookOverview>,
    }>) => void,


},
    "addEditBookData", "addEditBookData", SliceSelectors<AddEditBookData>>
//data
export const initAddEditBookData: AddEditBookData = {
    resource: {coverImage: {type: "image"}, previewPdf: {type: "pdf"}},
    baseInfo: {
        availability: [], category: {}
    },
    authors: [],
    overview: {}
};
//slice
const addEditBookDataSlice: AddEditBookDataSlice = createSlice({
    name: "addEditBookData",
    initialState: initAddEditBookData,
    reducers: {
        setValueInOverview: (state: WritableDraft<AddEditBookData>, action: PayloadAction<{
            key: keyof BookOverview,
            value: FieldPathValue<BookOverview, keyof BookOverview>
        }>) => {
            state.overview[action.payload.key] = action.payload.value as undefined;

        },
        setBookOverview: (state: WritableDraft<AddEditBookData>, action: PayloadAction<BookOverview>) => {
            // if(typeof action.payload ==="function"){
            //     state.overview = action.payload(state.overview);
            // }
            // else {
            state.overview = action.payload;
            // }
            // state.overview.publisher = action.payload.publisher ?? state.overview.publisher;
            // state.overview.publishDate = action.payload.publishDate ?? state.overview.publishDate;
            // state.overview.pageCount = action.payload.pageCount ?? state.overview.pageCount;
            // state.overview.isbNumber10 = action.payload.isbNumber10 ?? state.overview.isbNumber10;
            // state.overview.isbNumber13 = action.payload.isbNumber13 ?? state.overview.isbNumber13;
            // state.overview.otherIdentifier = action.payload.otherIdentifier ?? state.overview.otherIdentifier;
            // state.overview.description = action.payload.description ?? state.overview.description;
            // state.overview.language = action.payload.language ?? state.overview.language;
        },
        setAddEditBookWithBookData: (state: WritableDraft<AddEditBookData>, action: PayloadAction<BookData>) => {
            console.log(action.payload)
            state.id = action.payload.id;
            state.resource.coverImage.localUrl = action.payload.thumbnail;
            state.authors = action.payload.authors;
            state.baseInfo.title = action.payload.title;
            state.baseInfo.version = action.payload.version;
            state.baseInfo.category = action.payload.category;
            state.baseInfo.quantity = action.payload.quantity;
            state.overview.description = action.payload.description;
            state.overview.language = action.payload.language;
            state.overview.pageCount = action.payload.pageCount;
            state.overview.isbNumber10 = action.payload.isbNumber10;
            state.overview.isbNumber13 = action.payload.isbNumber13;
            state.overview.otherIdentifier = action.payload.otherIdentifier;
            state.overview.publishDate = action.payload.publishDate;
            state.overview.publisher = action.payload.publisher;
        },
        setAddEditBookData: (state: WritableDraft<AddEditBookData>, action: PayloadAction<AddEditBookData>) => {
            state.id = action.payload.id;
            state.resource = action.payload.resource;
            state.authors = action.payload.authors;

        },
        clearData: (state: WritableDraft<AddEditBookData>) => {
            state.id = undefined;
            state.resource = initAddEditBookData.resource;
            state.authors = initAddEditBookData.authors;
            // set all being null
        },
        setResource: (state: WritableDraft<AddEditBookData>, action: PayloadAction<BookResources | undefined>): void => {
            if (action.payload)
                state.resource = action.payload;
        },
        setAuthor: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Author[] | undefined>): void => {
            console.log(action.payload);
            if (action.payload) {
                state.authors = action.payload;
            }
        },
        addAuthor: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Author | undefined>): void => {
            console.log(action.payload);
            if (action.payload) {
                state.authors.push(action.payload);
            }
        },
        deleteAuthor: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Author | undefined>): void => {
            console.log(action.payload);
            if (action.payload) {
                state.authors = state.authors.filter(a => a.id !== action.payload?.id)
            }
        },
        toggleAuthor: (state: WritableDraft<AddEditBookData>, action: PayloadAction<Author | undefined>): void => {
            console.log(action.payload);
            if (action.payload) {
                if (state.authors.map(a => a.id).includes(action.payload.id)) {
                    state.authors = state.authors.filter(a => a.id !== action.payload?.id);
                } else {
                    state.authors.push(action.payload);
                }
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
                            av.quantity = action.payload.quantity;
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
    deleteAuthor,
    setBookAvailabilities,
    toggleAuthor,
    setValueInOverview,
    setBookOverview,
    addAuthor,
    setAddEditBookWithBookData,
    addBookAvailability,
    removeBookAvailability,
    modifyBookAvailability,
} = addEditBookDataSlice.actions;
const addEditBookDataReducer = addEditBookDataSlice.reducer;
export default addEditBookDataReducer;
//...............

