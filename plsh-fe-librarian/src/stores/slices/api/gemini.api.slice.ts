import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "@/stores/slices/api/api.config";
import {BaseResponse} from "@/helpers/appType";

// const apiKey = process.env.NEXT_PUBLIC_GG_API_KEY!;
export const geminiApi = createApi({
    reducerPath: "geminiApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        generateContent: builder.mutation<BaseResponse<string>, string>({
            query: (input) => ({
                url: `ai/send-message`,
                method: "POST",
                body: {message: input},
            }),
        }),
    }),
});
export const {useGenerateContentMutation} = geminiApi;
