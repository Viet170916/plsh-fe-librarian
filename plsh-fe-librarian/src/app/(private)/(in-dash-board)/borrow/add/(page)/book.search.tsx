"use client";
import WebcamScanner from "@/components/primary/WebcamScanner";
import appStrings from "@/helpers/appStrings";
import {useAppDispatch} from "@/hooks/useDispatch";
import {Dialog, Tooltip} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {JSX, memo, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import BarcodeScanner from "@/components/primary/Input/BarcodeScanner";
import {setPropToBookInstanceState} from "@/stores/slices/book-states/book-instance.book.slice";
import {PiBarcodeBold} from "react-icons/pi";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";

function BookSearch(): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {control, handleSubmit, setValue} = useForm<{ isbnOrBookCode?: string, keyword?: string }>();

    async function setIsbn(value: string) {
        if (value) {
            dispatch(setPropToBookInstanceState({
                key: "bookInstanceFilter",
                value: {isbnOrBookCode: value, page: 1, limit: 10}
            }))
            setOpen(false);
        }
    }

    async function submitSearch(value: { isbnOrBookCode?: string, keyword?: string }) {
        if (value.isbnOrBookCode) {
            dispatch(setPropToBookInstanceState({
                key: "bookInstanceFilter",
                value: {isbnOrBookCode: value.isbnOrBookCode, page: 1, limit: 10}
            }))
        } else if (value.keyword) {
            dispatch(setPropToBookInstanceState({
                key: "bookInstanceFilter",
                value: {keyword: value.keyword, page: 1, limit: 10}
            }))

        }
    }

    function onScanDone(code?: string) {
        setValue("isbnOrBookCode", code);
        dispatch(setPropToBookInstanceState({
            key: "bookInstanceFilter",
            value: {isbnOrBookCode: code, page: 1, limit: 10}
        }))
    }


    return (
        <Grid container size={12} width={"100%"} spacing={4} justifyItems={"center"}>
            <Grid component={"form"} onSubmit={handleSubmit(submitSearch)} container alignItems={"center"} spacing={1}>
                <Controller
                    control={control} name={"isbnOrBookCode"}
                    render={({field}) => (
                        <NeumorphicTextField
                            size={"small"}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            label={appStrings.book.ENTER_ISBN}
                        />)}
                />
                <NeumorphicButton sx={{borderRadius: 12, ml: 1}} variant={"outlined"}
                                  type={"submit"}>{appStrings.SEARCH}</NeumorphicButton>
            </Grid>
            <Tooltip title={appStrings.guide.CAMERA_SCANNER}>

                <NeumorphicButton startIcon={<PiBarcodeBold size={17}/>} variant={"contained"}
                                  sx={{borderRadius: 12}}
                                  onClick={() => setOpen(true)}>{appStrings.SCAN_BAR_CODE}</NeumorphicButton>

            </Tooltip>

            <BarcodeScanner onScanDone={onScanDone}/>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <WebcamScanner onScanSuccess={setIsbn}/>
            </Dialog>
        </Grid>
    );
}

export default memo(BookSearch);

