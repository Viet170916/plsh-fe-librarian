import {AvailabilityItem} from "@/components/book-table/BookRowItem";
import EpubUploader from "@/components/primary/EpubUploader";
import ModalPanel from "@/components/primary/ModalPanel";
import appStrings from "@/helpers/appStrings";
import {AnyObject, Availability, Resource} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {
    addBookAvailability,
    modifyBookAvailability,
    removeBookAvailability
} from "@/stores/slices/book-states/book.add-edit.slice";
import {RootState} from "@/stores/store";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {memo, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

type EBookAvailabilityProps = AnyObject
const EBookAvailability =
    memo(function EBookAvailability(props: EBookAvailabilityProps) {
        const dispatch = useDispatch();
        const availabilities = useSelector((state: RootState) => state.addEditBookData.baseInfo?.availability ?? []);
        const eBookAvaiRef = useRef<Resource | undefined>(undefined);
        const [triggerCloseModal, setTriggerCloseModal] = React.useState(false);

        function handleSave() {
            if (eBookAvaiRef.current) {
                const av = availabilities.find(a => a.kind === "epub");
                const newAv = {...av} as Availability;
                if (av) {
                    if (newAv.kind === "epub") {
                        newAv.kind = "epub";
                        newAv.isChecked = true;
                        newAv.resource = ({...eBookAvaiRef.current, file: undefined} as Resource);
                    }
                    dispatch(modifyBookAvailability(newAv));
                    // baseInfo && (baseInfo.position = value);
                } else {
                    dispatch(addBookAvailability({
                        kind: "epub",
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
                            borderRadius: 2,
                            // maxWidth: 200,
                            width: "fit-content"
                        },
                    }}
                    buttonContent={
                        <AvailabilityItem
                            kind={"epub"} title={appStrings.book.E_BOOK}
                            isChecked={availabilities.find(a => a.kind === "epub")?.isChecked}
                        />
                    }
                    buttonStyle={{boxShadow: "none", p: 0}}

                >
                    <Grid container spacing={1}>
                        <Grid size={12}>
                            <Typography variant="body2" sx={{fontWeight: "bold", fontSize: 35, color: color.DARK_TEXT}}>
                                {appStrings.book.E_BOOK}
                            </Typography>
                        </Grid>
                        <Grid size={12} container>
                            <Grid size={6}>
                                <EpubUploader onUpload={eBookChange}/>
                            </Grid>
                            <Grid size={6}>
                                <Typography>
                                    {appStrings.guide.UPLOAD_EBOOK}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid size={3}>
                            <NeumorphicButton
                                variant_2={"primary"}
                                color={"success"}
                                onClick={handleSave}
                            >
                                {appStrings.SAVE}
                            </NeumorphicButton>
                        </Grid>
                        <Grid size={3}>
                            <NeumorphicButton
                                variant_2={"primary"}
                                color={"error"}
                                onClick={handleRemove}
                                sx={{color: color.LIGHT_TEXT, backgroundColor: color.SERIOUS}}
                            >
                                {appStrings.REMOVE}
                            </NeumorphicButton>
                        </Grid>
                    </Grid>
                </ModalPanel>
            </Grid>
        );
    });
export default EBookAvailability;
