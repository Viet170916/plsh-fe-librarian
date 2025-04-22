import {BookInstance, FilterParams, Payload} from "@/helpers/appType";
import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {Path, set} from "react-hook-form";
// type


export type BookInstanceState = {
    currentBookInstance?: BookInstance
    currentBookInstances: BookInstance[];
    bookInstanceFilter: FilterParams<BookInstance> & { isbnOrBookCode?: string, keyword?: string };
}
type BookInstanceStateSlice = Slice<BookInstanceState, {
    setPropToBookInstanceState: <K extends Path<BookInstanceState>>(state: WritableDraft<BookInstanceState>, action: PayloadAction<Payload<BookInstanceState, K>>) => void,
},
    "bookInstanceState", "bookInstanceState", SliceSelectors<BookInstanceState>>
//data
export const initBookInstanceState: BookInstanceState = {
        currentBookInstances: [],
        bookInstanceFilter: {
            page: 1,
            limit: 10
        },
    }
;
//slice
const bookInstanceStateSlice: BookInstanceStateSlice = createSlice({
    name: "bookInstanceState",
    initialState: initBookInstanceState,
    reducers: {
        setPropToBookInstanceState(state, {payload: {key, value}}) {
            set(state, key, value);
        },
    },
});
//export

export const {
    setPropToBookInstanceState,
} = bookInstanceStateSlice.actions;
const bookInstanceStateReducer = bookInstanceStateSlice.reducer;
export default bookInstanceStateReducer;
//...............

