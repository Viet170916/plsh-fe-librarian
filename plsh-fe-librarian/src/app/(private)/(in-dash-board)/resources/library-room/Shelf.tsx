"use client"
import React, {memo, useCallback, useState} from "react";
import {Card, Dialog, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {Shelf} from "@/app/(private)/(in-dash-board)/resources/library-room/RoomMap";
import {motion} from "framer-motion";
import {useDraggable} from "@dnd-kit/core";
import {color} from "@/helpers/resources";
import Grid from "@mui/material/Grid2";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import appStrings from "@/helpers/appStrings";
import {truncateTextStyle} from "@/style/text.style";
import {modifyShelf, removeShelf} from "@/stores/slices/lib-room-state/lib-room.slice";
import {useAppStore} from "@/stores/store";
import {useRouter} from "next/navigation";
import {apiIsShelfExisted} from "@/request/library-room.api";
import {toast} from "sonner";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";

interface DraggableShelfProps {
    shelf: Shelf;
    gridSize: number;
}

const DraggableShelf = ({shelf}: DraggableShelfProps) => {
    const gridSize = 100;
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id: shelf.id});

    return (
        <motion.div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="absolute flex items-center gap-2"
            style={{
                padding: 12,
                width: gridSize,
                height: gridSize,
                left: shelf.x * gridSize,
                top: shelf.y * gridSize,
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "none",
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
            }}
        >
            <Card classes={"shadow-md"} sx={{
                "&:active": {
                    cursor: "grabbing",
                },
                cursor: "grab",
                borderRadius: 5,
                backgroundColor: color.PRIMARY,
                width: "100%",
                height: "100%",
            }}>
                <Tooltip title={shelf.label}>
                    <IconButton size="small"
                                sx={{
                                    position: "absolute", top: -2, left: -2,
                                    backgroundColor: color.WHITE,
                                }}>
                        <BookmarkIcon/>
                    </IconButton>
                </Tooltip>
                <Grid sx={{width: "100%", height: "50%", padding: 1.3}} container spacing={2}
                      justifyContent="end" alignItems="end">
                    <Typography sx={{fontSize: 10, color: color.LIGHT_TEXT, ...truncateTextStyle}}>
                        {shelf.name}
                    </Typography>
                </Grid>
                <Menu2 shelfId={shelf.id}/>

            </Card>

        </motion.div>
    );
};
const Menu2 = memo(function Menu2({shelfId}: { shelfId: number }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    function handleRemove() {
        dispatch(removeShelf(shelfId));
        handleClose();

    }

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);
    const [openEdit, setOpenEdit] = useState<boolean>(false);

    function handleOpenEdit(e: React.MouseEvent) {
        setOpenEdit(true);
        handleClose();
    }

    function handleCloseEdit() {
        setOpenEdit(false);
    }

    async function handleRedirectToShelf() {
        handleClose();
        try {
            const response = await apiIsShelfExisted({shelfId: shelfId});
            if (response.data.exists) {
                router.push(`/resources/library-room/shelf/${shelfId}`);
            } else {
                toast.warning(appStrings.warning.YOU_NEED_TO_SAVE_FIRST);
            }
        } catch (error) {
            toast.warning(appStrings.error.REQUEST_ERROR);
        }


    }

    return (
        <Grid width={"100%"} container justifyContent={"center"} alignItems={"center"}
              onPointerDown={(e) => {
                  e.stopPropagation();
              }}>
            <NeumorphicButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onPointerUp={handleClick}
                autoCapitalize={"off"}
                sx={{backgroundColor: color.WHITE,}}
            >
                <Typography sx={{color: color.PRIMARY, fontSize: 9}}>
                    {appStrings.ACTION}
                </Typography>
            </NeumorphicButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button',
                    }
                }}>
                <MenuItem onPointerUp={handleRedirectToShelf}>
                    {appStrings.book.SEE_BOOK}
                </MenuItem>
                <MenuItem onPointerUp={handleOpenEdit}>{appStrings.EDIT}</MenuItem>
                <MenuItem onPointerUp={handleRemove}>{appStrings.REMOVE}</MenuItem>

            </Menu>
            <Dialog open={openEdit} onClose={handleCloseEdit} sx={{borderRadius: 5}}>
                <AddEditShelf shelfId={shelfId} onClose={handleCloseEdit}/>
            </Dialog>

        </Grid>
    )
});


const AddEditShelf = memo(function AddEditShelf({shelfId, onClose}: {
    shelfId: number,
    onClose: (e?: React.MouseEvent) => void
}) {
    const dispatch = useDispatch();
    const state = useAppStore();
    const shelf = state.getState().libraryRoomState.shelves.find(s => s.id === shelfId);
    const {register, handleSubmit} = useForm<Shelf>();
    const [openEdit, setOpenEdit] = useState<boolean>(false);

    function saveShelf(data: Shelf) {
        dispatch(modifyShelf({...data, id: shelfId}));
        onClose();
    }

    return (
        <form onSubmit={handleSubmit(saveShelf)} style={{width: 400, height: 300, borderRadius: 10}}>
            <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
                <Grid size={12} spacing={2} container padding={4}>
                    <NeumorphicTextField fullWidth defaultValue={shelf?.name}
                                         label={appStrings.shelf.SHELF_NAME} {...register("name")}/>
                    <NeumorphicTextField fullWidth defaultValue={shelf?.label}
                                         label={appStrings.shelf.SHELF_LABEL} {...register("label")}/>
                    <NeumorphicButton type="submit" variant="contained" sx={{color: color.LIGHT_TEXT}}>
                        {appStrings.SAVE}
                    </NeumorphicButton>
                    <NeumorphicButton onPointerUp={onClose}>{appStrings.CLOSE}</NeumorphicButton>
                </Grid>
            </Grid>

        </form>


    )

})


export default memo(DraggableShelf);
