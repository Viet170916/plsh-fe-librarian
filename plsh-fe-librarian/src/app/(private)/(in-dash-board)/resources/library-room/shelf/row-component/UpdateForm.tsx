"use client";
import appStrings from "@/helpers/appStrings";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useSelector} from "@/hooks/useSelector";
import {useModifyRowInfoMutation} from "@/stores/slices/api/library-room.api.slice";
import {RowShelf, selectRowByIdInShelfStore, setValueInRow} from "@/stores/slices/lib-room-state/shelf.slice";
import {useAppStore} from "@/stores/store";
import Grid from "@mui/material/Grid2";
import React, {JSX, memo, useCallback} from "react";
import {shallowEqual} from "react-redux";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";
import {appToaster} from "@/components/primary/toaster";
import useFetchingToast from "@/hooks/useFetchingToast";

type UpdateFormProps = {
    rowId: number
}

function UpdateForm({rowId}: UpdateFormProps): JSX.Element {
    const dispatch = useAppDispatch();
    const store = useAppStore();
    const [modifyRowPut, {data, error, isLoading}] = useModifyRowInfoMutation();
    const getRowOnShelf = useCallback(() => {
        return selectRowByIdInShelfStore(store.getState(), rowId);
    }, [store, rowId]);
    const handleSaveChange = () => {
        const rowOnShelf = getRowOnShelf();
        if (rowOnShelf) {
            modifyRowPut(rowOnShelf);
        }
    };
    const onMaxColValid = useCallback((pre: RowShelf[keyof RowShelf], current: RowShelf[keyof RowShelf]) => {
            const rowOnShelf = getRowOnShelf();
            if (rowOnShelf) {
                const maxBookPosition = Math.max(...rowOnShelf.bookInstances.map((b) => b.position ?? 0), 0);
                if (!isNaN(current as RowShelf["maxCol"]) && current as RowShelf["maxCol"] > 0) {
                    if (rowOnShelf.maxCol < maxBookPosition + 1) {
                        appToaster.warning(appStrings.warning.OUT_OF_RANGE);
                    } else {
                        return true;
                    }
                }
            }
            return false;
        }
        , [getRowOnShelf]);
    useFetchingToast(data, error);

    return (
        <Grid container width={"100%"} spacing={1}>
            <RowFieldInput
                type={"maxCol"} rowId={rowId}
                onValid={onMaxColValid}
            />
            <RowFieldInput type={"name"} rowId={rowId}/>
            <RowFieldInput type={"description"} rowId={rowId}/>
            <NeumorphicButton loading={isLoading} onClick={handleSaveChange}>Lưu</NeumorphicButton>
        </Grid>
    );
}

const label: { [K in keyof RowShelf]?: string } = {
    maxCol: appStrings.shelf.COL_SIZE,
    name: appStrings.shelf.SHELF_NAME,
    description: appStrings.DESCRIPTION,
};
const RowFieldInput = memo(({rowId, type, onValid}: {
    rowId: number,
    type: keyof RowShelf,
    onValid?: <K extends keyof RowShelf>(value: RowShelf[K], newValue: RowShelf[K]) => boolean
}) => {
    const dispatch = useAppDispatch();
    const value = useSelector(state => selectRowByIdInShelfStore(state, rowId)?.[type], shallowEqual);
    return (
        <NeumorphicTextField
            label={label[type]}
            variant="outlined"
            type={type === "maxCol" ? "number" : "text"}
            size="small"
            value={value ?? ""}
            onChange={(e) => {
                if (!onValid || onValid(value, type === "maxCol" ? Number(e.target.value) : e.target.value))
                    dispatch(setValueInRow({
                        rowId,
                        key: type,
                        value: type === "maxCol" ? Number(e.target.value) : e.target.value
                    }));
            }}
        />
    );
});
export default memo(UpdateForm);

