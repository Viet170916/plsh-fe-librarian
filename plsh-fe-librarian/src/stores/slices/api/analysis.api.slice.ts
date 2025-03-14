import {
  AnalyticsData,
  AnyObject,
  BookQuantityAnalyticsData,
  LoanAnalyticsData,
  LoanSortByCategoryAnalyticsData, LoanSortByCategoryAnalyticsDataRes
} from "@/helpers/appType";
import { baseQuery } from "@/stores/slices/api/api.config";
import {
  BaseQueryArg,
  createApi,
} from "@reduxjs/toolkit/query/react";

export const analyticsApi = createApi( {
  reducerPath: "analyticsApi",
  baseQuery: baseQuery,
  endpoints: ( builder ) => ( {
    getAnalytics: builder.query<AnalyticsData, AnyObject>( {
      query: () => "/analytics",
    } ),
    getLoanAnalyticsData: builder.query<LoanAnalyticsData, AnyObject>( {
      query: () => "/analytics/loan-data",
    } ),
    getBookQuantityAnalyticsData: builder.query<BookQuantityAnalyticsData, AnyObject>( {
      query: () => "/analytics/book-quantity-data"
    } ),
    getLoanSortByCategoryAnalyticsData: builder.query<LoanSortByCategoryAnalyticsDataRes, AnyObject>( {
      query: () => "/analytics/book-quantity-data"
    } )
  } ),
} );

export const analyticsApiReducer = analyticsApi.reducer;
export const analyticsApiReducerPath = analyticsApi.reducerPath;
export const analyticsApiMiddleware = analyticsApi.middleware;
export const {
  useGetAnalyticsQuery,
  useGetLoanAnalyticsDataQuery,
  useGetBookQuantityAnalyticsDataQuery,
  useGetLoanSortByCategoryAnalyticsDataQuery
} = analyticsApi;