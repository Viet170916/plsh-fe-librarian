import BookPage from "@/app/(private)/(in-dash-board)/resources/books/[id]/(read-only)/BookPage";
import Grid from "@mui/material/Grid2";
import React, {memo} from "react";

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
