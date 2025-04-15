import Container from "@/components/primary/Container";
import Grid from "@mui/material/Grid2";
import React from "react";
import BookDisplay from "@/app/(private)/(in-dash-board)/resources/BookDisplay";
import AppButton from "@/components/primary/Input/AppButton";
import appStrings from "@/helpers/appStrings";
import Link from "next/link";

function BookPage() {
    return (
        <Container maxWidth={"xl"} sx={{padding: "20px 0!important"}}>
            <Grid container spacing={2}>
                <Grid size={3}>
                </Grid>
            </Grid>
            <Link href={`/resources/books/add`}>
                <AppButton variant={"outlined"}>
                    {appStrings.book.ADD_BOOK}
                </AppButton>
            </Link>
            <BookDisplay/>
        </Container>);
}

export default BookPage;
