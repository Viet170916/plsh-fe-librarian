import {
    analyticsApiMiddleware,
    analyticsApiReducer,
    analyticsApiReducerPath
} from "@/stores/slices/api/analysis.api.slice";
import {configureStore} from "@reduxjs/toolkit";
import sessionReducer from "@/stores/slices/session.slice";
import {bookApiMiddleware, bookApiReducer, bookApiReducerPath} from "@/stores/slices/api/book.api.slice";
import addEditBookDataReducer from "@/stores/slices/book-states/book.add-edit.slice";
import {authorApiMiddleware, authorApiReducer, authorApiReducerPath} from "@/stores/slices/api/author.api.slice";
import addEditBorrowDataReducer from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import libraryRoomStateSliceReducer from "@/stores/slices/lib-room-state/lib-room.slice";
import {useStore} from "react-redux";
import shelfStateSliceReducer from "@/stores/slices/lib-room-state/shelf.slice";
import {
    libraryApiMiddleware,
    libraryApiReducer,
    libraryApiReducerPath
} from "@/stores/slices/api/library-room.api.slice";

export const store = configureStore({
    reducer: {
        //app states
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


    },
    middleware: (getDefaultMiddleware) => {
        return (
            getDefaultMiddleware()
                .concat(analyticsApiMiddleware)
                .concat(bookApiMiddleware)
                .concat(authorApiMiddleware)
                .concat(libraryApiMiddleware)
        );
    },
});
// store.ts
export type AppDispatch = typeof store.dispatch;
export const useAppStore = () => useStore<RootState>();
export type RootState = ReturnType<typeof store.getState>;
