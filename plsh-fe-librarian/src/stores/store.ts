import { configureStore } from "@reduxjs/toolkit";
import {
  exampleApiMiddleware,
  exampleApiReducer,
  exampleApiReducerPath
} from "@/stores/slices/api/example.api.slices";

export const store = configureStore( {
  reducer: {
    [ exampleApiReducerPath ]: exampleApiReducer,
  },
  middleware: ( getDefaultMiddleware ) => {
    return (
      getDefaultMiddleware()
        // categories

        .concat( exampleApiMiddleware )
    );
  },
} );
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
