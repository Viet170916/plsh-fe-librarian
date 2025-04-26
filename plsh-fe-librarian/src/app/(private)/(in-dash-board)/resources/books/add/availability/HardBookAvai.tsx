import {AvailabilityItem} from "@/components/book-table/BookRowItem";
import ModalPanel from "@/components/primary/ModalPanel";
import appStrings from "@/helpers/appStrings";
import {Availability} from "@/helpers/appType";
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
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";
import {usePathname} from "next/navigation";

const PhysicBookAvailability =
    memo(function PhysicBookAvailability() {
        const dispatch = useDispatch();
        const availabilities = useSelector((state: RootState) => state.addEditBookData.baseInfo?.availability ?? []);
        const pysicAvaiRef = useRef<number>(0);
        const [triggerCloseModal, setTriggerCloseModal] = React.useState(false);
        const path = usePathname();

        function handleSave() {
            if (pysicAvaiRef.current) {
                const av = availabilities.find(a => a.kind === "physical");
                const newAv = {...av} as Availability;
                if (av) {
                    if (newAv.kind === "physical") {
                        newAv.kind = "physical";
                        newAv.isChecked = true;
                        newAv.quantity = pysicAvaiRef.current ?? 0;
                    }
                    dispatch(modifyBookAvailability(newAv));
                    // baseInfo && (baseInfo.position = value);
                } else {
                    dispatch(addBookAvailability({
                        kind: "physical",
                        quantity: pysicAvaiRef.current ?? 0,
                        isChecked: true,
                        title: appStrings.book.PHYSIC_BOOK,
                        bookInstances: [],
                    }));
                }
            }
            setTriggerCloseModal(!triggerCloseModal);
        }

        function handleRemove() {
            dispatch(removeBookAvailability("physical"));
            pysicAvaiRef.current = 0;
            setTriggerCloseModal(!triggerCloseModal);
        }

        function onQuantityChange(value: number) {
            pysicAvaiRef.current = value;
        }

        return (
            <Grid container spacing={1}>
                {path === "/resources/books/add" ?
                    <ModalPanel
                        close={triggerCloseModal}
                        containerProps={{
                            sx: {
                                borderRadius: 2,
                                maxWidth: 600,
                                width: "fit-content",
                            },
                        }}
                        buttonContent={
                            <AvailabilityItem
                                kind={"physical"} title={appStrings.book.PHYSIC_BOOK}
                                isChecked={(availabilities.find(a => a.kind === "physical")?.isChecked)}
                            />
                        }
                        buttonStyle={{boxShadow: "none", p: 0}}
                    >
                        <Grid container spacing={1} width={"fit-content"}>
                            <Grid size={12} container spacing={1} alignItems="center">
                                <Typography
                                    variant={"h3"} sx={{
                                    color: color.DARK_TEXT,
                                    fontWeight: "bold",
                                }}
                                >{appStrings.SETTING}</Typography>
                                <Typography variant="body2"
                                            sx={{fontWeight: "bold", fontSize: 35, color: color.PRIMARY}}>
                                    {appStrings.book.PHYSIC_BOOK}
                                </Typography>
                            </Grid>
                            <Grid size={6}>
                                <NeumorphicTextField
                                    type={"number"}
                                    value={availabilities.find(a => a.kind === "physical")?.quantity}
                                    onChange={(e) => onQuantityChange(Number(e.target.value))}
                                    label={appStrings.QUANTITY}
                                />
                            </Grid>
                            <Grid size={6}>
                                <Typography
                                    variant={"h4"} sx={{
                                    fontWeight: "bold",
                                    color: color.DARK_TEXT,
                                }}
                                >{appStrings.NOTICE}</Typography>
                                <Typography variant="body2" sx={{fontWeight: "lighter", color: color.DARK_TEXT}}>
                                    {appStrings.guide.ADD_PHYSIC_BOOK_AVAILABILITY}
                                </Typography>
                            </Grid>
                            <Grid size={3}>
                                <NeumorphicButton
                                    onClick={handleSave} variant={"contained"}
                                    sx={{color: color.LIGHT_TEXT, backgroundColor: color.COMFORT}}
                                >
                                    {appStrings.SAVE}
                                </NeumorphicButton>
                            </Grid>
                            <Grid size={3}>
                                <NeumorphicButton
                                    onClick={handleRemove} variant={"contained"}
                                    sx={{color: color.LIGHT_TEXT, backgroundColor: color.SERIOUS}}
                                >
                                    {appStrings.REMOVE}
                                </NeumorphicButton>
                            </Grid>
                        </Grid>
                    </ModalPanel> :
                    <AvailabilityItem
                        kind={"physical"} title={appStrings.book.PHYSIC_BOOK}
                        isChecked={(availabilities.find(a => a.kind === "physical")?.isChecked)}
                    />
                }

            </Grid>
        );
    });
export default PhysicBookAvailability;
