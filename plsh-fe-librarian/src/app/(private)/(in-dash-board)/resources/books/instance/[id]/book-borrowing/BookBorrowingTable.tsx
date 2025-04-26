"use client"
import React, {JSX, memo, useEffect} from "react";
import {useGetBookBorrowingsQuery} from "@/stores/slices/api/borrow.api.slice";
import {skipToken} from "@reduxjs/toolkit/query";
import {useParams} from "next/navigation";
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";
import Grid from "@mui/material/Grid2";
import {Box, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import appStrings from "@/helpers/appStrings";
import BookBorrowingTableItem
    from "@/app/(private)/(in-dash-board)/resources/books/instance/[id]/book-borrowing/BookBorrowingTableItem";


function BookBorrowingTable(): JSX.Element {
    const {id} = useParams<{ id: string }>();
    const {data, isFetching, error} = useGetBookBorrowingsQuery(id ? {
        bookInstanceId: Number.parseInt(id),
        limit: 10,
        page: 1
    } : skipToken);
    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);

    return (
        <Grid container width={"100%"}>
            <Grid size={12}>
                {isFetching && <LinearProgress/>}
            </Grid>
            <Box width={"100%"} sx={{mt: 1}}>
                <Box width={"100%"} borderRadius={3}>
                    <TableContainer sx={{overflow: "visible"}}>
                        <Table>
                            <TableHead sx={{overflow: "visible"}}>
                                <TableRow
                                    sx={{boxShadow: NEUMORPHIC_SHADOW.SHADOW(), borderRadius: 3, overflow: "visible"}}>
                                    <TableCell>{appStrings.member.AVATAR}</TableCell>
                                    <TableCell>{appStrings.borrow.BORROWER}</TableCell>
                                    <TableCell>{appStrings.member.PHONE}</TableCell>
                                    <TableCell>{appStrings.member.EMAIL}l</TableCell>
                                    <TableCell>{appStrings.member.ROLE}l</TableCell>
                                    <TableCell>{appStrings.member.CLASSNAME}</TableCell>
                                    <TableCell>{appStrings.borrow.BORROW_DATE}</TableCell>
                                    <TableCell>{appStrings.borrow.RETURN_DATE}</TableCell>
                                    <TableCell>{appStrings.borrow.STATUS}</TableCell>
                                    <TableCell>{appStrings.borrow.LOAN_CODE}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(data?.data?.length ?? 0) <= 0 ?
                                    <TableRow><TableCell>{appStrings.book.HAS_NO_BORROW_YET}</TableCell></TableRow>
                                    : data?.data.map((bookBorrowed) => (
                                        <BookBorrowingTableItem key={bookBorrowed.id} bookBorrowed={bookBorrowed}/>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>


        </Grid>
    );
}

export default memo(BookBorrowingTable);

