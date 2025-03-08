import React from "react";


import {Typography, Box, Card, CardContent, CardMedia} from "@mui/material";
import AddEditBorrowForm from "@/app/(private)/(in-dash-board)/borrow/add/AddEditBorrowForm";
import SelectedBooks from "@/app/(private)/(in-dash-board)/borrow/add/SelectedBooks";
import appStrings from "@/helpers/appStrings";
import SearchWithScanner from "@/app/(private)/(in-dash-board)/borrow/add/BookSearching";


interface IProps {
    children?: React.ReactNode;
}

async function AddBorrowPage({}) {
    return (
        <Box sx={{display: "flex", gap: 4, p: 4, bgcolor: "#f8f9fa"}}>
            {/* Form Section */}
            <Box sx={{width: "40%", p: 3, bgcolor: "white", borderRadius: 2}}>
                <Typography variant="h2" gutterBottom>{appStrings.borrow.EDIT_BOOK_SELECTED}</Typography>
                <AddEditBorrowForm/>
            </Box>

            {/* Contribution List */}
            <Box sx={{flex: 1}}>
                <Typography variant="h4" fontWeight="bold">
                    Your <span style={{color: "#e66a4e"}}>Contribution</span>
                </Typography>
                <Typography variant="h4" gutterBottom>Helps Other to Learn</Typography>
                <Typography variant="h6" gutterBottom>Your Previous Contributions</Typography>
                <SearchWithScanner/>
                <SelectedBooks/>

            </Box>
        </Box>
    );
}

export default AddBorrowPage;