import React, {memo, useRef} from "react";
import {AnyObject, Availability} from "@/helpers/appType";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores/store";
import {
  addBookAvailability,
  modifyBookAvailability,
  removeBookAvailability
} from "@/stores/slices/book-states/book.add-edit.slice";
import appStrings from "@/helpers/appStrings";
import Grid from "@mui/material/Grid2";
import ModalPanel from "@/components/primary/ModalPanel";
import {AvailabilityItem} from "@/components/book-table/BookRowItem";
import {Autocomplete, Button, TextField, Typography} from "@mui/material";
import {color} from "@/helpers/resources";

type PhysicBookAvailabilityProps = AnyObject
const PhysicBookAvailability =
    memo(function PhysicBookAvailability(props: PhysicBookAvailabilityProps) {
      const dispatch = useDispatch();
      const availabilities = useSelector((state: RootState) => state.addEditBookData.baseInfo?.availability ?? [])
      const pysicAvaiRef = useRef<string | undefined>(undefined);
      const [triggerCloseModal, setTriggerCloseModal] = React.useState(false);

      function handleSave() {
        if (pysicAvaiRef.current) {
          const av = availabilities.find(a => a.kind === "physical");
          const newAv = {...av} as Availability
          if (av) {
            if (newAv.kind === "physical") {
              newAv.kind = "physical";
              newAv.isChecked = true;
              newAv.position = pysicAvaiRef.current ?? undefined;
            }
            dispatch(modifyBookAvailability(newAv));
            // baseInfo && (baseInfo.position = value);
          } else {
            dispatch(addBookAvailability({
              kind: "physical",
              position: pysicAvaiRef.current ?? undefined,
              isChecked: true,
              title: appStrings.book.PHYSIC_BOOK,
            }));
          }
        }
        setTriggerCloseModal(!triggerCloseModal);

      }

      function handleRemove() {
        dispatch(removeBookAvailability("physical"));
        pysicAvaiRef.current = undefined;
        setTriggerCloseModal(!triggerCloseModal);
      }

      function physicSelectChange(event: React.SyntheticEvent, value: string | null) {
        pysicAvaiRef.current = value ?? undefined;
      }

      return (
          <Grid container spacing={1}>
            <ModalPanel
                close={triggerCloseModal}

                containerProps={{
                  sx: {
                    maxWidth: 600,
                  }
                }}
                buttonContent={

                  <AvailabilityItem kind={"physical"} title={appStrings.book.PHYSIC_BOOK}
                                    isChecked={availabilities.find(a => a.kind === "physical")?.isChecked}/>
                }
            >
              <Grid container spacing={1} width={"100%"}>
                <Grid size={12}>
                  <Typography variant="body2" sx={{fontWeight: "bold", fontSize: 35, color: color.DARK_TEXT}}>
                    {appStrings.book.PHYSIC_BOOK}
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Autocomplete
                      onChange={physicSelectChange}
                      renderInput={(params) => {
                        return (
                            <TextField variant={"outlined"} {...params} label={appStrings.book.POSITION}/>)
                      }
                      }
                      options={["A-R1-C1"]}
                  />
                </Grid>
                <Grid size={3}>
                  <Button onClick={handleSave} variant={"contained"}
                          sx={{color: color.LIGHT_TEXT, backgroundColor: color.COMFORT}}>
                    {appStrings.SAVE}
                  </Button>

                </Grid>
                <Grid size={3}>
                  <Button onClick={handleRemove} variant={"contained"}
                          sx={{color: color.LIGHT_TEXT, backgroundColor: color.SERIOUS}}>
                    {appStrings.REMOVE}
                  </Button>
                </Grid>


              </Grid>

            </ModalPanel>


          </Grid>
      )

    });

export default PhysicBookAvailability;