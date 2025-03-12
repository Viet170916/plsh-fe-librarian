"use client"
import {useState, MouseEvent, WheelEvent, memo, useEffect} from "react";
import {DndContext, useDroppable, DragEndEvent} from "@dnd-kit/core";
import {Box} from "@mui/material";
import DraggableShelf from "@/app/(private)/(in-dash-board)/resources/library-room/Shelf";
import Shelf from "@/app/(private)/(in-dash-board)/resources/library-room/Shelf";
import {color} from "@/helpers/resources";
import {concaveContainerStyle} from "@/style/container.style";
import {useDispatch, useSelector} from "react-redux";
import {setShelves} from "@/stores/slices/lib-room-state/lib-room.slice";
import {RootState} from "@/stores/store";

export interface Shelf {
    id: string;
    name?: string;
    label?: string;
    column?: string;
    row?: number;
    x: number;
    y: number;
}

export type LibraryRoomProps = {
    gridSize: number;
}
const RoomLayout = memo(function RoomLayout({gridSize}: { gridSize: number }) {
    const dispatch = useDispatch();
    const room = useSelector((state: RootState) => state.libraryRoomState);
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, delta} = event;
        let newShelves: Shelf[] = [];
        const prev = room.shelves;
        const movedShelf = prev.find((shelf) => shelf.id === active.id);
        if (!movedShelf) return;
        const newX = Math.max(0, movedShelf?.x + Math.round(delta.x / gridSize));
        const newY = Math.max(0, movedShelf?.y + Math.round(delta.y / gridSize));
        if (newX > (room.columSize - 1) || newY > (room.rowSize - 1) || (newX === movedShelf.x && newY === movedShelf.y)) {
            return;
        }
        const targetShelf = prev.find((shelf) => shelf.x === newX && shelf.y === newY);
        if (targetShelf) {
            newShelves = prev.map((shelf) =>
                shelf.id === movedShelf.id
                    ? {...shelf, x: targetShelf.x, y: targetShelf.y}
                    : shelf.id === targetShelf.id
                        ? {...shelf, x: movedShelf.x, y: movedShelf.y}
                        : shelf
            );
            dispatch(setShelves(newShelves));
            return;
        } else {
            newShelves = prev.map((shelf) =>
                shelf.id === movedShelf.id ? {...shelf, x: newX, y: newY} : shelf
            );
            dispatch(setShelves(newShelves));
            return;
        }
    };
    return (
        <DndContext
            onDragEnd={handleDragEnd}>
            <Box
                sx={{
                    display: "grid",

                    gridTemplateRows: `repeat(${room.rowSize}, minmax(0, 1fr))`,
                    gridTemplateColumns: `repeat(${room.columSize}, minmax(0, 1fr))`,
                    width: `${(room.columSize ?? room.columSize) * (gridSize)}px!important`,
                    height: `${(room.rowSize ?? room.rowSize) * (gridSize)}px!important`,
                }}
            >
                {Array.from({length: room.rowSize ?? room.rowSize}).map((_, rowIdx) =>
                    Array.from({length: room.columSize ?? room.columSize}).map((_, colIdx) => (
                        <DroppableGridCell key={`${rowIdx}-${colIdx}`} row={rowIdx} col={colIdx}/>
                    ))
                )}
                {room.shelves.map((shelf) => (
                    <DraggableShelf key={shelf.id} shelf={shelf} gridSize={gridSize}/>
                ))}
            </Box>
        </DndContext>
    )
})

const RoomMap = ({gridSize}: LibraryRoomProps) => {
        const [offset, setOffset] = useState<{ x: number; y: number }>({x: 0, y: 0});
        const [isPanning, setIsPanning] = useState<boolean>(false);
        const [panStart, setPanStart] = useState<{ x: number; y: number }>({x: 0, y: 0});
        const [zoom, setZoom] = useState<number>(1);
        const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
            setIsPanning(true);
            setPanStart({x: e.clientX - offset.x, y: e.clientY - offset.y});
        };

        const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
            if (!isPanning) return;
            setOffset({x: e.clientX - panStart.x, y: e.clientY - panStart.y});
        };

        const handleMouseUp = () => {
            setIsPanning(false);
        };

// const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
//     const gridContainer = e.currentTarget;
//     const rect = gridContainer.getBoundingClientRect();
//
//     if (
//         e.clientX >= rect.left &&
//         e.clientX <= rect.right &&
//         e.clientY >= rect.top &&
//         e.clientY <= rect.bottom
//     ) {
//         e.preventDefault();
//         setZoom((prev) => Math.min(2, Math.max(0.5, prev - e.deltaY * 0.001)));
//
//     }
//
// };

// useEffect(() => {
//     const handleWheel = (e: WheelEvent) => {
//         if (e.target instanceof HTMLElement && e.target.closest(".grid-container")) {
//             e.preventDefault();
//             setZoom((prev) => Math.min(2, Math.max(0.5, prev - e.deltaY * 0.001)));
//         }
//     };
//
//     document.addEventListener("wheel", handleWheel, { passive: false });
//
//     return () => {
//         document.removeEventListener("wheel", handleWheel);
//     };
// }, []);

        return (
            <Box
                className="relative h-[500px] overflow-hidden"
                sx={{
                    cursor: "move",
                    background: color.WHITE,
                    borderRadius: 5,
                    ...concaveContainerStyle,
                    width: '100%'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                // onWheel={handleWheel}
            >
                <Box
                    className={`absolute`}
                    sx={{
                        width: "fit-content",
                        height: "fit-content",
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                    }}
                >
                    <RoomLayout gridSize={gridSize}/>
                </Box>
            </Box>
        )
            ;
    }
;

interface DroppableGridCellProps {
    row: number;
    col: number;
}

const DroppableGridCell = ({row, col}: DroppableGridCellProps) => {
    const {setNodeRef} = useDroppable({id: `cell-${row}-${col}`});
    return <Box ref={setNodeRef} className="w-[100px] h-[100px]"
                sx={{
                    border: "1px dashed",
                    borderColor: color.PRIMARY,
                    borderRadius: 5
                }}
    />;
};


export default memo(RoomMap);