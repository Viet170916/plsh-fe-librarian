import { AvailabilityItem } from "@/components/book-table/BookRowItem";
import AudioUpload from "@/components/primary/AudioUpload";
import ModalPanel from "@/components/primary/ModalPanel";
import appStrings from "@/helpers/appStrings";
import { AnyObject, Availability, Resource } from "@/helpers/appType";
import { color } from "@/helpers/resources";
import { addBookAvailability, modifyBookAvailability, removeBookAvailability } from "@/stores/slices/book-states/book.add-edit.slice";
import { RootState } from "@/stores/store";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

type AudioBookAvailabilityProps = AnyObject
const AudioBookAvailability =
  memo( function AudioBookAvailability( props: AudioBookAvailabilityProps ){
    const dispatch = useDispatch();
    const availabilities = useSelector( ( state: RootState ) => state.addEditBookData.baseInfo?.availability ?? [] );
    const audioAvaiRef = useRef<Resource | undefined>( undefined );
    const [ triggerCloseModal, setTriggerCloseModal ] = React.useState( false );
    function handleSave(){
      if( audioAvaiRef.current ){
        const av = availabilities.find( a => a.kind === "audio" );
        const newAv = { ...av } as Availability;
        if( av ){
          if( newAv.kind === "audio" ){
            newAv.kind = "audio";
            newAv.isChecked = true;
            newAv.resource = { ...audioAvaiRef.current, file: undefined } as Resource;
          }
          dispatch( modifyBookAvailability( newAv ) );
          // baseInfo && (baseInfo.position = value);
        }else{
          dispatch( addBookAvailability( {
                                           kind: "audio",
                                           resource: { ...audioAvaiRef.current, file: undefined } as Resource,
                                           isChecked: true,
                                           title: appStrings.book.PHYSIC_BOOK,
                                         } ) );
        }
      }
      setTriggerCloseModal( !triggerCloseModal );
    }
    function handleRemove(){
      dispatch( removeBookAvailability( "audio" ) );
      audioAvaiRef.current = undefined;
      setTriggerCloseModal( !triggerCloseModal );
    }
    function onAudioUploadChange( value: Resource | undefined ){
      audioAvaiRef.current = value ?? undefined;
    }
    return (
      <Grid container spacing = { 1 }>
        <ModalPanel
          close = { triggerCloseModal }
          containerProps = { {
            sx: {
              maxWidth: 600,
            },
          } }
          buttonContent = {
            <AvailabilityItem
              kind = { "audio" } title = { appStrings.book.AUDIO_BOOK }
              isChecked = { availabilities.find( a => a.kind === "audio" )?.isChecked }
            />
          }
        >
          <Grid container spacing = { 1 } width = { "100%" }>
            <Grid size = { 12 }>
              <Typography variant = "body2" sx = { { fontWeight: "bold", fontSize: 35, color: color.DARK_TEXT } }>
                { appStrings.book.PHYSIC_BOOK }
              </Typography>
            </Grid>
            <Grid size = { 12 }>
              <AudioUpload onAudioUpload = { onAudioUploadChange } />
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
export default AudioBookAvailability;
