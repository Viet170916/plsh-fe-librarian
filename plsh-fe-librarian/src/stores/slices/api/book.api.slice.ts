import { BookData, BooksResponse, PagingParams, Resource } from "@/helpers/appType";
import { constants } from "@/helpers/constants";
import { objectToQueryParams } from "@/helpers/convert";
import { baseQuery } from "@/stores/slices/api/api.config";
import { Category } from "@/stores/slices/book-states/book.add-edit.slice";
import { createApi } from "@reduxjs/toolkit/query/react";

const httpMethods = constants.http.method;
export const bookApi = createApi( {
				reducerPath: "bookApi",
				baseQuery: baseQuery,
				endpoints: ( builder ) => ({
								getBooks: builder.query<BooksResponse, PagingParams>( {
												query: ( param: PagingParams ): string => `/book${ objectToQueryParams( param ) }`,
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
								getChapterHtml: builder.query<string, { bookId: number, chapter: number }>( {
												query: ( { bookId, chapter } ) => `preview/${ bookId }${ objectToQueryParams( { chapter } ) }`,
								} ),
				}),
} );
export const bookApiReducer = bookApi.reducer;
export const bookApiReducerPath = bookApi.reducerPath;
export const bookApiMiddleware = bookApi.middleware;
export const {
				useGetBooksQuery,
				useAddUpdateBookMutation,
				useGetChapterHtmlQuery,
				useUploadBookResourceMutation,
				useLazyCheckCategoryNameIsDuplicatedQuery,
				useGetBooksWithIsbnQuery,
				useGetCategoriesQuery,
} = bookApi;
