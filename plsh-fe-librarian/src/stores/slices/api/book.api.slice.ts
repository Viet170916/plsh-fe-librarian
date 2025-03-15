import {baseQuery} from "@/stores/slices/api/api.config";
import {
    BaseQueryArg,
    createApi,
} from "@reduxjs/toolkit/query/react";
import {AnyObject, BookData, BooksResponse, PagingParams} from "@/helpers/appType";
import {objectToQueryParams} from "@/helpers/convert";


const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getBooks: builder.query<BooksResponse, PagingParams>({
            query: (param: PagingParams): string => `/books${objectToQueryParams(param)}`
        }),
        getBooksWithIsbn: builder.query<BookData[], { isbn?: string, keyword?: string }>({
            query: (param) => {
                return `book/global/search${objectToQueryParams(param)}`;
            }
        })
    }),
});

export const bookApiReducer = bookApi.reducer;
export const bookApiReducerPath = bookApi.reducerPath;
export const bookApiMiddleware = bookApi.middleware;
export const {
    useGetBooksQuery,
    useGetBooksWithIsbnQuery,
} = bookApi;