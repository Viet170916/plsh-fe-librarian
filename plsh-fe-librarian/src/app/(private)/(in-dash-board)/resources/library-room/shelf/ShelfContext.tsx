"use client";
import RowShelf from "@/app/(private)/(in-dash-board)/resources/library-room/shelf/RowShelf";
import appStrings from "@/helpers/appStrings";
import {useAddRowMutation} from "@/stores/slices/api/library-room.api.slice";
import {addRow, setShelfState, ShelfState} from "@/stores/slices/lib-room-state/shelf.slice";
import {RootState} from "@/stores/store";
import Grid from "@mui/material/Grid2";
import React, {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "sonner";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

interface IProps {
    data?: ShelfState;
}

function ShelfContext({data}: IProps) {
    const dispatch = useDispatch();
    const [addRowMutate] = useAddRowMutation();
    useEffect(() => {
        dispatch(setShelfState(data));
    }, [data, dispatch]);
    const shelf = useSelector((state: RootState) => state.shelfState);
    const onAddRow = async function () {
        if (shelf?.shelfBaseInfo?.id) {
            const rowResponse = await addRowMutate({shelfId: shelf.shelfBaseInfo.id});
            if (rowResponse.data) {
                toast.success(appStrings.success.SAVE_SUCCESS);
                dispatch(addRow(rowResponse.data));
            } else {
                toast.error(appStrings.error.ADD_FAIL);
            }
        }
    };
    return (
        <Grid container spacing={2} width={"100%"} size={12}>
            <Grid size={12}>
                <NeumorphicButton variant={"outlined"} onClick={onAddRow}>
                    {appStrings.shelf.ADD_ROW_ON_SHELF}
                </NeumorphicButton>
            </Grid>
            <Grid size={12} spacing={2} container>
                {
                    shelf.rowShelves?.map(row => (
                        <RowShelf rowId={row.id} key={row.id}/>
                    ))
                }
            </Grid>
        </Grid>);
}

export default memo(ShelfContext);
