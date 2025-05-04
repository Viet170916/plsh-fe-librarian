"use client"
import React, {JSX, memo, useCallback, useEffect, useMemo, useState} from "react";
import {Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useLazyGetCategoriesQuery} from "@/stores/slices/api/book.api.slice";
import {debounce} from "@mui/material/utils";
import StarRating from "@/components/primary/StarRating";
import Grid from "@mui/material/Grid2";
import {Category} from "@/stores/slices/book-states/book.add-edit.slice";
import appStrings from "@/helpers/appStrings";
import AppChip from "@/components/primary/display/AppChip";
import {color} from "@/helpers/resources";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setPropToBookState} from "@/stores/slices/book-states/book.slice";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";

const Gens = memo(({category, onSelect}: { category: Category[], onSelect: (selected: Category[]) => void }) => {
    const [getCategories, {data, error, isFetching}] = useLazyGetCategoriesQuery();

    const [keyword, setKeyword] = useState<string>("");
    useEffect(() => {
        getCategories({keyword});
    }, [keyword, getCategories]);
    const debouncedSetKeyWord = useMemo(
        () => debounce((value: string) =>
            setKeyword(value), 300), []
    );
    const onInputChange =
        useCallback((value?: string) => {
            debouncedSetKeyWord(value ?? "");
        }, [debouncedSetKeyWord]);
    return (
        <Autocomplete
            disablePortal
            value={category}
            multiple
            size={"small"}
            limitTags={2}
            loading={isFetching}
            onChange={(_, category) => onSelect(category ?? [])}
            getOptionLabel={(option) => `${option?.name ?? ""}`}
            renderTags={(value: Category[], getTagProps) =>
                value.map((option: Category, index: number) => (
                    <AppChip sx={{borderColor: color.FOUR, color: color.FOUR}} variant="outlined"
                             label={option.name} {...getTagProps({index})} key={option.id}/>
                ))
            }
            renderOption={({key, ..._}, option: Category) => {
                return (
                    <Grid key={`${option.id}-${option.name}`} {..._} padding={"0 10px"} component={"li"} container>
                        <Grid size={"grow"}>{option.name}</Grid><Grid size={3}></Grid>
                    </Grid>);
            }}
            onInputChange={(_, value) => onInputChange(value)}
            options={data?.map(c => c) ?? []}
            sx={{minWidth: 200, maxWidth: 400}}
            renderInput={(params) => <NeumorphicTextField {...params}
                                                          maxRows={1}
                                                          label={appStrings.book.CATEGORY}
            />}
        />)
})

function Filter(): JSX.Element {
    const dispatch = useAppDispatch();
    const [keyword, setKeyword] = React.useState('')
    const [selectedGenres, setSelectedGenres] = React.useState<Category[]>([])
    const [selectedRating, setSelectedRating] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (keyword !== '' || selectedGenres.length > 0 || selectedRating) {
            dispatch(setPropToBookState({
                key: "booksFilter",
                value: {
                    keyword,
                    categories: selectedGenres.map(c => c.name ?? "") ?? [],
                    rating: selectedRating ?? undefined,
                    limit: 18,
                    page: 1,
                    orderBy: "createDate",
                    descending: true
                }
            }))
        }
    }, [keyword, selectedGenres, selectedRating, dispatch])
    const debouncedSetKeyWord = useMemo(
        () => debounce((value: string) =>
            setKeyword(value), 300), []);
    const onInputChange =
        useCallback((value?: string) => {
            debouncedSetKeyWord(value ?? "");
        }, [debouncedSetKeyWord]);

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            alignItems="center"
            sx={{my: .3}}
        >
            <NeumorphicTextField
                label="Tìm kiếm"
                variant="outlined"
                onChange={(e) => onInputChange(e.target.value)}
                size="small"
                sx={{minWidth: 200}}
            />
            <Gens category={selectedGenres} onSelect={setSelectedGenres}/>
            <Autocomplete
                options={[5, 4, 3, 2, 1]}
                getOptionLabel={(option) => `${option} sao`}
                value={selectedRating}
                onChange={(event, newValue) => setSelectedRating(newValue)}
                renderOption={(props, option) => (
                    <Box component="li" {...props} key={option}>
                        <StarRating value={option} readOnly size="small"/>
                    </Box>
                )}
                renderInput={(params) => <NeumorphicTextField {...params} label="Đánh giá" size="small"/>}
                isOptionEqualToValue={(option, value) => option === value}
                sx={{minWidth: 200}}
            />
            {/*<SupportSelector onSelect={(isEBook) => dispatch(dispatch(setPropToBookState({*/}
            {/*    key: "booksFilter", value: isEBook,*/}
            {/*})))}/>*/}
        </Box>
    )
}


type SupportType = 'all' | 'ebook' | 'audiobook';

interface SupportSelectorProps {
    onSelect: (isSupported: boolean) => void;
    label?: string;
}

export const SupportSelector: React.FC<SupportSelectorProps> = ({onSelect, label = 'Hỗ trợ'}) => {
    const [selectedType, setSelectedType] = React.useState<SupportType>('all');

    const handleChange = (event: SelectChangeEvent<SupportType>) => {
        const value = event.target.value as SupportType;
        setSelectedType(value);
        onSelect(value !== 'all');
    };

    return (
        <FormControl fullWidth variant="outlined" sx={{minWidth: 250}}>
            <InputLabel id="support-select-label">{label}</InputLabel>
            <Select
                labelId="support-select-label"
                id="support-select"
                value={selectedType}
                onChange={handleChange}
                label={label}
            >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="ebook">Hỗ trợ sách điện tử/Sách nói</MenuItem>
                {/*<MenuItem value="audiobook"></MenuItem>*/}
            </Select>
        </FormControl>
    );
};

export default memo(Filter);
