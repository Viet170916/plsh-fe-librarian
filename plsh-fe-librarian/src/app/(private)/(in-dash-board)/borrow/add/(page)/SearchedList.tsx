"use client"
import React, {JSX, memo, useCallback, useEffect, useMemo} from "react";
import {BookInstance} from "@/helpers/appType";
import {addBorrowedBook} from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import {Box, LinearProgress, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";
import {truncateMaxLineTextStyle, truncateTextStyle} from "@/style/text.style";
import appStrings from "@/helpers/appStrings";
import {useAppDispatch} from "@/hooks/useDispatch";
import List from "@mui/material/List";
import {setPropToBookInstanceState} from "@/stores/slices/book-states/book-instance.book.slice";
import {useLazyGetBookInstancesQuery} from "@/stores/slices/api/book.api.slice";
import {useSelector} from "@/hooks/useSelector";
import {useAddBookBorrowingMutation} from "@/stores/slices/api/borrow.api.slice";
import {useAppStore} from "@/stores/store";
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

function SearchedList(): JSX.Element {
    const store = useAppStore();
    const dispatch = useAppDispatch();
    const [getInstancesGet, {data: InstancesData, isFetching, error}] = useLazyGetBookInstancesQuery();
    const filter = useSelector(state => state.bookInstanceState.bookInstanceFilter);
    const [addBookBorrowing, {isLoading}] = useAddBookBorrowingMutation();
    useEffect(() => {
        if (filter) {
            getInstancesGet(filter);
        }
    }, [filter, getInstancesGet]);
    useEffect(() => {
        if (InstancesData) {
            dispatch(setPropToBookInstanceState({key: "currentBookInstances", value: InstancesData.data}))
        }
    }, [InstancesData, dispatch]);
    const onSelected = useCallback(async function (instance: BookInstance) {
        const loanId = store.getState().addEditBorrowData.id;
        if (loanId && instance.id) {
            const response = await addBookBorrowing({loanId, bookId: instance.id});
            if (response.data) {
                dispatch(addBorrowedBook(instance));
            }
            if (response.error) {
                appToaster.error(parsErrorToBaseResponse(response.error)?.message)
            }
        } else if (!loanId) {
            dispatch(addBorrowedBook(instance));
        }
    }, [dispatch, store, addBookBorrowing,])

    const bookList = useMemo(() => {
        return InstancesData?.data?.map(instance => (
            <Box key={instance.id} width="100%">
                <ListItem
                    alignItems="flex-start" onClick={() => {
                    if (!instance.isInBorrowing) {
                        onSelected(instance);
                    }
                }}
                    sx={{
                        cursor: instance.isInBorrowing ? "not-allowed" : "pointer",
                        opacity: instance.isInBorrowing ? .6 : 1,
                        borderRadius: 2,
                        boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
                        my: .5
                    }}
                >
                    <ListItemAvatar>
                        <Box sx={{borderRadius: "50%", boxShadow: NEUMORPHIC_SHADOW.SHADOW(), p: .4}}>
                            <Box sx={{
                                borderRadius: "50%",
                                boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
                                p: .8,
                            }}>
                                <Avatar alt="Remy Sharp" src={instance.bookThumbnail}/>
                            </Box>
                        </Box>
                    </ListItemAvatar>
                    <Grid width="100%" container sx={{ml: 1}}>
                        <Grid size={12} container spacing={1}>
                            <Grid size={"grow"} sx={{boxShadow: NEUMORPHIC_SHADOW.SHADOW(), borderRadius: 1, px: 1}}>
                                <Typography color={"textPrimary"}
                                            component="span"
                                            variant="h6"
                                            sx={{
                                                fontWeight: "bold",
                                                display: 'inline', ...truncateTextStyle,
                                            }}
                                >
                                    {instance.bookName}
                                </Typography>
                            </Grid>
                            <Grid>
                                {instance.isInBorrowing ?
                                    <Typography color={"textPrimary"} component={NeumorphicButton} variant_2={"primary"}
                                                sx={{
                                                    color: color.SERIOUS,
                                                    p: 0
                                                }}>{appStrings.CHECKED_OUT__UNAVAILABLE}</Typography> :
                                    <NeumorphicButton variant_2={"primary"} color={"success"}
                                                sx={{p: 0}}>{appStrings.AVAILABLE}</NeumorphicButton>}
                            </Grid>
                        </Grid>
                        <Grid size={9}>
                            <Typography color={"textPrimary"}
                                        component="span"
                                        variant="h6"
                                        sx={{color: color.DARK_TEXT, display: 'inline'}}
                            >
                                {instance.code}
                            </Typography>
                        </Grid>
                        <Grid size={5}>
                            <Typography color={"textPrimary"} sx={{fontSize: 12, color: color.DARK_LIGHTER_TEXT}}>
                                {instance.bookVersion}
                            </Typography>
                        </Grid>
                        <Grid container size={"grow"} justifyContent={"end"}>
                            <Typography color={"textPrimary"} variant="h6"
                                        fontWeight={"lighter"}>{appStrings.shelf.POSITION}: {instance.shelfPosition}</Typography>
                        </Grid>
                        <Grid size={12}>
                            <Typography color={"textPrimary"} sx={{fontSize: 10, ...truncateMaxLineTextStyle(2)}}>
                                {instance.bookCategory}
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            </Box>
        ));
    }, [InstancesData, onSelected]);

    return (
        <>
            {isFetching && <LinearProgress/>}
            {error && <Typography color={"textPrimary"}>{appStrings.error.GET_BOOK_FAIL}</Typography>}
            <List sx={{overflowY: "auto"}}>
                {bookList}
            </List>
        </>

    );
}

export default memo(SearchedList);

