import {constants} from "@/helpers/constants";
import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "@/stores/slices/api/api.config";
import {BaseResponse, EBook, LanguageCode} from "@/helpers/appType";

const httpMethods = constants.http.method;
export const eBookApi = createApi({
    reducerPath: "eBookApi",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["EBook", "EBooks"],
    endpoints: (builder) => ({
        getChapterSummary: builder.query<BaseResponse<EBook[]>, { bookId: number; page: number }>({
            query: ({bookId, page}) => `book/e-book/${bookId}/chapters/summary?page=${page}`,
            providesTags: () => ["EBook"]
        }),
        getChapterText: builder.query<BaseResponse<EBook>, { bookId: number; chapterIndex: number }>({
            query: ({bookId, chapterIndex}) => ({
                url: `book/e-book/${bookId}/chapters/text`,
                params: {chapterIndex}
            }),
            providesTags: () => ["EBook"]
        }),
        deleteChapter: builder.mutation<BaseResponse<string>, { id: number, chapter: number }>({
            query: ({id}) => ({
                url: `book/e-book/chapters/${id}`,
                method: httpMethods.DELETE
            }),
            invalidatesTags: (_, __, params) => [{type: "EBook", id: params.chapter}],
        }),
    })
});
export const {
    usePrefetch,
    useLazyGetChapterSummaryQuery,
    useDeleteChapterMutation,
    useLazyGetChapterTextQuery,
} = eBookApi;
