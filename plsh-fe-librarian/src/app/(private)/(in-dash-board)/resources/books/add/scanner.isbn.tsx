"use client";
import BookSearching from "@/components/BookSearching";
import { BookData } from "@/helpers/appType";
import { setAddEditBookWithBookData } from "@/stores/slices/book-states/book.add-edit.slice";
import Grid from "@mui/material/Grid2";
import React, { memo } from "react";
import { useDispatch } from "react-redux";

interface IProps{
  children?: React.ReactNode;
}
function ISBNScanner( props: IProps ){
  const dispatch = useDispatch();
  async function onResult( book?: BookData ){
    if( book ){
      dispatch( setAddEditBookWithBookData( book ) );
    }
  }
  return (
    <Grid container size = { 12 }>
      <BookSearching onResult = { onResult } />
    </Grid>);
}
export default memo( ISBNScanner );
