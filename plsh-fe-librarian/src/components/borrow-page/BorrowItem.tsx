"use client";
import React, {memo, useMemo} from "react";

interface IProps {
    children?: React.ReactNode;
}

import {Box, Button, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {BorrowItemData} from "@/helpers/appType";
import {truncateTextStyle} from "@/style/text.style";
import appStrings from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import Link from "next/link";
import Image from "next/image";


const BorrowItem = ({borrowItem}: { borrowItem: BorrowItemData }) => {

    const status = useMemo(() => {
        if (borrowItem.status.kind === "on-loan") {
            return <Typography>{`${appStrings.borrow.DAY_LEFT}: ${borrowItem.status.dayLeftCount}`}</Typography>
        } else if (borrowItem.status.kind === "partially-returned") {
            return (
                <Box>
                    <Typography>{`${appStrings.borrow.RETURNED}: ${borrowItem.status.returnedCount}`}</Typography>
                    <Typography>{`${appStrings.borrow.LEFT}: ${borrowItem.status.leftCount}`}</Typography>
                </Box>)
        } else if (borrowItem.status.kind === "returned") {
            return <Typography>{borrowItem.status.title}</Typography>

        } else {
            return <Typography>{`${appStrings.borrow.RETURNED}: ${borrowItem.status.overdueDateCount}`}</Typography>
        }
    }, [borrowItem]);
    return (
        <Box sx={{
            borderRadius: 2,
            width: "100%",
            p: 2,
            bgcolor: "white",
            display: "flex",
            alignItems: "center"
        }}>
            <Grid container spacing={2} alignItems="center" width={"100%"}>
                <Grid size={{xl: 1}}>

                    <Box
                        sx={{
                            width: 60,
                            height: 80,
                            border: "1px solid #ccc",
                            display: "flex",
                            position:"relative",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Image fill src={borrowItem.borrower.avatarUrl??""} alt={borrowItem.borrower.name??""}/>
                    </Box>
                </Grid>

                {/* Thông tin sách */}
                <Grid size={{xl: 3}}>
                    <Link href={`/borrow/${borrowItem.id}`}>
                        <Typography sx={{textDecoration: "underline"}} variant="h6">{borrowItem.code}</Typography>
                    </Link>
                    <Typography variant="body2">{borrowItem.borrower.name}, {borrowItem.borrower.avatarUrl}</Typography>
                    <Typography variant="body2" sx={{...truncateTextStyle}}>{borrowItem.note}</Typography>
                </Grid>

                {/* Usage, Format, Penalties, Charges */}
                <Grid size={{xl: 1}}>
                    <Typography>{`${borrowItem.dayUsageCount} ${appStrings.unit.DAY}`}</Typography>
                </Grid>
                <Grid size={{xl: 1}}>
                    <Typography>{`${borrowItem.bookCount} ${appStrings.unit.BOOK}`}</Typography>
                </Grid>
                <Grid size={{xl: 1.5}}>
                    <Box sx={{
                        backgroundColor: getColorForBorrowStatus(borrowItem.status.kind),
                        width: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                    }}>
                        <Typography sx={{color: color.LIGHT_TEXT}}
                                    fontSize={10}
                                    textAlign={"center"}>{borrowItem.status.title}</Typography>
                    </Box>
                </Grid>
                <Grid size={{xl: 2}}>
                    {status}
                </Grid>

                {/* Nút thanh toán */}
                <Grid>
                    <Button variant="contained" color="error" size="small">
                        Pay Now
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
        ;
};

function getColorForBorrowStatus(kind: "overdue" | "on-loan" | "returned" | "partially-returned") {
    switch (kind) {
        case "overdue":
            return color.SERIOUS;
        case "on-loan":
            return color.PRIMARY;
        case "returned":
            return color.COMFORT;
        case "partially-returned":
            return color.WARNING;
    }

}

export default memo(BorrowItem);