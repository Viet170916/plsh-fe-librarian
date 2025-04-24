"use client";
import DraggableShelf from "@/app/(private)/(in-dash-board)/resources/library-room/Shelf";
import Shelf from "@/app/(private)/(in-dash-board)/resources/library-room/Shelf";
import {color} from "@/helpers/resources";
import {setShelves} from "@/stores/slices/lib-room-state/lib-room.slice";
import {RowShelf} from "@/stores/slices/lib-room-state/shelf.slice";
import {RootState} from "@/stores/store";
import {DndContext, DragEndEvent, useDroppable} from "@dnd-kit/core";
import {Box} from "@mui/material";
import React, {memo, ReactNode, useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTheme} from "@mui/material/styles";
import {gridCols, gridRows, gridSize} from "@/app/(private)/(in-dash-board)/resources/library-room/(page)/room";

export interface Shelf {
    id: number;
    name?: string;
    label?: string;
    column?: string;
    row?: string;
    x: number;
    y: number;
    rowShelves: RowShelf[];
}

export type LibraryRoomProps = {
    // gridSize: number;
    children: ReactNode
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
        if (newX > (room.columnSize - 1) || newY > (room.rowSize - 1) || (newX === movedShelf.x && newY === movedShelf.y)) {
            return;
        }
        const targetShelf = prev.find((shelf) => shelf.x === newX && shelf.y === newY);
        if (targetShelf) {
            newShelves = prev.map((shelf) =>
                shelf.id === movedShelf.id
                    ? {...shelf, x: targetShelf.x, y: targetShelf.y}
                    : shelf.id === targetShelf.id
                        ? {...shelf, x: movedShelf.x, y: movedShelf.y}
                        : shelf,
            );
            dispatch(setShelves(newShelves));
            return;
        } else {
            newShelves = prev.map((shelf) =>
                shelf.id === movedShelf.id ? {...shelf, x: newX, y: newY} : shelf,
            );
            dispatch(setShelves(newShelves));
            return;
        }
    };
    return (
        <DndContext
            onDragEnd={handleDragEnd}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateRows: `repeat(${room.rowSize}, minmax(0, 1fr))`,
                    gridTemplateColumns: `repeat(${room.columnSize}, minmax(0, 1fr))`,
                    width: `${(room.columnSize ?? room.columnSize) * (gridSize)}px!important`,
                    height: `${(room.rowSize ?? room.rowSize) * (gridSize)}px!important`,
                }}
            >
                {Array.from({length: room.rowSize ?? room.rowSize}).map((_, rowIdx) =>
                    Array.from({length: room.columnSize ?? room.columnSize}).map((_, colIdx) => (
                        <DroppableGridCell key={`${rowIdx}-${colIdx}`} row={rowIdx} col={colIdx}/>
                    )),
                )}
                {room.shelves.map((shelf) => (
                    <DraggableShelf key={shelf.id} shelf={shelf} gridSize={gridSize}/>
                ))}
            </Box>
        </DndContext>
    );
});
// const RoomMap = ({children}: LibraryRoomProps) => {
//         const theme = useTheme();
//         const [offset, setOffset] = useState<{ x: number; y: number }>({x: 0, y: 0});
//         const [isPanning, setIsPanning] = useState<boolean>(false);
//         const [panStart, setPanStart] = useState<{ x: number; y: number }>({x: 0, y: 0});
//         const [zoom, setZoom] = useState<number>(1);
//         const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
//             setIsPanning(true);
//             setPanStart({x: e.clientX - offset.x, y: e.clientY - offset.y});
//         };
//         const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
//             if (!isPanning) return;
//             setOffset({x: e.clientX - panStart.x, y: e.clientY - panStart.y});
//         };
//         const handleMouseUp = () => {
//             setIsPanning(false);
//         };
//         return (
//             <Box
//                 sx={{
//                     cursor: "move",
//                     background: theme.palette.background.default,
//                     borderRadius: 5,
//                     ...concaveContainerStyle,
//                     width: '100%',
//                     height: "100%"
//                 }}
//                 onMouseDown={handleMouseDown}
//                 onMouseMove={handleMouseMove}
//                 onMouseUp={handleMouseUp}
//                 onMouseLeave={handleMouseUp}
//                 // onWheel={handleWheel}
//             >
//                 <Box
//                     className={`absolute`}
//                     sx={{
//                         width: "fit-content",
//                         height: "fit-content",
//                         transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
//                     }}
//                 >
//                     {children}
//                 </Box>
//             </Box>
//         )
//             ;
//     }
;


// const RoomMap = ({children}: LibraryRoomProps) => {
//     const theme = useTheme();
//     const containerRef = useRef<HTMLDivElement>(null);
//     const panStart = useRef({x: 0, y: 0});
//     const offset = useRef({x: 0, y: 0});
//     const isPanning = useRef(false);
//
//     const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
//         isPanning.current = true;
//         panStart.current = {
//             x: e.clientX - offset.current.x,
//             y: e.clientY - offset.current.y
//         };
//     };
//
//     const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
//         if (!isPanning.current || !containerRef.current) return;
//         const x = e.clientX - panStart.current.x;
//         const y = e.clientY - panStart.current.y;
//         offset.current = {x, y};
//         containerRef.current.style.transform = `translate(${x}px, ${y}px) scale(1)`;
//     };
//
//     const handleMouseUp = () => {
//         isPanning.current = false;
//     };
//
//     return (
//         <Box
//             sx={{
//                 cursor: "move",
//                 background: theme.palette.background.default,
//                 borderRadius: 5,
//                 ...concaveContainerStyle,
//                 width: '100%',
//                 height: "100%",
//                 overflow: "hidden",
//                 userSelect: "none"
//             }}
//             onMouseDown={handleMouseDown}
//             onMouseMove={handleMouseMove}
//             onMouseUp={handleMouseUp}
//             onMouseLeave={handleMouseUp}
//         >
//             <Box
//                 ref={containerRef}
//                 sx={{
//                     width: "fit-content",
//                     height: "fit-content",
//                     willChange: "transform",
//                 }}
//             >
//                 {children}
//             </Box>
//         </Box>
//     );
// };

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.01;

const RoomMap = ({children}: LibraryRoomProps) => {
    const theme = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const panStart = useRef({x: 0, y: 0});
    const offset = useRef({x: 0, y: 0});
    const isPanning = useRef(false);
    const zoom = useRef(1);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        isPanning.current = true;
        panStart.current = {
            x: e.clientX - offset.current.x,
            y: e.clientY - offset.current.y,
        };
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isPanning.current || !containerRef.current) return;
        const x = e.clientX - panStart.current.x;
        const y = e.clientY - panStart.current.y;
        offset.current = {x, y};
        updateTransform();
    };

    const handleMouseUp = () => {
        isPanning.current = false;
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 1 : -1;
        zoom.current = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom.current + delta * ZOOM_STEP));
        updateTransform();
    };

    const updateTransform = useCallback(() => {
        if (!containerRef.current) return;
        const {x, y} = offset.current;
        const z = zoom.current;
        containerRef.current.style.transform = `translate(${x}px, ${y}px) scale(${z})`;
    },[]);

    const recenter = useCallback(() => {
        if (!containerRef.current || !containerRef.current.parentElement) return;

        const parent = containerRef.current.parentElement.getBoundingClientRect();

        const mapWidth = gridCols * gridSize * zoom.current;
        const mapHeight = gridRows * gridSize * zoom.current;

        const centerX = (parent.width - mapWidth) / 2;
        const centerY = (parent.height - mapHeight) / 2;

        offset.current = {
            x: centerX,
            y: centerY,
        };
        updateTransform();
    }, [updateTransform]);

    useEffect(() => {
        const timeout = setTimeout(recenter, 100);
        return () => clearTimeout(timeout);
    }, [recenter]);

    return (
        <Box
            sx={{
                cursor: "move",
                background: theme.palette.background.default,
                borderRadius: 5,
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                userSelect: "none",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
        >
            <Box
                ref={containerRef}
                sx={{
                    position: "absolute",
                    width: "fit-content",
                    height: "fit-content",
                    willChange: "transform",
                    transformOrigin: "top left",
                }}
            >
                {children}
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    background: theme.palette.background.default,
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    boxShadow: 2,
                    fontSize: 14,
                    cursor: "pointer",
                    zIndex: 10,
                    "&:hover": {
                        background: theme.palette.primary.main,
                    },
                }}
                onClick={recenter}
            >
                Recenter
            </Box>
        </Box>
    );
};

interface DroppableGridCellProps {
    row: number;
    col: number;
}

const DroppableGridCell = ({row, col}: DroppableGridCellProps) => {
    const {setNodeRef} = useDroppable({id: `cell-${row}-${col}`});
    return <Box
        ref={setNodeRef} className="w-[100px] h-[100px]"
        sx={{
            border: "1px dashed",
            borderColor: color.PRIMARY,
            borderRadius: 5,
        }}
    />;
};
export default memo(RoomMap);
