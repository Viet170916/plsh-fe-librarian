"use client"
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Box, LinearProgress, Skeleton, Typography,} from '@mui/material';
import {Refresh} from '@mui/icons-material';
import {
    PaymentData,
    useCreatePaymentMutation,
    useGetFinesQuery,
    useUpdatePaymentStatusMutation
} from "@/stores/slices/api/transaction.api.slice";
import FineItem from "@/app/(private)/(in-dash-board)/transaction/fine/item";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

const MAX_RETRIES = 30;
const POLLING_INTERVAL = 5000;

const PaymentPage: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [selectedFines, setSelectedFines] = useState<number[]>([]);
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
    const [error, setError] = useState<string>('');
    const retryCount = useRef(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const borrowerId = 1;

    const {
        data: fines = [],
        isLoading: isLoadingFines,
        isError: isFinesError,
        refetch: refetchFines,
    } = useGetFinesQuery(borrowerId);

    const [createPayment, {isLoading: isCreatingPayment}] = useCreatePaymentMutation();
    const [updatePaymentStatus, {isLoading: isUpdatingStatus}] = useUpdatePaymentStatusMutation();

    const updatePaymentStatusCallback = useCallback(async () => {
        if (!paymentData?.referenceId || retryCount.current >= MAX_RETRIES) return;

        try {
            const response = await updatePaymentStatus(paymentData.referenceId).unwrap();

            if (response.success) {
                setStep(3);
                clearInterval(intervalRef.current!);
            } else {
                retryCount.current += 1;
                if (retryCount.current >= MAX_RETRIES) {
                    setError('Xác nhận thanh toán thất bại sau nhiều lần thử. Vui lòng thử lại.');
                    clearInterval(intervalRef.current!);
                }
            }
        } catch (err) {
            retryCount.current += 1;
            if (retryCount.current >= MAX_RETRIES) {
                setError('Lỗi xác minh thanh toán. Vui lòng thử lại hoặc liên hệ quản trị viên.');
                clearInterval(intervalRef.current!);
            }
        }
    }, [paymentData, updatePaymentStatus]);

    useEffect(() => {
        if (step !== 2 || !paymentData) return;

        intervalRef.current = setInterval(updatePaymentStatusCallback, POLLING_INTERVAL);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            retryCount.current = 0;
        };
    }, [step, paymentData, updatePaymentStatusCallback]);

    const handlePaymentCreation = async () => {
        if (selectedFines.length === 0) {
            setError('Vui lòng chọn ít nhất một khoản phạt');
            return;
        }

        try {
            setError('');
            const response = await createPayment({
                borrowerId,
                fineIds: selectedFines,
            }).unwrap();

            const paidFines = fines.filter((f) => selectedFines.includes(f.id));
            if (response?.data)
                setPaymentData({
                    qrCode: response?.data.qrCode,
                    referenceId: response?.data.referenceId,
                    amount: response?.data.amount,
                    description: `FINE_${response?.data.referenceId}`,
                    paidFines,
                });
            setStep(2);
            retryCount.current = 0;
        } catch (err) {
            setError('Khởi tạo thanh toán thất bại. Vui lòng thử lại.');
        }
    };

    const calculateTotal = () => {
        if (selectedFines?.length > 0) {
            return selectedFines
                .reduce((sum, id) => {
                    const fine = fines.find((f) => f.id === id);
                    return sum + (fine?.amount || 0);
                }, 0)
                .toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                });
        }
        return "--";
    };

    const resetToStep1 = () => {
        setStep(1);
        setSelectedFines([]);
        setPaymentData(null);
        setError('');
        retryCount.current = 0;
        refetchFines();
    };

    const toggleFineSelection = (id: number) => {
        setSelectedFines((prev) =>
            prev.includes(id) ? prev.filter((fineId) => fineId !== id) : [...prev, id]
        );
    };

    const steps = ['Chọn phạt', 'Thanh toán', 'Hoàn tất'];

    return (
        <Box width={"100%"} mx="auto" p={{xs: 2, md: 3}} bgcolor="primary.main" borderRadius={1}>
            {isLoadingFines && <LinearProgress/>}
            {/*<Box mb={3}>*/}
            {/*    <Typography variant="h4" fontWeight="bold" gutterBottom>*/}
            {/*        Thanh Toán Phạt Thư Viện*/}
            {/*    </Typography>*/}
            {/*    <Typography variant="body1" color="text.secondary">*/}
            {/*        Quản lý và thanh toán các khoản phạt mượn sách*/}
            {/*    </Typography>*/}
            {/*</Box>*/}

            {/*<Stepper steps={steps} activeStep={step}/>*/}

            {/*{step === 1 && (*/}
            <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                        Danh sách phạt chưa thanh toán
                    </Typography>
                    <NeumorphicButton variant_2={"secondary"} color={"primary"}
                                      onClick={() => refetchFines()}
                                      loading={isLoadingFines}
                                      startIcon={<Refresh/>}
                                      size="small"
                    >
                        Làm mới
                    </NeumorphicButton>
                </Box>

                {isFinesError && (
                    <Alert severity="error" sx={{mb: 2}}>
                        Không thể tải danh sách phạt. Vui lòng thử lại.
                    </Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{mb: 2}}>
                        {error}
                    </Alert>
                )}

                {isLoadingFines ? (
                    <Box>
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} variant="rectangular" height={96} sx={{mb: 2, borderRadius: 1}}/>
                        ))}
                    </Box>
                ) : fines.length === 0 ? (
                    <Box textAlign="center" py={4} bgcolor="primary.light" borderRadius={1}>
                        <Typography color="text.primary">
                            Không có khoản phạt nào cần thanh toán
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Box mb={2}>
                            {fines.map((fine) => (
                                <FineItem
                                    key={fine.id}
                                    fine={fine}
                                    selected={
                                        // selectedFines.includes(fine.id)
                                        false
                                    }
                                    onToggle={toggleFineSelection}
                                />
                            ))}
                        </Box>

                        {/*<PaymentSummary*/}
                        {/*    totalAmount={calculateTotal()}*/}
                        {/*    selectedCount={selectedFines.length}*/}
                        {/*    loading={isCreatingPayment}*/}
                        {/*    onProceed={handlePaymentCreation}*/}
                        {/*/>*/}
                    </>
                )}
            </Box>
            {/*)}*/}

            {/*{step === 2 && paymentData && (*/}
            {/*    <QRPayment*/}
            {/*        paymentData={paymentData}*/}
            {/*        loading={isUpdatingStatus}*/}
            {/*        error={error}*/}
            {/*        onReset={resetToStep1}*/}
            {/*    />*/}
            {/*)}*/}

            {/*{step === 3 && paymentData && (*/}
            {/*    <PaymentSuccess paymentData={paymentData} onReset={resetToStep1}/>*/}
            {/*)}*/}
        </Box>
    );
};

export default PaymentPage;
