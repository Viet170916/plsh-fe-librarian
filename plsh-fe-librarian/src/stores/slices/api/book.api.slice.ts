import {baseQuery} from "@/stores/slices/api/api.config";
import {
    createApi,
} from "@reduxjs/toolkit/query/react";
import {AnyObject, BooksResponse, PagingParams} from "@/helpers/appType";
import {objectToQueryParams} from "@/helpers/convert";


const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getBooks: builder.query<BooksResponse, PagingParams>({
            query: (param: PagingParams): string => `/books${objectToQueryParams(param)}`
        }),
    }),
});

export const bookApiReducer = bookApi.reducer;
export const bookApiReducerPath = bookApi.reducerPath;
export const bookApiMiddleware = bookApi.middleware;
export const {
    useGetBooksQuery,
} = bookApi;