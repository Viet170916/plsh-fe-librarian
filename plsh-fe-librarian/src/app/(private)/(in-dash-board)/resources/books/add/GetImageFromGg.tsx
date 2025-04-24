"use client"
import React, {JSX, memo, useCallback, useEffect, useMemo, useState} from "react";
import {useLazyGetBookImageFromGgsQuery} from "@/stores/slices/api/book.api.slice";
import Grid from "@mui/material/Grid2";
import AnimatedMenu from "@/components/Animation/Menu";
import {color} from "@/helpers/resources";
import AppButton from "@/components/primary/Input/AppButton";
import {Box, IconButton, Stack, TextField, Tooltip} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useSelector} from "@/hooks/useSelector";
import {shallowEqual} from "react-redux";
import appStrings from "@/helpers/appStrings";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setPropToAddEditBook} from "@/stores/slices/book-states/book.add-edit.slice";
import {appToaster} from "@/components/primary/toaster";
import {TbCameraSearch} from "react-icons/tb";
import {IoClose} from "react-icons/io5";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";


function GetImageFromGg(): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onSelected = useCallback((url: string) => {
        dispatch(setPropToAddEditBook({key: "resource.coverImage.localUrl", value: url}))
        setOpen(false);
    }, [dispatch])
    return (
        <Grid>
            <NeumorphicButton onClick={() => {
                setOpen((prevState) => !prevState)
            }} sx={{p: 1, fontSize: 26}} variant={"outlined"}><TbCameraSearch/></NeumorphicButton>
            <AnimatedMenu open={open} initHeight={65}>
                <Tooltip title={appStrings.CLOSE}>
                    <IconButton sx={{position: "absolute", bottom: 0, right: 0}}
                                onClick={() => setOpen(false)}><IoClose/></IconButton>
                </Tooltip>
                <SearchImageBook onSelect={onSelected}/>
            </AnimatedMenu>
        </Grid>
    );
}

const SearchImageBook = memo(({onSelect}: { onSelect: (url: string) => void }) => {
    const [getBooks, {data, error, isFetching}] = useLazyGetBookImageFromGgsQuery();
    const title = useSelector(state => state.addEditBookData.baseInfo.title, shallowEqual);
    const {control, handleSubmit, reset} = useForm<{ query: string }>({
        defaultValues: {
            query: title ?? ""
        }
    });
    const search = useCallback(({query}: { query: string }) => {
        getBooks(query);
    }, [getBooks])
    const images = useMemo(() => {
        return data?.map((url) => (
            <Grid key={url} size={4} onClick={() => onSelect(url)} height={150}>
                <ImageWithBgCover src={url}/>
            </Grid>
        )) ?? <></>
    }, [data, onSelect])
    useEffect(() => {
        if (title && title !== "") {
            reset({
                query: title,
            });
            handleSubmit(search)();
        }
    }, [title, reset, handleSubmit, search]);
    useEffect(() => {
        if (error)
            appToaster.error("error")
    }, [error]);
    return (
        <Stack direction={"column"} useFlexGap spacing={2}
               sx={{bgcolor: color.WHITE, p: 2, display: "flex", width: "100%", height: "100%"}}>
            <Box flexGrow={1}>
                <form onSubmit={handleSubmit(search)}>
                    <Grid container spacing={2}>
                        <Grid size={"grow"}>
                            <Controller render={({field}) => {
                                return (
                                    <NeumorphicTextField {...field} variant={"outlined"} label={appStrings.SEARCH} size={"small"}
                                               fullWidth/>
                                )
                            }} control={control} name={"query"}/>
                        </Grid>
                        <NeumorphicButton type={"submit"} variant={"outlined"} size={"small"} loading={isFetching}>
                            {appStrings.SEARCH}
                        </NeumorphicButton>
                    </Grid>
                </form>
            </Box>
            <Box flexGrow={1} sx={{overflowY: "auto"}}>
                <Grid size={5} width={"100%"} container spacing={2}>
                    {images}
                </Grid>
            </Box>

        </Stack>)
});


export default memo(GetImageFromGg);

