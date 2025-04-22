import {baseQueryWithReAuth} from "@/stores/slices/api/api.config";
import {createApi} from "@reduxjs/toolkit/query/react";
import {BaseResponse, EBook} from "@/helpers/appType";

const API = createApi({
    reducerPath: "resourceStatic",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        getEpubResource: builder.query<BaseResponse<EBook>, { bookId: number, chapterIndex: number }>({
            query: ({bookId, chapterIndex}) => ({
                url: `book/e-book/${bookId}/chapters`,
                params: {chapterIndex}
            }),
        }),
        getEpubText: builder.query<string, { bookId: number, chapter: number }>({
            query: ({bookId, chapter}) => ({
                url: `book/${bookId}/text}`,
                responseHandler: "text",
                params: {chapter},
            }),
            transformResponse: (response: string) => response,
        }),
    }),
});
export const resourceStaticReducer = API.reducer;
export const resourceStaticReducerPath = API.reducerPath;
export const resourceStaticMiddleware = API.middleware;
export const {
    useGetEpubResourceQuery,
    useLazyGetEpubResourceQuery,
} = API;
