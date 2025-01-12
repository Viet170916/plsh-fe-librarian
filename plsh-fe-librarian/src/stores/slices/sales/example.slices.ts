// import type { RootState } from "../../store";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

const initialColumns = [
  {
    id: "1",
    key: "index",
    name: "STT",
    hidden: false,
  }
];

export interface Columns{
  id: string;
  key: string;
  hidden: boolean;
  name: string;
}

export interface IOrderState{
  columns: Columns[];
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: IOrderState = {
  columns: initialColumns,
  isLoading: false,
  error: null,
};
const exampleSlices = createSlice( {
  name: "order",
  initialState,
  reducers: {
    // setOrder: (state: IOrderState, action) => {
    // state.orders = action.payload;
  },
} );
export const {
  // setOrder,
} = exampleSlices.actions;
// export const ordersState = ( state: RootState ) => state.order;
export default exampleSlices.reducer;
