import {constants} from "@/helpers/constants";
import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "@/stores/slices/api/api.config";
import {Audio} from "@/stores/slices/book-states/audio.book.slice";
import {BaseResponse} from "@/helpers/appType";

const httpMethods = constants.http.method;
export const audioBookApi = createApi({
    reducerPath: "audioBookApi",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["Notifications", "Notification"],
    endpoints: (builder) => ({
        getTextChunks: builder.query<string[], string>({
            query: (bookId) => `text-chunks?bookId=${bookId}`,
        }),
        getAudio: builder.query<BaseResponse<Audio>, { text: string; voiceId?: string }>({
            query: (body) => ({
                url: `book/speak`,
                method: httpMethods.POST,
                body,
            }),
        }),
    })
});
export const {usePrefetch, useLazyGetAudioQuery} = audioBookApi;
