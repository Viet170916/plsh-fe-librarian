import React from "react";
import Grid from "@mui/material/Grid2";
import Borrower from "@/app/(private)/(in-dash-board)/borrow/[code]/(page)/Borrower";
import ChangeStatusButton from "@/app/(private)/(in-dash-board)/borrow/[code]/(page)/ChangeStatusButton";
import LoanInfo from "@/app/(private)/(in-dash-board)/borrow/[code]/(page)/LoanInfo";
import BorrowCodeBreadcrumbs from "@/app/(private)/(in-dash-board)/borrow/[code]/(page)/breadcrumbs";

interface IProps {
    children?: React.ReactNode;
}

async function BorrowInfoPage(props: {
    params: Promise<{ code: number }>
}) {
    const params = await props.params;


    return (
        <Grid container spacing={2}>
            <Grid size={12} container width={"100%"} padding={4}>
                <Grid size={{xl: 12}}>
                </Grid>
                <Grid size={12}>
                    <Borrower/>
                </Grid>
                <Grid size={12} spacing={2} container justifyContent={"center"} alignItems={"center"}>
                    <ChangeStatusButton/>
                </Grid>
            </Grid>
            <LoanInfo/>
        </Grid>
    );
}

export default BorrowInfoPage;
