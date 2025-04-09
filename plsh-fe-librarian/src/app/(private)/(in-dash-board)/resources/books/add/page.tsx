import Add_EditBookDetails
    from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookDetailInformation";
import Add_EditBookImage from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookImage";
import Add_EditBookOverviewTabs
    from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs";
import ClearStore from "@/app/(private)/(in-dash-board)/resources/books/add/ClearStore";
import ISBNScanner from "@/app/(private)/(in-dash-board)/resources/books/add/scanner.isbn";
import appStrings from "@/helpers/appStrings";
import Grid from "@mui/material/Grid2";
import React from "react";

export const metadata = {
    title: appStrings.book.ADD_BOOK,
    icons: {
        icon: "/images/logo.svg",
    },
};

function AddBookPage() {
    return (
        <Grid direction="row" container spacing={2}>
            <ClearStore/>
            <Grid>
                <Add_EditBookImage src={""}/>
            </Grid>
            <Grid size={{sm: "grow"}}>
                <Add_EditBookDetails/>
            </Grid>
            <Grid size={{xs: 12, sm: 12, md: 12, lg: 3, xl: 4}} container spacing={2}>
                <ISBNScanner/>
                {/*<BookCoverImageScanner/>*/}
            </Grid>
            <Grid size={12}>
                <Add_EditBookOverviewTabs/>
            </Grid>
        </Grid>);
}

export default AddBookPage;
