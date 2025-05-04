"use client"
import React, {memo} from 'react';
import {Box, Card, CardContent, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import {Fine} from "@/stores/slices/api/transaction.api.slice";
import Grid from "@mui/material/Grid2";
import AppChip from "@/components/primary/display/AppChip";
import {useTheme} from "@mui/material/styles";

interface FineItemProps {
    fine: Fine;
    selected: boolean;
    onToggle: (id: number) => void;
}

const FineItem: React.FC<FineItemProps> = memo(({fine, selected, onToggle}) => {
    const theme = useTheme()
    const handleClick = () => onToggle(fine.id);
    return (
        <Card
            sx={{
                mb: 2,
                boxShadow:"none",
                // borderColor: selected ? 'primary.main' : 'divider',
                bgcolor: selected ? 'primary.light' : 'primary.main',
                cursor: 'pointer',
                '&:hover': {
                    borderColor: selected ? 'primary.main' : 'action.hover',
                },
            }}
            onClick={handleClick}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Grid container spacing={2}>
                        {/*<Checkbox*/}
                        {/*    checked={selected}*/}
                        {/*    color={"default"}*/}
                        {/*    sx={{}}*/}
                        {/*    onClick={(e) => e.stopPropagation()}*/}
                        {/*/>*/}
                        <Grid size={"grow"}>
                            <Typography variant="subtitle1" fontWeight="medium" color={"common.white"}>
                                {fine.bookTitle}
                            </Typography>
                            <Typography variant="body2" color="common.white" mt={0.5}>
                                {fine.note}
                            </Typography>
                            <Box display="flex" alignItems="center" mt={1} gap={1}>
                                <Typography variant="caption" color="common.white">
                                    Ngày phạt: {new Date(fine.fineDate).toLocaleDateString('vi-VN')}
                                </Typography>

                                <AppChip variant={"outlined"} color={"error"}
                                         sx={{bgcolor: theme.palette.background.default}} label={
                                    <Typography variant="caption" color="error.main" fontWeight="medium">
                                        {fine.amount.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </Typography>
                                }/>

                            </Box>
                        </Grid>

                    </Grid>
                    <ChevronRight color="action"/>
                </Box>
            </CardContent>
        </Card>
    )
        ;
});

FineItem.displayName = 'FineItem';

export default FineItem;
