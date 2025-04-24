"use client"
import React, {memo} from "react";
import {motion, MotionStyle} from "framer-motion";
import {NEUMORPHIC_COLORS, NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import {IconButton, Tooltip} from "@mui/material";
import {Property} from "csstype";
import {TbDragDrop} from "react-icons/tb";
import {gridSize} from "@/app/(private)/(in-dash-board)/resources/library-room/(page)/room";
import {useTheme} from "@mui/material/styles";
import Transform = Property.Transform;


const ItemType = {
    SHELF_SMALL: "SHELF_SMALL",
    SHELF_LARGE: "SHELF_LARGE",
    DESK: "DESK",
    CHAIR: "CHAIR",
    WALL: "WALL",
    DOOR: "DOOR",
    LIBRARIAN_DESK: "LIBRARIAN_DESK",
};

export const itemDimensions: ItemDimensions = {
    SHELF_SMALL: {w: 8, h: 2, color: NEUMORPHIC_COLORS.GREY_LIGHT_1, name: "kệ nhỏ"},
    SHELF_LARGE: {w: 15, h: 3, color: NEUMORPHIC_COLORS.GREY_LIGHT_1, name: "kệ lớn"},
    CHAIR: {w: 2, h: 1, color: NEUMORPHIC_COLORS.GREY_LIGHT_1, name: "ghế"},
    DESK: {w: 8, h: 4, color: NEUMORPHIC_COLORS.GREY_LIGHT_1, name: "bàn"},
    LIBRARIAN_DESK: {w: 4, h: 2, color: NEUMORPHIC_COLORS.GREY_LIGHT_1, name: "bàn thủ thư"},
    DOOR: {w: 4, h: 1, color: NEUMORPHIC_COLORS.GREY_LIGHT_1, name: "cửa"},
    WALL_LENGTH: {w: 50, h: 1, color: NEUMORPHIC_COLORS.GREY_LIGHT_1, name: "tường"},
    WALL_WIDTH: {w: 1, h: 40, color: NEUMORPHIC_COLORS.GREY_LIGHT_1, name: "tường"},
};
export type Dimension = {
    w: number, h: number, color: string, name: string,
}
export type ItemDimensions = {
    // AWALL: Dimension,
    SHELF_SMALL: Dimension,
    SHELF_LARGE: Dimension,
    CHAIR: Dimension,
    DESK: Dimension,
    LIBRARIAN_DESK: Dimension,
    DOOR: Dimension,
    WALL_LENGTH: Dimension,
    WALL_WIDTH: Dimension,
}
export  type Item =
    {
        name?: string;
        id: number,
        type: keyof ItemDimensions,
        x: number,
        y: number,
        x1?: number,
        x2?: number,
        y1?: number,
        y2?: number,
        angle: number,
        rootX: number,
        rootY: number
    }


export const getItemBounds = (item: Item) => {
    const dim = itemDimensions[item.type] || {w: 1, h: 1};
    const angle = item.angle % 360;
    const rotated = angle === 90 || angle === 270;
    const width = rotated ? dim.h : dim.w;
    const height = rotated ? dim.w : dim.h;
    return {width, height};
};

const getItemStyle = (item: Item, selected: boolean): MotionStyle => {
    const {width, height} = getItemBounds(item);
    let background = itemDimensions[item.type].color;
    // if (item.type === ItemType.LIBRARIAN_DESK) background = '#ffe082';
    if (selected) background = NEUMORPHIC_COLORS.PRIMARY;

    return {
        position: 'absolute',
        top: item.y * gridSize,
        left: item.x * gridSize,
        width: width * gridSize,
        height: height * gridSize,
        transformOrigin: 'top left',
        transform: `rotate(${item.angle}deg)`,
        background,
        cursor: 'pointer',
        borderRadius: 8,
        boxShadow: NEUMORPHIC_SHADOW.SHADOW()
    };
};

const ItemComponent = ({item, selected = false, onClick, onMouseDown}: {
    item: Item,
    selected: boolean,
    onClick: (id: number) => void,
    onMouseDown: (e: React.MouseEvent) => void
}) => {
    const theme = useTheme();
    if (item.type === ItemType.WALL) {
        const x1 = (item.x1 ?? 0) * gridSize;
        const y1 = (item.y1 ?? 0) * gridSize;
        const x2 = (item.x2 ?? 0) * gridSize;
        const y2 = (item.y2 ?? 0) * gridSize;
        const width = Math.abs(x2 - x1) || 2;
        const height = Math.abs(y2 - y1) || 2;
        const top = Math.min(y1, y2);
        const left = Math.min(x1, x2);
        return (
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(item.id);
                }}
                style={{
                    position: 'absolute',
                    top,
                    left,
                    width,
                    height,
                    background: '#616161',
                    border: selected ? '2px solid #90caf9' : '1px solid #9e9e9e'
                }}
            />
        );
    }
    const style: MotionStyle = getItemStyle(item, selected);
    return (
        <motion.div
            onClick={(e) => {
                if (item.type === "WALL_LENGTH" || item.type === "WALL_WIDTH") {
                    return
                } else {
                    e.stopPropagation();

                    onClick(item.id);
                }
            }}
            style={{...style, transform: "none", display: "flex", justifyContent: "center", alignItems: "center"}}
        >
            <Tooltip title={"Kéo thả đẻ di chuyển"}>
                <IconButton
                    sx={{position: "absolute", top: -7, left: -7, width: 30, height: 30}}
                    onMouseDown={(e) => {
                        if (item.type === "WALL_LENGTH" || item.type === "WALL_WIDTH") {
                            return
                        } else {
                            e.stopPropagation();
                            onMouseDown(e);
                        }
                    }}><TbDragDrop/></IconButton>
            </Tooltip>

            <div style={{
                display: "flex",
                flexWrap: "nowrap",
                whiteSpace: "nowrap",
                // overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "center",
                color: theme.palette.text.primary,
                transform: style.transform as Transform,
                // backgroundImage: `url('images/bookshelf.png')`,
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
                // backgroundRepeat: 'no-repeat',
                // overflow: "hidden",
            }}>
                {item.name ?? itemDimensions[item.type].name}
            </div>
        </motion.div>
    );
};

export default memo(ItemComponent);

