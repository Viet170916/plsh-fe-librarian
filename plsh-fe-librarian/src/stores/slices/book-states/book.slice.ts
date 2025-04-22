import {BookData, FilterParams, MessageDto, ReviewDto} from "@/helpers/appType";
import {RootState} from "@/stores/store";
import {createSlice, PayloadAction, Slice, SliceSelectors,} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {get, Path, PathValue, set} from "react-hook-form";
import {createSelector} from "reselect";
// type
type BookState = {
    currentBook?: BookData;
    currentBookReviews?: ReviewDto[];
    currentReview?: ReviewDto;
    currentMessage?: MessageDto;
    isAccountHasReviewForThisBook?: boolean;
    booksFilter?: FilterParams<BookData> & { categories: string[] };
};
export const initBookState: BookState = {
    currentBook: undefined,
    currentBookReviews: undefined,
};
export type Payload<ParentObj, Key extends Path<ParentObj>> = {
    key: Key;
    value: PathValue<ParentObj, Key>;
};
type BookStateSlice = Slice<
    BookState,
    {
        setPropToBookState: <K extends Path<BookState>>(
            state: WritableDraft<BookState>,
            action: PayloadAction<Payload<BookState, K>>,
        ) => void;
        addMessageToReview: (
            state: WritableDraft<BookState>,
            action: PayloadAction<{ reviewId: number; data: MessageDto }>,
        ) => void;
        setMessagesToReview: (
            state: WritableDraft<BookState>,
            action: PayloadAction<{ reviewId: number; data: MessageDto[] }>,
        ) => void;
        addReviewToReviews: (
            state: WritableDraft<BookState>,
            action: PayloadAction<ReviewDto>,
        ) => void;
        clearPropInBookState: <K extends Path<BookState>>(
            state: WritableDraft<BookState>,
            action: PayloadAction<K>,
        ) => void;
        clearAllBookState: (state: WritableDraft<BookState>) => void;
    },
    "bookState",
    "bookState",
    SliceSelectors<BookState>
>;
//slice
const bookStateSlice: BookStateSlice = createSlice({
    name: "bookState",
    initialState: initBookState,
    reducers: {
        setMessagesToReview(state, {payload: {data, reviewId}}) {
            const review = state.currentBookReviews?.find((r) => r.id === reviewId);
            if (review) {
                review.messages = data;
            }
        },
        setPropToBookState(state, {payload: {key, value}}) {
            set(state, key, value);
        },
        addMessageToReview(state, {payload: {reviewId, data}}) {
            const review = state.currentBookReviews?.find((r) => r.id === reviewId);
            if (review) {
                review.messages = [data, ...(review.messages ?? [])];
            }
        },
        addReviewToReviews(state, {payload}) {
            if (state.currentBookReviews) {
                state.currentBookReviews = [payload, ...(state.currentBookReviews ?? [])];
            }
        },
        clearPropInBookState(state, {payload: key}) {
            set(state, key, get(initBookState, key));
        },
        clearAllBookState(state) {
            state.currentBook = undefined;
        },
    },
});
//export
export const selectMessageByReviewId = createSelector(
    (state: RootState) => state.bookState.currentBookReviews ?? [],
    (_, reviewId?: number) => reviewId,
    (reviews: ReviewDto[], reviewId?: number) =>
        reviews.find((s) => s.id === reviewId)?.messages,
);
export const {
    setPropToBookState,
    addMessageToReview,
    addReviewToReviews,
    clearAllBookState,
    setMessagesToReview,
    clearPropInBookState,
} = bookStateSlice.actions;
const bookStateReducer = bookStateSlice.reducer;
export default bookStateReducer;
//...............
