"use client"
import React, {ChangeEvent, memo, SyntheticEvent, useCallback, useEffect, useMemo, useState} from "react";
import {
    Autocomplete,
    AutocompleteInputChangeReason,
    Box,
    ListItemAvatar,
    Chip,
    List,
    ListItem,
    Stack,
    LinearProgress,
    TextField, Divider, ListItemText, Checkbox
} from "@mui/material";
import {debounce} from '@mui/material/utils';
import {useGetAuthorQuery} from "@/stores/slices/api/author.api.slice";
import Grid from "@mui/material/Grid2";
import Typography from "@/components/primary/typography";
import appStrings from "@/helpers/appStrings";
import {Author} from "@/helpers/appType";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import {RootState, useAppStore} from "@/stores/store";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "@mui/material/Avatar";
import {ProgressBar} from "@react-pdf-viewer/core";
import {truncateTextStyle} from "@/style/text.style";
import {color} from "@/helpers/resources";
import {addAuthor, deleteAuthor, toggleAuthor} from "@/stores/slices/book-states/book.add-edit.slice";

interface IProps {
    children?: React.ReactNode;
    onSelected?: (authors?: Author[] | null) => void;
}

function AuthorSelection(props: IProps) {
    const addEditAuthors = useSelector((state: RootState) => state.addEditBookData.authors);
    const dispatch = useDispatch();

    function onDelete(author: Author) {
        dispatch(deleteAuthor(author));
    }

    return (
        <Grid container spacing={2} size={12} width={"100%"}>
            <Stack direction="row" spacing={1} sx={{overflowX: "auto"}}>
                {
                    addEditAuthors.map((author: Author) => (
                        <Chip key={author.id}
                              avatar={<Avatar alt={author.fullName} src={author.avatarUrl}/>}
                              label={author.fullName}
                              variant="outlined"
                              onDelete={() => onDelete(author)}
                        />
                    ))
                }
            </Stack>
            <SelectList/>
        </Grid>

    );
}

const SelectList = memo(({}: {}) => {
    const store = useAppStore();
    const dispatch = useDispatch();

    function getAuthors() {
        return store.getState().addEditBookData.authors;
    }

    function handleToggle(value: Author) {
        dispatch(toggleAuthor(value));
    }

    const [keyWord, setKeyWord] = useState<string>("");
    const debouncedSetKeyWord = useMemo(
        () => debounce((value: string) => setKeyWord(value), 500), []);
    const onInputChange =
        useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            debouncedSetKeyWord(e.target.value);
        }, [debouncedSetKeyWord]);
    const {data, error, isLoading} = useGetAuthorQuery({keyword: keyWord}, {});
    const listAuthor = useMemo(() => {
        return data?.map((author) => (
            <Box width={"100%"} key={author.id}>
                <ListItem alignItems="flex-start" sx={{width: "100%"}}
                          secondaryAction={
                              <Checkbox
                                  edge="end"
                                  onChange={() => handleToggle(author)}
                                  defaultChecked={getAuthors().map((authorS) => authorS.id).includes(author.id)}
                              />
                          }
                >
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={author.avatarUrl}/>
                    </ListItemAvatar>
                    <Typography
                        variant="h6"
                        sx={{color: color.DARK_TEXT, fontWeight: "bold", display: 'inline', ...truncateTextStyle}}
                    >
                        {author.fullName}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{color: color.DARK_TEXT, display: 'inline', ...truncateTextStyle}}
                    >
                        {author.birthYear ? `${", " + author.birthYear}` : ""}
                    </Typography>
                </ListItem>
                <Divider variant="inset" component="li"/>
            </Box>
        ));
    }, [data]);
    return (
        <Box width={"100%"}>
            <TextField fullWidth onChange={onInputChange}/>
            {isLoading ? <LinearProgress/> : <></>}
            <List sx={{width: '100%', maxWidth: 360, overflowY: "auto", height: 500}}>
                {listAuthor}
            </List>
        </Box>


    )
})

export default memo(AuthorSelection);