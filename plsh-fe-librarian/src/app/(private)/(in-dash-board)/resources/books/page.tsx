import BookDisplayedCpn from "@/app/(private)/(in-dash-board)/resources/books/BookDisplayedCpn";
import Container from "@/components/primary/Container";
import Grid from "@mui/material/Grid2";
import React from "react";

interface IProps{
  children?: React.ReactNode;
}
function BookPage(){
  return (
    <Container maxWidth = { "xl" } sx = { { padding: "20px 0!important" } }>
      <Grid container spacing = { 2 }>
        <Grid size = { 3 }>
        </Grid>
      </Grid>
      <BookDisplayedCpn />
    </Container>);
}
export default BookPage;
