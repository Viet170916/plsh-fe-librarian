"use client"
import React, {memo} from "react";
import {useTheme} from "@mui/material/styles";
import {BookInstance} from "@/helpers/appType";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import appStrings from "@/helpers/appStrings";
import BookInstanceTableItem, {
    SkeletonRow
} from "@/app/(private)/(in-dash-board)/resources/books/[id]/(read-only)/instances/item";

type BookInstanceTableProps = {
    bookInstances?: BookInstance[];
    isFetching: boolean;
}


const BookInstanceTable = ({bookInstances, isFetching}: BookInstanceTableProps) => {
    const theme = useTheme();
    return (
        <Box width={"100%"}>
            <Box width={"100%"} borderRadius={3}>
                <TableContainer sx={{overflow: "visible"}}>
                    <Table>
                        <TableHead sx={{overflow: "visible"}}>
                            <TableRow
                                sx={{boxShadow: NEUMORPHIC_SHADOW.SHADOW(), borderRadius: 3, overflow: "visible"}}>
                                <TableCell>{appStrings.book.THUMBNAIL}</TableCell>
                                <TableCell>{appStrings.book.CODE}</TableCell>
                                <TableCell>{appStrings.book.TITLE}</TableCell>
                                <TableCell>{appStrings.book.POSITION}l</TableCell>
                                <TableCell>{appStrings.book.ON_SHELF}</TableCell>
                                <TableCell>{appStrings.book.STATUS}</TableCell>
                                <TableCell>{appStrings.ACTION}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                bookInstances ? bookInstances?.map((instance, index) => (
                                    <BookInstanceTableItem key={instance.id ?? index} index={index}
                                                           instance={instance}/>
                                )) : <>
                                    <SkeletonRow index={0}/>
                                    <SkeletonRow index={1}/>
                                    <SkeletonRow index={2}/>
                                </>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};
export default memo(BookInstanceTable);

