import {FilterParams, Member} from "@/helpers/appType";
import {RootState} from "@/stores/store";
import {createSlice, PayloadAction, Slice, SliceSelectors} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {createSelector} from "reselect";
import {Path, PathValue, set} from "react-hook-form";
// type
export type MemberState = {
    currentMember?: Member;
    addEditMember: Member;
    members: Member[];
    filter: FilterParams<Member>;
}
type MemberStateSlice = Slice<MemberState, {
    setPropToEditedMember: <K extends keyof Member>(state: WritableDraft<MemberState>, action: PayloadAction<{
        key: K,
        value: Member[K]
    }>) => void,
    setStateToMemberState: <K extends Path<MemberState>>(state: WritableDraft<MemberState>, action: PayloadAction<{
        key: K,
        value: PathValue<MemberState, K>;
    }>) => void,
    setMemberState: (state: WritableDraft<MemberState>, action: PayloadAction<MemberState>) => void
    clearData: (state: WritableDraft<MemberState>) => void;
    clearPropToMemberState: <K extends keyof MemberState>(state: WritableDraft<MemberState>, action: PayloadAction<K>) => void
},
    "memberState", "memberState", SliceSelectors<MemberState>>
//data
export const initMemberState: MemberState = {
    addEditMember: {
        status: "inactive", role: "student",
    },
    members: [],
    currentMember: undefined,
    filter: {page: 1, limit: 10, keyword: ""}
};
//slice
const memberStateSlice: MemberStateSlice = createSlice({
    name: "memberState",
    initialState: initMemberState,
    reducers: {
        setPropToEditedMember(memberState, {payload: {key, value}}) {
            memberState.addEditMember[key] = value;
        },
        setStateToMemberState(memberState, {payload: {key, value}}) {
            set(memberState, key, value);
        },
        setMemberState(memberState, {payload: {currentMember, members, addEditMember}}) {
            memberState.currentMember = currentMember;
            memberState.members = members;
            memberState.addEditMember = addEditMember;
        },
        clearData: (memberState) => {
            memberState.currentMember = initMemberState.currentMember;
            memberState.members = initMemberState.members;
            memberState.addEditMember = initMemberState.addEditMember;
        },
        clearPropToMemberState: (memberState, {payload}) => {
            memberState[payload] = initMemberState[payload];
        },
    },
});
//export
export const {
    setPropToEditedMember,
    setStateToMemberState,
    setMemberState,
    clearPropToMemberState,
    clearData,
} = memberStateSlice.actions;
export const selectMemberById = createSelector(
    (state: RootState) => state.memberState.members,
    (_, memberId?: number) => memberId,
    (members: Member[], memberId?: number) => members.find((mem) => mem.id === memberId));
const memberStateSliceReducer = memberStateSlice.reducer;
export default memberStateSliceReducer;
//...............

