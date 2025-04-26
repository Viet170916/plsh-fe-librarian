"use client";

import {appToaster} from "@/components/primary/toaster";
import appStrings from "@/helpers/appStrings";
import {validateBorrowedBooks} from "@/helpers/comparation";
import {objectToFormData} from "@/helpers/convert";
import {mapToLoanApi, mergeToUploadImage} from "@/helpers/dataTransfer";
import {capitalizeWords} from "@/helpers/text";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useCreateLoanMutation, useUploadBookBorrowingImagesMutation} from "@/stores/slices/api/borrow.api.slice";
import {clearData} from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import {useAppStore} from "@/stores/store";
import {Box, Step, StepLabel, Stepper, Tooltip} from "@mui/material";
import {usePathname, useRouter} from "next/navigation";
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import {useLazyValidateMemberQuery} from "@/stores/slices/api/member.api.slice";
import {parsErrorToBaseResponse} from "@/helpers/error";

const BorrowStepper = () => {
    const steps = useMemo(() => [
        {
            id: 0,
            label: `${capitalizeWords(appStrings.unit.STEP)} 1: ${appStrings.borrow.BOOKS_CONFIRM}`,
            description: `Chọn và xác nhận danh sách sách bạn muốn mượn...`,
            path: `/borrow/add`,
        },
        {
            id: 1,
            label: `${capitalizeWords(appStrings.unit.STEP)} 2: ${appStrings.borrow.BORROWER_CONFIRM}`,
            description: `Xác nhận thông tin người mượn...`,
            path: `/borrow/add/borrower`,
        },
        {
            id: 2,
            label: `${capitalizeWords(appStrings.unit.STEP)} 3: ${appStrings.borrow.FINAL_CONFIRM}`,
            description: `Kiểm tra lại toàn bộ thông tin...`,
            path: `/borrow/add/confirmation`,
        },
    ], []);

    const dispatch = useAppDispatch();
    const store = useAppStore();
    const router = useRouter();
    const path = usePathname();

    const [activeStep, setActiveStep] = useState(() => steps.find(st => st.path === path)?.id ?? 0);

    const [createLoan, {data: loanData, error: loanError, isLoading: isLoanLoading}] = useCreateLoanMutation();
    const [uploadBookBorrowingImages] = useUploadBookBorrowingImagesMutation();
    const [validateMember, {error, isFetching}] = useLazyValidateMemberQuery();

    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);
    useEffect(() => {
        const currentStep = steps.find(st => st.id === activeStep);
        if (currentStep) router.push(currentStep.path);
    }, [activeStep, router, steps]);
    const validateCurrentStep = useCallback(async (): Promise<boolean> => {
        const borrowInfo = store.getState().addEditBorrowData;
        const status = validateBorrowedBooks(borrowInfo.borrowedBooks);
        if (status === "incomplete") {
            setActiveStep(0);
            return false;
        }
        if (!borrowInfo.borrower.id) {
            setActiveStep(1);
            return false;
        }
        const result = await validateMember(borrowInfo.borrower.id).unwrap();
        if (result.data === "invalid" || result.data === "expired") {
            setActiveStep(1);
            return false;
        }
        if (result.data === "valid") {
            return true;
        }
        return true;
    }, [validateMember, store]);

    const validateCurrentStep_WHEN_CLICK_NEXT = useCallback(async (): Promise<boolean> => {
        const borrowInfo = store.getState().addEditBorrowData;
        if (activeStep === 0) {
            const status = validateBorrowedBooks(borrowInfo.borrowedBooks);
            if (status === "incomplete") {
                appToaster.error(appStrings.error.BORROW_BOOK_WRONG_FIELD_REQUIRED, "top-center", 4000);
                setActiveStep(0);
                return false;
            }
        }

        if (activeStep === 1) {
            if (!borrowInfo.borrower.id) {
                appToaster.error("Chưa chọn người mượn", "top-center", 5000);
                setActiveStep(1);
                return false;
            }
            const result = await validateMember(borrowInfo.borrower.id).unwrap();
            if (result.data === "invalid" || result.data === "expired") {
                appToaster.error(result.message, "top-center", 5000);
                setActiveStep(1);
                return false;
            }
        }

        return true;
    }, [activeStep, store, validateMember]);

    useEffect(() => {
        validateCurrentStep().then(isValid => {
            if (isValid) {

            }

        })
    }, [validateCurrentStep]);

    const handleSubmit = useCallback(async () => {
        const borrowInfo = store.getState().addEditBorrowData;

        const valid = await validateCurrentStep();
        if (!valid) return;

        const dataToRequest = await mapToLoanApi(borrowInfo);
        const loanResponse = await createLoan(dataToRequest);
        const loan = loanResponse.data?.data;

        if (!loan) return;

        const hasImages = borrowInfo.borrowedBooks.some(b => b.beforeBorrow.images?.length);
        if (hasImages) {
            const dataWithFiles = await mapToLoanApi(borrowInfo, true);
            const formData = objectToFormData(mergeToUploadImage(dataWithFiles.bookBorrowings, loan.bookBorrowings));
            await uploadBookBorrowingImages({loanId: loan.id, data: formData});
        }
    }, [store, createLoan, uploadBookBorrowingImages, validateCurrentStep]);

    useEffect(() => {
        if (loanError) appToaster.error(appStrings.error.ADD_FAIL);
    }, [loanError]);

    useEffect(() => {
        if (loanData) {
            appToaster.success(loanData?.message ?? appStrings.success.SAVE_SUCCESS);
            dispatch(clearData());
            router.push(`/borrow/${loanData?.data?.id}`);
        }
    }, [loanData, dispatch, router]);

    const handleNext = async () => {
        const valid = await validateCurrentStep_WHEN_CLICK_NEXT();
        if (!valid) return;

        setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
    };

    const handleBack = () => {
        setActiveStep(prev => Math.max(prev - 1, 0));
    };

    return (
        <Box sx={{width: "100%"}}>
            <Box sx={{display: "flex", flexDirection: "row", pt: 2, mb: 2}}>
                <NeumorphicButton
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{mr: 1}}
                >
                    {appStrings.GO_BACK}
                </NeumorphicButton>
                <Box sx={{flex: "1 1 auto"}}/>
                <NeumorphicButton
                    loading={isLoanLoading || isFetching}
                    disabled={isLoanLoading}
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                >
                    {activeStep === steps.length - 1 ? appStrings.borrow.CONFIRM : appStrings.NEXT}
                </NeumorphicButton>
            </Box>

            <Stepper activeStep={activeStep}>
                {steps.map((step) => (
                    <Tooltip key={step.label} title={step.description}>
                        <Step>
                            <StepLabel>{step.label}</StepLabel>
                        </Step>
                    </Tooltip>
                ))}
            </Stepper>
        </Box>
    );
};

export default memo(BorrowStepper);
