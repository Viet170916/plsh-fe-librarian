import { objectToQueryParams } from "@/helpers/convert";
import { baseQueryForStatic } from "@/stores/slices/api/api.config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { OptionKind } from "pdfjs-dist/types/web/app_options";

const API = createApi( {
				reducerPath: "resourceStatic",
				baseQuery: baseQueryForStatic,
				endpoints: ( builder ) => ({
								getEpubResource: builder.query<string, { bookId: number, chapter: number }>( {
												query: ( { bookId, chapter } ) => ({
																url: `preview/${ bookId }${ objectToQueryParams( { chapter } ) }`,
																responseHandler: "text",
												}),
												transformResponse: ( response: string ) => response,
								} ),
				}),
} );
export const resourceStaticReducer = API.reducer;
export const resourceStaticReducerPath = API.reducerPath;
export const resourceStaticMiddleware = API.middleware;
export const {
				useGetEpubResourceQuery,
} = API;
