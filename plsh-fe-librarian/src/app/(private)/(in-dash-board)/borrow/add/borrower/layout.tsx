"use client"
import React, {JSX, memo} from "react";
import Grid from "@mui/material/Grid2";
import {TabBar} from "@/components/primary/navigation/TabBar";
import CreateMemberForm from "@/app/(private)/(in-dash-board)/members/add-member/CreateMemberForm";
import {FilterForm} from "@/app/(private)/(in-dash-board)/members/(page)/ClientRender";
import BorrowerBarcodeScanner from "@/app/(private)/(in-dash-board)/borrow/add/borrower/BarcodeScanner";
import BarcodeHelper from "@/components/primary/Input/BarcodeHelper";

type layoutProps = {
    children?: React.ReactNode;
}

function layout({children}: layoutProps): JSX.Element {
    return (
        <Grid container width={"100%"} height={"100%"} direction={"column"}>
            <Grid width={"100%"}>
                <TabBar left={
                    <Grid container alignItems={"center"} spacing={2}>
                        <Grid>
                            <CreateMemberForm/>
                        </Grid>
                        <Grid size={"grow"}><FilterForm/></Grid>
                        <BorrowerBarcodeScanner/>
                    </Grid>}
                        right={<BarcodeHelper/>}/>
            </Grid>
            <Grid size={"grow"} width={"100%"} sx={{overflowY: "auto", px: 2}}>
                {children}
            </Grid>
        </Grid>
    );
}

export default memo(layout);

