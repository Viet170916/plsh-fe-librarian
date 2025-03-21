import { AvailabilityItem } from "@/components/book-table/BookRowItem";
import ModalPanel from "@/components/primary/ModalPanel";
import appStrings from "@/helpers/appStrings";
import { AnyObject, Availability } from "@/helpers/appType";
import { color } from "@/helpers/resources";
import { addBookAvailability, BookBaseInfo, modifyBookAvailability, removeBookAvailability } from "@/stores/slices/book-states/book.add-edit.slice";
import { RootState } from "@/stores/store";
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { memo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

type PhysicBookAvailabilityProps = AnyObject
const PhysicBookAvailability =
  memo( function PhysicBookAvailability( props: PhysicBookAvailabilityProps ){
    const dispatch = useDispatch();
    const availabilities = useSelector( ( state: RootState ) => state.addEditBookData.baseInfo?.availability ?? [] );
    const pysicAvaiRef = useRef<number>( 0 );
    const [ triggerCloseModal, setTriggerCloseModal ] = React.useState( false );
    const { register, setValue, handleSubmit } = useForm<BookBaseInfo>();
    function handleSave(){
      if( pysicAvaiRef.current ){
        const av = availabilities.find( a => a.kind === "physical" );
        const newAv = { ...av } as Availability;
        if( av ){
          if( newAv.kind === "physical" ){
            newAv.kind = "physical";
            newAv.isChecked = true;
            newAv.quantity = pysicAvaiRef.current ?? 0;
          }
          dispatch( modifyBookAvailability( newAv ) );
          // baseInfo && (baseInfo.position = value);
        }else{
          dispatch( addBookAvailability( {
                                           kind: "physical",
                                           quantity: pysicAvaiRef.current ?? 0,
                                           isChecked: true,
                                           title: appStrings.book.PHYSIC_BOOK,
                                           bookInstances: [],
                                         } ) );
        }
      }
      setTriggerCloseModal( !triggerCloseModal );
    }
    function handleRemove(){
      dispatch( removeBookAvailability( "physical" ) );
      pysicAvaiRef.current = 0;
      setTriggerCloseModal( !triggerCloseModal );
    }
    // function physicSelectChange(event: React.SyntheticEvent, value: string | null) {
    //     pysicAvaiRef.current = value ?? 0;
    // }
    return (
      <Grid container spacing = { 1 }>
        <ModalPanel
          close = { triggerCloseModal }
          containerProps = { {
            sx: {
              maxWidth: 600,
              width: "fit-content",
            },
          } }
          buttonContent = {
            <AvailabilityItem
              kind = { "physical" } title = { appStrings.book.PHYSIC_BOOK }
              isChecked = { availabilities.find( a => a.kind === "physical" )?.isChecked }
            />
          }
        >
          <Grid container spacing = { 1 } width = { "fit-content" }>
            <Grid size = { 12 } container spacing = { 1 } alignItems = "center">
              <Typography
                variant = { "h3" } sx = { {
                color: color.DARK_TEXT,
                fontWeight: "bold",
              } }
              >{ appStrings.SETTING }</Typography>
              <Typography variant = "body2" sx = { { fontWeight: "bold", fontSize: 35, color: color.PRIMARY } }>
                { appStrings.book.PHYSIC_BOOK }
              </Typography>
            </Grid>
            <Grid size = { 6 }>
              <TextField type = { "number" } { ...register( "quantity" ) } label = { appStrings.QUANTITY } />
              {/*<Autocomplete*/ }
              {/*    onChange={physicSelectChange}*/ }
              {/*    renderInput={(params) => {*/ }
              {/*      return (*/ }
              {/*          <TextField variant={"outlined"} {...params} label={appStrings.book.POSITION}/>)*/ }
              {/*    }*/ }
              {/*    }*/ }
              {/*    options={["A-R1-C1"]}*/ }
              {/*/>*/ }
            </Grid>
            <Grid size = { 6 }>
              <Typography
                variant = { "h4" } sx = { {
                fontWeight: "bold",
                color: color.DARK_TEXT,
              } }
              >{ appStrings.NOTICE }</Typography>
              <Typography variant = "body2" sx = { { fontWeight: "lighter", color: color.DARK_TEXT } }>
                { appStrings.guide.ADD_PHYSIC_BOOK_AVAILABILITY }
              </Typography>
            </Grid>
            <Grid size = { 3 }>
              <Button
                onClick = { handleSave } variant = { "contained" }
                sx = { { color: color.LIGHT_TEXT, backgroundColor: color.COMFORT } }
              >
                { appStrings.SAVE }
              </Button>
            </Grid>
            <Grid size = { 3 }>
              <Button
                onClick = { handleRemove } variant = { "contained" }
                sx = { { color: color.LIGHT_TEXT, backgroundColor: color.SERIOUS } }
              >
                { appStrings.REMOVE }
              </Button>
            </Grid>
          </Grid>
        </ModalPanel>
      </Grid>
    );
  } );
export default PhysicBookAvailability;
