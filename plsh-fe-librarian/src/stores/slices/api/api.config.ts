import { RootState } from "@/stores/store";
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  fetchBaseQuery( {
    baseUrl: process.env.NEXT_PUBLIC_SERVER_API_URL,
    prepareHeaders: ( headers, api ) => {
      const token = ( api.getState() as RootState ).session.accessToken;
      if( token ){
        headers.set( "Authorization", `Bearer ${ token }` );
      }
      return headers;
    },
  } );