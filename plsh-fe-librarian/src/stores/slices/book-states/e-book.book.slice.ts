import {EBook, Payload} from "@/helpers/appType";
import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {get, Path, set} from "react-hook-form";
import {color} from "@/helpers/resources";
// type


export type EBookState = {
    currentEBook?: EBook
    currentChapter: number,
    chapters: EBook[],
    ebookSettings: {
        fontSize: number;
        theme: { color: string, bgcolor: string };
    }
}
type EBookStateSlice = Slice<EBookState, {
    setPropToEBookState: <K extends Path<EBookState>>(state: WritableDraft<EBookState>, action: PayloadAction<Payload<EBookState, K>>) => void,
    clearPropInEBookState: <K extends Path<EBookState>>(state: WritableDraft<EBookState>, action: PayloadAction<K>) => void,
    addChapters: (state: WritableDraft<EBookState>, action: PayloadAction<EBook[]>) => void,
    removeChapter: (state: WritableDraft<EBookState>, action: PayloadAction<number>) => void,
},
    "eBookState", "eBookState", SliceSelectors<EBookState>>
//data
export const initEBookState: EBookState = {
    currentEBook: undefined,
    currentChapter: 1,
    chapters: [],
    ebookSettings: {
        fontSize: 10,
        theme: {color: color.DARK_TEXT, bgcolor: color.WHITE},
    }
};
//slice
const eBookStateSlice: EBookStateSlice = createSlice({
    name: "eBookState",
    initialState: initEBookState,
    reducers: {
        setPropToEBookState(state, {payload: {key, value}}) {
            set(state, key, value);
        },
        clearPropInEBookState(state, {payload}) {
            set(state, payload, get(initEBookState, payload));
        },
        addChapters(state, action: PayloadAction<EBook[]>) {
            state.chapters.push(...action.payload);
        },
        removeChapter(state, action: PayloadAction<number>) {
            state.chapters = state.chapters.filter(c => c.id !== action.payload);
        },

    },
});
//export

export const {
    setPropToEBookState,
    clearPropInEBookState,
    removeChapter,
    addChapters,
} = eBookStateSlice.actions;
const eBookStateReducer = eBookStateSlice.reducer;
export default eBookStateReducer;
//...............

