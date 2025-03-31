import { BookBorrowingDto, LoanDto } from "@/helpers/dataTransfer";
import { createSlice, PayloadAction, Slice, SliceSelectors } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { Path, PathValue, set } from "react-hook-form";
// type
export type LoanState = {
				currentLoan?: LoanDto;
				currenBookBorrowing?:BookBorrowingDto;
}
type LoanStateSlice = Slice<LoanState, {
				setPropToLoanState: <K extends Path<LoanState>>( state: WritableDraft<LoanState>, action: PayloadAction<{ key: K, value: PathValue<LoanState, K> }> ) => void;
				clearData: ( state: WritableDraft<LoanState> ) => void;
},
				"loanState", "loanState", SliceSelectors<LoanState>>
//data
export const initLoanState: LoanState = {
				currentLoan: undefined,
};
//slice
const loanStateSlice: LoanStateSlice = createSlice( {
								name: "loanState",
								initialState: initLoanState,
								reducers: {
												setPropToLoanState( state, { payload: { key, value } } ){
																set( state, key, value );
												},
												clearData( state ){
																state.currentLoan = initLoanState.currentLoan;
												},
								},
				} )
;
//export
export const {
				setPropToLoanState,
				clearData,
} = loanStateSlice.actions;
const loanStateReducer = loanStateSlice.reducer;
export default loanStateReducer;
//...............

