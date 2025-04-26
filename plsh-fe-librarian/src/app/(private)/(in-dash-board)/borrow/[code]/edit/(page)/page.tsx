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
        <Grid spacing={1} container sx={{p: 4, width: "100%"}}>
            <Grid size={4.5} sx={{borderRadius: 2}} minHeight={400}>
                <Typography variant="h4" gutterBottom>{appStrings.SEARCH}</Typography>
                <SearchedList/>
            </Grid>
            <AddEditBorrowForm/>
            <Grid size={"grow"}>
                <Typography variant="h4" fontWeight="bold">
                    Sách <span style={{color: color.PRIMARY}}>đã chọn</span>
                </Typography>
                <SelectedBooks/>
            </Grid>
        </Grid>
    );
}

export default AddBorrowPage;
