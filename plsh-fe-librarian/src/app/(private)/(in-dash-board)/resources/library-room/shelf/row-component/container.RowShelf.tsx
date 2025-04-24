import {DroppableGrid} from "@/app/(private)/(in-dash-board)/resources/library-room/shelf/row-component/BookComponent";
import {GRID_SIZE_WIDTH} from "@/app/(private)/(in-dash-board)/resources/library-room/shelf/row-component/config";
import {selectRowByIdInShelfStore, setBookPosition} from "@/stores/slices/lib-room-state/shelf.slice";
import {RootState} from "@/stores/store";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import {Box, Button} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {memo, useCallback, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

export const RowShelf_Container = memo(function RSC({rowId}: { rowId: number }) {
    // const rowShelf = useSelector((state: RootState) => state.shelfState.rowShelves.find(r=>r.id === rowId), shallowEqual);
    const rowShelf = useSelector((state: RootState) => selectRowByIdInShelfStore(state, rowId));
    // const rowShelfw = useSelector((state: RootState) => state.shelfState.rowShelves);
    const dispatch = useDispatch();
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const {active, over} = event;
        if (!over) return;
        dispatch(setBookPosition({rowId, bookOnShelfId: Number(active.id), newPosition: Number(over.id)}));
    }, [rowId, dispatch]);
    const shelfRef = useRef<HTMLDivElement>(null);
    const scrollShelf = (direction: "left" | "right") => {
        if (shelfRef.current) {
            shelfRef.current.scrollLeft += direction === "left" ? -GRID_SIZE_WIDTH : GRID_SIZE_WIDTH;
        }
    };
    if (rowShelf)
        return (<>
            <NeumorphicButton
                onClick={() => scrollShelf("left")}
                sx={{position: "absolute", left: -50, top: "50%", transform: "translateY(-50%)"}}
            >◀</NeumorphicButton>
            <NeumorphicButton
                onClick={() => scrollShelf("right")}
                sx={{position: "absolute", right: -50, top: "50%", transform: "translateY(-50%)"}}
            >▶</NeumorphicButton>
            <DndContext onDragEnd={handleDragEnd}>
                <Box
                    ref={shelfRef}
                    sx={{overflowX: "auto", whiteSpace: "nowrap", padding: 2, position: "relative", width: "100%"}}
                >
                    <Grid container spacing={1} sx={{flexWrap: "nowrap", position: "relative", width: "max-content"}}>
                        {[...Array(rowShelf.maxCol)].map((_, index) => (
                            <DroppableGrid
                                key={index} index={index}
                                bookOnRowShelf={rowShelf.bookInstances?.find(b => b.position === index)}
                            />
                        ))}
                    </Grid>
                </Box>
            </DndContext></>);
});
