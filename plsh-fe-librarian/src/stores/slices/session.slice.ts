import { IUser } from "@/app/api/auth/[...nextauth]/config";
import { createSlice, Slice, SliceSelectors } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";

export const initAppSession: AppSession = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
};
const sessionSlice: SessionSlice = createSlice( {
  name: "session",
  initialState: initAppSession,
  reducers: {
    setSession: ( state, action ) => {
      state.user = action.payload?.user;
      state.isAuthenticated = action.payload?.isAuthenticated;
      state.accessToken = action.payload?.accessToken;
    },
    clearSession: ( state ) => {
      state.user = initAppSession.user;
      state.isAuthenticated = false;
      state.accessToken = null;
    },
  },
} );
export const { setSession, clearSession } = sessionSlice.actions;
const sessionReducer = sessionSlice.reducer;
export default sessionReducer;
//...............
type SessionSlice = Slice<AppSession, {
  setSession: ( state: WritableDraft<AppSession>, action: {
    payload: AppSession;
    type: string
  } ) => void;
  clearSession: ( state: WritableDraft<AppSession> ) =>
    void
}, "session", "session", SliceSelectors<AppSession>>
export type AppSession = { user: null | IUser; isAuthenticated?: boolean; accessToken: string | null };