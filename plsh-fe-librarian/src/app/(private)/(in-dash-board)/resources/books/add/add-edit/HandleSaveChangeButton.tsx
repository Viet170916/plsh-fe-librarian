"use client";
import {appToaster} from "@/components/primary/toaster";
import appStrings from "@/helpers/appStrings";
import {BookData} from "@/helpers/appType";
import {deepEqual} from "@/helpers/comparation";
import {compressImage, objectToFormData, urlToFile} from "@/helpers/convert";
import {color} from "@/helpers/resources";
import {isInternalUrl} from "@/helpers/text";
import {
    bookApi,
    useAddUpdateBookMutation,
    useLazyCheckCategoryNameIsDuplicatedQuery,
    useUploadBookResourceMutation
} from "@/stores/slices/api/book.api.slice";
import {
    AddEditBookData,
    Category,
    clearData,
    setValueInBookBaseInfo
} from "@/stores/slices/book-states/book.add-edit.slice";
import {RootState, useAppStore} from "@/stores/store";
import {Checkbox, Dialog, List, ListItem, ListItemText, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {JSX, memo, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "sonner";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import {useRouter} from "next/navigation";
import {parsErrorToBaseResponse} from "@/helpers/error";

function HandleSaveChangeButton(): JSX.Element {
    const store = useAppStore();
    const dispatch = useDispatch();
    const router = useRouter();
    const [addBook, {data: bookData, isLoading: isBookLoading, error: bookError}] = useAddUpdateBookMutation({});
    const [uploadResource, {
        // data: resourceUploadedRes,
        error: resourceError,
        isLoading: resourceLoading
    }] = useUploadBookResourceMutation({});
    const [checkCategory, {
        data: dataCategory,
        error: errorCategory,
    }] = useLazyCheckCategoryNameIsDuplicatedQuery();
    const onAddBook = useCallback(async (newCategory?: Category) => {
        const data: AddEditBookData = store.getState().addEditBookData;
        const eBook = data.baseInfo.availability.find((f) => f.kind === "epub");
        const audioBook = data.baseInfo.availability.find((f) => f.kind === "audio");
        const physicBook = data.baseInfo.availability.find((f) => f.kind === "physical");
        const coverImage = data.resource.coverImage;
        const coverImageUrl = data.resource.coverImage.localUrl;
        const payload: BookData = {
            ...data.baseInfo,
            ...data.overview,
            availableBookCount: 0,
            pageCount: data.overview.pageCount ?? 0,
            categoryId: undefined,
            category: data.baseInfo.newCategory?.chosen ? data.baseInfo.newCategory : data.baseInfo.category,
            authors: data.authors,
            id: data.id,
            quantity: physicBook?.kind === "physical" ? physicBook.quantity : 0,
            contentPdfName: eBook?.kind === "epub" && eBook.resource?.localUrl ? eBook.resource?.name : undefined,
            previewPdfResource: eBook?.kind === "epub" && eBook.resource?.localUrl ? eBook.resource : undefined,
            audioName: audioBook?.kind === "audio" && audioBook.resource?.localUrl ? audioBook.resource?.name : undefined,
            audioResource: audioBook?.kind === "audio" && audioBook.resource?.localUrl ? audioBook.resource : undefined,
            availabilities: [],
            coverImageResource: coverImage ?? undefined,
            thumbnail: isInternalUrl(coverImageUrl) === "unknown" ? coverImageUrl : undefined,
        };
        if (newCategory && newCategory?.chosen) {
            payload.categoryId = undefined;
            payload.category = newCategory;
        } else if (data.baseInfo.newCategory && data.baseInfo.newCategory?.chosen) {
            payload.category = data.baseInfo.newCategory;
        } else if (data.baseInfo.category && data.baseInfo.category.id && !data.baseInfo.newCategory?.chosen) {
            payload.categoryId = data.baseInfo.category.id;
            payload.category = data.baseInfo.category;
        }
        const bookResponse = await addBook(payload);
        if (bookResponse.data?.data.id) {
            if (eBook?.kind === "epub" && eBook.resource && eBook.resource.localUrl) {
                try {
                    const fileAfterConverted = await urlToFile(eBook.resource.localUrl, eBook.resource.name ?? "unknown", eBook.resource.fileType ?? "application/epub+zip");
                    const resourceUpload = await uploadResource({
                        bookId: bookResponse.data.data.id,
                        data: objectToFormData({...eBook.resource, file: fileAfterConverted})
                    });
                } catch {
                    toast.error(appStrings.error.FAIL_TO_UPLOAD_EBOOK);
                }
            }
            if (audioBook?.kind === "audio" && audioBook.resource && audioBook.resource.localUrl) {
                try {
                    const fileAfterConverted = await compressImage(await urlToFile(audioBook.resource.localUrl, audioBook.resource.name ?? "unknown", audioBook.resource.fileType ?? "audio/mpeg"), "LOWEST_240P");
                    const resourceUpload = await uploadResource({
                        bookId: bookResponse.data.data.id,
                        data: objectToFormData({...audioBook.resource, fileAfferConverted: fileAfterConverted})
                    });
                } catch {
                    toast.error(appStrings.error.FAIL_TO_UPLOAD_AUDIO_BOOK);
                }
            }
            if (coverImage && coverImage.localUrl && isInternalUrl(coverImage.localUrl) === "blob") {
                try {
                    const fileAfterConverted = await urlToFile(coverImage.localUrl, coverImage.name ?? "unknown", coverImage.fileType ?? "image/png");
                    const resourceUpload = await uploadResource({
                        bookId: bookResponse.data.data.id,
                        data: objectToFormData({
                            ...coverImage,
                            file: await compressImage(fileAfterConverted, "LOWEST_240P")
                        })
                    });
                } catch {
                    toast.error(appStrings.error.FAIL_TO_UPLOAD_COVER);
                }
            }
            appToaster.success(bookResponse.data?.message);
            dispatch(bookApi.util.resetApiState());
            dispatch(clearData());
            // if (bookResponse.data.data?.id)
            //     router.push(`/resources/books/${bookResponse.data.data.id}/edit`);
        };
        if(bookResponse?.error){
            appToaster.error(parsErrorToBaseResponse(bookResponse.error)?.message);
        }

    }, [store, addBook, dispatch, uploadResource, bookData?.data.id, router]);
    const
        onSubmit = async () => {
            if (!deepEqual(store.getState().global.editedBook_g, store.getState().addEditBookData)) {
                const newCategory: Category | undefined = store.getState().addEditBookData.baseInfo.newCategory;
                if (newCategory && newCategory?.chosen) {
                    const dataCheck = await checkCategory({name: store.getState().addEditBookData.baseInfo.newCategory?.name});
                    if (dataCheck.data && dataCheck.data.status === "duplicated") {
                        setSuggestions(dataCheck.data?.suggestions);
                        return;
                    }
                }
                await onAddBook();
            } else {
                appToaster.info(appStrings.NOTHING_CHANGE);
            }
        };
    const [suggestions, setSuggestions] = useState<Category[] | undefined>();
    useEffect(() => {
        if (resourceError) {
            appToaster.error(appStrings.error.RESOURCE_SAVE_FAIL);
        }
    }, [resourceError]);
    useEffect(() => {
        if (bookError)
            appToaster.error(parsErrorToBaseResponse(bookError)?.message);
    }, [bookError]);
    useEffect(() => {
        if (errorCategory)
            appToaster.error(appStrings.error.REQUEST_ERROR);
    }, [errorCategory]);
    useEffect(() => {
        if (bookData)
            appToaster.success(appStrings.success.SAVE_SUCCESS);
    }, [bookData]);
    useEffect(() => {
        if (dataCategory && dataCategory.status === "duplicated") {
            appToaster.warning(appStrings.warning.CATEGORY_MIGHT_BE_DUPLICATED);
            setSuggestions(dataCategory.suggestions);
        }
    }, [dataCategory]);
    return (
        <>{suggestions ? (<CategorySuggestion
            onAddBook={onAddBook} suggestions={suggestions}
            setSuggestions={setSuggestions}
        />) : <></>}
            <NeumorphicButton
                onClick={onSubmit}
                fullWidth
                variant_2="primary"
                color={"primary"}
                sx={{
                    mt: 3,
                    background: color.PRIMARY + "!important",
                    height: 61,
                    borderRadius: 1,
                }}
                loading={isBookLoading || resourceLoading}
            >
                <Typography variant="h6" sx={{color: "white"}}>
                    {appStrings.SAVE}
                </Typography>
            </NeumorphicButton>
        </>
    );
}

const CategorySuggestion = memo(({suggestions, onAddBook, setSuggestions}: {
    suggestions: Category[],
    onAddBook: (category?: Category) => void,
    setSuggestions?: (value: (((prevState: (Category[] | undefined)) => (Category[] | undefined)) | Category[] | undefined)) => void
}) => {
    const dispatch = useDispatch();
    const store = useAppStore();
    const category = useSelector((state: RootState) => state.addEditBookData.baseInfo.category);
    const onCancel = () => {
        const newCategory = store.getState().addEditBookData.baseInfo.newCategory;
        dispatch(setValueInBookBaseInfo({
            key: "newCategory", value: {...newCategory, chosen: true},
        }));
        setSuggestions?.(undefined);
        onAddBook({...newCategory, chosen: false});
    };
    const onAccept = () => {
        const newCategory = store.getState().addEditBookData.baseInfo.newCategory;
        dispatch(setValueInBookBaseInfo({
            key: "newCategory", value: {...newCategory, chosen: false},
        }));
        setSuggestions?.(undefined);
        onAddBook({...newCategory, chosen: false});
    };
    return (
        <Dialog open={(suggestions.length > 0)}>
            <Grid container padding={2} width={400} justifyContent={"center"} spacing={2}>
                <Grid size={6}>
                    <List
                        sx={{width: '100%', gap: 1, height: 300, overflowY: 'auto'}}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <Typography>
                                {appStrings.book.SUGGESTION_CATEGORY}
                            </Typography>
                        }
                    >
                        {suggestions.map((item) => (
                            <ListItem
                                key={item.id} sx={{borderRadius: 2}} secondaryAction={
                                <Checkbox
                                    edge="end"
                                    onChange={() => {
                                        dispatch(setValueInBookBaseInfo({key: "category", value: item}));
                                    }}
                                    checked={item.id === category?.id}
                                />
                            }
                            >
                                <ListItemText primary={item?.name ?? ""}/>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid size={6}>
                    <Typography variant={"h6"} fontWeight={"lighter"}>
                        {appStrings.guide.SUGGESTION_CATEGORY}
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <NeumorphicButton variant_2={"primary"} color={"success"} fullWidth onClick={onAccept}>
                        {appStrings.CONTINUE_WITH_CHANGE}
                    </NeumorphicButton>
                </Grid>
                <Grid size={12} spacing={2}>
                    <NeumorphicButton variant={"outlined"} fullWidth onClick={onCancel}>
                        {appStrings.CONTINUE_WITHOUT_CHANGE}
                    </NeumorphicButton>
                </Grid>

            </Grid>
        </Dialog>
    );
});
export default memo(HandleSaveChangeButton);

