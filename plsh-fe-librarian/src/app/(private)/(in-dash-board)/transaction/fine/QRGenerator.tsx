"use client"
import React, {memo} from 'react';
import {Box, Card, CardContent, CircularProgress, Typography,} from '@mui/material';
import {PaymentData} from "@/stores/slices/api/transaction.api.slice";
import Image from "next/image";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import Grid from "@mui/material/Grid2";

interface QRPaymentProps {
    paymentData: PaymentData;
    loading: boolean;
    error?: string;
    onReset: () => void;
}

const QRPayment: React.FC<QRPaymentProps> = memo(({paymentData, loading, error, onReset}) => {
    return (
        <Box textAlign="center">
            <Box bgcolor="primary.light" p={2} borderRadius={1} mb={3}>
                <Typography variant="h6" fontWeight="bold" color="primary.dark" mb={1}>
                    Quét mã QR để thanh toán
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Vui lòng sử dụng ứng dụng ngân hàng để quét mã
                </Typography>
            </Box>

            {error && (
                <Box
                    bgcolor="error.main"
                    p={2}
                    borderRadius={1}
                    mb={3}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography color="common.white">{error}</Typography>
                    </Box>
                    <NeumorphicButton
                        variant_2={"secondary"}
                        onClick={onReset}
                        color="error"
                        size="small"
                        sx={{textTransform: 'none'}}
                    >
                        Quay lại danh sách phạt
                    </NeumorphicButton>
                </Box>
            )}

            <Card variant="outlined" sx={{display: 'inline-block', mb: 3}}>
                <CardContent>
                    <Grid container justifyContent="center" alignItems="center" width={"100%"} sx={{mb: 3}}>
                        <Box sx={{borderRadius: 3, overflow: "hidden"}}>

                            <Image src={paymentData.qrCode}
                                   alt="Mã QR thanh toán"
                                   width={256} height={256}/>
                        </Box>

                    </Grid>

                    <Box bgcolor="grey.50" p={2} borderRadius={1} mb={2} textAlign="left">
                        <Typography variant="caption" color="text.secondary">
                            Nội dung chuyển khoản
                        </Typography>
                        <Box
                            component="p"
                            fontFamily="monospace"
                            bgcolor="background.paper"
                            p={1}
                            borderRadius={0.5}
                            mb={2}
                            sx={{wordBreak: 'break-all'}}
                        >
                            {paymentData.description}
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            Số tiền
                        </Typography>
                        <Typography variant="h5" fontWeight="bold" color="error.main">
                            {paymentData.amount?.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            {loading && (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    bgcolor="warning.light"
                    p={2}
                    borderRadius={1}
                    maxWidth={400}
                    mx="auto"
                >
                    <CircularProgress size={20} color="warning"/>
                    <Typography variant="body2" color="text.secondary">
                        Đang chờ thanh toán...
                    </Typography>
                </Box>
            )}

            <Typography variant="body2" color="text.secondary" mt={3}>
                Nếu gặp sự cố, vui lòng liên hệ quản trị thư viện
            </Typography>
        </Box>
    );
});

QRPayment.displayName = 'QRPayment';

export default QRPayment;
