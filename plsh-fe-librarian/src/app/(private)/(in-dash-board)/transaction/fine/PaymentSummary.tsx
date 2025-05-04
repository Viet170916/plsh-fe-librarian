"use client"
import React, {memo} from "react";
import {Box, Button, Typography} from '@mui/material';
import {QrCode} from '@mui/icons-material';

interface PaymentSummaryProps {
    totalAmount: string;
    selectedCount: number;
    loading: boolean;
    onProceed: () => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = memo(
    ({totalAmount, selectedCount, loading, onProceed}) => {
        return (
            <Box
                sx={{
                    position: 'sticky',
                    bottom: 0,
                    bgcolor: 'background.paper',
                    borderTop: 1,
                    borderColor: 'divider',
                    pt: 2,
                    pb: 1,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="caption" color="text.primary">
                            Tổng cộng
                        </Typography>
                        <Typography variant="h6" color="error.main" fontWeight="bold">
                            {totalAmount}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        disabled={selectedCount === 0 || loading}
                        onClick={onProceed}
                        startIcon={<QrCode/>}
                        sx={{py: 1.5, px: 3}}
                    >
                        {loading ? 'Đang tạo mã QR...' : 'Thanh toán'}
                    </Button>
                </Box>
            </Box>
        );
    }
);


export default PaymentSummary;
