import BorrowRequest from "@/app/(private)/(in-dash-board)/borrow/component/BorrowRequest";
import Grid from "@mui/material/Grid2";
import React from "react";

function BorrowListPage() {
    return (
        <Grid width={"100%"} container>
            <BorrowRequest/>
        </Grid>);
}

export default BorrowListPage;
