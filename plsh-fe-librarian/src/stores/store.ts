import {
    accountApiMiddleware,
    accountApiReducer,
    accountApiReducerPath
} from "@/app/(public)/auth/store/account.api.slice";
import accountStateSliceReducer from "@/app/(public)/auth/store/account.slice";
import {
    analyticsApiMiddleware,
    analyticsApiReducer,
    analyticsApiReducerPath
} from "@/stores/slices/api/analysis.api.slice";
import {authorApiMiddleware, authorApiReducer, authorApiReducerPath} from "@/stores/slices/api/author.api.slice";
import {bookApiMiddleware, bookApiReducer, bookApiReducerPath} from "@/stores/slices/api/book.api.slice";
import {loanApiMiddleware, loanApiReducer, loanApiReducerPath} from "@/stores/slices/api/borrow.api.slice";
import {
    libraryApiMiddleware,
    libraryApiReducer,
    libraryApiReducerPath
} from "@/stores/slices/api/library-room.api.slice";
import {memberApiMiddleware, memberApiReducer, memberApiReducerPath} from "@/stores/slices/api/member.api.slice";
import {
    resourceStaticMiddleware,
    resourceStaticReducer,
    resourceStaticReducerPath
} from "@/stores/slices/api/resource.static.slice";
import addEditBookDataReducer from "@/stores/slices/book-states/book.add-edit.slice";
import addEditBorrowDataReducer from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import loanStateReducer from "@/stores/slices/borrow-state/loan.slice";
import globalReducer from "@/stores/slices/global.slice";
import libraryRoomStateSliceReducer from "@/stores/slices/lib-room-state/lib-room.slice";
import shelfStateSliceReducer from "@/stores/slices/lib-room-state/shelf.slice";
import memberStateSliceReducer from "@/stores/slices/member-states/member.slice";
import sessionReducer from "@/stores/slices/session.slice";
import {configureStore} from "@reduxjs/toolkit";
import {useStore} from "react-redux";
import {notificationApi} from "@/stores/slices/api/notification.api.slice";
import notificationStateReducer from "@/stores/slices/notification/notification.slice";
import {geminiApi} from "@/stores/slices/api/gemini.api.slice";
import chatStateReducer from "@/stores/slices/chat-state/chat.slice";
import {audioBookApi} from "@/stores/slices/api/audio-book.api.slice";
import audioBookStateReducer from "@/stores/slices/book-states/audio.book.slice";
import bookStateReducer from "@/stores/slices/book-states/book.slice";
import {reviewApi} from "@/stores/slices/api/review.api.slice";
import eBookStateReducer from "@/stores/slices/book-states/e-book.book.slice";
import bookInstanceStateReducer from "@/stores/slices/book-states/book-instance.book.slice";

export const store = configureStore({
    reducer: {
        //app states
        global: globalReducer,
        session: sessionReducer,
        addEditBookData: addEditBookDataReducer,
        addEditBorrowData: addEditBorrowDataReducer,
        libraryRoomState: libraryRoomStateSliceReducer,
        shelfState: shelfStateSliceReducer,
        memberState: memberStateSliceReducer,
        accountState: accountStateSliceReducer,
        loanState: loanStateReducer,
        librarianState: libraryRoomStateSliceReducer,
        notificationState: notificationStateReducer,
        chatState: chatStateReducer,
        audioBookState: audioBookStateReducer,
        bookState: bookStateReducer,
        eBookState: eBookStateReducer,
        bookInstanceState: bookInstanceStateReducer,
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
        _memberApi: memberApiReducer,
        [memberApiReducerPath]: memberApiReducer,
        _accountApi: accountApiReducer,
        [accountApiReducerPath]: accountApiReducer,
        _loanApi: loanApiReducer,
        [loanApiReducerPath]: loanApiReducer,
        [notificationApi.reducerPath]: notificationApi.reducer,
        [geminiApi.reducerPath]: geminiApi.reducer,
        [audioBookApi.reducerPath]: audioBookApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,

    },
    middleware: (getDefaultMiddleware) => {
        return (
            getDefaultMiddleware()
                .concat(analyticsApiMiddleware)
                .concat(bookApiMiddleware)
                .concat(authorApiMiddleware)
                .concat(libraryApiMiddleware)
                .concat(resourceStaticMiddleware)
                .concat(memberApiMiddleware)
                .concat(accountApiMiddleware)
                .concat(loanApiMiddleware)
                .concat(notificationApi.middleware)
                .concat(geminiApi.middleware)
                .concat(audioBookApi.middleware)
                .concat(reviewApi.middleware)

        );
    },
});
// store.ts
export type AppDispatch = typeof store.dispatch;
export const useAppStore = () => useStore<RootState>();
export type RootState = ReturnType<typeof store.getState>;
//utils
// function getNestedValue<T extends Record<string, any>>( obj: T, path: string ): any{
// 				return path.split( "." ).reduce( ( acc, key ) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj );
// }
// export const selectNestedValue = createSelector(
// 				( state: RootState ) => state.addEditBorrowData.borrowedBooks,
// 				( _, props:{ key: string, instanceId?: number }) => props,
// 				( data, props ) => getNestedValue( data.find(brB=>brB.bookInstance.id), props.key ),
// );
