import {AnyObject, Availability, Resource} from "@/helpers/appType";
import React, {memo, useRef} from "react";
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
import {Button, Typography} from "@mui/material";
import {color} from "@/helpers/resources";
import PdfUploader from "@/components/primary/PdfUpload";

type EBookAvailabilityProps = AnyObject
const EBookAvailability =
    memo(function EBookAvailability(props: EBookAvailabilityProps) {
      const dispatch = useDispatch();
      const availabilities = useSelector((state: RootState) => state.addEditBookData.baseInfo?.availability ?? [])
      const eBookAvaiRef = useRef<Resource | undefined>(undefined);
      const [triggerCloseModal, setTriggerCloseModal] = React.useState(false);

      function handleSave() {
        if (eBookAvaiRef.current) {
          const av = availabilities.find(a => a.kind === "e-book");
          const newAv = {...av} as Availability
          if (av) {
            if (newAv.kind === "e-book") {
              newAv.kind = "e-book";
              newAv.isChecked = true;
              newAv.resource = ({...eBookAvaiRef.current, file: undefined} as Resource);
            }
            dispatch(modifyBookAvailability(newAv));
            // baseInfo && (baseInfo.position = value);
          } else {
            dispatch(addBookAvailability({
              kind: "e-book",
              resource: ({...eBookAvaiRef.current, file: undefined} as Resource),
              isChecked: true,
              title: appStrings.book.E_BOOK,
            }));
          }
        }
        setTriggerCloseModal(!triggerCloseModal);

      }

      function handleRemove() {
        dispatch(removeBookAvailability("e-book"));
        eBookAvaiRef.current = undefined;
        setTriggerCloseModal(!triggerCloseModal);
      }

      function eBookChange(value: Resource | undefined) {
        eBookAvaiRef.current = value ?? undefined;
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

                  <AvailabilityItem kind={"physical"} title={appStrings.book.E_BOOK}
                                    isChecked={availabilities.find(a => a.kind === "e-book")?.isChecked}/>
                }
            >
              <Grid container spacing={1} width={"100%"}>
                <Grid size={12}>
                  <Typography variant="body2" sx={{fontWeight: "bold", fontSize: 35, color: color.DARK_TEXT}}>
                    {appStrings.book.PHYSIC_BOOK}
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <PdfUploader onUpload={eBookChange}/>
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
export default EBookAvailability