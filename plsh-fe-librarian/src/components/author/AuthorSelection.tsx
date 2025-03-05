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
    const {data, error, isLoading, refetch} = useGetAuthorQuery({keyWord}, {});
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
                options={data?.data ?? []}
                autoHighlight
                loading={isLoading}
                onInputChange={onInputChange}
                getOptionLabel={(author) => author.name ?? ""}
                renderOption={(props, author) => {
                    const {key, ...optionProps} = props;
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
                                <Image
                                    loading="lazy"
                                    fill
                                    // srcSet={`${author.avatarUrl}`}
                                    src={`${author.avatarUrl}`}
                                    alt={author.name ?? ""}
                                />
                            </div>
                            {author.name},
                            ({`${author.lifeSpan?.birthYear}${author.lifeSpan?.deadYear ? `-${author.lifeSpan?.deadYear}` : ""}`})
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Choose an Author"
                        slotProps={{
                            htmlInput: {
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            },
                        }}
                    />
                )}
            />
        </Grid>

    );
}

export default memo(AuthorSelection);