import { createSlice, Slice, SliceSelectors } from "@reduxjs/toolkit";
import { WritableDraft } from "immer";

const initState: IUserRegisterInfo = {
  email: null,
  password: null,
  reEnterPassword: null,
  idGoogle: null,
  googleToken: null,
  phoneNumber: null,
  fullName: null,
  address: null,
  roleInSchool: null,
  identityCardNumber: null,
  classRoom: null,
};
const registerSlice: ThisSlice = createSlice( {
  name: "session",
  initialState: initState,
  reducers: {
    setRegisterInfo: ( state, action ) => {
      state.email = action.payload.email;
      state.reEnterPassword = action.payload.reEnterPassword;
      state.password = action.payload.password;
      state.idGoogle = action.payload.idGoogle;
      state.googleToken = action.payload.googleToken;
      state.phoneNumber = action.payload.phoneNumber;
      state.fullName = action.payload.fullName;
      state.address = action.payload.address;
      state.roleInSchool = action.payload.roleInSchool;
      state.identityCardNumber = action.payload.identityCardNumber;
      state.classRoom = action.payload.classRoom;
    },
    clearRegisterInfo: ( state ) => {
      state.email = null;
      state.reEnterPassword = null;
      state.password = null;
      state.idGoogle = null;
      state.googleToken = null;
      state.phoneNumber = null;
      state.fullName = null;
      state.address = null;
      state.roleInSchool = null;
      state.identityCardNumber = null;
      state.classRoom = null;
    },
  },
} );
export const { setRegisterInfo, clearRegisterInfo } = registerSlice.actions;
const registerInfoReducer = registerSlice.reducer;
export default registerInfoReducer;
//...............
type ThisSlice = Slice<IUserRegisterInfo, {
  setRegisterInfo: ( state: WritableDraft<IUserRegisterInfo>, action: {
    payload: IUserRegisterInfo;
    type: string
  } ) => void;
  clearRegisterInfo: ( state: WritableDraft<IUserRegisterInfo> ) =>
    void
},
  "session", "session", SliceSelectors<IUserRegisterInfo>>
export type IUserRegisterInfo = {
  email: string | null;
  password: string | null;
  reEnterPassword: string | null;
  idGoogle: string | number | null;
  googleToken?: string | null;
  phoneNumber: string | null;
  fullName: string | null;
  address: string | null;
  roleInSchool: "student" | "teacher" | null;
  identityCardNumber?: string | null;
  classRoom?: string | null;
}