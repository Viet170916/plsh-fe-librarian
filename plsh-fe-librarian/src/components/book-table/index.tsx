"use client";
import BookRow from "@/components/book-table/BookRowItem";
import BookRowSkeletonItem from "@/components/book-table/BookRowSkeletonItem";
import Typography from "@/components/primary/typography";
import appStrings from "@/helpers/appStrings";
import { BookData } from "@/helpers/appType";
import Grid from "@mui/material/Grid2";
import React, { memo, useMemo } from "react";

interface IProps{
  children?: React.ReactNode,
  books?: BookData[],
  isLoading?: boolean
}
function BookTable( props: IProps ){
  const bookRows = useMemo( () => {
    return props.books?.map( ( book: BookData ) => <BookRow key = { book.id } book = { book } /> );
  }, [ props.books ] );
  return (
    <Grid container direction = "column" spacing = { 2 } paddingRight = { 0 } paddingLeft = { 0 }>
      <AttributeNames />
      { props.isLoading &&
        <Grid size = { 12 } container spacing = { 2 }>
          <BookRowSkeletonItem />
          <BookRowSkeletonItem />
        </Grid>
      }
      <Grid
        size = { 12 } container hidden = { props.isLoading }
        spacing = { 2 }
      >
        { bookRows }
      </Grid>
    </Grid>);
}
const AttributeNames =
  memo( function AttributeNames(){
    return (<Grid size = { 12 } container spacing = { 2 }>
      <Grid size = { 4 }>
        <Typography sx = { { justifySelf: "start" } }>
          { appStrings.TITLE }
        </Typography>
      </Grid>
      <Grid size = { 1 }>
        <Typography sx = { { justifySelf: "start" } }>
          { appStrings.RATINGS }
        </Typography>
      </Grid>
      <Grid size = { 1 }>
        <Typography sx = { { justifySelf: "start" } }>
          { appStrings.CATEGORY }
        </Typography>
      </Grid>
      <Grid size = { 2 }>
        <Typography sx = { { justifySelf: "start" } }>
          { appStrings.AVAILABILITY }
        </Typography>
      </Grid>
      <Grid size = { 1.5 }>
        <Typography sx = { { justifySelf: "start" } }>
          { appStrings.STATUS }
        </Typography>
      </Grid>
    </Grid>);
  } );
export default memo( BookTable );
