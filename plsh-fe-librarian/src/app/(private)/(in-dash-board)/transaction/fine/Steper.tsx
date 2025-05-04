"use client"
import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';

interface StepperProps {
    steps: string[];
    activeStep: number;
}

const Stepper: React.FC<StepperProps> = memo(({ steps, activeStep }) => {
    return (
        <Box mb={4} position="relative">
            <Box
                sx={{
                    position: 'absolute',
                    top: 20,
                    left: 40,
                    right: 40,
                    height: 2,
                    bgcolor: 'divider',
                    zIndex: 0,
                }}
            />
            <Box display="flex" justifyContent="space-between" position="relative" zIndex={1}>
                {steps.map((label, index) => (
                    <Box key={label} display="flex" flexDirection="column" alignItems="center">
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: activeStep >= index ? 'primary.main' : 'action.disabledBackground',
                                color: activeStep >= index ? 'common.white' : 'text.secondary',
                            }}
                        >
                            {index + 1}
                        </Box>
                        <Typography
                            variant="caption"
                            mt={1}
                            color={activeStep >= index ? 'primary.main' : 'text.secondary'}
                            fontWeight="medium"
                        >
                            {label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
});

Stepper.displayName = 'Stepper';

export default Stepper;
