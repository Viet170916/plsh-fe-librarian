import {BookBorrowingDto, LoanDto, LoanStatus} from "@/helpers/dataTransfer";
import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {get, Path, PathValue, set} from "react-hook-form";
import {FilterParams} from "@/app/(private)/(in-dash-board)/members/(page)/ClientRender";
// type
export type LoanState = {
    currentLoan?: LoanDto;
    currenBookBorrowing?: BookBorrowingDto;
    loansFilter: FilterParams<LoanDto> & { approveStatus: LoanStatus };
    loans: LoanDto[];
}
type LoanStateSlice = Slice<LoanState, {
    setPropToLoanState: <K extends Path<LoanState>>(state: WritableDraft<LoanState>, action: PayloadAction<{
        key: K,
        value: PathValue<LoanState, K>
    }>) => void;
    clearPropInLoanState: <K extends Path<LoanState>>(state: WritableDraft<LoanState>, action: PayloadAction<K>) => void;
    clearData: (state: WritableDraft<LoanState>) => void;
},
    "loanState", "loanState", SliceSelectors<LoanState>>
//data
export const initLoanState: LoanState = {
    currentLoan: undefined,
    loansFilter: {limit: 10, keyword: "", page: 1, approveStatus: ""},
    loans: [],
};
//slice
const loanStateSlice: LoanStateSlice = createSlice({
        name: "loanState",
        initialState: initLoanState,
        reducers: {
            setPropToLoanState(state, {payload: {key, value}}) {
                set(state, key, value);
            },
            clearPropInLoanState(state, {payload}) {
                set(state, payload, get(initLoanState, payload));
            },
            clearData(state) {
                state.currentLoan = initLoanState.currentLoan;
            },
        },
    })
;
//export
export const {
    clearData,
    setPropToLoanState,
    clearPropInLoanState,
} = loanStateSlice.actions;
const loanStateReducer = loanStateSlice.reducer;
export default loanStateReducer;
//...............

