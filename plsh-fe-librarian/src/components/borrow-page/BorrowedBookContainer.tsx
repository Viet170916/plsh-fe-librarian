import {Container, Typography} from "@mui/material";
import React, {memo} from "react";
import Grid from "@mui/material/Grid2";
import BorrowedBookItem from "@/components/borrow-page/BorrowedBookItem";
import mock from "@/helpers/mockData";
import {BorrowedBook} from "@/helpers/appType";

interface IProps {
    borrowedBook: BorrowedBook[];
}


function BorrowedBookContainer(props: IProps) {
    return (
        <Container>
            <Typography variant="h5" fontWeight="bold" mt={3} mb={2}>
                Sách đ<span style={{color: "#FF5733"}}>ã mượn</span>
            </Typography>
            <Grid container spacing={3}>
                {props.borrowedBook.map((book) => (
                    <Grid key={book.id} spacing={2} size={{xs: 12, sm: 7, md: 5, lg: 4}}>
                        <BorrowedBookItem borrowedBook={book}/>
                    </Grid>
                ))}
            </Grid>
        </Container>);
}

export default memo(BorrowedBookContainer);