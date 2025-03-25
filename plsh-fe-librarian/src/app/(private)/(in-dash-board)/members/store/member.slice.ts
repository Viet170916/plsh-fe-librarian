import { Member } from "@/helpers/appType";
import { RootState } from "@/stores/store";
import { createSlice, PayloadAction, Slice, SliceSelectors } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
import { createSelector } from "reselect";
// type
export type MemberState = {
				currentMember?: Member;
				addEditMember: Member;
				members: Member[];
}
type MemberStateSlice = Slice<MemberState, {
				setPropToEditedMember: <K extends keyof Member>( state: WritableDraft<MemberState>, action: PayloadAction<{ key: K, value: Member[K] }> ) => void,
				setStateToMemberState: <K extends keyof MemberState>( state: WritableDraft<MemberState>, action: PayloadAction<{ key: K, value: MemberState[K] }> ) => void,
				setMemberState: ( state: WritableDraft<MemberState>, action: PayloadAction<MemberState> ) => void
				clearData: ( state: WritableDraft<MemberState> ) => void;
},
				"memberState", "memberState", SliceSelectors<MemberState>>
//data
export const initMemberState: MemberState = {
				addEditMember: {
								status: "inactive", role: "student",
				},
				members: [],
				currentMember: undefined,
};
//slice
const memberStateSlice: MemberStateSlice = createSlice( {
				name: "memberState",
				initialState: initMemberState,
				reducers: {
								setPropToEditedMember( memberState, { payload: { key, value } } ){
												memberState.addEditMember[key] = value;
								},
								setStateToMemberState( memberState, { payload: { key, value } } ){
												memberState[key] = value;
								},
								setMemberState( memberState, { payload: { currentMember, members, addEditMember } } ){
												memberState.currentMember = currentMember;
												memberState.members = members;
												memberState.addEditMember = addEditMember;
								},
								clearData: ( memberState ) => {
												memberState.currentMember = initMemberState.currentMember;
												memberState.members = initMemberState.members;
												memberState.addEditMember = initMemberState.addEditMember;
								},
				},
} );
//export
export const {
				setPropToEditedMember,
				setStateToMemberState,
				setMemberState,
				clearData,
} = memberStateSlice.actions;
export const selectMemberById = createSelector(
				( state: RootState ) => state.memberState.members,
				( _, memberId?: number ) => memberId,
				( members: Member[], memberId?: number ) => members.find( ( mem ) => mem.id === memberId ) );
const memberStateSliceReducer = memberStateSlice.reducer;
export default memberStateSliceReducer;
//...............

