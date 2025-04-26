"use client";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import appStrings from "@/helpers/appStrings";
import {BookBorrowingDto, LoanStatus} from "@/helpers/dataTransfer";
import {color} from "@/helpers/resources";
import {truncateTextStyle} from "@/style/text.style";
import {Box, ButtonGroup, Card, CardContent, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import React, {memo, useMemo} from "react";
import {formatTime} from "@/helpers/time";
import dayjs from "dayjs";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import {useTheme} from "@mui/material/styles";

// import { FaBook, FaBookAtlas, FaHeadphones } from "react-icons/fa6";
interface IProps {
    borrowedBook: BookBorrowingDto,
    onSelected?: (borrowedBook: BookBorrowingDto) => void,
    approvalStatus: LoanStatus
}

function BorrowedBookItem({borrowedBook, onSelected, approvalStatus}: IProps) {
    // dayjs.extend(utc)
    // dayjs.extend(timezone)
    // dayjs.locale("vi")
    const handleSelected = () => {
        onSelected?.(borrowedBook);
    };
    const avaiButtons = useMemo(() => {
        return (<></>);
    }, []);
    const theme = useTheme();
    return (
        <Card
            component={NeumorphicButton}
            sx={{
                maxWidth: 400,
                p: 2,
                borderRadius: 3,
                boxShadow: NEUMORPHIC_SHADOW.SHADOW(),
                bgcolor: theme.palette.background.default,
                cursor: "pointer",
                textAlign: "start"

            }} onClick={handleSelected}>
            <Grid container spacing={2}>
                <Grid size={5.5} container spacing={1}>
                    <ImageWithBgCover sx={{height: 200, with: "100%"}} src={borrowedBook.bookInstance?.bookThumbnail}/>
                    <Link href={`/resources/books/${borrowedBook.bookInstance?.bookId}`}>
                        <Typography
                            sx={{textDecoration: "underline", ...truncateTextStyle}} variant="h5"
                            fontWeight="normal"
                        >
                            {borrowedBook.bookInstance?.bookName}
                        </Typography>
                        <Typography variant="h6" fontWeight={"lighter"} color="text.primary">
                            {`${borrowedBook.bookInstance?.bookAuthor}`
                            }
                        </Typography>
                    </Link>
                </Grid>
                <Grid size={"grow"}>
                    <CardContent
                        sx={{
                            padding: 0,
                            paddingBottom: "0!important",
                            display: "grid",
                            alignItems: "space-between",
                            height: "100%",
                        }}
                    >
                        <Box>
                            <Typography variant="body2" fontWeight="normal">
                                {appStrings.book.CODE}
                            </Typography>
                            <Typography variant="body2" fontWeight={"lighter"} color="text.primary">
                                {borrowedBook.bookInstance?.code}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" fontWeight="normal">
                                {appStrings.borrow.BORROW_DATE}
                            </Typography>
                            <Typography variant="body2" fontWeight={"lighter"} color="text.primary">
                                {formatTime(borrowedBook.borrowDate)}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" fontWeight="normal">
                                {appStrings.borrow.DUE_DATE}
                            </Typography>
                            <Typography variant="body2" fontWeight={"lighter"} color="text.primary">
                                {formatTime(borrowedBook.returnDates?.[borrowedBook.returnDates.length - 1])}
                            </Typography>
                            {
                                (dayjs(borrowedBook.returnDates[borrowedBook.returnDates.length - 1] + "Z")) < (dayjs()) ?
                                    <Typography fontSize={10} fontWeight={"lighter"} sx={{color: color.SERIOUS}}>
                                        ({appStrings.OVERDUE})
                                    </Typography> : <></>
                            }
                        </Box>
                        <Grid container spacing={2}>
                            {approvalStatus === "pending" || approvalStatus === "approved" ?
                                <Grid>
                                    <NeumorphicButton
                                        variant_2="primary"
                                        color={"warning"}
                                        fullWidth
                                    >
                                        {appStrings.borrow.NOT_TAKEN_YET}
                                    </NeumorphicButton>
                                </Grid> :
                                (() => {
                                    switch (borrowedBook.borrowingStatus) {
                                        case "on-loan":
                                            return (
                                                <NeumorphicButton
                                                    variant_2="primary"
                                                    color={"warning"}
                                                    fullWidth
                                                >
                                                    {appStrings.borrow.ONLOAN}
                                                </NeumorphicButton>);
                                        case "returned":
                                            return (
                                                <NeumorphicButton
                                                    variant_2="primary"
                                                    color={"success"}
                                                    fullWidth
                                                >
                                                    {appStrings.borrow.RETURNED}
                                                </NeumorphicButton>);
                                        case "overdue":
                                            return (
                                                <NeumorphicButton
                                                    variant_2="primary"
                                                    color={"error"}
                                                    fullWidth
                                                >
                                                    {appStrings.borrow.OVERDUE}

                                                    <Typography
                                                        fontSize={9}
                                                    > ({borrowedBook.overdueDays ?? 0} {appStrings.unit.DAY})
                                                    </Typography>
                                                </NeumorphicButton>);
                                    }
                                })()
                            }
                            <ButtonGroup size="small" fullWidth>
                                {avaiButtons}
                            </ButtonGroup>
                        </Grid>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
}

export default memo(BorrowedBookItem);
