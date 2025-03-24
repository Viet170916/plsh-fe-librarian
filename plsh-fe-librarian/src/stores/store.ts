import { analyticsApiMiddleware, analyticsApiReducer, analyticsApiReducerPath } from "@/stores/slices/api/analysis.api.slice";
import { authorApiMiddleware, authorApiReducer, authorApiReducerPath } from "@/stores/slices/api/author.api.slice";
import { bookApiMiddleware, bookApiReducer, bookApiReducerPath } from "@/stores/slices/api/book.api.slice";
import { libraryApiMiddleware, libraryApiReducer, libraryApiReducerPath } from "@/stores/slices/api/library-room.api.slice";
import { resourceStaticMiddleware, resourceStaticReducer, resourceStaticReducerPath } from "@/stores/slices/api/resource.static.slice";
import addEditBookDataReducer from "@/stores/slices/book-states/book.add-edit.slice";
import addEditBorrowDataReducer from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import globalReducer from "@/stores/slices/global.slice";
import libraryRoomStateSliceReducer from "@/stores/slices/lib-room-state/lib-room.slice";
import shelfStateSliceReducer from "@/stores/slices/lib-room-state/shelf.slice";
import sessionReducer from "@/stores/slices/session.slice";
import { configureStore } from "@reduxjs/toolkit";
import { useStore } from "react-redux";

export const store = configureStore( {
				reducer: {
								//app states
								global: globalReducer,
								session: sessionReducer,
								addEditBookData: addEditBookDataReducer,
								addEditBorrowData: addEditBorrowDataReducer,
								libraryRoomState: libraryRoomStateSliceReducer,
								shelfState: shelfStateSliceReducer,
								//apis
								analytic: analyticsApiReducer,
								[analyticsApiReducerPath]: analyticsApiReducer,
								book: bookApiReducer,
								[bookApiReducerPath]: bookApiReducer,
								_authorApi: authorApiReducer,
								[authorApiReducerPath]: authorApiReducer,
								_libraryRoomAPi: libraryApiReducer,
								[libraryApiReducerPath]: libraryApiReducer,
								_resourceStatic: resourceStaticReducer,
								[resourceStaticReducerPath]: resourceStaticReducer,
				},
				middleware: ( getDefaultMiddleware ) => {
								return (
												getDefaultMiddleware()
												.concat( analyticsApiMiddleware )
												.concat( bookApiMiddleware )
												.concat( authorApiMiddleware )
												.concat( libraryApiMiddleware )
												.concat( resourceStaticMiddleware )
								);
				},
} );
// store.ts
export type AppDispatch = typeof store.dispatch;
export const useAppStore = () => useStore<RootState>();
export type RootState = ReturnType<typeof store.getState>;
