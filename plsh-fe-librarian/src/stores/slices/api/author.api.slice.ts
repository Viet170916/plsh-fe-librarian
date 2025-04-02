import { Author as AuthorData, Author } from "@/helpers/appType";
import { constants } from "@/helpers/constants";
import { objectToQueryParams } from "@/helpers/convert";
import { baseQueryWithReAuth } from "@/stores/slices/api/api.config";
import { createApi } from "@reduxjs/toolkit/query/react";

const httpMethods = constants.http.method;
const API = createApi( {
				reducerPath: "authorApi",
				baseQuery: baseQueryWithReAuth,
				tagTypes: [ "Authors" ],
				endpoints: ( builder ) => ({
								getAuthor: builder.query<AuthorData[], { keyword?: string }>( {
												query: ( params ) => {
																return `/author${ objectToQueryParams( params ) }`;
												},
												providesTags: () => [ { type: "Authors" } ],
								} ),
								addAuthor: builder.mutation<Author, FormData>( {
												query: ( payload ) => ({
																url: `/author/add`,
																method: httpMethods.POST,
																body: payload,
												}),
												invalidatesTags: () => [ { type: "Authors" } ],
								} ),
				}),
} );
export const authorApiReducer = API.reducer;
export const authorApiReducerPath = API.reducerPath;
export const authorApiMiddleware = API.middleware;
export const {
				useGetAuthorQuery,
				useAddAuthorMutation,
} = API;
