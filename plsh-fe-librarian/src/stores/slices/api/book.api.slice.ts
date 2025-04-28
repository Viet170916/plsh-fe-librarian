import {BaseResponse, BookData, BookInstance, FilterParams, LanguageCode, Resource} from "@/helpers/appType";
import {constants} from "@/helpers/constants";
import {objectToQueryParams} from "@/helpers/convert";
import {baseQueryWithReAuth} from "@/stores/slices/api/api.config";
import {Category} from "@/stores/slices/book-states/book.add-edit.slice";
import {createApi} from "@reduxjs/toolkit/query/react";
import {Path} from "react-hook-form";

const httpMethods = constants.http.method;
export const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["BookInstances", "Book", "Books", "BookInstance"],
    endpoints: (builder) => ({
        getFieldGenerate: builder.mutation<BaseResponse<{
            key: Path<BookData>,
            value: string | number | boolean
        }[]>, { bookName: string, prompt: string }>({
            query(params) {
                return (
                    {
                        url: `ai/fields-generate`,
                        method: httpMethods.POST,
                        body: params
                    }
                );
            }
        }),
        addBookInstances: builder.mutation<BaseResponse<string>, { quantity?: number, bookId: number }>({
            query({bookId, ...other}) {
                return (
                    {
                        url: `book/${bookId}/instance/add`,
                        method: httpMethods.POST,
                        body: other
                    }
                );
            },
            invalidatesTags: ["BookInstances"]
        }),
        modifyBookInstances: builder.mutation<BaseResponse<string>, {
            id: number,
            position: number,
            rowShelfId: number
        }>({
            query({id, ...other}) {
                return (
                    {
                        url: `book/book-instances/${id}/update-position`,
                        method: httpMethods.PUT,
                        body: other
                    }
                );
            },
            invalidatesTags: ["BookInstance"]
        }),
        getBookInstance: builder.query<BaseResponse<BookInstance>, number | string>({
            query(id) {
                return (
                    {
                        url: `book/book-instances/${id}`,
                    }
                );
            },
            providesTags: ["BookInstance"]
        }),
        getBooks: builder.query<BaseResponse<BookData[]>, FilterParams<BookData> & {
            authorId?: number,
        }>({
            query: (param) => ({
                url: `/book`,
                params: param,
            }),
            providesTags: () => [{type: "Books"}],
        }),
        getBookImageFromGgs: builder.query<string[], string>({
            query: (query) => ({
                url: `/resource/gg/images`,
                params: {query}
            }),
        }),
        getBook: builder.query<BookData, number>({
            query: (id: number): string => `/book/${id}`,
        }),
        getBookAiSearch: builder.mutation<BaseResponse<BookData>, { title: string, version?: string }>({
            query: (params) => ({
                url: `/book/generate-from-gemini`,
                method: httpMethods.POST,
                body: params,
            }),
        }),
        getBookInstances: builder.query<BaseResponse<BookInstance[]>, {
            bookId?: number,
            isbnOrBookCode?: string,
            keyword?: string
        }>({
            query: (param) => ({
                url: `/book/book-instances`,
                params: param,
            }),
            providesTags: () => [{type: "BookInstances"}],
        }),
        deleteBookInstances: builder.mutation<BaseResponse<BookInstance[]>, { instanceId: number }>({
            query: (param) => ({
                url: `/book/book-instance/${param.instanceId}`,
                method: httpMethods.DELETE,
            }),
            invalidatesTags: () => [{type: "BookInstances"}],
        }),
        getBooksWithIsbn: builder.query<BookData[], { isbn?: string, keyword?: string }>({
            query: (param) => {
                return `book/global/search${objectToQueryParams(param)}`;
            },
        }),
        getCategories: builder.query<Category[], { keyword?: string }>({
            query: (param) => {
                return `category${objectToQueryParams(param)}`;
            },
        }),
        checkCategoryNameIsDuplicated: builder.query<{
            message: string, status: "duplicated" | "no duplicated"
            suggestions: Category[]
        }, { name?: string }>({
            query: (param) => {
                return `category/check-duplicate${objectToQueryParams(param)}`;
            },
        }),
        addUpdateBook: builder.mutation<BookData, BookData>({
            query: (payload) => ({
                url: `/book/add`,
                method: httpMethods.POST,
                body: payload,
            }),
        }),
        uploadBookResource: builder.mutation<Resource, { data: FormData, bookId: number }>({
            query: (payload) => ({
                url: `/resource/book/upload/${payload.bookId}`,
                method: httpMethods.POST,
                body: payload.data,
            }),
        }),
    }),
});
export const bookApiInvalidatesTags = bookApi.util.invalidateTags;
export const bookApiReducer = bookApi.reducer;
export const bookApiReducerPath = bookApi.reducerPath;
export const bookApiMiddleware = bookApi.middleware;
export const {
    useAddUpdateBookMutation,
    useModifyBookInstancesMutation,
    useLazyGetBookInstancesQuery,
    useLazyGetBooksQuery,
    useGetFieldGenerateMutation,
    useGetBookInstanceQuery,
    useLazyGetBookQuery,
    useGetBookQuery,
    useGetBookAiSearchMutation,
    useLazyGetBookImageFromGgsQuery,
    useAddBookInstancesMutation,
    useLazyGetCategoriesQuery,
    useDeleteBookInstancesMutation,
    useGetBookInstancesQuery,
    useUploadBookResourceMutation,
    useLazyCheckCategoryNameIsDuplicatedQuery,
    useGetBooksWithIsbnQuery,
    useLazyGetBooksWithIsbnQuery,
    useGetCategoriesQuery,
    usePrefetch,
} = bookApi;
