import BorrowerForm from "@/app/(private)/(in-dash-board)/borrow/add/borrower/BorrowerForm";
import MemberSelection from "@/app/(private)/(in-dash-board)/borrow/add/borrower/MemberSelection";
import Grid from "@mui/material/Grid2";
import React, {JSX, memo} from "react";

function page(): JSX.Element {
    return (
        <Grid sx={{width: "100%"}} container spacing={2}>
            <Grid size={"grow"}>
                <MemberSelection/>
            </Grid>
            <Grid size={5}>
                <BorrowerForm/>
            </Grid>
        </Grid>
    );
}

export default page;

