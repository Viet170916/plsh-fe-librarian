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

interface IProps {
    children?: React.ReactNode,
    libraryRoom?: LibraryRoomState
}

const generateUniqueId = (existingIds: Set<string>): string => {
    let newId;
    do {
        newId = Math.random().toString(36).substring(2, 9);
    } while (existingIds.has(newId));
    return newId;
};

const generateNewShelf = (existingShelves: Shelf[], maxX: number, maxY: number): Shelf | null => {
    const existingIds = new Set(existingShelves.map((shelf) => shelf.id));
    const occupiedPositions = new Set(existingShelves.map((shelf) => `${shelf.x},${shelf.y}`));

    for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * (maxX + 1));
        const y = Math.floor(Math.random() * (maxY + 1));
        if (!occupiedPositions.has(`${x},${y}`)) {
            return {
                id: generateUniqueId(existingIds),
                name: `${appStrings.shelf.NEW_SHELF} ${existingShelves.length + 1}`,
                label: appStrings.shelf.UN_LABEL,
                column: String.fromCharCode(65 + (x % 26)),
                row: y + 1,
                x,
                y,
            };
        }
    }

    return null; // Không tìm được vị trí hợp lệ sau 100 lần thử
};


function RoomDashboard({libraryRoom}: IProps) {
    const dispatch = useDispatch();
    const store = useAppStore();

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
            const newShelf = generateNewShelf(store.getState().libraryRoomState.shelves, store.getState().libraryRoomState.columSize - 1, store.getState().libraryRoomState.rowSize - 1);
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
    const {register, handleSubmit} = useForm<{ columSize: number; rowSize: number; }>();
    const handleAdjustLayout = useCallback(function handleAdjustLayout(data: { columSize: number; rowSize: number; }) {
        console.log(store.getState().libraryRoomState);
        adjustGridSize(store.getState().libraryRoomState.shelves, data.columSize, data.rowSize);
    }, [adjustGridSize, store]);
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

                            <TextField {...register("columSize")} fullWidth
                                       defaultValue={store.getState().libraryRoomState.columSize}
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
                            {appStrings.SAVE}
                        </Button>
                    </Grid>
                </form>
            </Grid>


        </Grid>);
}

export default memo(RoomDashboard);