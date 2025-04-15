import {Account} from "@/app/(public)/auth/store/account.slice";
import {BaseResponse} from "@/helpers/appType";
import {constants} from "@/helpers/constants";
import {baseQuery} from "@/stores/slices/api/api.config";
import {createApi} from "@reduxjs/toolkit/query/react";

const httpMethods = constants.http.method;
const API = createApi({
        reducerPath: "accountApi",
        baseQuery: baseQuery,
        tagTypes: ["GetAccounts", "GetAccount"],
        endpoints: (builder) => ({
            getMyAccount: builder.query<BaseResponse<Account>, void>({
                query: () => {
                    return ({
                        url: `account`,
                    });
                },
                providesTags: () => [{type: "GetAccount"}],
            }),
            createAccount: builder.mutation<BaseResponse<Account>, Account>({
                query: (params) => {
                    return ({
                        url: `/account/register`,
                        method: httpMethods.POST,
                        body: params,
                    });
                },
                invalidatesTags: (_, error) => error ? [] : [{type: "GetAccounts"}],
            }),
            loginUsingGoogle: builder.mutation<BaseResponse<string>, Account>({
                query: (params) => {
                    return ({
                        url: `/account/login/google`,
                        method: httpMethods.POST,
                        body: params,
                    });
                },
                invalidatesTags: (_, error) => error ? [] : [{type: "GetAccounts"}],
            }),
            loginUsingEmailPassword: builder.mutation<BaseResponse<string>, Account>({
                query: (params) => {
                    return ({
                        url: `/account/login`,
                        method: httpMethods.POST,
                        body: params,
                    });
                },
                invalidatesTags: (_, error) => error ? [] : [{type: "GetAccounts"}],
            }),
            checkAccountExist: builder.query<BaseResponse<{
                fullName?: string;
                email?: string;
                isVerified?: boolean,
                emailExisted?: boolean,
            }>, { email?: string, ggToken?: string }>({
                query: (params) => {
                    return ({
                        url: `/account/is-verified`,
                        params,
                    });
                },
            }),
            updateAccount: builder.mutation<BaseResponse<Account>, Account>({
                query: (param) => {
                    return ({
                        url: `account/update`,
                        method: httpMethods.PUT,
                        body: param,
                    });
                },
                invalidatesTags: (_, error) => error ? [] : [{type: "GetAccount"}],
            }),
            getAccount: builder.query<BaseResponse<Account>, { id: number }>({
                query: (param) => {
                    return ({
                        url: `account/${param.id}`,
                    });
                },
                providesTags: () => [{type: "GetAccount"}],
            }),
        }),
    },
);
export const accountApiReducer = API.reducer;
export const accountApiReducerPath = API.reducerPath;
export const accountApiMiddleware = API.middleware;
export const {
    useLazyCheckAccountExistQuery,
    useLazyGetMyAccountQuery,
    useCreateAccountMutation,
    useLoginUsingEmailPasswordMutation,
    useLoginUsingGoogleMutation,
    useGetAccountQuery,
    useUpdateAccountMutation,
    usePrefetch,
} = API;
