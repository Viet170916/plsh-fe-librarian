import { BaseResponse, BookData, BookInstance, BooksResponse, PagingParams, Resource } from "@/helpers/appType";
import { constants } from "@/helpers/constants";
import { objectToQueryParams } from "@/helpers/convert";
import { baseQuery, baseQueryWithReAuth } from "@/stores/slices/api/api.config";
import { Category } from "@/stores/slices/book-states/book.add-edit.slice";
import { createApi } from "@reduxjs/toolkit/query/react";

const httpMethods = constants.http.method;
export const bookApi = createApi( {
				reducerPath: "bookApi",
				baseQuery: baseQueryWithReAuth,
				tagTypes: [ "BookInstances", "Book", "Books" ],
				endpoints: ( builder ) => ({
								getBooks: builder.query<BooksResponse, PagingParams>( {
												query: ( param: PagingParams ): string => `/book${ objectToQueryParams( param ) }`,
								} ),
								getBookInstances: builder.query<BaseResponse<BookInstance[]>, { bookId?: number, isbnOrBookCode?: string, keyword?: string }>( {
												query: ( param ) => ({
																url: `/book/book-instances`,
																params: param,
												}),
												providesTags: () => [ { type: "BookInstances" } ],
								} ),
								deleteBookInstances: builder.mutation<BaseResponse<BookInstance[]>, { instanceId: number }>( {
												query: ( param ) => ({
																url: `/book/book-instance/${ param.instanceId }`,
																method: httpMethods.DELETE,
												}),
												invalidatesTags: () => [ { type: "BookInstances" } ],
								} ),
								getBooksWithIsbn: builder.query<BookData[], { isbn?: string, keyword?: string }>( {
												query: ( param ) => {
																return `book/global/search${ objectToQueryParams( param ) }`;
												},
								} ),
								getCategories: builder.query<Category[], { keyword?: string }>( {
												query: ( param ) => {
																return `category${ objectToQueryParams( param ) }`;
												},
								} ),
								checkCategoryNameIsDuplicated: builder.query<{
												message: string, status: "duplicated" | "no duplicated"
												suggestions: Category[]
								}, { name?: string }>( {
												query: ( param ) => {
																return `category/check-duplicate${ objectToQueryParams( param ) }`;
												},
								} ),
								addUpdateBook: builder.mutation<BookData, FormData>( {
												query: ( payload ) => ({
																url: `/book/add`,
																method: httpMethods.POST,
																body: payload,
												}),
								} ),
								uploadBookResource: builder.mutation<Resource, { data: FormData, bookId: number }>( {
												query: ( payload ) => ({
																url: `/resource/book/upload/${ payload.bookId }`,
																method: httpMethods.POST,
																body: payload.data,
												}),
								} ),
				}),
} );
export const bookApiInvalidatesTags = bookApi.util.invalidateTags;
export const bookApiReducer = bookApi.reducer;
export const bookApiReducerPath = bookApi.reducerPath;
export const bookApiMiddleware = bookApi.middleware;
export const {
				useGetBooksQuery,
				useAddUpdateBookMutation,
				useLazyGetBookInstancesQuery,
				useDeleteBookInstancesMutation,
				useGetBookInstancesQuery,
				useUploadBookResourceMutation,
				useLazyCheckCategoryNameIsDuplicatedQuery,
				useGetBooksWithIsbnQuery,
				useGetCategoriesQuery,
				usePrefetch,
} = bookApi;
