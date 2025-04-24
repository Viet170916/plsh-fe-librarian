"use client"
import React, {ChangeEvent, memo, useCallback, useMemo, useState} from "react";
import {Box, Checkbox, Chip, Divider, LinearProgress, List, ListItem, ListItemAvatar, Stack} from "@mui/material";
import {debounce} from '@mui/material/utils';
import {useGetAuthorQuery} from "@/stores/slices/api/author.api.slice";
import Grid from "@mui/material/Grid2";
import Typography from "@/components/primary/typography";
import {Author} from "@/helpers/appType";
import {RootState, useAppStore} from "@/stores/store";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "@mui/material/Avatar";
import {truncateTextStyle} from "@/style/text.style";
import {deleteAuthor, toggleAuthor} from "@/stores/slices/book-states/book.add-edit.slice";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";

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

const SelectList = memo(() => {
    const store = useAppStore();
    const dispatch = useDispatch();


    const handleToggle = useCallback((value: Author) => {
        dispatch(toggleAuthor(value));
    }, [dispatch])

    const [keyWord, setKeyWord] = useState<string>("");
    const debouncedSetKeyWord = useMemo(
        () => debounce((value: string) => setKeyWord(value), 500), []);
    const onInputChange =
        useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            debouncedSetKeyWord(e.target.value);
        }, [debouncedSetKeyWord]);
    const {data, error, isLoading} = useGetAuthorQuery({keyword: keyWord}, {});
    const listAuthor = useMemo(() => {
        function getAuthors() {
            return store.getState().addEditBookData.authors;
        }

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
                        <Avatar alt={author.fullName} src={author.avatarUrl}/>
                    </ListItemAvatar>
                    <Typography
                        color={"text.primary"}
                        variant="h6"
                        sx={{fontWeight: "bold", display: 'inline', ...truncateTextStyle}}
                    >
                        {author.fullName}
                    </Typography>
                    <Typography
                        color={"text.primary"}
                        variant="h6"
                        sx={{display: 'inline', ...truncateTextStyle}}
                    >
                        {author.birthYear ? `${", " + author.birthYear}` : ""}
                    </Typography>
                </ListItem>
                <Divider variant="inset" component="li"/>
            </Box>
        ));
    }, [data, store, handleToggle]);
    return (
        <Box width={"100%"}>
            <NeumorphicTextField fullWidth onChange={onInputChange}/>
            {isLoading ? <LinearProgress/> : <></>}
            <List sx={{width: '100%', maxWidth: 360, overflowY: "auto", height: 500}}>
                {listAuthor}
            </List>
        </Box>


    )
})

export default memo(AuthorSelection);
