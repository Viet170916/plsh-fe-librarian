import { createSlice, PayloadAction, Slice, SliceSelectors } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";
// type
export type Account = {
				googleToken?: string;
				googleUserId?: string;
				password?: string;
				classRoom?: string;
				id?: number;
				role?: "student" | "teacher";
				fullName?: string;
				birthdate?: string;
				avatarUrl?: string;
				cardMemberNumber?: number;
				cardMemberStatus?: number;
				address?: string;
				phoneNumber?: string;
				email?: string;
				identityCardNumber?: string;
				status?: "active" | "inactive" | "forbidden";
}
export type AccountState = {
				currentAccount: Account;
				registerForm: Account;
}
type AccountStateSlice = Slice<AccountState, {
				setPropToEditedAccount: <K extends keyof Account>( state: WritableDraft<AccountState>, action: PayloadAction<{ key: K, value: Account[K] }> ) => void,
				setStateToAccountState: <K extends keyof AccountState>( state: WritableDraft<AccountState>, action: PayloadAction<{ key: K, value: AccountState[K] }> ) => void,
				setAccountState: ( state: WritableDraft<AccountState>, action: PayloadAction<AccountState> ) => void
				clearData: ( state: WritableDraft<AccountState> ) => void;
				clearPropToAccountState: <K extends keyof AccountState>( state: WritableDraft<AccountState>, action: PayloadAction<K> ) => void
},
				"accountState", "accountState", SliceSelectors<AccountState>>
//data
export const initAccountState: AccountState = {
				currentAccount: { status: "inactive", role: "student" },
				registerForm: { status: "inactive", role: "student" },
};
//slice
const accountStateSlice: AccountStateSlice = createSlice( {
				name: "accountState",
				initialState: initAccountState,
				reducers: {
								setPropToEditedAccount( accountState, { payload: { key, value } } ){
												accountState.registerForm[key] = value;
								},
								setStateToAccountState( accountState, { payload: { key, value } } ){
												accountState[key] = value;
								},
								setAccountState( accountState, { payload: { currentAccount, registerForm } } ){
												accountState.currentAccount = currentAccount;
												accountState.registerForm = registerForm;
								},
								clearData: ( accountState ) => {
												accountState.currentAccount = initAccountState.currentAccount;
												accountState.registerForm = initAccountState.registerForm;
								},
								clearPropToAccountState: ( accountState, { payload } ) => {
												accountState[payload] = initAccountState[payload];
								},
				},
} );
//export
export const {
				setPropToEditedAccount,
				setStateToAccountState,
				setAccountState,
				clearPropToAccountState,
				clearData,
} = accountStateSlice.actions;
const accountStateSliceReducer = accountStateSlice.reducer;
export default accountStateSliceReducer;
//...............

