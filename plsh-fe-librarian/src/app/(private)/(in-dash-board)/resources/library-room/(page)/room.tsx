"use client"
import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Box, CircularProgress, Dialog, Snackbar, Typography} from "@mui/material";
import {RotateCcw} from "lucide-react";
import ItemComponent, {
    getItemBounds,
    Item,
    ItemDimensions,
    itemDimensions
} from "@/app/(private)/(in-dash-board)/resources/library-room/(page)/item";
import Grid from "@mui/material/Grid2";
import {useSelector} from "@/hooks/useSelector";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setPropToLibRoom} from "@/stores/slices/lib-room-state/lib-room.slice";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import {useRemoveItemMutation, useUpsertItemMutation} from "@/stores/slices/api/library-room.api.slice";
import {useAppStore} from "@/stores/store";
import {Controller, useForm} from "react-hook-form";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";
import appStrings from "@/helpers/appStrings";
import Link from "next/link";
import useFetchingToast from "@/hooks/useFetchingToast";
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";

export const gridSize = 18;
export const gridRows = 42;
export const gridCols = 52;


const checkCollision = (newItem: Item, items: Item[]) => {
    console.log(newItem)
    console.log(items)
    const {width, height} = getItemBounds(newItem);
    const newArea = new Set();
    for (let dx = 0; dx < width; dx++) {
        for (let dy = 0; dy < height; dy++) {
            newArea.add(`${newItem.x + dx},${newItem.y + dy}`);
        }
    }
    for (const item of items) {
        const {width: w, height: h} = getItemBounds(item);
        for (let dx = 0; dx < w; dx++) {
            for (let dy = 0; dy < h; dy++) {
                if (newArea.has(`${item.x + dx},${item.y + dy}`)) return true;
            }
        }
    }
    return false;
};
const defaultItems: Item[] = [
    {id: 1, type: "SHELF_SMALL", x: 1, y: 1, angle: 0, rootX: 1, rootY: 1,},
];

const generateNonCollidingItem = (
    type: keyof ItemDimensions,
    existingItems: Item[],
    maxAttempts = 500,
): Item | null => {
    const baseDimensions = itemDimensions[type];

    const angles = [0, 90];

    for (const angle of angles) {
        const dimensions =
            angle === 0
                ? baseDimensions
                : {h: baseDimensions.h, w: baseDimensions.w};

        for (let i = 0; i < maxAttempts; i++) {
            const x = Math.floor(Math.random() * (gridCols - dimensions.w + 1)) + 1;
            const y = Math.floor(Math.random() * (gridRows - dimensions.h + 1)) + 1;

            const newItem: Item = {
                id: Date.now() + i,
                type,
                x,
                y,
                rootX: x,
                rootY: y,
                angle,
            };

            if (!checkCollision(newItem, existingItems)) {
                return newItem;
            }
        }
    }

    return null;
};

function ReadingRoomSimulator() {
    const dispatch = useAppDispatch();
    const [upsert, {data, error, isLoading}] = useUpsertItemMutation();
    const store = useAppStore();
    const addItem = useCallback((type: keyof ItemDimensions) => {
        const newItem = generateNonCollidingItem(type, store.getState().libraryRoomState.items);

        if (newItem) {
            upsert(newItem);
        } else {
            appToaster.warning("Không còn chỗ trống để thêm vật thể mới, kể cả sau khi xoay!");
        }
    }, [upsert, store]);


    const rotateItem = useCallback(() => {
        if (store.getState().libraryRoomState.selectedItemId == undefined) return;
        dispatch(setPropToLibRoom({
            key: "items", value: store.getState().libraryRoomState.items.map((item) => {
                if (item.id !== store.getState().libraryRoomState.selectedItemId) return item;
                const newAngle = (item.angle + 90) % 360;
                const rotated = {...item, angle: newAngle};
                const otherItems = store.getState().libraryRoomState.items.filter(i => i.id !== item.id);
                return checkCollision(rotated, otherItems) ? item : rotated;
            })
        }))
    }, [store, dispatch]);
    return (
        <>
            <Snackbar
                open={isLoading}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Grid container spacing={.5} sx={{p: 1, borderRadius: 1}}>
                    <CircularProgress size={26}/>
                    <Typography>Đang tạo...</Typography>
                </Grid>
            </Snackbar>
            <Grid spacing={2} container sx={{p: 2, height: "fit-content"}}>
                <Grid size={12}>

                    <Typography variant={"h4"} fontWeight={"bold"} color={"textPrimary"}>Chọn item</Typography>
                </Grid>
                {Object.entries(itemDimensions).map(([key, value]) => (key !== "WALL_WIDTH" && key !== "WALL_LENGTH") && (
                    <NeumorphicButton key={key} variant_2={"secondary"}
                                      onClick={() => addItem(key as keyof ItemDimensions)}>
                        {itemDimensions[key as keyof ItemDimensions].name}
                    </NeumorphicButton>
                ))}
                <Grid size={12}>
                    <Typography variant={"h4"} fontWeight={"bold"} color={"textPrimary"}>Hành động</Typography>
                </Grid>
                <NeumorphicButton variant_2={"primary"} onClick={rotateItem}>
                    <RotateCcw size={16}/> Xoay
                </NeumorphicButton>
            </Grid>

        </>
    )
}


export const GridRoom = memo(() => {
    const dispatch = useAppDispatch();
    const items = useSelector(state => state.libraryRoomState.items);
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const wallDrawingRef = useRef<{ drawing: boolean, start?: { x: number, y: number }, } | null>(null);
    const selectedItemId = useSelector(state => state.libraryRoomState.selectedItemId);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (selectedItemId == null) return;

        dispatch(setPropToLibRoom({
            key: "items",
            value: items.map((item) => {
                if (item.id !== selectedItemId) return item;
                const delta = {x: 0, y: 0};
                if (e.key === 'ArrowUp') delta.y = -1;
                if (e.key === 'ArrowDown') delta.y = 1;
                if (e.key === 'ArrowLeft') delta.x = -1;
                if (e.key === 'ArrowRight') delta.x = 1;
                const moved = {...item, x: item.x + delta.x, y: item.y + delta.y};
                const otherItems = items.filter(i => i.id !== item.id);
                return checkCollision(moved, otherItems) ? item : moved;

            })
        }));
    }, [selectedItemId, items, dispatch]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const handleMouseDown = (e: React.MouseEvent, id: number) => {

        e.stopPropagation();
        setDraggingId(id);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (wallDrawingRef.current?.drawing) {
            const rect = gridRef.current?.getBoundingClientRect();
            const x = Math.floor((e.clientX - (rect?.left ?? 0)) / gridSize);
            const y = Math.floor((e.clientY - (rect?.top ?? 0)) / gridSize);
            if (!wallDrawingRef.current.start) {
                wallDrawingRef.current.start = {x, y};
            }
        }
        setDraggingId(null);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (draggingId == null) return;
        const rect = gridRef.current?.getBoundingClientRect();
        const x = Math.floor((e.clientX - (rect?.left ?? 0)) / gridSize);
        const y = Math.floor((e.clientY - (rect?.top ?? 0)) / gridSize);

        dispatch(setPropToLibRoom({
            key: "items", value: items.map((item) => {
                if (item.id !== draggingId) return item;
                const moved = {...item, x, y};
                const otherItems = items.filter(i => i.id !== item.id);
                return checkCollision(moved, otherItems) ? item : moved;
            })
        }))
    };

    return (<div className="flex-1 relative" ref={gridRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
                 onClick={() => dispatch(setPropToLibRoom({key: "selectedItemId", value: undefined}))}>
        <Box
            component={"div"}
            sx={{
                width: gridCols * gridSize,
                height: gridRows * gridSize,
                backgroundSize: `${gridSize}px ${gridSize}px`,
                backgroundImage: `linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)`
            }}
            className="absolute top-0 left-0"
        />
        {items.map((item) => (
            <div
                key={item.id}
                style={{position: 'absolute'}}
            >

                <ItemComponent
                    onMouseDown={(e) => handleMouseDown(e, item.id)}
                    item={item}
                    selected={item.id === selectedItemId}
                    onClick={(id) => dispatch(setPropToLibRoom({key: "selectedItemId", value: id}))}
                />
            </div>
        ))}
    </div>)
})


export const PropsItem = memo(() => {
    const selectedId = useSelector(state => state.libraryRoomState.selectedItemId);
    const [open, setOpen] = useState<boolean>(false);
    const [upsert, {data, error, isLoading}] = useUpsertItemMutation();
    const [remove, {data: removeData, error: removeError, isLoading: removeLoad}] = useRemoveItemMutation();
    const store = useAppStore();
    const selectedItem = useMemo(() => store.getState().libraryRoomState.items.find(item => item.id === selectedId), [selectedId, store]);
    const {reset, control, handleSubmit} = useForm<Item>();
    useEffect(() => {
        reset(selectedItem);
    }, [selectedItem, reset]);
    const upsertItem = useCallback((data: Item) => {
        upsert(data);
    }, [upsert])
    useFetchingToast(data, error);
    useEffect(() => {
        if (removeError) {
            appToaster.error(parsErrorToBaseResponse(removeError)?.message);
        }
    }, [removeError]);
    useEffect(() => {
        if (removeData?.status === "pending") {
            setOpen(true)
        }
    }, [removeData]);
    // useFetchingToast(removeData, removeError);
    const removeItem = useCallback((force?: boolean) => {
        if (selectedId)
            remove({id: selectedId, force});
    }, [remove, selectedId])
    if (selectedId)
        return (
            <Grid container width={"100%"} spacing={3}>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <Grid container spacing={2} sx={{p: 2, borderRadius: 2}}>
                        <Typography>{removeData?.message}</Typography>
                        <NeumorphicButton onClick={() => removeItem(true)} loading={removeLoad} variant_2={"primary"}
                                          color={"error"}>
                            {appStrings.REMOVE}
                        </NeumorphicButton>
                        <NeumorphicButton onClick={() => setOpen(false)} loading={removeLoad} variant_2={"primary"}
                                          color={"warning"}>
                            {appStrings.CANCEL}
                        </NeumorphicButton>
                    </Grid>

                </Dialog>
                <Grid size={12}>
                    <Typography variant={"h4"} fontWeight={"bold"} color={"textPrimary"}>Thuộc tính</Typography>
                </Grid>
                <Grid component={"form"} onSubmit={handleSubmit(upsertItem)} container size={12} spacing={2}>
                    <Controller
                        render={({field}) =>
                            (<NeumorphicTextField
                                {...field}
                                fullWidth
                                label={"Tên vật thể"}
                                value={field.value ?? ""}/>)}
                        control={control} name={"name"}/>
                    <NeumorphicButton loading={isLoading} type={"submit"} variant_2={"primary"}>
                        {appStrings.SAVE}
                    </NeumorphicButton>
                </Grid>
                <Grid size={12} container spacing={3}>
                    <Grid size={6}>
                        <NeumorphicTextField label={"x"} value={selectedItem?.x ?? "--"} disabled/>
                    </Grid>
                    <Grid size={6}>
                        <NeumorphicTextField label={"y"} value={selectedItem?.y ?? "--"} disabled/>
                    </Grid>
                    <NeumorphicButton
                        onClick={() => removeItem()}
                        loading={removeLoad}
                        variant_2={"primary"} color={"error"}>{appStrings.REMOVE}</NeumorphicButton>
                    {(selectedItem?.type === "SHELF_SMALL" || selectedItem?.type === "SHELF_LARGE") &&
                        <NeumorphicButton
                            variant_2={"secondary"}
                            component={Link}
                            href={`/resources/library-room/shelf/${selectedId}`}>{appStrings.shelf.SEE}</NeumorphicButton>
                    }
                </Grid>
            </Grid>);
    else return (<></>)
});

export default memo(ReadingRoomSimulator)
