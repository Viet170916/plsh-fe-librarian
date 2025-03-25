import { BaseResponse } from "@/app/(private)/(in-dash-board)/members/ClientRender";
import { Member, PagingParams } from "@/helpers/appType";
import { constants } from "@/helpers/constants";
import { baseQuery } from "@/stores/slices/api/api.config";
import { createApi } from "@reduxjs/toolkit/query/react";

export type AccountEdited = {
				fullName: string;
				email: string;
				identityCardNumber: string;
				className: string;
				role: "student" | "teacher" | "librarian";
}
const httpMethods = constants.http.method;
const API = createApi( {
								reducerPath: "memberApi",
								baseQuery: baseQuery,
								tagTypes: [ "GetMembers", "GetMember" ],
								endpoints: ( builder ) => ({
												createMember: builder.mutation<BaseResponse<Member>, AccountEdited>( {
																query: ( params ) => {
																				return ({
																								url: `/account/member/create`,
																								method: httpMethods.POST,
																								body: params,
																				});
																},
																invalidatesTags: ( _, error ) => error ? [] : [ { type: "GetMembers" } ],
												} ),
												getMembers: builder.query<BaseResponse<Member[]>, PagingParams>( {
																query: ( param ) => {
																				return ({
																								url: `account/member`,
																								param,
																				});
																},
																providesTags: () => [ { type: "GetMembers" } ],
												} ),
												updateMember: builder.mutation<BaseResponse<Member>, Member>( {
																query: ( param ) => {
																				return ({
																								url: `account/member/update`,
																								method: httpMethods.PUT,
																								body: param,
																				});
																},
																invalidatesTags: ( _, error ) => error ? [] : [ { type: "GetMember" } ],
												} ),
												getMember: builder.query<BaseResponse<Member>, { id: number }>( {
																query: ( param ) => {
																				return ({
																								url: `account/member/${ param.id }`,
																				});
																},
																providesTags: () => [ { type: "GetMember" } ],
												} ),
								}),
				},
);
export const memberApiReducer = API.reducer;
export const memberApiReducerPath = API.reducerPath;
export const memberApiMiddleware = API.middleware;
export const {
				useCreateMemberMutation,
				useGetMembersQuery,
				useGetMemberQuery,
				useUpdateMemberMutation,
				usePrefetch,
				useLazyGetMembersQuery,
} = API;
