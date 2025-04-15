import BorrowRequest from "@/app/(private)/(in-dash-board)/borrow/component/BorrowRequest";
import Grid from "@mui/material/Grid2";
import React from "react";
import AppButton from "@/components/primary/Input/AppButton";
import appStrings from "@/helpers/appStrings";
import Link from "next/link";

function BorrowListPage() {
    return (
        <Grid width={"100%"} container>
            <Grid size={12}>
                <Link href={`/borrow/add`}>
                    <AppButton variant={"outlined"}>{appStrings.borrow.CREATE_BORROWING}</AppButton>
                </Link>
            </Grid>
            <BorrowRequest/>
        </Grid>);
}

export default BorrowListPage;
