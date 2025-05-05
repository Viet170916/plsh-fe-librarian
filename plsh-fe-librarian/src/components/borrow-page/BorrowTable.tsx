"use client";
import BorrowItem from "@/components/borrow-page/BorrowItem";
import LoanDrawer from "@/components/borrow-page/LoanDrawer";
import appStrings from "@/helpers/appStrings";
import {LoanDto} from "@/helpers/dataTransfer";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setPropToLoanState} from "@/stores/slices/borrow-state/loan.slice";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {memo} from "react";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import {useTheme} from "@mui/material/styles";

interface IProps {
    items: LoanDto[];
}

const BorrowTable = ({items}: IProps) => {
    const dispatch = useAppDispatch();
    const theme = useTheme();

    function onSelected(loan: LoanDto) {
        dispatch(setPropToLoanState({key: "currentLoan", value: loan}));
    }

    return (
        <Box width={"100%"}>
            <LoanDrawer/>
            <Box width={"100%"} borderRadius={3}>
                <TableContainer sx={{overflow: "visible",}}>
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    boxShadow: NEUMORPHIC_SHADOW.SHADOW(),
                                    borderRadius: 3,
                                }}
                            >
                                <TableCell>{appStrings.member.AVATAR}</TableCell>
                                <TableCell>{appStrings.borrow.CODE}</TableCell>
                                <TableCell>{appStrings.member.FULLNAME}</TableCell>
                                <TableCell>{appStrings.member.EMAIL}</TableCell>
                                {/*<TableCell>{appStrings.borrow.USAGE_DATE_COUNT}</TableCell>*/}
                                <TableCell>{appStrings.book.BOOK_COUNT}</TableCell>
                                <TableCell>{appStrings.borrow.STATUS}</TableCell>
                                <TableCell>{appStrings.OTHER}</TableCell>
                                <TableCell>{appStrings.borrow.BORROW_DATE}</TableCell>
                                {/*<TableCell>{appStrings.ACTION}</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((borrowed) => (
                                <BorrowItem key={borrowed.id} borrowItem={borrowed} onSelected={onSelected}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default memo(BorrowTable);
