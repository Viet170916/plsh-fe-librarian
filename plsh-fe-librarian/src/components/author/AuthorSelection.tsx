"use client"
import React, {memo, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Autocomplete, AutocompleteInputChangeReason, Box, List, TextField} from "@mui/material";
import {debounce} from '@mui/material/utils';
import {useGetAuthorQuery} from "@/stores/slices/api/author.api.slice";
import Grid from "@mui/material/Grid2";
import Typography from "@/components/primary/typography";
import appStrings from "@/helpers/appStrings";
import {Author} from "@/helpers/appType";
import Image from "next/image";
import {width} from "@mui/system";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import {formatImageUrl} from "@/helpers/text";

interface IProps {
    children?: React.ReactNode;
    onSelected?: (author?: Author | null) => void;
}

function AuthorSelection(props: IProps) {
    const [keyWord, setKeyWord] = useState<string>("");
    const debouncedSetKeyWord = useMemo(
        () => debounce((value: string) => setKeyWord(value), 500), []);
    const onInputChange =
        useCallback((e: SyntheticEvent<Element, Event>, value: string, reason: AutocompleteInputChangeReason) => {
            debouncedSetKeyWord(value)
        }, [debouncedSetKeyWord]);
    const {data, error, isLoading, refetch} = useGetAuthorQuery({keyword: keyWord}, {});
    const errorMessageComp = useMemo(() => {
        if (error) {
            return (<Typography variant="body2"
                                color="textSecondary">{appStrings.error.AUTHOR_REQUEST_ERROR}
            </Typography>)
        }
    }, [error])
    useEffect(() => {
        refetch();
    }, [keyWord, refetch]);
    return (
        <Grid container spacing={2}>
            {errorMessageComp}
            <Autocomplete
                onChange={(e, author) => {
                    props.onSelected?.(author);
                }}
                id="country-select-demo"
                sx={{width: 300}}
                options={data ?? []}
                autoHighlight
                loading={isLoading}
                onInputChange={onInputChange}
                getOptionLabel={(author) => author.fullName ?? ""}
                renderOption={(props, author: Author) => {
                    const {key, ...optionProps} = props;
                    console.log()
                    return (
                        <Box
                            key={key}
                            component="li"
                            sx={{'& > img': {mr: 2, flexShrink: 0}}}
                            {...optionProps}
                        >
                            <div style={{
                                width: 20,
                                height: 20,
                                position: "relative"
                            }}>
                                <ImageWithBgCover src={formatImageUrl(author.avatarUrl)}/>
                            </div>
                            {author.fullName}
                            {`${author.birthYear ? `,${author.birthYear}` : ""}${author.deathYear ? `-${author.deathYear}` : ""}`}
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        autoComplete={"off"}
                        label="Choose an Author"
                        slotProps={{
                            htmlInput: {
                                ...params.inputProps,
                            },
                        }}
                    />
                )}
            />
        </Grid>

    );
}

export default memo(AuthorSelection);