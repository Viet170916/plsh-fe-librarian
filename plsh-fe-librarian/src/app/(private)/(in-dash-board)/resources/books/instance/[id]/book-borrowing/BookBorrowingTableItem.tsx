"use client"
import React, {JSX, memo} from "react";
import {Avatar, TableCell, TableRow, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import appStrings from "@/helpers/appStrings";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import Link from "next/link";
import {BookBorrowingDto} from "@/helpers/dataTransfer";
import AppChip from "@/components/primary/display/AppChip";

type BookBorrowingTableItemProps = {
    bookBorrowed?: BookBorrowingDto
}

function BookBorrowingTableItem({bookBorrowed}: BookBorrowingTableItemProps): JSX.Element {
    return (
        <TableRow>
            <TableCell>
                <Avatar src={bookBorrowed?.borrowerAvatar} alt={bookBorrowed?.borrowerFullName}/>
            </TableCell>
            <TableCell>
                <Typography href={`/members/${bookBorrowed?.borrowerId}`} sx={{textDecoration: "underline"}}
                            color={"primary"} component={Link}>
                    {bookBorrowed?.borrowerFullName}
                </Typography>
            </TableCell>
            <TableCell>{bookBorrowed?.borrowerPhone}</TableCell>
            <TableCell>{bookBorrowed?.borrowerEmail}</TableCell>
            <TableCell>
                <Grid container spacing={1}>
                    {/*<Divider orientation="vertical" flexItem/>*/}
                    <Grid>
                        {bookBorrowed?.borrowerRole == "student" ?
                            <Typography>{appStrings.member.STUDENT}</Typography> :
                            <Typography>{appStrings.member.TEACHER}</Typography>}
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell>{bookBorrowed?.borrowerClass}</TableCell>

            <TableCell>{bookBorrowed?.borrowDate}</TableCell>
            <TableCell>{bookBorrowed?.actualReturnDate}</TableCell>
            <TableCell>
                {bookBorrowed?.borrowingStatus == "on-loan" &&
                    <AppChip variant={"outlined"} label={appStrings.borrow.ONLOAN} color={"warning"}/>}
                {bookBorrowed?.borrowingStatus == "returned" &&
                    <AppChip variant={"outlined"} label={appStrings.borrow.RETURNED} color={"success"}/>}
                {bookBorrowed?.borrowingStatus == "overdue" &&
                    <AppChip variant={"outlined"} label={appStrings.borrow.OVERDUE} color={"error"}/>}
            </TableCell>
            <TableCell>
                <NeumorphicButton disabled={!bookBorrowed?.loanId} href={`/borrow/${bookBorrowed?.loanId}`}
                                  component={Link} variant="outlined">
                    {appStrings.borrow.GO}
                </NeumorphicButton>
            </TableCell>
        </TableRow>
    );
}

export default memo(BookBorrowingTableItem);

