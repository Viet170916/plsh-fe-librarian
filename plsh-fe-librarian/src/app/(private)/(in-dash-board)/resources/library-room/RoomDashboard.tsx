"use client"
import React, {memo, useCallback, useEffect} from "react";
import Grid from "@mui/material/Grid2";
import RoomMap, {Shelf} from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";
import {
    addShelf,
    setColumSize,
    setRowSize,
    setLibraryRoomState,
    LibraryRoomState
} from "@/stores/slices/lib-room-state/lib-room.slice";
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState, useAppStore} from "@/stores/store";
import {toast} from "sonner";
import {MdOutlinePostAdd} from "react-icons/md";
import {color} from "@/helpers/resources";
import appStrings from "@/helpers/appStrings";
import {useForm} from "react-hook-form";
import {generateNewShelf} from "@/app/(private)/(in-dash-board)/resources/library-room/utils";
import {useModifyLibraryRoomMutation} from "@/stores/slices/api/library-room.api.slice";

interface IProps {
    children?: React.ReactNode,
    libraryRoom?: LibraryRoomState
}


function RoomDashboard({libraryRoom}: IProps) {
    const dispatch = useDispatch();
    const store = useAppStore();
    const [modifyLibraryRoom, {isLoading, isError, data}] = useModifyLibraryRoomMutation({});
    useEffect(() => {
        if (isError) {
            toast.error(appStrings.error.EDIT_FAIL);
        }
    }, [isError]);
    useEffect(() => {
        if (data) {
            dispatch(setLibraryRoomState(data))
            toast.info(appStrings.success.EDIT_SUCCESS);
        }
    }, [data]);

    function getState() {
        return store.getState();
    }

    // const libraryRoomState = useSelector((state: RootState) => state.libraryRoomState);
    useEffect(() => {
        if (libraryRoom) {
            dispatch(setLibraryRoomState(libraryRoom));
        }
    }, [libraryRoom, dispatch])

    const handleAddShelf = () => {
        if (store.getState().libraryRoomState.shelves) {
            const newShelf = generateNewShelf(store.getState().libraryRoomState.shelves, store.getState().libraryRoomState.columnSize - 1, store.getState().libraryRoomState.rowSize - 1);
            if (newShelf) {
                dispatch(addShelf(newShelf));
            } else {
                toast.warning("Không còn chỗ trống để thêm kệ mới!");
            }
        }
    };
    const adjustGridSize = useCallback((shelves: Shelf[], newColumns: number, newRows: number) => {
        const isValid = shelves.every(shelf => shelf.x < newColumns && shelf.y < newRows);
        if (newRows < 1 || newRows > 15 || newColumns < 1 || newRows > 15) {
            toast.warning("Số cột hoặc số hàng vượt ngoài mức cho phép (1-15) ");
        } else if (isValid) {
            dispatch(setColumSize(newColumns));
            dispatch(setRowSize(newRows));
        } else {
            toast.warning("Không thể thu nhỏ layout vì sẽ có kệ sách đang nằm ngoài");
        }
    }, [dispatch]);
    const {register, handleSubmit} = useForm<{ columnSize: number; rowSize: number; }>();
    const handleAdjustLayout = useCallback(function handleAdjustLayout(data: { columnSize: number; rowSize: number; }) {
        adjustGridSize(store.getState().libraryRoomState.shelves, data.columnSize, data.rowSize);
    }, [adjustGridSize, store]);

    async function handleSaveChange() {
        try {
            const response = await modifyLibraryRoom(store.getState().libraryRoomState).unwrap();
        } catch (error) {

        }
    }

    return (
        <Grid container spacing={2} height={"100%"}>
            <Grid size={12}>
                <RoomMap gridSize={100}/>
            </Grid>
            <Grid size={{lg: 3, md: 4, sm: 6, xs: 12}}>
                <Button fullWidth variant={"contained"}
                        sx={{color: color.LIGHT_TEXT}}
                        onClick={handleAddShelf}
                        startIcon={<MdOutlinePostAdd color={color.LIGHT_TEXT}/>}>
                    {appStrings.ADD_SHELF}
                </Button>
            </Grid>
            <Grid size={{lg: "grow", md: "grow", sm: 7, xs: 12}}>
                <form onSubmit={handleSubmit(handleAdjustLayout)}>
                    <Grid container spacing={2} justifyContent={"end"}>
                        <Grid size={4}>

                            <TextField {...register("columnSize")} fullWidth
                                       defaultValue={store.getState().libraryRoomState.columnSize}
                                       label={appStrings.shelf.COL_SIZE}/>
                        </Grid>
                        <Grid size={4}>

                            <TextField {...register("rowSize")} fullWidth
                                       defaultValue={store.getState().libraryRoomState.rowSize}
                                       label={appStrings.shelf.ROW_SIZE}/>
                        </Grid>
                        <Button variant={"outlined"}
                                type="submit"
                        >
                            {appStrings.APPLY}
                        </Button>

                    </Grid>
                </form>
            </Grid>
            <Grid size={12}>
                <Button variant={"contained"}
                        type="submit"
                        onClick={handleSaveChange}
                        sx={{color: color.LIGHT_TEXT}}
                >
                    {appStrings.SAVE}
                </Button>
            </Grid>
        </Grid>);
}

export default memo(RoomDashboard);