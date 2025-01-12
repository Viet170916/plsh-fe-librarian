import { SERVER_URL } from "@/configs/site.config";
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, } from "@reduxjs/toolkit/query/react";

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  fetchBaseQuery( {
    baseUrl: SERVER_URL
  } );
export const exampleApiSlice = createApi( {
  reducerPath: "orderApi",
  baseQuery: baseQuery,
  tagTypes: [ "Order", "OrderDetail", "OrderItem" ],
  endpoints: ( builder ) => ( {
    getExample: builder.query<{ data: string }, { [ key: string ]: string | number | undefined }>(
      {
        query: ( { page, limit, ...fields } ) => {
          const params = new URLSearchParams( {
            page: String( page || 1 ),
            limit: String( limit || 10 ),
            ...Object.fromEntries(
              Object.entries( fields ).map( ( [ key, value ] ) => [ key, String( value ) ] )
            ),
          } ).toString();
          return `<this is request url conatains ${ params } >`;
        },
        // providesTags( result ){
        //   if( result && result.data && result.data.items ){
        //     return [
        //       ...result.data.items.map( ( { id }: { id: string } ) => ( {
        //         type: "Order" as const,
        //         id,
        //       } ) ),
        //       { type: "Order" as const, id: "LIST" },
        //     ];
        //   }
        //   return [ { type: "Order", id: "LIST" } ];
        // },
      } ),
    postCreateExample: builder.mutation( {
      query: ( body ) => ( {
        url: "<this is request url>",
        method: "POST",
        body,
      } ),
      // invalidatesTags: ( result, error, body: { param: string } ) =>
      //   error ? [] : [ { type: "Order", id: "LIST" } ],
    } ),
  } ),
} );
export const exampleApiReducer = exampleApiSlice.reducer;
export const exampleApiReducerPath = exampleApiSlice.reducerPath;
export const exampleApiMiddleware = exampleApiSlice.middleware;
export const {
  useGetExampleQuery, // đặt tên giống với tên query definition ở trên (ví dụ với query có tên là "example" thì đặt là "useExamplesQuery" còn nếu là mutation thì đặt là "useExamplesMutation")
  usePostCreateExampleMutation,
} = exampleApiSlice;
