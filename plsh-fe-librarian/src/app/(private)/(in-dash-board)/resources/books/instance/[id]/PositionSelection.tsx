"use client"
import React, {memo, useEffect, useState, useMemo} from "react";
import {CircularProgress, MenuItem} from "@mui/material";
import {
    useLazyGetRowsSelectionQuery,
    useLazyGetShelvesSelectionQuery
} from "@/stores/slices/api/library-room.api.slice";
import Grid from "@mui/material/Grid2";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import appStrings from "@/helpers/appStrings";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";
import {useSelector} from "@/hooks/useSelector";
import {useModifyBookInstancesMutation} from "@/stores/slices/api/book.api.slice";
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";
import useFetchingToast from "@/hooks/useFetchingToast";

function PositionSelector() {
    const currentBookInstance = useSelector(state => state.bookInstanceState.currentBookInstance);
    const [getShelve, {data: shelvesData, isFetching}] = useLazyGetShelvesSelectionQuery()
    const [getRows, {data: rowShelvesData, isFetching: isRowsFetching}] = useLazyGetRowsSelectionQuery()
    const [modifyPosition, {data: modifyData, isLoading, error}] = useModifyBookInstancesMutation()

    const [selectedShelfId, setSelectedShelfId] = useState<number | null>(null);
    const [selectedRowShelfId, setSelectedRowShelfId] = useState<number | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

    useFetchingToast(modifyData, error);
    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);


    const shelves = useMemo(() => shelvesData?.data ?? [], [shelvesData?.data]);
    const rowShelves = useMemo(() => rowShelvesData?.data ?? [], [rowShelvesData?.data]);

    useEffect(() => {
        getShelve({});
    }, [getShelve]);

    useEffect(() => {
        if (selectedShelfId !== null) {
            getRows({shelfId: selectedShelfId});
        }
    }, [selectedShelfId, getRows]);

    useEffect(() => {
        if (rowShelves.length > 0) {
            setSelectedRowShelfId(rowShelves[0].id);
            setSelectedPosition(rowShelves[0].emptyPositions?.[0] ?? null);
        } else {
            setSelectedRowShelfId(null);
            setSelectedPosition(null);
        }
    }, [rowShelvesData, rowShelves]);

    useEffect(() => {
        const selectedRowShelf = rowShelves.find(row => row.id === selectedRowShelfId);
        if (selectedRowShelf) {
            setSelectedPosition(selectedRowShelf.emptyPositions?.[0] ?? null);
        } else {
            setSelectedPosition(null);
        }
    }, [selectedRowShelfId, rowShelves]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(134253647)
        if (currentBookInstance?.id && selectedPosition != null && selectedRowShelfId)
            modifyPosition({id: currentBookInstance.id, position: selectedPosition, rowShelfId: selectedRowShelfId})
    };
    return (
        <Grid gap={2} width={"100%"} component="form" container onSubmit={handleSubmit}>
            <Grid size={3} container gap={1} alignItems="center">
                <Grid width={15}>
                    {isFetching && <CircularProgress size={15}/>}
                </Grid>
                <Grid size="grow">
                    <NeumorphicTextField
                        select
                        fullWidth
                        size="small"
                        label="Chọn kệ"
                        value={selectedShelfId ?? ""}
                        onChange={(e) => setSelectedShelfId(Number(e.target.value))}
                        disabled={isFetching}
                    >
                        {shelves.map((shelf) => (
                            <MenuItem key={shelf.id} value={shelf.id}>
                                {shelf.name}
                            </MenuItem>
                        ))}
                    </NeumorphicTextField>
                </Grid>
            </Grid>

            <Grid size={3} container gap={1} alignItems="center">
                <Grid width={15}>
                    {isRowsFetching && <CircularProgress size={15}/>}
                </Grid>
                <Grid size="grow">
                    <NeumorphicTextField
                        select
                        fullWidth
                        size="small"
                        label="Chọn dãy kệ"
                        value={selectedRowShelfId ?? ""}
                        onChange={(e) => setSelectedRowShelfId(Number(e.target.value))}
                        disabled={!selectedShelfId || isRowsFetching}
                    >
                        {rowShelves.map((row) => (
                            <MenuItem key={row.id} value={row.id}>
                                {row.name}
                            </MenuItem>
                        ))}
                    </NeumorphicTextField>
                </Grid>
            </Grid>

            <Grid size={3} container>
                <NeumorphicTextField
                    select
                    fullWidth
                    size="small"
                    label="Chọn vị trí trống"
                    value={selectedPosition ?? ""}
                    onChange={(e) => setSelectedPosition(Number(e.target.value))}
                    disabled={!selectedRowShelfId || isRowsFetching}
                >
                    {(rowShelves.find(row => row.id === selectedRowShelfId)?.emptyPositions ?? []).map((pos) => (
                        <MenuItem key={pos} value={pos}>
                            {`Ngăn ${pos}`}
                        </MenuItem>
                    ))}
                </NeumorphicTextField>
            </Grid>
            <NeumorphicButton
                loading={isLoading}
                disabled={!selectedRowShelfId || selectedPosition == null}
                variant_2="primary"
                type="submit"
                size="small"
                color="success"
            >
                {appStrings.SAVE}
            </NeumorphicButton>
        </Grid>
    );
}

export default memo(PositionSelector);
