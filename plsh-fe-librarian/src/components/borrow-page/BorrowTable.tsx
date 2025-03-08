"use client"
import React, {memo} from "react";
import {Box, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TableItem from "@/components/borrow-page/BorrowItem";
import {BorrowItemData} from "@/helpers/appType";
import appStrings from "@/helpers/appStrings";


interface IProps {
    children?: React.ReactNode;
    items: BorrowItemData[];
}

const BorrowTable = (props: IProps) => {
    return (
        <Box sx={{width: "100%"}}>
            {/* Tiêu đề bảng */}
            <Grid container spacing={2} sx={{borderRadius: 1}}>
                <Grid size={{xl: 4}}>
                    <Typography variant="subtitle1">{appStrings.TITLE}</Typography>
                </Grid>
                <Grid size={{xl: 1}}>
                    <Typography variant="subtitle1">{appStrings.borrow.USAGE_DATE_COUNT}</Typography>
                </Grid>
                <Grid size={{xl: 1}}>
                    <Typography variant="subtitle1">{appStrings.book.BOOK_COUNT}</Typography>
                </Grid>
                <Grid size={{xl: 1.5}}>
                    <Typography variant="subtitle1">{appStrings.borrow.STATUS}</Typography>
                </Grid>
                <Grid size={{xl: 2}}>
                    <Typography variant="subtitle1">{appStrings.OTHER}</Typography>
                </Grid>
                <Grid size={{xl: 1}}>
                    <Typography variant="subtitle1">Action</Typography>
                </Grid>
            </Grid>

            {/* Dữ liệu bảng */}
            {props.items.map((borrowed) => (
                <Box key={borrowed.id} sx={{mb: 1}}>
                    <TableItem borrowItem={borrowed}/>
                </Box>
            ))}
        </Box>
    );
};


export default memo(BorrowTable);