import {
    createApi, fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {objectToQueryParams} from "@/helpers/convert";
import {RootState} from "@/stores/store";
import {constants} from "@/helpers/constants";
import {Shelf} from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";
import {LibraryRoomState} from "@/stores/slices/lib-room-state/lib-room.slice";
import {baseQuery} from "@/stores/slices/api/api.config";

export type CheckShelfResponse = {
    data?: Shelf,

}

const httpMethods = constants.http.method


const API = createApi({
    reducerPath: "libraryRoomApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        checkShelfExisted: builder.query<Shelf, { shelfId: string }>({
            query: (params) => {
                return `/library-room/shelf/check${objectToQueryParams({id: params.shelfId})}`;
            },
        }),
        modifyLibraryRoom: builder.mutation<LibraryRoomState, LibraryRoomState>({
            query: (payload) => ({
                url: `/library-room/upsert`,
                method: httpMethods.POST,
                body: payload,
            }),
        }),

    }),
});

export const libraryApiReducer = API.reducer;
export const libraryApiReducerPath = API.reducerPath;
export const libraryApiMiddleware = API.middleware;
export const {
    useCheckShelfExistedQuery,
    useModifyLibraryRoomMutation
} = API;