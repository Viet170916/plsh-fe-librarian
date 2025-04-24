"use client";
import {
    RowShelf_Container
} from "@/app/(private)/(in-dash-board)/resources/library-room/shelf/row-component/container.RowShelf";
import UpdateForm from "@/app/(private)/(in-dash-board)/resources/library-room/shelf/row-component/UpdateForm";
import ConfirmationDialog from "@/components/primary/ConfirmationDialog";
import appStrings from "@/helpers/appStrings";
import {BookInstance} from "@/helpers/appType";
import {useDeleteRowMutation, useLazyCheckRowHasAnyBookQuery} from "@/stores/slices/api/library-room.api.slice";
import {removeRow} from "@/stores/slices/lib-room-state/shelf.slice";
import {Box, Snackbar, Typography} from "@mui/material";
import React, {memo, useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import Grid from "@mui/material/Grid2";
import {appToaster} from "@/components/primary/toaster";

const initialBooks: BookInstance[] = [{
    id: 1,
}];
const RowShelf = ({rowId}: { rowId: number }) => {
    const [checkHasAnyBookOnRow] = useLazyCheckRowHasAnyBookQuery();
    const [deleteRow] = useDeleteRowMutation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleDeleteRow() {
        const anyBookResponse = await checkHasAnyBookOnRow({rowId});
        if (anyBookResponse.data?.hasBooks) {
            setOpen(true);
        } else {
            try {
                const deleteResponse = await deleteRow({rowId});
                if (deleteResponse.data) {
                    dispatch(removeRow(rowId));
                }
                appToaster.success(appStrings.success.DELETE_SUCCESS);
            } catch {
                appToaster.success(appStrings.error.REMOVE_FAIL);
            }
        }
    }

    const handleOk = useCallback(async () => {
        try {
            const deleteResponse = await deleteRow({rowId});
            if (deleteResponse.data)
                dispatch(removeRow(rowId));
            appToaster.success(appStrings.success.DELETE_SUCCESS);
        } catch {
            appToaster.success(appStrings.error.REMOVE_FAIL);
        }
    }, [dispatch, rowId, deleteRow]);
    const handleCancel = useCallback(() => {
        appToaster.info(appStrings.CANCELED_DELETE);
    }, []);
    return (
        <Box sx={{width: "100%", borderRadius: 1, padding: 2, position: "relative"}}
             boxShadow={NEUMORPHIC_SHADOW.SHADOW()}
        >
            <ConfirmationDialog open={open} onClose={() => setOpen(false)} onOk={handleOk} onCancel={handleCancel}>
                <Typography variant={"h2"} fontWeight={"bold"}>
                    {appStrings.warning.HAS_BOOK_ON_SHELF_ROW}
                </Typography>
                <Typography variant={"h3"}>
                    {appStrings.warning.DO_YOU_WANNA_DELETE}
                </Typography>
            </ConfirmationDialog>
            <Box sx={{display: "flex", gap: 1, marginBottom: 2}}>
                < UpdateForm rowId={rowId}/>
                <NeumorphicButton variant="outlined" onClick={handleDeleteRow}>{appStrings.REMOVE}</NeumorphicButton>
            </Box>
            <Snackbar
                open={Boolean(errorMessage)}
                autoHideDuration={3000}
                onClose={() => setErrorMessage("")}
                message={errorMessage}
            />
            <Grid container sx={{m: .3, borderRadius: 2}} boxShadow={NEUMORPHIC_SHADOW.INNER_SHADOW()}>
                <RowShelf_Container rowId={rowId}/>
            </Grid>
        </Box>
    );
};
export default memo(RowShelf);
