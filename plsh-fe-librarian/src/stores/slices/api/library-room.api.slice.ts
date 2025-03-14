
import {
    createApi, fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {objectToQueryParams} from "@/helpers/convert";
import {RootState} from "@/stores/store";
import {constants} from "@/helpers/constants";
import {Shelf} from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";
import {LibraryRoomState} from "@/stores/slices/lib-room-state/lib-room.slice";

export type CheckShelfResponse = {
    data?: Shelf,

}

const httpMethods = constants.http.method

const baseQ = fetchBaseQuery({
    baseUrl: "/api/v1",
    prepareHeaders: (headers, api) => {
        const token = (api.getState() as RootState).session.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const API = createApi({
    reducerPath: "libraryRoomApi",
    baseQuery: baseQ,
    endpoints: (builder) => ({
        checkShelfExisted: builder.query<Shelf, { shelfId:string }>({
            query: (params) => {
                return `/library-room/shelf/check${objectToQueryParams(params)}`;
            },
        }),
        modifyLibraryRoom: builder.mutation<LibraryRoomState, LibraryRoomState>({
            query: (payload) => ({
                url: `/library-room/edit`,
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