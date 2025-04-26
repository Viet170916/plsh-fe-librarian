"use client";
import appStrings from "@/helpers/appStrings";
import {LoanDto} from "@/helpers/dataTransfer";
import {useUpdateLoanStatusMutation} from "@/stores/slices/api/borrow.api.slice";
import {Avatar, TableCell, TableRow, Typography} from "@mui/material";
import Link from "next/link";
import React, {memo} from "react";
import {renderLoanStatusChip} from "@/app/(private)/(in-dash-board)/borrow/[code]/(page)/ChangeStatusButton";
import TimeViewer from "@/components/primary/TimeViewer";
import useFetchingToast from "@/hooks/useFetchingToast";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

const BorrowItem = ({borrowItem, onSelected}: { borrowItem: LoanDto, onSelected: (borrowItem: LoanDto) => void }) => {
    const [updateStatus, {error, isLoading, data}] = useUpdateLoanStatusMutation();
    useFetchingToast(data, error);

    async function onApprove() {
        await updateStatus({loanId: borrowItem.id, status: "approved"});
    }

    return (
        <TableRow sx={{width: "100%", cursor: "pointer", overflow: "visible"}} onClick={() => onSelected?.(borrowItem)}
                  hover>
            <TableCell>
                <Avatar src={borrowItem.borrower?.avatarUrl}/>
            </TableCell>
            <TableCell>
                <Link href={`/borrow/${borrowItem.id}`} onClick={(e) => e.stopPropagation()}>
                    <Typography sx={{textDecoration: "underline"}}>
                        #{borrowItem.id ?? "--"}
                    </Typography>
                </Link>
            </TableCell>
            <TableCell>{borrowItem.borrower?.fullName}</TableCell>
            <TableCell>{borrowItem.borrower?.email}</TableCell>
            <TableCell>{`${borrowItem.dayUsageCount} ${appStrings.unit.DAY}`}</TableCell>
            <TableCell>{`${borrowItem.bookBorrowings?.length} ${appStrings.unit.BOOK}`}</TableCell>
            <TableCell>
                {borrowItem?.aprovalStatus && renderLoanStatusChip(borrowItem.aprovalStatus)}
            </TableCell>
            <TableCell>
                <Typography noWrap>{borrowItem.note}</Typography>
            </TableCell>
            <TableCell>
                <TimeViewer targetDateTime={borrowItem.borrowingDate}/>
            </TableCell>
            <TableCell>
                <NeumorphicButton variant="outlined" onClick={(e) => {
                    e.stopPropagation();
                    onApprove().then();
                }}>
                    {appStrings.borrow.APPROVE}
                </NeumorphicButton>
            </TableCell>
        </TableRow>
    );
};
export default memo(BorrowItem);
