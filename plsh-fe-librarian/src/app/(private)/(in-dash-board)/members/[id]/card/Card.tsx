// app/components/CreditCardForm.tsx
'use client';

import {Box, Typography,} from '@mui/material';
import {memo} from 'react';
import {color} from "@/helpers/resources";
import appStrings from "@/helpers/appStrings";
import dayjs from "dayjs";


export type CardFormData = {
    id: number;
    cardNumber: string;
    cardHolder: string;
    cardMemberExpiredDate: string;
};

export const CardDisplay = memo(({cardNumber, cardHolder, cardMemberExpiredDate}: Partial<CardFormData>) => {
    const date = dayjs(cardMemberExpiredDate);
    return (
        <Box
            sx={{
                top: 25,
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                // bgcolor: color.PRIMARY_20,
                backgroundColor: color.PRIMARY_20, // <-- Bắt buộc phải là trong suốt
                backdropFilter: 'blur(6px)',               // <-- Hiệu ứng chính
                width: 340,
                height: 200,
                borderRadius: 4,
                p: 3,
                color: color.PRIMARY,
                boxShadow: 3,
            }}
        >
            <Box sx={{mb: 4}}>
                <Typography variant="body2">{appStrings.member.CARD_NUMBER}</Typography>
            </Box>
            <Typography variant="h6" sx={{letterSpacing: 2, mb: 3}}>
                {cardNumber || '#### #### #### ####'}
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between', fontSize: 12}}>
                <Box>
                    <Typography variant="caption">Card Holder</Typography>
                    <Typography>{cardHolder?.toUpperCase() || appStrings.FULL_NAME.toUpperCase()}</Typography>
                </Box>
                <Box>
                    <Typography variant="caption">{appStrings.EXPIRED}</Typography>
                    <Typography>
                        {date.month()+1 || 'MM'}/{date.year().toString()?.slice(-2) || 'YY'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
});

