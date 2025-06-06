import AddEditBorrowForm from "@/app/(private)/(in-dash-board)/borrow/add/(page)/AddEditBorrowForm";
import SelectedBooks from "@/app/(private)/(in-dash-board)/borrow/add/(page)/SelectedBooks";
import appStrings from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import SearchedList from "@/app/(private)/(in-dash-board)/borrow/add/(page)/SearchedList";

async function AddBorrowPage() {
    return (
        <Grid spacing={2} container sx={{p: 4, width: "100%"}}>
            <AddEditBorrowForm/>
            <Grid size={4.5} sx={{borderRadius: 2}} minHeight={400}>
                <Typography color={"text.primary"} variant="h4" gutterBottom>{appStrings.SEARCH}</Typography>
                <SearchedList/>
            </Grid>
            <Grid size={"grow"}>
                <Typography color={"text.primary"} variant="h4" fontWeight="bold">
                    Sách <span style={{color: color.PRIMARY}}>đã chọn</span>
                </Typography>
                <SelectedBooks/>
            </Grid>
        </Grid>
    );
}

export default AddBorrowPage;
