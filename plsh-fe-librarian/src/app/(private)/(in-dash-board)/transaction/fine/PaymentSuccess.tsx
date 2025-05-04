"use client"
// src/components/PaymentSuccess.tsx
import React, {memo} from 'react';
import {Box, Button, Card, CardContent, Divider, List, ListItem, ListItemText, Typography,} from '@mui/material';
import {ArrowBack, CheckCircle} from '@mui/icons-material';
import {PaymentData} from "@/stores/slices/api/transaction.api.slice";

interface PaymentSuccessProps {
    paymentData: PaymentData;
    onReset: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = memo(({paymentData, onReset}) => {
    return (
        <Box textAlign="center" py={4}>
            <Card variant="outlined" sx={{maxWidth: 480, mx: 'auto'}}>
                <CardContent>
                    <Box
                        bgcolor="success.light"
                        width={80}
                        height={80}
                        borderRadius="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mx="auto"
                        mb={3}
                    >
                        <CheckCircle color="success" sx={{fontSize: 48}}/>
                    </Box>
                    <Typography variant="h5" fontWeight="bold" mb={1}>
                        Thanh toán thành công!
                    </Typography>
                    <Typography variant="body1" color="text.primary" mb={4}>
                        Cảm ơn bạn đã thanh toán. Dưới đây là chi tiết giao dịch:
                    </Typography>

                    <Box p={3} borderRadius={1} textAlign="left" mb={4}>
                        <Box mb={3}>
                            <Typography variant="caption" color="text.primary">
                                Mã giao dịch:
                            </Typography>
                            <Box
                                fontFamily="monospace"
                                bgcolor="background.paper"
                                p={1}
                                borderRadius={0.5}
                                mt={0.5}
                                sx={{wordBreak: 'break-all'}}
                            >
                                {paymentData.referenceId}
                            </Box>
                        </Box>

                        <Box mb={3}>
                            <Typography variant="caption" color="text.primary">
                                Tổng số tiền:
                            </Typography>
                            <Typography variant="h6" color="success.main" fontWeight="bold" mt={0.5}>
                                {paymentData.amount.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </Typography>
                        </Box>

                        <Divider sx={{my: 2}}/>

                        <Typography variant="caption" color="text.primary">
                            Các khoản phạt đã thanh toán:
                        </Typography>
                        <List dense sx={{bgcolor: 'background.paper', mt: 1}}>
                            {paymentData.paidFines.map((fine) => (
                                <ListItem key={fine.id} sx={{py: 1}}>
                                    <ListItemText
                                        primary={fine.bookTitle}
                                        primaryTypographyProps={{noWrap: true}}
                                        sx={{maxWidth: '70%'}}
                                    />
                                    <Typography variant="body2" color="error.main" fontWeight="medium">
                                        {fine.amount.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={onReset}
                        startIcon={<ArrowBack/>}
                    >
                        Quay lại danh sách phạt
                    </Button>

                    <Typography variant="body2" color="text.primary" mt={2}>
                        Bạn có thể kiểm tra lại lịch sử mượn sách để xác nhận
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
});

PaymentSuccess.displayName = 'PaymentSuccess';

export default PaymentSuccess;
