import {BaseResponse, FilterParams, MessageDto, ReviewDto,} from "@/helpers/appType";
import {constants} from "@/helpers/constants";
import {objectToFormData} from "@/helpers/convert";
import {baseQueryWithReAuth} from "@/stores/slices/api/api.config";
import {createApi} from "@reduxjs/toolkit/query/react";

const httpMethods = constants.http.method;
export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["Reviews", "Review", "Messages"],
    endpoints: (builder) => ({
        getReviews: builder.query<
            BaseResponse<ReviewDto[]> & { isAccountHasReviewForThisBook?: boolean },
            FilterParams<ReviewDto> & { bookId: number }
        >({
            query: (param) => ({
                url: `/review/book/${param.bookId}`,
                params: param,
            }),
            providesTags: (_, __, {bookId}) => [
                {type: "Reviews", id: `${bookId}`},
            ],
        }),
        getMessages: builder.query<
            BaseResponse<MessageDto[]>,
            FilterParams<MessageDto> & { reviewId: number }
        >({
            query: (param) => ({
                url: `/review/${param.reviewId}/messages`,
                params: param,
            }),
            // providesTags: (_, __, { reviewId }) => [
            //   { type: "Messages", id: `${reviewId}` },
            // ],
        }),
        sendMessage: builder.mutation<BaseResponse<MessageDto>, MessageDto>({
            query: (param) => ({
                url: `/review/message/send`,
                method: httpMethods.POST,
                body: objectToFormData(param),
            }),
            invalidatesTags: (_, __, {reviewId}) => [
                {type: "Messages", id: `${reviewId}`},
            ],
        }),
        sendReview: builder.mutation<BaseResponse<ReviewDto>, ReviewDto>({
            query: (param) => ({
                url: `/review/send`,
                method: httpMethods.POST,
                body: objectToFormData(param),
            }),
            invalidatesTags: (_, __, {bookId}) => [
                {type: "Reviews", id: `${bookId}`},
            ],
        }),
    }),
});
export const {
    useLazyGetMessagesQuery,
    useSendMessageMutation,
    useSendReviewMutation,
    useLazyGetReviewsQuery,
    usePrefetch,
} = reviewApi;
