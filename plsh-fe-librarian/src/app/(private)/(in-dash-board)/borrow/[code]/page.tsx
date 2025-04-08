import Borrower from "@/app/(private)/(in-dash-board)/borrow/[code]/Borrower";
import ClientRender from "@/app/(private)/(in-dash-board)/borrow/[code]/ClientRender";
import LoanInfo from "@/app/(private)/(in-dash-board)/borrow/[code]/LoanInfo";
import {color} from "@/helpers/resources";
import Grid from "@mui/material/Grid2";
import React from "react";
import ChangeStatusButton from "@/app/(private)/(in-dash-board)/borrow/[code]/ChangeStatusButton";

interface IProps {
    children?: React.ReactNode;
}

async function BorrowInfoPage(props: {
    params: Promise<{ code: number }>
}) {
    const params = await props.params;

    function getStatusColor(kind: "partially-returned" | "returned" | "overdue" | "on-loan") {
        switch (kind) {
            case "partially-returned":
                return color.WARNING;
            case "returned":
                return color.COMFORT;
            case "on-loan":
                return color.PRIMARY;
            case "overdue":
                return color.SERIOUS;
        }
    }

    return (
        <Grid container spacing={2}>
            <ClientRender code={params.code}/>
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
