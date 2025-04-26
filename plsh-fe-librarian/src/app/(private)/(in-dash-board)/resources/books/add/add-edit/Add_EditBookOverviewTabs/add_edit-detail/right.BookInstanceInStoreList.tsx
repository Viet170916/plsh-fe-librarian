"use client";
import ListTransfer
    from "@/app/(private)/(in-dash-board)/resources/books/add/add-edit/Add_EditBookOverviewTabs/add_edit-detail/ListTransfer";
import appStrings from "@/helpers/appStrings";
import {BookInstance} from "@/helpers/appType";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useSelector} from "@/hooks/useSelector";
import {useAddBookInstancesMutation, useGetBookInstancesQuery} from "@/stores/slices/api/book.api.slice";
import {usePutBooksOntoShelfMutation} from "@/stores/slices/api/library-room.api.slice";
import {addBooksToRow, selectEntireRowInLibStore} from "@/stores/slices/lib-room-state/lib-room.slice";
import Grid from "@mui/material/Grid2";
import React, {JSX, memo, useCallback, useRef} from "react";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import {LinearProgress} from "@mui/material";
import {appToaster} from "@/components/primary/toaster";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";
import {Controller, useForm} from "react-hook-form";

type BookInstanceInStoreListProps = {
    bookId: number;
    rowShelfId?: number;
    shelfId?: number;
}

function RightBookInstanceInStoreList({bookId, shelfId, rowShelfId}: BookInstanceInStoreListProps): JSX.Element {
    const {data: bookInstancesResponse, refetch: bookInstancesRefetch, isFetching} = useGetBookInstancesQuery({bookId});
    const [modifyBooksOnShelfPut, {isLoading}] = usePutBooksOntoShelfMutation();
    const [addInstance, {isLoading: addLoading}] = useAddBookInstancesMutation();
    const bookInstanceRef = useRef<BookInstance[]>([]);
    const dispatch = useAppDispatch();
    const bookInstancesInEntireLib = useSelector(state => selectEntireRowInLibStore(state));
    const onChange = useCallback((value: BookInstance[]) => {
        bookInstanceRef.current = value;
    }, []);
    const onAdd = async function () {
        const bookShelfRows = bookInstanceRef.current
                .filter(bI => !bookInstancesInEntireLib.map(b => b.id).includes(bI.id))
                .map(sh => ({...sh, rowShelfId: rowShelfId}))
            ?? [];
        if (bookShelfRows) {
            const booksOnShelfRes = await modifyBooksOnShelfPut(bookShelfRows);
            if (booksOnShelfRes?.data) {
                appToaster.success(appStrings.success.SAVE_SUCCESS);
                if (rowShelfId && shelfId) {
                    dispatch(addBooksToRow({
                        rowId: rowShelfId,
                        shelfId: shelfId,
                        value: booksOnShelfRes.data.data
                            ?? [],
                    }));
                }
            } else {
                appToaster.error(appStrings.error.EDIT_FAIL);
            }
        }
    };

    function onReload() {
        bookInstancesRefetch();
    }

    const {control, handleSubmit} = useForm<{ quantity: number }>({defaultValues: {quantity: 1}});
    const submitAdd = (data: { quantity: number }) => {
        addInstance({...data, bookId});
    }

    return (
        <Grid container spacing={2}>

            {(isFetching || isLoading) && <Grid size={12}><LinearProgress/></Grid>}
            <NeumorphicButton
                onClick={onAdd}
                loading={isFetching || isLoading}
                variant_2={"primary"}
                disabled={!bookInstancesResponse?.data && true}
            >{appStrings.ADD_ONSHELF}</NeumorphicButton>

            <NeumorphicButton
                loading={isFetching || isLoading}
                onClick={onReload}
            >{appStrings.RELOAD}</NeumorphicButton>

            <Grid component={"form"} onSubmit={handleSubmit(submitAdd)} container spacing={2} size={"grow"}>
                <Grid size={"grow"}>
                    <Controller
                        name={"quantity"}
                        control={control}
                        render={({field}) => (<NeumorphicTextField
                            type={"number"}
                            value={field.value}
                            onChange={(e) => {
                                const value = Number.parseInt(e.target.value);
                                console.log(value)
                                if (!Number.isNaN(value) && Number.isInteger(value) && value >= 1){
                                    field.onChange(value);
                                }
                            }}
                            size={"small"} label={"Số lượng thêm"}/>)}
                    />


                </Grid>
                <NeumorphicButton
                    type={"submit"}
                    loading={addLoading}
                    variant_2={"primary"}
                    color={"success"}
                    disabled={!bookInstancesResponse?.data && true}
                >{appStrings.book.ADD_BOOK}</NeumorphicButton>
            </Grid>
            <Grid size={12}>
                <ListTransfer items={bookInstancesResponse?.data ?? []} disableItems={bookInstancesInEntireLib ?? []}
                              onChange={onChange}/>
            </Grid>

        </Grid>
    );
}

export default memo(RightBookInstanceInStoreList);

