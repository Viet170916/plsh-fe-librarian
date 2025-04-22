import {EBook, Payload} from "@/helpers/appType";
import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {get, Path, set} from "react-hook-form";
import {color} from "@/helpers/resources";
// type


export type EBookState = {
    currentEBook?: EBook
    currentChapter: number,
    ebookSettings: {
        fontSize: number;
        theme: { color: string, bgcolor: string };
    }
}
type EBookStateSlice = Slice<EBookState, {
    setPropToEBookState: <K extends Path<EBookState>>(state: WritableDraft<EBookState>, action: PayloadAction<Payload<EBookState, K>>) => void,
    clearPropInEBookState: <K extends Path<EBookState>>(state: WritableDraft<EBookState>, action: PayloadAction<K>) => void,
},
    "eBookState", "eBookState", SliceSelectors<EBookState>>
//data
export const initEBookState: EBookState = {
    currentEBook: undefined,
    currentChapter: 1,
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

    },
});
//export

export const {
    setPropToEBookState,
    clearPropInEBookState,
} = eBookStateSlice.actions;
const eBookStateReducer = eBookStateSlice.reducer;
export default eBookStateReducer;
//...............

