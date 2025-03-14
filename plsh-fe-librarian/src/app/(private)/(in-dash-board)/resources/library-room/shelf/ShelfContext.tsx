"use client"
import React, {memo, useEffect} from "react";
import Grid from "@mui/material/Grid2";
import {RowShelf as RowShelfType, setShelfState, ShelfState} from "@/stores/slices/lib-room-state/shelf.slice";
import RowShelf from "@/app/(private)/(in-dash-board)/resources/library-room/shelf/RowShelf";
import {useDispatch, useSelector} from "react-redux";
import {RootState, useAppStore} from "@/stores/store";

interface IProps {
    data?: ShelfState
}

function ShelfContext({data}: IProps) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setShelfState(data))
    }, [data, dispatch]);
    const shelf = useSelector((state: RootState) => state.shelfState)
    return (
        <Grid container spacing={2} width={"100%"} size={12}>
            {
                shelf.rowShelves?.map(row => (
                    <RowShelf rowId={row.id} key={row.id}/>
                ))
            }
        </Grid>);
}

export default memo(ShelfContext);