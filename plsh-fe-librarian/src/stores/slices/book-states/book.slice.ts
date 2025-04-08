import { BookData, Payload } from "@/helpers/appType";
import { createSlice, PayloadAction, Slice, SliceSelectors } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { Path } from "react-hook-form";
// type
export type BookState = {
				currentBook?: BookData
}
type BookStateSlice = Slice<BookState, {
				setPropToBookState: <K extends Path<BookState>>( state: WritableDraft<BookState>, action: PayloadAction<Payload<BookState, K>> ) => void,
},
				"bookState", "bookState", SliceSelectors<BookState>>
//data
export const initBookState: BookState = {
								currentBook: undefined,
				}
;
//slice
const bookStateSlice: BookStateSlice = createSlice( {
				name: "bookState",
				initialState: initBookState,
				reducers: {
								setPropToBookState(){
								},
				},
} );
//export
export const {
				setPropToBookState,
} = bookStateSlice.actions;
const bookStateReducer = bookStateSlice.reducer;
export default bookStateReducer;
//...............

