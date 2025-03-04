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

export const store = configureStore({
    reducer: {
        //app states
        session: sessionReducer,
        addEditBookData: addEditBookDataReducer,
        //apis
        analytic: analyticsApiReducer,
        [analyticsApiReducerPath]: analyticsApiReducer,
        book: bookApiReducer,
        [bookApiReducerPath]: bookApiReducer,
        _authorApi: authorApiReducer,
        [authorApiReducerPath]: authorApiReducer,


    },
    middleware: (getDefaultMiddleware) => {
        return (
            getDefaultMiddleware()
                .concat(analyticsApiMiddleware)
                .concat(bookApiMiddleware)
                .concat(authorApiMiddleware)
        );
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
