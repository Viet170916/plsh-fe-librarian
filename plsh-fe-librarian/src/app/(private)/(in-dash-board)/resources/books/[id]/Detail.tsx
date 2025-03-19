import React, {memo} from "react";
import Grid from "@mui/material/Grid2";
import BookDetails from "@/components/book-page/view-only/BookDetailInformation";
import BookPage from "@/app/(private)/(in-dash-board)/resources/books/[id]/BookPage";

interface IProps {
    children?: React.ReactNode;
}

function DetailTab(props: IProps) {
    return (
        <Grid width={"100%"}>
            <BookPage/>
        </Grid>);
}

export default memo(DetailTab);