"use client"
import React, {forwardRef, JSX, memo, useEffect} from "react";
import {useGetBookAiSearchMutation} from "@/stores/slices/api/book.api.slice";
import {CircularProgress, Snackbar, SxProps, Theme, Typography} from "@mui/material";
import {SlideInFromLeft} from "@/components/Animation/animation";
import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";
import {primaryGradientBg, shadowStyle} from "@/style/container.style";
import appStrings from "@/helpers/appStrings";
import AppButton from "@/components/primary/Input/AppButton";
import {useAppStore} from "@/stores/store";
import {appToaster} from "@/components/primary/toaster";
import useFetchingToast from "@/hooks/useFetchingToast";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setAddEditBookWithBookData} from "@/stores/slices/book-states/book.add-edit.slice";

type AiSupportProps = {
    open: boolean,
    setOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const SlideBounce = forwardRef<HTMLDivElement, React.PropsWithChildren>(
    ({children}) => {
        return (
            <SlideInFromLeft index={0}>
                {children}
            </SlideInFromLeft>
        );
    }
);
SlideBounce.displayName = 'SlideBounce';


function AiSupport({open, setOpen}: AiSupportProps): JSX.Element {
    const [getBookByAi, {data, isLoading, error, isSuccess, reset}] = useGetBookAiSearchMutation();
    const state = useAppStore();
    const dispatch = useAppDispatch();
    const getBook = () => {
        const book = state.getState().addEditBookData;
        if (book.baseInfo.title) {
            getBookByAi({title: book.baseInfo.title, version: book.baseInfo.version})
        } else {
            appToaster.warning(appStrings.chatBot.FORGOT_BOOK_TITLE)
        }
    }
    useEffect(() => {
        return reset();
    }, [reset]);
    useFetchingToast(data, error, [dispatch], [], {
        handleSuccess(result) {
            dispatch(setAddEditBookWithBookData(result));
        }
    })
    const handleClose = (_: unknown, reason?: string) => {
        if (reason === 'clickaway') return;
        reset();
        setOpen(false);
    };
    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            anchorOrigin={{vertical: 'top', horizontal: 'left'}}
            autoHideDuration={isSuccess ? 5000 : null}
            slots={{
                transition: SlideBounce
            }}
        >
            <Grid spacing={1} container sx={{
                ...({
                    ...shadowStyle,
                    ...primaryGradientBg
                } as SxProps<Theme>), borderRadius: 5, width: 400, p: 2
            }}>
                <Grid>
                    <Typography sx={{color: color.LIGHT_TEXT}}>
                        {isLoading ? <><CircularProgress
                            size={"12px"}/> {appStrings.chatBot.WAIT}</> : (isSuccess ? appStrings.chatBot.RECHECK : appStrings.chatBot.GEN_BOOK_MESS)}
                    </Typography>
                </Grid>{
                (!isSuccess) && <>
                            <AppButton loading={isLoading} onClick={getBook} size={"small"} variant={"outlined"} sx={{
                                bgcolor: color.COMFORT_10,
                                color: color.COMFORT,
                                borderColor: color.COMFORT
                            }}>{appStrings.YES}</AppButton>
                            <AppButton loading={isLoading} size={"small"} onClick={handleClose} variant={"outlined"} sx={{
                                bgcolor: color.SERIOUS_10,
                                color: color.SERIOUS,
                                borderColor: color.SERIOUS
                            }}>{appStrings.NO_THANKS}</AppButton>
                </>
            }

            </Grid>
        </Snackbar>
    );
}

export default memo(AiSupport);

