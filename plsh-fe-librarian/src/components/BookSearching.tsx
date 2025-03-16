"use client";

import React, {ChangeEvent, memo, SyntheticEvent, useCallback, useEffect, useMemo, useState} from "react";
import {
    Autocomplete,
    AutocompleteInputChangeReason,
    Box, Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton, LinearProgress,
    TextField
} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {color} from "@/helpers/resources";
import {debounce} from "@mui/material/utils";
import WebcamScanner from "@/components/primary/WebcamScanner";
import {BookData} from "@/helpers/appType";
import {useGetBooksWithIsbnQuery} from "@/stores/slices/api/book.api.slice";
import {skipToken} from "@reduxjs/toolkit/query";
import Grid from "@mui/material/Grid2";
import {truncateMaxLineTextStyle, truncateTextStyle} from "@/style/text.style";
import {FaBarcode} from "react-icons/fa6";
import appStrings from "@/helpers/appStrings";
import {toast} from "sonner";

function SearchWithScanner({onResult}: { onResult?: (books: BookData) => void }) {
    const [isbn, setIsbn] = useState<string | undefined>(undefined);
    const {data} = useGetBooksWithIsbnQuery((isbn && isbn !== "") ? {
        isbn
    } : skipToken);

    useEffect(() => {
        if ((data && data.length === 0 && isbn)) {
            toast.warning(appStrings.book.NOT_BOOK_FOUND);
            setIsbn(undefined);
        } else if (isbn && data && data.length > 0) {
            onResult?.(data[0]);
            setIsbn(undefined);
        }
    }, [isbn, data, onResult]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (isbn && isbn !== "") {
            if (open) setOpen(false);
        }
    }, [isbn, open]);

    return (
        <Grid container spacing={1} width={"100%"} size={12} height={"fit-content"}>
            <Grid size={12} height={"fit-content"}>
                <Button fullWidth startIcon={<FaBarcode/>} onClick={() => setOpen(true)} variant="contained"
                        sx={{color: color.LIGHT_TEXT}}>
                    {appStrings.SCAN_BAR_CODE}
                </Button>
            </Grid>
            <Grid size={12}>
                <BookListHint onSelect={onResult}/>
            </Grid>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Quét mã ISBN</DialogTitle>
                <DialogContent style={{textAlign: "center"}}>
                    <WebcamScanner onScanSuccess={setIsbn}/>
                </DialogContent>
            </Dialog>
        </Grid>
    );
}

const BookListHint = memo(({onSelect}: { onSelect?: (book: BookData) => void }) => {
    const [query, setQuery] = useState<string>("");
    const {data, isLoading, error} = useGetBooksWithIsbnQuery((query || query !== "") ? {
        keyword: query
    } : skipToken);

    const debouncedSetInputChange = useMemo(
        () => debounce((value: string) => setQuery(value), 500), []);
    const onInputChange =
        useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            debouncedSetInputChange(e.currentTarget.value);
        }, [debouncedSetInputChange]);

    const onSelected = useCallback((result: BookData) => {
            onSelect?.(result);
        }, [onSelect])

    const listBook = useMemo(() => {
        if (data && data.length > 0)
            return (data.map(b => {
                return (<Box key={b.id} width="100%">
                    <ListItem alignItems="flex-start" onClick={() => {
                        onSelected(b)
                    }}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={b.thumbnail}/>
                        </ListItemAvatar>

                        <Grid width="100%" container>
                            <Grid size={12}>
                                <Typography
                                    component="span"
                                    variant="h6"
                                    sx={{
                                        color: color.DARK_TEXT,
                                        fontWeight: "bold",
                                        display: 'inline', ...truncateTextStyle
                                    }}
                                >
                                    {b.title}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography
                                    component="span"
                                    variant="h6"
                                    sx={{color: color.DARK_TEXT, display: 'inline'}}
                                >
                                    {b.publisher}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography sx={{fontSize: 12, color: color.DARK_LIGHTER_TEXT}}>
                                    {b.version}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography sx={{fontSize: 10, ...truncateMaxLineTextStyle(2)}}>
                                    {b.description}
                                </Typography>
                            </Grid>
                        </Grid>

                    </ListItem>
                    <Divider variant="inset" component="li"/>
                </Box>);
            }))
        return (
            <Box width="100%">
            </Box>)
    }, [data, onSelected]);
    return (
        <Grid container spacing={2} size={12} justifyContent={"start"}>
            <Grid size={12}>
                <TextField
                    onChange={onInputChange}
                    label="Nhập tìm kiếm hoặc quét mã..."
                    size="small"
                    fullWidth
                    variant="outlined"
                    autoComplete={"off"}
                />
            </Grid>
            <Grid size={12}>
                {
                    isLoading ? <LinearProgress/> : <></>
                }
                <List
                    sx={{width: '100%', maxHeight: 300, overflowY: 'auto'}}>
                    {listBook}
                </List>

            </Grid>

        </Grid>
    );
})
export default memo(SearchWithScanner);

// export default memo(SearchWithScanner);
