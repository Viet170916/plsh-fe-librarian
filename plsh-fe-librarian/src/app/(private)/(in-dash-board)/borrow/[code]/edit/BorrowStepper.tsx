"use client";
import appStrings from "@/helpers/appStrings";
import {objectToFormData} from "@/helpers/convert";
import {mapToLoanApi, mergeToUploadImage} from "@/helpers/dataTransfer";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useCreateLoanMutation, useUploadBookBorrowingImagesMutation} from "@/stores/slices/api/borrow.api.slice";
import {clearData} from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import {useAppStore} from "@/stores/store";
import Box from '@mui/material/Box';
import {useParams, usePathname, useRouter} from "next/navigation";
import React, {memo, useEffect} from "react";
import {toast} from "sonner";

function BorrowStepper() {
    const {code} = useParams();

    const store = useAppStore();
    const dispatch = useAppDispatch();
    const [createLoan, {data: loanData, error: loanError, isLoading: isLoanLoading}] = useCreateLoanMutation();
    const [uploadBookBorrowingImages] = useUploadBookBorrowingImagesMutation();
    const path = usePathname();
    const router = useRouter();

    const handleSubmit = async () => {
        const borrowData = store.getState().addEditBorrowData;
        const dataToRequest = await mapToLoanApi(borrowData);
        const loanResponse = await createLoan(dataToRequest);
        const checkedBorrowDataHasImage = borrowData.borrowedBooks.map(b => b.beforeBorrow.images).flat();
        const dataHasFiles = await mapToLoanApi(borrowData, true);
        if ((checkedBorrowDataHasImage.length > 0) && dataHasFiles && loanResponse.data?.data) {
            const requestForm = objectToFormData(mergeToUploadImage(dataHasFiles.bookBorrowings, loanResponse.data.data.bookBorrowings));
            await uploadBookBorrowingImages({loanId: loanResponse.data.data.id, data: requestForm});
        }
    };
    useEffect(() => {
        if (loanError) {
            toast.error(appStrings.error.ADD_FAIL);
        }
    }, [loanError]);
    useEffect(() => {
        if (loanData) {
            toast.success(appStrings.success.SAVE_SUCCESS);
            dispatch(clearData());
            router.push(`/borrow/${loanData.data.id}`);
        }
    }, [loanData, dispatch, router]);
    return (
        <Box sx={{width: '100%'}}>

        </Box>
    );
}

export default memo(BorrowStepper);

