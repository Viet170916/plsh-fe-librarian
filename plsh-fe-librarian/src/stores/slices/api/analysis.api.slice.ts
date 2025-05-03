import {
    AnalyticsData,
    AnyObject, BaseResponse,
    BookQuantityAnalyticsData,
    LoanAnalyticsData,
    LoanSortByCategoryAnalyticsDataRes
} from "@/helpers/appType";
import {baseQuery, baseQueryWithReAuth} from "@/stores/slices/api/api.config";
import {createApi,} from "@reduxjs/toolkit/query/react";
import {MemberAnalytic} from "@/app/(private)/(in-dash-board)/members/(page)/MemberAnalytic";
import {BookStatistics} from "@/app/(private)/(in-dash-board)/resources/books/(page)/BookAnalytic";

type BookAnalytic = {
    bookId: number;
    bookTitle: string;
    totalBooks: number;
    availableBooks: number;
    borrowedBooks: number;
    damagedBooks: number;
    statusBreakdown: { status: string; count: number }[];
    totalBorrowCount: number;
};
export const analyticsApi = createApi({
    reducerPath: "analyticsApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        getAccountAnalytics: builder.query<BaseResponse<MemberAnalytic>, void>({
            query: () => `/analytic/account/all`,
        }),
        getBookAnalytics_All: builder.query<BaseResponse<BookStatistics>, void>({
            query: () => `/analytic/book/all`,
        }),
        getBookAnalytics: builder.query<BookAnalytic, number>({
            query: (bookId) => `/analytic/book/${bookId}`,
        }),
        getAnalytics: builder.query<AnalyticsData, AnyObject>({
            query: () => "/analytics",
        }),
        getLoanAnalyticsData: builder.query<LoanAnalyticsData, AnyObject>({
            query: () => "/analytics/loan-data",
        }),
        getBookQuantityAnalyticsData: builder.query<BookQuantityAnalyticsData, AnyObject>({
            query: () => "/analytics/book-quantity-data"
        }),
        getLoanSortByCategoryAnalyticsData: builder.query<LoanSortByCategoryAnalyticsDataRes, AnyObject>({
            query: () => "/analytics/book-quantity-data"
        })

    }),
});

export const analyticsApiReducer = analyticsApi.reducer;
export const analyticsApiReducerPath = analyticsApi.reducerPath;
export const analyticsApiMiddleware = analyticsApi.middleware;
export const {
    useGetAnalyticsQuery,
    useGetAccountAnalyticsQuery,
    useGetBookAnalytics_AllQuery,
    useGetLoanAnalyticsDataQuery,
    useGetBookQuantityAnalyticsDataQuery,
    useGetLoanSortByCategoryAnalyticsDataQuery,
    useLazyGetBookAnalyticsQuery,
} = analyticsApi;
