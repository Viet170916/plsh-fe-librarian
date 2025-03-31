import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const getToken = () => {
				if( typeof window !== "undefined" ){
								return localStorage.getItem( "token" );
				}
				return null;
};
export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
				fetchBaseQuery( {
								baseUrl: process.env.NEXT_PUBLIC_SERVER_API_URL ?? "https://book-hive-api.space/api/v1",
								prepareHeaders: ( headers, api ) => {
												const token = getToken();
												if( token ){
																headers.set( "Authorization", `Bearer ${ token }` );
												}
												return headers;
								},
				} );
export const baseQueryWithReAuth: typeof baseQuery = async( args, api, extraOptions ) => {
				const result = await baseQuery( args, api, extraOptions );
				console.log( result.error );
				if( result.error && result.error.status === 401 ){
								window?.location.replace( `/auth/sign-in` );
				}
				return result;
};
export const baseQueryForStatic: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
				fetchBaseQuery( {
								baseUrl: process.env.NEXT_PUBLIC_STATIC_FILE_SERVER_API_URL ?? "https://book-hive-api.space/static/v1",
								prepareHeaders: ( headers, api ) => {
												const token = getToken();
												if( token ){
																headers.set( "Authorization", `Bearer ${ token }` );
												}
												return headers;
								},
				} );
