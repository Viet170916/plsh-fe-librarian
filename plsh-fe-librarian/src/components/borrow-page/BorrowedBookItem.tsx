"use client";
import React, {memo, useMemo} from "react";
import {BorrowedBook} from "@/helpers/appType";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Chip,
    ButtonGroup,
    IconButton,
    Tooltip
} from "@mui/material";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import Image from "next/image";
import ImageWithSkltWhileLoading from "@/components/primary/ImageWithSkltWhileLoading";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import Grid from "@mui/material/Grid2";
import {formatDate} from "@/helpers/text";
import appStrings from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import Link from "next/link";
import {truncateTextStyle} from "@/style/text.style";
import {FaBook, FaBookAtlas, FaHeadphones} from "react-icons/fa6";

interface IProps {
    children?: React.ReactNode;
    borrowedBook: BorrowedBook;
}


// const statusColors: Record<BookStatus, { label: string; color: "primary" | "secondary" | "error" }> = {
//     "E-BOOK": {label: "E-BOOK", color: "primary"},
//     Borrowed: {label: "Borrowed", color: "secondary"},
//     Return: {label: "Return", color: "error"},
//     Overdue: {label: "Overdue", color: "error"},
// };

function BorrowedBookItem({borrowedBook}: IProps) {

    const avaiButtons = useMemo(() => {
        return (borrowedBook.book?.availabilities.map(a => {
                if (a.kind === "epub") return (
                    <Tooltip key={a.kind} title={appStrings.book.E_BOOK}>
                        <Button variant="outlined" color="primary" fullWidth>
                            <FaBookAtlas/>
                        </Button>
                    </Tooltip>
                )
                else if (a.kind === "audio") return (
                    <Tooltip key={a.kind} title={appStrings.book.AUDIO_BOOK}>
                        <Button variant="outlined" color="primary" fullWidth>
                            {(a.kind === "audio" && <FaHeadphones/>)}
                        </Button>
                    </Tooltip>)
                else if (a.kind === "physical") return (
                    <Tooltip key={a.kind} title={appStrings.book.PHYSIC_BOOK}>
                        <Button variant="outlined" color="primary" fullWidth>
                            <FaBook/>
                        </Button>
                    </Tooltip>
                )

            }
        ))

    }, [borrowedBook]);
    return (
        <Card sx={{maxWidth: 400, p: 2, borderRadius: 3, boxShadow: 3}}>
            <Grid container spacing={2}>
                <Grid size={{xl: 5.5}} container spacing={1}>
                    <ImageWithBgCover sx={{height: 200}} src={borrowedBook.book?.thumbnail}/>
                    <Link href={`/resources/books/${borrowedBook.book?.id}`}>
                        <Typography sx={{textDecoration: "underline", ...truncateTextStyle}} variant="h5"
                                    fontWeight="normal">
                            {borrowedBook.book?.title}
                        </Typography>
                        <Typography variant="h6" fontWeight={"lighter"} color="text.secondary">
                            {`${borrowedBook.book?.authors?.[0]?.fullName}${borrowedBook.book?.authors?.[0]?.birthYear && borrowedBook.book?.authors[0]?.deathYear ? `,${borrowedBook.book?.authors[0]?.birthYear}-${borrowedBook.book?.authors[0]?.deathYear}` : (borrowedBook.book?.authors[0]?.birthYear ? `,${borrowedBook.book?.authors[0]?.birthYear}` : "")}`}
                        </Typography>
                    </Link>

                </Grid>

                <Grid size={{xl: 6.5}}>
                    <CardContent sx={{
                        padding: 0,
                        paddingBottom: "0!important",
                        display: "grid",
                        alignItems: "space-between",
                        height: "100%"
                    }}>
                        <Box>
                            <Typography variant="body2" fontWeight="normal">
                                {appStrings.borrow.BORROW_DATE}
                            </Typography>
                            <Typography variant="body2" fontWeight={"lighter"} color="text.secondary">
                                {formatDate(borrowedBook.borrowDateRange?.start)}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" fontWeight="normal">
                                {appStrings.borrow.DUE_DATE}
                            </Typography>
                            <Typography variant="body2" fontWeight={"lighter"} color="text.secondary">
                                {formatDate(borrowedBook.borrowDateRange?.end)}
                            </Typography>
                            {
                                (new Date(borrowedBook.borrowDateRange?.end as string)) < (new Date()) ?
                                    <Typography fontSize={10} fontWeight={"lighter"} sx={{color: color.SERIOUS}}>
                                        ({appStrings.OVERDUE})
                                    </Typography> : <></>
                            }
                        </Box>
                        <Grid container spacing={2}>
                            {
                                (() => {
                                    switch (borrowedBook.borrowStatus?.kind) {
                                        case "on-loan":
                                            return (
                                                <Button variant="contained"
                                                        sx={{backgroundColor: color.WARNING, color: color.LIGHT_TEXT}}
                                                        fullWidth>
                                                    {borrowedBook.borrowStatus?.title}
                                                    {/*<Typography*/}
                                                    {/*    variant={"h6"}>({appStrings.borrow.DUE_DATE}: {borrowedBook.borrowStatus.dayLeftCount}){appStrings.unit.DAY}*/}
                                                    {/*</Typography>*/}
                                                </Button>)
                                        case "returned":
                                            return (
                                                <Button variant="contained"
                                                        sx={{background: color.COMFORT, color: color.LIGHT_TEXT}}
                                                        fullWidth>
                                                    {borrowedBook.borrowStatus?.title}

                                                </Button>)
                                        case "overdue":
                                            return (
                                                <Button variant="contained"
                                                        sx={{background: color.SERIOUS, color: color.LIGHT_TEXT}}
                                                        fullWidth>
                                                    {borrowedBook.borrowStatus?.title}
                                                    <Typography
                                                        fontSize={9}> ({borrowedBook.borrowStatus.overdueDateCount} {appStrings.unit.DAY})
                                                    </Typography>
                                                </Button>)
                                    }
                                })()
                            }
                            {/*<Button variant="contained" color="success" fullWidth>*/}
                            {/*    {borrowedBook.borrowStatus?.title}*/}
                            {/*</Button>*/}

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
