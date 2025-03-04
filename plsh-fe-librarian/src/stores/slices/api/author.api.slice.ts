import {
    Author as AuthorData,
    AnyObject, Author,
} from "@/helpers/appType";
import {baseQuery} from "@/stores/slices/api/api.config";
import {
    BaseQueryArg,
    createApi, fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {objectToQueryParams} from "@/helpers/convert";
import {RootState} from "@/stores/store";
import {constants} from "@/helpers/constants";

export type AuthorResponse = {
    data?: AuthorData[];
}

export type AuthorAddEditResponse = {
    kind: "add"
    data?: AuthorData;
} | {
    kind: "edit"
    data?: AuthorData;
}
const httpMethods = constants.http.method

const baseQ = fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    prepareHeaders: (headers, api) => {
        const token = (api.getState() as RootState).session.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const API = createApi({
    reducerPath: "authorApi",
    baseQuery: baseQ,
    endpoints: (builder) => ({
        getAuthor: builder.query<AuthorResponse, AnyObject>({
            query: (params) => {
                return `/author${objectToQueryParams(params)}`;
            },
        }),
        addAuthor: builder.mutation<AuthorAddEditResponse, FormData>({
            query: (payload) => ({
                url: `/author`,
                method: httpMethods.POST,
                body: payload,
            }),
        }),

    }),
});

export const authorApiReducer = API.reducer;
export const authorApiReducerPath = API.reducerPath;
export const authorApiMiddleware = API.middleware;
export const {
    useGetAuthorQuery,
    useAddAuthorMutation
} = API;