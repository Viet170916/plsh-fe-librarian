import { FilterParams } from "@/app/(private)/(in-dash-board)/members/ClientRender";
import { BaseResponse } from "@/helpers/appType";
import { constants } from "@/helpers/constants";
import { objectToFormData } from "@/helpers/convert";
import { BookBorrowingDto, LoanDto, LoanStatus } from "@/helpers/dataTransfer";
import { baseQueryWithReAuth } from "@/stores/slices/api/api.config";
import { createApi } from "@reduxjs/toolkit/query/react";

const httpMethods = constants.http.method;
export const loanApi = createApi( {
				reducerPath: 'loanApi',
				baseQuery: baseQueryWithReAuth,
				tagTypes: [ "loanTag" ],
				endpoints: ( builder ) => ({
								getLoans: builder.query<BaseResponse<LoanDto[]>, FilterParams<LoanDto> & { approveStatus?: LoanStatus }>( {
												query: ( params ) => ({
																url: 'loan',
																params,
												}),
												providesTags: [ "loanTag" ],
								} ),
								updateLoanStatus: builder.mutation<BaseResponse<LoanDto>, { loanId: number, status: LoanStatus }>( {
												query: ( { loanId, status } ) => ({
																url: `loan/${ loanId }/approve-status`,
																method: httpMethods.PUT,
																body: { status },
												}),
												invalidatesTags: [ "loanTag" ],
								} ),
								getLoanById: builder.query<BaseResponse<LoanDto>, number>( {
												query: ( id ) => `loan/${ id }`,
												providesTags: ( result, error, id ) => [ { type: "loanTag" } ],
								} ),
								createLoan: builder.mutation<BaseResponse<LoanDto>, LoanDto>( {
												query: ( loanData ) => ({
																url: 'loan/create',
																method: httpMethods.POST,
																body: loanData,
												}),
												invalidatesTags: [ "loanTag" ],
								} ),
								uploadBookBorrowingImages: builder.mutation<BaseResponse<LoanDto>, { loanId: number, data: FormData }>( {
												query: ( { loanId, data } ) => ({
																url: `resource/loan/${ loanId }/before/upload-images`,
																method: httpMethods.POST,
																body: data,
												}),
												invalidatesTags: [ "loanTag" ],
								} ),
								updateLoan: builder.mutation<void, LoanDto>( {
												query: ( { id, ...updatedLoan } ) => ({
																url: `loan/update/${ id }`,
																method: httpMethods.PUT,
																body: updatedLoan,
												}),
												invalidatesTags: ( result, error, { id } ) => [ { type: "loanTag" } ],
								} ),
								extendLoan: builder.mutation<BaseResponse<BookBorrowingDto>, BookBorrowingDto>( {
												query: ( data ) => ({
																url: `loan/borrowed-book/${ data.id }/extend`,
																method: httpMethods.PUT,
																body: data,
												}),
												invalidatesTags: ( result, error, { id } ) => [ { type: "loanTag" } ],
								} ), returnLoanConfirmation: builder.mutation<BaseResponse<BookBorrowingDto>, { id: number, images: File[], noteAfterBorrow?: string }>( {
												query: ( data ) => ({
																url: `loan/borrowed-book/${ data.id }/return-confirm`,
																method: httpMethods.PUT,
																body: objectToFormData( data ),
												}),
												invalidatesTags: ( result, error, { id } ) => [ { type: "loanTag" } ],
								} ),
								deleteLoan: builder.mutation<void, number>( {
												query: ( id ) => ({
																url: `loan/delete/${ id }`,
																method: httpMethods.DELETE,
												}),
												invalidatesTags: [ "loanTag" ],
								} ),
				}),
} );
export const loanApiInvalidatesTags = loanApi.util.invalidateTags;
export const loanApiReducer = loanApi.reducer;
export const loanApiReducerPath = loanApi.reducerPath;
export const loanApiMiddleware = loanApi.middleware;
export const {
				useLazyGetLoansQuery,
				useExtendLoanMutation,
				useReturnLoanConfirmationMutation,
				useLazyGetLoanByIdQuery,
				usePrefetch,
				useUpdateLoanStatusMutation,
				useCreateLoanMutation,
				useUpdateLoanMutation,
				useUploadBookBorrowingImagesMutation,
				useDeleteLoanMutation,
} = loanApi;
