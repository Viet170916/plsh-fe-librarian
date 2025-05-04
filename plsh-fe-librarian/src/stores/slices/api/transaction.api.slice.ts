import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReAuth} from "@/stores/slices/api/api.config";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7147';

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        getFines: builder.query<Fine[], number>({
            query: (borrowerId) => `payment/fine-for-lib`,
            transformResponse: (response: ApiResponse<Fine[]>) => response.data,
        }),
        createPayment: builder.mutation<PaymentResponse, { borrowerId: number; fineIds: number[] }>({
            query: (body) => ({
                url: 'payment/create-qr',
                method: 'POST',
                body,
            }),
        }),
        updatePaymentStatus: builder.mutation<{ success: boolean }, string>({
            query: (referenceId) => ({
                url: `payment/update-status/${referenceId}`,
                method: 'PUT',
            }),
        }),
        getTransactions: builder.query<ApiPagedResponse, {
            page: number;
            pageSize: number;
            sortBy?: string;
            sortOrder?: 'asc' | 'desc';
            searchTerm?: string;
            status?: number;
            fromDate?: string;
            toDate?: string;
        }>({
            query: (params) => ({
                url: 'transaction/for-lib',
                params,
            }),
        }),
    }),
});

export const {useGetFinesQuery, useCreatePaymentMutation, useUpdatePaymentStatusMutation, useGetTransactionsQuery} = paymentApi;

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface Transaction {
    id: number;
    amount: number;
    currency: string;
    status: number;
    transactionDate: string;
    referenceId: string;
    transactionType: number;
    note: string;
    fines: {
        id: number;
        bookTitle: string;
        bookCode: string;
        fineDate: string;
        fineType: number;
        fineAmount: number;
        status: number;
    }[];
}

export interface ApiPagedResponse {
    success: boolean;
    data: Transaction[];
    pagination: {
        currentPage: number;
        pageSize: number;
        totalRecords: number;
        totalPages: number;
    };
    message?: string;
}
export interface PaymentResponse {
    "success": boolean;
    "data": {
        qrCode: string;
        referenceId: string;
        amount: number;
        "description": string;
    },
    "message": string


}

export interface Fine {
    id: number;
    fineDate: string;
    fineType: number;
    amount: number;
    status: string;
    note: string;
    bookTitle: string;
    bookCode: string;
}

export interface PaymentData {
    qrCode: string;
    referenceId: string;
    amount: number;
    description: string;
    paidFines: Fine[];
}
