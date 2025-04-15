"use client";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import appStrings from "@/helpers/appStrings";
import {LoanDto} from "@/helpers/dataTransfer";
import {useUpdateLoanStatusMutation} from "@/stores/slices/api/borrow.api.slice";
import {truncateTextStyle} from "@/style/text.style";
import {Avatar, Box, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import React, {memo} from "react";
import {renderLoanStatusChip} from "@/app/(private)/(in-dash-board)/borrow/[code]/ChangeStatusButton";
import TimeViewer from "@/components/primary/TimeViewer";
import useFetchingToast from "@/hooks/useFetchingToast";

const BorrowItem = ({borrowItem, onSelected}: { borrowItem: LoanDto, onSelected: (borrowItem: LoanDto) => void }) => {
    const [updateStatus, {error, isLoading, data}] = useUpdateLoanStatusMutation();
    useFetchingToast(data, error);

    async function onApprove() {
        await updateStatus({loanId: borrowItem.id, status: "approved"});
    }

    return (
        <Box
            sx={{
                borderRadius: 12,
                width: "100%",
                p: 1,
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
            }}
            onClick={() => onSelected?.(borrowItem)}
        >
            <Grid container spacing={2} alignItems="center" width={"100%"}>
                <Grid size={1}>
                    <Box
                        sx={{
                            width: 60,
                            height: 80,
                            display: "flex",
                            position: "relative",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Avatar src={borrowItem.borrower?.avatarUrl}/>
                    </Box>
                </Grid>
                <Grid size={3} container spacing={.1}>
                    <Link href={`/borrow/${borrowItem.id}`} onClick={(e) => {
                        e.stopPropagation();
                    }}>

                        <Typography sx={{textDecoration: "underline"}}
                                    variant="h6">#{
                            borrowItem.id ?? "--"
                        }</Typography>
                    </Link>
                    <Grid size={12}>
                        <Typography
                            variant="h5">{borrowItem.borrower?.fullName}</Typography>
                    </Grid>
                    <Typography
                        variant="h5">{borrowItem.borrower?.email}</Typography>
                </Grid>
                {/* Usage, Format, Penalties, Charges */}
                <Grid size={1}>
                    <Typography>{`${borrowItem.dayUsageCount} ${appStrings.unit.DAY}`}</Typography>
                </Grid>
                <Grid size={1}>
                    <Typography>{`${borrowItem.bookBorrowings?.length} ${appStrings.unit.BOOK}`}</Typography>
                </Grid>
                <Grid size={1.5}>
                    {borrowItem?.aprovalStatus && <Grid>{renderLoanStatusChip(borrowItem.aprovalStatus)}</Grid>}
                </Grid>
                <Grid>
                    <Typography variant="body2" sx={{...truncateTextStyle}}>{borrowItem.note}</Typography>
                </Grid>
                <Grid size={"grow"} container>
                    <TimeViewer targetDateTime={borrowItem.borrowingDate}/>
                </Grid>
            </Grid>
        </Box>
    );
};
export default memo(BorrowItem);
