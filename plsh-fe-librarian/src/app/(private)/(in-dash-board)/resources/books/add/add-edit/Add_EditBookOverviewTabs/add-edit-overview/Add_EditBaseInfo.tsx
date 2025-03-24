import appStrings from "@/helpers/appStrings";
import { LanguageCode } from "@/helpers/appType";
import { color, languages } from "@/helpers/resources";
import { setValueInOverview } from "@/stores/slices/book-states/book.add-edit.slice";
import { RootState } from "@/stores/store";
import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { memo, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const Item = memo( function( { children, title }: { children: React.ReactNode; title: string } ): React.ReactNode{
  return (
    <Grid
      alignItems = { "center" }
      justifyContent = { "center" }
      container
      sx = { {
        p: 2.5,
        textAlign: "center",
        borderRadius: 2,
        minWidth: 180,
        backgroundColor: color.WHITE,
      } }
    >
      <Typography
        variant = "caption"
        textAlign = { "center" }
        color = "textSecondary"
        fontWeight = "bold"
      >
        { title }
      </Typography>
      <Grid size = { 12 }>
        { children }
      </Grid>
    </Grid>
  );
} );
const EditPublishAt = memo( function(){
  const publishDate = useSelector( ( state: RootState ) => state.addEditBookData.overview.publishDate, shallowEqual );
  const dispatch = useDispatch();
  function onChange( value: Dayjs | null ){
    dispatch( setValueInOverview( { key: "publishDate", value: value?.toDate().getFullYear().toString() } ) );
  }
  const publishData = useMemo( () => (publishDate ? dayjs( publishDate ) : null), [ publishDate ] );
  return (
    <DateField
      variant = { "standard" }
      size = "small"
      sx = { {
        "& .MuiInputBase-input": {
          textAlign: "center",
          fontWeight: "bold",
          color: color.PRIMARY,
        },
      } }
      value = { publishData ?? null } format = { "YYYY" }
      onChange = { onChange }
    />
  );
} );
const EditPublisher = memo( function(){
  const publisher = useSelector( ( state: RootState ) => state.addEditBookData.overview.publisher, shallowEqual );
  const dispatch = useDispatch();
  function onChange( value: string ){
    dispatch( setValueInOverview( { key: "publisher", value: value } ) );
  }
  return (
    <TextField
      variant = { "standard" }
      size = "small"
      onChange = { ( e ) => onChange( e.target.value ) }
      value = { publisher ?? "" }
      slotProps = { {
        htmlInput: {
          sx: { textAlign: "center", fontWeight: "bold", color: color.PRIMARY }, // Căn giữa nội dung nhập vào
        },
      } }
    />
  );
} );
const EditLanguage = memo( function(){
  const lang = useSelector( ( state: RootState ) => state.addEditBookData.overview.language, shallowEqual );
  const dispatch = useDispatch();
  function onChange( value: LanguageCode ){
    dispatch( setValueInOverview( { key: "language", value: value } ) );
  }
  return (
    <Autocomplete
      size = "small"
      fullWidth
      freeSolo
      disablePortal
      options = { languages }
      value = { languages.find( language => language.code === lang ) ?? languages.find( ( language ) => language.code === "vi" ) }
      sx = { {
        "& .MuiInputBase-input": {
          textAlign: "center", fontWeight: "bold", color: color.PRIMARY,
        },
        width: "100%",
        // minWidth: 150,
      } }
      onChange = { ( _, value ) => {
        if( value && typeof value !== "string" ){
          onChange( value.code );
          // setValue("language", value.code)
        }
      } }
      getOptionLabel = { ( option ) => {
        if( option && typeof option !== "string" ){
          return option.langInVn as string;
        }
        return "";
      } }
      renderOption = { ( props, option ) => {
        const { key, ...optionProps } = props;
        return (<Grid
          container
          key = { option.code } padding = { 1 }
          component = "li"
          { ...optionProps }
        >
          <Grid size = { 7 }>
            <Typography
              variant = "h6"
              sx = { {
                textAlign: "start",
                color: color.PRIMARY,
                fontWeight: "bold",
              } }
            >{ option.langInVn }</Typography>
          </Grid>
          <Grid size = { 5 }>
            <Typography
              variant = "h6"
              sx = { { color: color.DARK_TEXT, textAlign: "end" } }
            >{ option.name }</Typography>
          </Grid>
        </Grid>);
      } }
      renderInput = { ( params ) => (
        <TextField
          variant = { "standard" }
          { ...params } />) }
    />
  );
} );
const EditPageCount = memo( function(){
  const pageCount = useSelector( ( state: RootState ) => state.addEditBookData.overview.pageCount, shallowEqual );
  const dispatch = useDispatch();
  function onChange( value: string ){
    dispatch( setValueInOverview( { key: "pageCount", value: value } ) );
  }
  return (
    <TextField
      variant = { "standard" }
      size = "small"
      value = { pageCount ?? "" }
      type = "number"
      slotProps = { {
        htmlInput: {
          sx: { textAlign: "center", fontWeight: "bold", color: color.PRIMARY }, // Căn giữa nội dung nhập vào
        },
      } }
    />
  );
} );
function Add_EditBaseInfo(){
  return (
    <Grid container spacing = { 2 } width = { "100%" } sx = { { overflowX: "auto" } }>
      <Stack spacing = { 2 } direction = { "row" } useFlexGap>
        <Item title = { appStrings.book.PUBLISH_AT }>
          <EditPublishAt />
        </Item>
        <Item title = { appStrings.book.PUBLISHER }>
          <EditPublisher />
        </Item>
        <Item title = { appStrings.LANGUAGE }>
          <EditLanguage />
        </Item>
        <Item title = { appStrings.book.PAGE_COUNT }>
          <EditPageCount />
        </Item>
      </Stack>
    </Grid>
  );
}
export default memo( Add_EditBaseInfo );
