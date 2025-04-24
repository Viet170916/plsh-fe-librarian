import appStrings from "@/helpers/appStrings";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useGetCategoriesQuery} from "@/stores/slices/api/book.api.slice";
import {Category, setValueInBookBaseInfo} from "@/stores/slices/book-states/book.add-edit.slice";
import {RootState} from "@/stores/store";
import {Autocomplete, Checkbox, Tooltip} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {debounce} from "@mui/material/utils";
import React, {memo, useCallback, useMemo, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";

export const NewCategoryEdit = memo(() => {
    const dispatch = useDispatch();
    const newCategory = useSelector((state: RootState) => state.addEditBookData.baseInfo.newCategory, shallowEqual);
    return (
        <Grid container direction="row" spacing={2}>
            <Grid size={"grow"}>
                <NeumorphicTextField
                    fullWidth sx={{mt: 1}}
                    value={newCategory?.name ?? ""}
                    onChange={(e) => {
                        dispatch(setValueInBookBaseInfo({
                            key: "newCategory",
                            value: {...newCategory, name: e.target.value},
                        }));
                    }}
                    disabled={!newCategory?.chosen}
                    size={"small"}
                    label={appStrings.book.NEW_CATEGORY}
                />
            </Grid>
            <Tooltip title={appStrings.guide.NEW_CATEGORY_CHOSEN}>
                <Checkbox
                    checked={newCategory?.chosen ?? false} onChange={(_, value) =>
                    dispatch(setValueInBookBaseInfo({
                        key: "newCategory",
                        value: {...newCategory, chosen: value},
                    }))}
                />
            </Tooltip>
        </Grid>
    );
});
export const CategoryEdit = memo(() => {
    const [keyword, setKeyword] = useState("");
    const dispatch = useAppDispatch();
    const {data, isLoading} = useGetCategoriesQuery({keyword}, {refetchOnReconnect: true});
    const debouncedSetKeyWord = useMemo(
        () => debounce((value: string) => setKeyword(value), 300), []);
    const onInputChange =
        useCallback((value?: string) => {
            debouncedSetKeyWord(value ?? "");
        }, [debouncedSetKeyWord]);
    const onSelect = function (category?: Category) {
        dispatch(setValueInBookBaseInfo({key: "category", value: category}));
    };
    const category = useSelector((state: RootState) => state.addEditBookData.baseInfo.category, shallowEqual);
    const newCategoryIsChosen = useSelector((state: RootState) => state.addEditBookData.baseInfo.newCategory?.chosen, shallowEqual);
    return (
        <Autocomplete
            disabled={newCategoryIsChosen}
            disablePortal
            value={category}
            fullWidth
            size={"small"}
            loading={isLoading}
            onChange={(_, category) => onSelect(category ?? undefined)}
            getOptionLabel={(option) => `${option?.name ?? ""}`}
            renderOption={({key, ..._}, option: Category) => {
                return (
                    <Grid key={`${option.id}-${option.name}`} {..._} padding={"0 10px"} component={"li"} container>
                        <Grid size={"grow"}>{option.name}</Grid><Grid size={3}></Grid>
                    </Grid>);
            }}
            onInputChange={(_, value) => onInputChange(value)}
            options={data ?? []}
            sx={{mt: 1}}
            renderInput={(params) => <NeumorphicTextField {...params}
                                                label={appStrings.book.CATEGORY}
            />}
        />
    );
});
