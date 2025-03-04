import BookTable from "@/components/book-table";
import Container from "@/components/primary/Container";
import React, {memo} from "react";
import BookDisplayedCpn from "@/app/(private)/(in-dash-board)/resources/books/BookDisplayedCpn";
import Grid from "@mui/material/Grid2";

interface IProps {
    children?: React.ReactNode;
}

function BookPage() {
    return (
        <Container maxWidth={"xl"} sx={{padding: "20px 0!important"}}>
            <Grid container spacing={2}>
                <Grid size={3}>

                </Grid>
            </Grid>
            <BookDisplayedCpn/>
        </Container>);
}

export default BookPage;