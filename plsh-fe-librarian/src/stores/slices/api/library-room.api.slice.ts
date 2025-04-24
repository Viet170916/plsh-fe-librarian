import {Shelf} from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";
import {BaseResponse, BookInstance} from "@/helpers/appType";
import {constants} from "@/helpers/constants";
import {objectToQueryParams} from "@/helpers/convert";
import {baseQueryWithReAuth} from "@/stores/slices/api/api.config";
import {bookApiInvalidatesTags} from "@/stores/slices/api/book.api.slice";
import {LibraryRoomState} from "@/stores/slices/lib-room-state/lib-room.slice";
import {RowShelf} from "@/stores/slices/lib-room-state/shelf.slice";
import {createApi} from "@reduxjs/toolkit/query/react";
import {int} from "@zxing/library/es2015/customTypings";
import {Item} from "@/app/(private)/(in-dash-board)/resources/library-room/(page)/item";

export type CheckShelfResponse = {
    data?: Shelf,
}
const httpMethods = constants.http.method;
const API = createApi({
    reducerPath: "libraryRoomApi",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["BookInstances", "Shelves"],
    endpoints: (builder) => ({
        upsertItem: builder.mutation<BaseResponse<Item>, Item>({
            query: (body) => ({
                url: `library-room/item/upsert`,
                method: httpMethods.POST,
                body
            }), invalidatesTags: ["Shelves"]
        }),
        getShelf: builder.query<Shelf, number>({
            query: (id) => ({
                url: `/library-room/shelf/${id}`
            })
        }),
        removeItem: builder.mutation<BaseResponse<Item>, { id: number, force?: boolean }>({
            query: ({id, force}) => ({
                url: `library-room/item/${id}`,
                method: httpMethods.DELETE,
                params: {force}
            }), invalidatesTags: ["Shelves"]
        }),

        checkShelfExisted: builder.query<Shelf, { shelfId: string }>({
            query: (params) => {
                return `/library-room/shelf/check${objectToQueryParams({id: params.shelfId})}`;
            },
        }),
        checkRowHasAnyBook: builder.query<{ rowShelfId: number, hasBooks: boolean }, { rowId: number }>({
            query: (params) => {
                return `/library-room/shelf/row/has-books/${params.rowId}`;
            },
        }),
        getShelves: builder.query<Shelf[], { minimum?: boolean }>({
            query: (params) => ({
                url: `/library-room/shelf`,
                params
            }),
            providesTags: ["Shelves"],
        }),
        getItems: builder.query<Item[], { minimum?: boolean }>({
            query: (params) => ({
                url: `/library-room/items`,
                params
            }),
            providesTags: ["Shelves"],
        }),
        modifyLibraryRoom: builder.mutation<LibraryRoomState, { shelves: Item[] }>({
            query: (payload) => ({
                url: `/library-room/upsert`,
                method: httpMethods.POST,
                body: payload,
            }),
            invalidatesTags: ["Shelves"]
        }),
        addRow: builder.mutation<RowShelf, { shelfId: number }>({
            query: ({shelfId}) => ({
                url: `/library-room/shelf/${shelfId}/row/add`,
                method: httpMethods.POST,
            }),
        }),
        deleteRow: builder.mutation<RowShelf, { rowId: number }>({
            query: ({rowId}) => ({
                url: `/library-room/shelf/row/delete/${rowId}`,
                method: httpMethods.DELETE,
            }),
        }),
        modifyRowInfo: builder.mutation<BaseResponse<RowShelf>, RowShelf>({
            query: (rowShelf) => ({
                url: `/library-room/shelf/row/update/${rowShelf.id}`,
                method: httpMethods.PUT,
                body: rowShelf,
            }),
            // invalidatesTags: (result, d, request) => [{type:""}],
        }),
        putBooksOntoShelf: builder.mutation<{
            "message": string;
            "success": boolean;
            "data": BookInstance[];
        }, BookInstance[]>({
            query: (instances) => ({
                url: `/library-room/put-books-on-shelf`,
                method: httpMethods.PUT,
                body: (instances),
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;
                    dispatch(bookApiInvalidatesTags([{type: "BookInstances"}]));
                } catch {
                }
            },
        }),
        removeBooksOutOffShelf: builder.mutation<{ message: string }, int[]>({
            query: (instances) => ({
                url: `/library-room/delete-out-of-row-shelf`,
                method: httpMethods.PUT,
                body: (instances),
            }),
            invalidatesTags: () => [{type: "BookInstances"}],
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;
                    dispatch(bookApiInvalidatesTags([{type: "BookInstances"}]));
                } catch {
                }
            },
        }),
        getBooksOnShelf: builder.query<{
            "message": string,
            "success": boolean,
            "data": BookInstance[]
        }, { bookId: number, rowShelfId: number }>({
            query: (instances) => ({
                url: `/library-room/book-instances/on-shelf`,
                params: (instances),
            }),
            providesTags: () => [{type: "BookInstances"}],
        }),
    }),
});
export const libraryApiReducer = API.reducer;
export const libraryApiReducerPath = API.reducerPath;
export const libraryApiMiddleware = API.middleware;
export const {
    useCheckShelfExistedQuery,
    useLazyGetShelvesQuery,
    useGetItemsQuery,
    useGetShelfQuery,
    useRemoveItemMutation,
    useUpsertItemMutation,
    useGetBooksOnShelfQuery,
    usePutBooksOntoShelfMutation,
    useModifyRowInfoMutation,
    useRemoveBooksOutOffShelfMutation,
    useAddRowMutation,
    useDeleteRowMutation,
    useLazyCheckRowHasAnyBookQuery,
    useGetShelvesQuery,
    useModifyLibraryRoomMutation,
} = API;
