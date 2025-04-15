"use client";
import {MessageDto, ReviewDto} from "@/helpers/appType";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useSelector} from "@/hooks/useSelector";
import {useSignalR} from "@/signalR/signal-r.config";
import {useLazyGetReviewsQuery} from "@/stores/slices/api/review.api.slice";
import {
    addMessageToReview,
    addReviewToReviews,
    clearPropInBookState,
    setPropToBookState,
} from "@/stores/slices/book-states/book.slice";
import {useAppStore} from "@/stores/store";
import React, {JSX, memo, useEffect} from "react";
import {shallowEqual} from "react-redux";

function ClientRender(): JSX.Element {
    const store = useAppStore();
    const dispatch = useAppDispatch();
    const currentBookId = useSelector(
        (state) => state.bookState.currentBook?.id,
        shallowEqual,
    );
    const [getBookReviews, {data, isLoading, error}] = useLazyGetReviewsQuery();
    const {data: newRealTimeReview, connection} = useSignalR<ReviewDto>(
        "bookHiveHub",
        "ReceiveReview",
        {
            group: `get-new-review-with-book-${currentBookId}`,
        },
    );
    useEffect(() => {
        connection?.on("ReceiveMessage", (message: MessageDto) => {
            if (message?.reviewId)
                dispatch(
                    addMessageToReview({reviewId: message.reviewId, data: message}),
                );
        });
    }, [connection, store, dispatch]);
    useEffect(() => {
        if (newRealTimeReview) {
            dispatch(addReviewToReviews(newRealTimeReview));
        }
    }, [newRealTimeReview, dispatch]);
    useEffect(() => {
        if (data?.data) {
            dispatch(
                setPropToBookState({key: "currentBookReviews", value: data.data}),
            );
            dispatch(
                setPropToBookState({
                    key: "isAccountHasReviewForThisBook",
                    value: data.isAccountHasReviewForThisBook,
                }),
            );
        }
        return () => {
            dispatch(clearPropInBookState("currentBookReviews"));
            dispatch(clearPropInBookState("isAccountHasReviewForThisBook"));
            dispatch(clearPropInBookState("currentReview"));
            dispatch(clearPropInBookState("currentMessage"));
        };
    }, [data, dispatch]);
    useEffect(() => {
        if (currentBookId) {
            getBookReviews({bookId: currentBookId, page: 1, limit: 10});
        }
    }, [currentBookId, getBookReviews]);
    return <></>;
}

export default memo(ClientRender);
