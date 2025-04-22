import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import UploadOrTakeImage from "@/components/primary/UploadOrTakeImage";
import appStrings from "@/helpers/appStrings";
import {Resource} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {useAppDispatch} from "@/hooks/useDispatch";
import {
    selectBookBorrowedByInstanceId,
    selectCurrentBookBorrowed,
    setPropToBorrowedBook
} from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import {RootState} from "@/stores/store";
import {Box, IconButton, Stack, TextField} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, {memo, useCallback} from "react";
import {FaRegWindowClose} from "react-icons/fa";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {toast} from "sonner";
import {correctTime, formatTime} from "@/helpers/time";

interface DateRangeProps {
    bookInstanceId: number;
}

const DateRangeStart = memo(({bookInstanceId}: DateRangeProps) => {
    const value = useSelector((state: RootState) => selectCurrentBookBorrowed(state)?.borrowDateRange.start);
    const dispatch = useAppDispatch();
    return (
        <DateTimePicker
            minDateTime={dayjs().subtract(30, "minutes")}
            sx={{width: "100%"}}
            label={appStrings.borrow.BORROW_DATE}
            value={value ? dayjs(correctTime(value)) : null}
            views={["year", "month", "day", "hours", "minutes"]}
            onChange={datePicked => {
                dispatch(
                    setPropToBorrowedBook({
                        idBorrowedBookOrBookInstance: bookInstanceId,
                        key: "borrowDateRange.start",
                        value: datePicked?.toDate().toISOString(),
                    }),
                );
            }
            }
        />
    );
});
const DateRangeEnd = memo(({bookInstanceId}: DateRangeProps) => {
    const value = useSelector((state: RootState) => selectCurrentBookBorrowed(state)?.borrowDateRange.end);
    const start = useSelector((state: RootState) => selectCurrentBookBorrowed(state)?.borrowDateRange.start);
    const dispatch = useAppDispatch();
    return (
        <DateTimePicker
            minDateTime={dayjs(start).add(1, "hour")}
            sx={{width: "100%"}}
            label={appStrings.borrow.RETURN_DATE}
            value={value ? dayjs(correctTime(value)) : null}
            onChange={datePicked =>
                dispatch(
                    setPropToBorrowedBook({
                        idBorrowedBookOrBookInstance: bookInstanceId,
                        key: "borrowDateRange.end",
                        value: datePicked?.toDate().toISOString(),
                    }),
                )
            }
        />
    );
});
const BorrowNote = memo(({bookInstanceId}: DateRangeProps) => {
    const value = useSelector((state: RootState) => selectCurrentBookBorrowed(state)?.beforeBorrow.note);
    const dispatch = useAppDispatch();
    return (
        <TextField
            value={value ?? ""}
            onChange={e =>
                dispatch(
                    setPropToBorrowedBook({
                        idBorrowedBookOrBookInstance: bookInstanceId,
                        key: "beforeBorrow.note",
                        value: e.target.value,
                    }),
                )
            }
            multiline
            rows={4}
            label={appStrings.NOTE}
            fullWidth
            margin="dense"
            variant="outlined"
        />
    );
});
const BorrowStatus = memo(({bookInstanceId}: DateRangeProps) => {
    const value = useSelector((state: RootState) => selectCurrentBookBorrowed(state)?.afterBorrow.status);
    const dispatch = useAppDispatch();
    return (
        <TextField
            value={value ?? ""}
            onChange={e =>
                dispatch(
                    setPropToBorrowedBook({
                        idBorrowedBookOrBookInstance: bookInstanceId,
                        key: "afterBorrow.status",
                        value: e.target.value,
                    }),
                )
            }
            label={appStrings.borrow.BORROW_STATUS}
            fullWidth
            margin="dense"
            variant="outlined"
        />
    );
});
const ImageSelected = memo(({selectedBookId}: { selectedBookId: number }) => {
    const maxImage = 5;
    // const store = useAppStore();
    const dispatch = useDispatch();
    const images = useSelector((state: RootState) => selectBookBorrowedByInstanceId(state, selectedBookId)?.beforeBorrow.images, shallowEqual);
    // const getImages = useCallback( function(){
    // 				return store.getState()
    // 				            .addEditBorrowData.borrowedBooks
    // 				            .find( b => b.bookInstance.id === selectedBookId )?.beforeBorrow.images;
    // }, [ store, selectedBookId ] );
    const onPreBorrowImageChange =
        useCallback((imageResource: Resource[]) => {
            if ((images?.length ?? 0) + imageResource.length > maxImage) {
                toast.warning(`Bạn chỉ có thể tải lên tối đa ${maxImage} ảnh.`);
                return;
            }
            if (selectedBookId) {
                dispatch(setPropToBorrowedBook({
                    idBorrowedBookOrBookInstance: selectedBookId,
                    key: "beforeBorrow.images",
                    value: (images ?? []).concat(imageResource.map(i => ({
                        ...i,
                        file: undefined,
                        referenceId: selectedBookId
                    }))),
                }));
            }
        }, [selectedBookId, dispatch, images]);
    return (
        <>{
            (images?.length ?? 0) >= maxImage ? <></> :
                <UploadOrTakeImage
                    maxImages={5} onImageChange={onPreBorrowImageChange}
                />
        }
        </>
    );
});
const ImagesPreview = memo(({selectedBookId}: { selectedBookId: number }) => {
    const images = useSelector((state: RootState) => selectBookBorrowedByInstanceId(state, selectedBookId)?.beforeBorrow.images, shallowEqual);
    const dispatch = useDispatch();
    return (
        <Stack direction={"row"} sx={{width: "100%", overflowX: 'scroll'}}>
            <Stack direction={"row"} useFlexGap spacing={2}>
                {images?.map((src, index) => (
                    <Box key={src.name} position={"relative"}>
                        <ImageWithBgCover
                            src={src.localUrl}
                            sx={{
                                width: 70,
                                height: 100,
                            }}
                        />
                        <IconButton
                            onClick={() => {
                                dispatch(setPropToBorrowedBook({
                                    idBorrowedBookOrBookInstance: selectedBookId,
                                    key: "beforeBorrow.images",
                                    value: images.filter(im => im !== src),
                                }));
                            }}
                            sx={{
                                top: 0,
                                right: 0,
                                position: "absolute",
                                color: color.WHITE,
                                "&:hover": {
                                    color: color.SERIOUS,
                                },
                            }}
                        >
                            <FaRegWindowClose/>
                        </IconButton>
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
});
export {DateRangeStart, DateRangeEnd, BorrowNote, BorrowStatus, ImagesPreview, ImageSelected};
