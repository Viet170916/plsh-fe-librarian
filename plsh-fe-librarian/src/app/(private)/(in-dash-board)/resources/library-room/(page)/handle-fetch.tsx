"use client"
import React, {JSX, memo, useCallback, useEffect, useMemo} from "react";
import {useGetItemsQuery, useModifyLibraryRoomMutation} from "@/stores/slices/api/library-room.api.slice";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setPropToLibRoom} from "@/stores/slices/lib-room-state/lib-room.slice";
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {CircularProgress, Snackbar, Typography} from "@mui/material";
import {debounce} from "@mui/material/utils";
import {useSelector} from "@/hooks/useSelector";
import {Item} from "@/app/(private)/(in-dash-board)/resources/library-room/(page)/item";
import Grid from "@mui/material/Grid2";
import {useTheme} from "@mui/material/styles";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";


function HandleFetch(): JSX.Element {
    const {data, error, isFetching} = useGetItemsQuery({});
    const [update, {data: updatedData, error: updatedError, isLoading}] = useModifyLibraryRoomMutation();
    const dispatch = useAppDispatch();
    const items = useSelector(state => state.libraryRoomState.items);

    const debouncedUpdate = useMemo(() => debounce((data: Item[]) => {
        update({ shelves: data });
    }, 5000), [update]);

    const autoSave = useCallback((data: Item[]) => {
        debouncedUpdate(data);
    }, [debouncedUpdate]);
    useEffect(() => {
        if (updatedData) {
            // appToaster.success("Lưu thành công")
        }
    }, [updatedData]);
    useEffect(() => {
        if (items.length > 0) {
            autoSave(items);
        }
    }, [items, autoSave]);

    useEffect(() => {
        if (data) {
            dispatch(setPropToLibRoom({key: "items", value: data}))
        }
    }, [data, dispatch]);
    useEffect(() => {
        if (error || updatedError) {
            appToaster.error(parsErrorToBaseResponse(error ?? updatedError)?.message);
        }
    }, [error, updatedError]);
    const theme = useTheme();
    return (
        <>
            <Snackbar
                open={isLoading}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Grid container sx={{
                    bgcolor: theme.palette.background.default,
                    p: .5,
                    borderRadius: 1,
                    boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
                }} spacing={2}>
                    <CircularProgress size={26}/>
                    <Typography>Đang lưu...</Typography>
                </Grid>
            </Snackbar>
            <Snackbar
                open={isFetching}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Grid container sx={{
                    bgcolor: theme.palette.background.default,
                    p: .5,
                    borderRadius: 1,
                    boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
                }} spacing={2}>
                    <CircularProgress size={26}/>
                    <Typography>Đang tải dữ liệu...</Typography>
                </Grid>
            </Snackbar>
        </>
    );
}

export default memo(HandleFetch);

