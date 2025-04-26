"use client";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import {appToaster} from "@/components/primary/toaster";
import UploadOrTakeImage from "@/components/primary/UploadOrTakeImage";
import appStrings from "@/helpers/appStrings";
import {Resource} from "@/helpers/appType";
import {constants} from "@/helpers/constants";
import {compressImage, getOnLoanPeriods, urlToFile} from "@/helpers/convert";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {color} from "@/helpers/resources";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useSelector} from "@/hooks/useSelector";
import {useExtendLoanMutation, useReturnLoanConfirmationMutation} from "@/stores/slices/api/borrow.api.slice";
import {LoanState, setPropToLoanState} from "@/stores/slices/borrow-state/loan.slice";
import {RootState, useAppStore} from "@/stores/store";
import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Drawer,
    IconButton,
    ImageList,
    ImageListItem,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {LineChart} from '@mui/x-charts/LineChart';
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, {memo, useCallback, useEffect, useMemo} from "react";
import {get, Path} from "react-hook-form";
import {FaRegWindowClose} from "react-icons/fa";
import {shallowEqual, useDispatch} from "react-redux";
import {toast} from "sonner";
import {useTheme} from "@mui/material/styles";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";
import {correctTime} from "@/helpers/time";
import {daysOptions} from "@/app/(private)/(in-dash-board)/borrow/add/(page)/AddEditBorrowForm";

const AfterBorrowField = memo(<K extends Path<LoanState>>({name, label, type}: {
    name: K,
    label: string,
    type?: "text" | "date-time"
}) => {
    const dispatch = useAppDispatch();
    const value = useSelector(state => get(state.loanState, name), shallowEqual);
    switch (type) {
        case "date-time":
            return (
                <DateTimePicker slotProps={{textField: {size: 'small', fullWidth: true}}} label={label}
                                value={value ? dayjs(correctTime(value)) : null}
                                views={["year", "month", "day", "hours", "minutes"]} onChange={datePicked => {
                    dispatch(setPropToLoanState({key: name, value: datePicked?.toISOString()}));
                }}/>);
        default:
            return (
                <NeumorphicTextField label={label} value={value ?? ""} size={"small"} fullWidth
                                     onChange={(e) => dispatch(setPropToLoanState({
                                         key: name,
                                         value: e.target.value
                                     }))}/>);
    }
});
const BookBorrowingDrawer: React.FC = () => {
    const theme = useTheme();
    dayjs.locale("vi");
    const dispatch = useAppDispatch();
    const selectedBookBorrowing = useSelector(state => state.loanState.currenBookBorrowing);
    const currentLoan = useSelector(state => state.loanState.currentLoan);
    const onClose = () => {
        dispatch(setPropToLoanState({key: "currenBookBorrowing", value: undefined}));
    };
    const borrowRangeAnalytic = useMemo(() => getOnLoanPeriods(dayjs(correctTime(selectedBookBorrowing?.borrowDate ?? "")),
            selectedBookBorrowing?.returnDates.map(d => dayjs(correctTime(d))) ?? [],
            selectedBookBorrowing?.extendDates.map(d => dayjs(correctTime(d))) ?? [],
            selectedBookBorrowing?.actualReturnDate ? dayjs(correctTime(selectedBookBorrowing?.actualReturnDate ?? "")) : dayjs()),
        [selectedBookBorrowing?.borrowDate, selectedBookBorrowing?.extendDates, selectedBookBorrowing?.returnDates, selectedBookBorrowing?.actualReturnDate])
    return (
        <Drawer anchor="right" open={selectedBookBorrowing && true} onClose={onClose}>
            <Box width={"50vw"} p={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Chi tiết mượn sách</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Grid container width={"100%"} spacing={2}>
                    <Grid size={6} container spacing={3}>
                        <NeumorphicTextField label={appStrings.CODE} value={selectedBookBorrowing?.id ?? ""}
                                             size={"small"} fullWidth disabled/>
                        <NeumorphicTextField label={appStrings.book.CODE}
                                             value={selectedBookBorrowing?.bookInstance?.code ?? ""} size={"small"}
                                             fullWidth disabled/>
                        <NeumorphicTextField label={appStrings.borrow.BOOK_DAMAGE_BEFORE_BORROW}
                                             value={selectedBookBorrowing?.noteBeforeBorrow ?? ""} multiline
                                             size={"small"} fullWidth disabled/>
                        <NeumorphicTextField label={appStrings.borrow.BORROW_DATE}
                                             value={selectedBookBorrowing?.borrowDate ? dayjs(correctTime(selectedBookBorrowing?.borrowDate)).format(constants.dateFormat) : ""}
                                             size={"small"} fullWidth disabled/>
                        <NeumorphicTextField multiline label={appStrings.borrow.RETURN_DATE}
                                             value={selectedBookBorrowing?.returnDates.map(d => d ? dayjs(correctTime(d)).format(constants.dateFormat) : "").join(",\n")}
                                             size={"small"} fullWidth disabled/>
                    </Grid>
                    {selectedBookBorrowing?.borrowingStatus === "returned" ?
                        <Grid size={6} spacing={1}>
                            <NeumorphicTextField label={appStrings.borrow.FINE_TYPE}
                                                 value={selectedBookBorrowing?.fineType ?? ""} size={"small"} fullWidth
                                                 disabled/>
                            <NeumorphicTextField sx={{mt: 1}} multiline
                                                 label={appStrings.borrow.BOOK_DAMAGE_AFTER_BORROW}
                                                 value={selectedBookBorrowing?.noteAfterBorrow} size={"small"} fullWidth
                                                 disabled/>
                        </Grid> : (currentLoan?.aprovalStatus !== "pending" && currentLoan?.aprovalStatus !== "approved") &&
                        <EditableFields/>
                    }
                    <Grid size={12}>
                        {(selectedBookBorrowing && currentLoan?.aprovalStatus !== "pending" && currentLoan?.aprovalStatus !== "approved") &&
                            <Grid>
                                        <Typography variant={"h5"} sx={{color: theme.palette.primary.main}}
                                                    fontWeight={"bold"}>{appStrings.borrow.BORROW_DATE_RANGE_ANALYTIC}</Typography>
                                        <LineChart
                                            tooltip={{trigger: 'none'}}
                                            xAxis={[{scaleType: 'point', data: borrowRangeAnalytic.labels}]}
                                            series={borrowRangeAnalytic.chartData}
                                            height={100}
                                            margin={{top: 50, bottom: 20}}
                                        />
                            </Grid>}
                    </Grid>
                    <Grid size={12}>
                        {(selectedBookBorrowing?.overdueDays ?? 0) > 0 &&
                            (currentLoan?.aprovalStatus !== "pending" && currentLoan?.aprovalStatus !== "approved") &&
                            <Typography sx={{color: color.SERIOUS}}><strong>Quá
                                        hạn</strong>{` ${selectedBookBorrowing?.overdueDays} `}{appStrings.unit.DAY}
                            </Typography>}
                    </Grid>
                    <Grid size={6}>
                        <Typography variant={"h4"} fontWeight={"bold"} sx={{
                            color: theme.palette.primary.main,
                            mt: 5,
                            mb: 3
                        }}>{appStrings.borrow.BOOK_DAMAGE_BEFORE_BORROW}</Typography>
                        <QuiltedImageList itemData={selectedBookBorrowing?.bookImageUrlsBeforeBorrow ?? []}/>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant={"h4"} fontWeight={"bold"} sx={{
                            color: theme.palette.primary.main,
                            mt: 5,
                            mb: 3
                        }}>{appStrings.borrow.BOOK_DAMAGE_AFTER_BORROW}
                        </Typography>
                        {selectedBookBorrowing?.borrowingStatus === "returned" ?
                            <QuiltedImageList itemData={selectedBookBorrowing?.bookImageUrlsAfterBorrow ?? []}/> :
                            (currentLoan?.aprovalStatus !== "pending" && currentLoan?.aprovalStatus !== "approved") &&
                            <>
                                        <ImageSelected
                                            selectedBookId={selectedBookBorrowing?.bookInstance?.id as number}/>
                                        <ImagesPreview/>
                                        <ConfirmReturnButton/>
                            </>
                        }
                    </Grid>
                </Grid>
            </Box>
        </Drawer>
    );
};


const SelectAddDays = memo(() => {
    const [value, setValue] = React.useState("");

    const start = useSelector(state => state.loanState.currenBookBorrowing?.extendDate, shallowEqual);
    const selectedBook = useSelector(state => state.loanState.currenBookBorrowing, shallowEqual);

    const dispatch = useAppDispatch();

    const handleChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        setValue(selectedValue);
        const daysToAdd = parseInt(selectedValue);
        const newDate = dayjs(start).add(daysToAdd, "day");
        if (selectedBook?.bookInstance?.id) {
            dispatch(
                setPropToLoanState({
                    key: "currenBookBorrowing.returnDate",
                    value: newDate.toISOString(),
                }),
            )
        }

    };

    return (
        <>
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                fullWidth
                size="small"
                sx={{borderRadius: 12, p: 0}}
            >
                <MenuItem disabled value="">
                    Chọn số ngày mượn
                </MenuItem>
                {daysOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value.toString()}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
})
const GetTodayButton = memo(() => {
    const selectedBook = useSelector(state => state.loanState.currenBookBorrowing, shallowEqual);
    const dispatch = useAppDispatch();

    function onGetToday() {
        if (selectedBook?.bookInstance?.id)
            dispatch(
                setPropToLoanState({
                    key: "currenBookBorrowing.extendDate",
                    value: dayjs().toISOString(),
                }),
            );
    }

    return (
        <NeumorphicButton
            fullWidth
            sx={{borderColor: color.FOUR, color: color.FOUR, borderRadius: 12, height: "fit-content"}}
            variant={"outlined"}
            onClick={onGetToday}
        >{appStrings.GET_NOW}</NeumorphicButton>
    );
});
const ImageSelected = memo(({selectedBookId}: { selectedBookId: number }) => {
    const maxImage = 5;
    const dispatch = useDispatch();
    const images = useSelector((state: RootState) => state.loanState.currenBookBorrowing?.bookImagesAfterBorrow, shallowEqual);
    const onAfterBorrowImageChange =
        useCallback((imageResource: Resource[]) => {
            if ((images?.length ?? 0) + imageResource.length > maxImage) {
                toast.warning(`Bạn chỉ có thể tải lên tối đa ${maxImage} ảnh.`);
                return;
            }
            if (selectedBookId) {
                dispatch(setPropToLoanState({
                    key: "currenBookBorrowing.bookImagesAfterBorrow",
                    value: (images ?? []).concat(imageResource.map(i => ({
                        ...i,
                        file: undefined,
                        referenceId: selectedBookId
                    }))),
                }));
            }
        }, [selectedBookId, dispatch, images]);
    return (
        <Grid>{
            (images?.length ?? 0) >= maxImage ? <></> :
                <UploadOrTakeImage
                    maxImages={5} onImageChange={onAfterBorrowImageChange}
                />
        }
        </Grid>
    );
});

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const QuiltedImageList = memo(({itemData}: { itemData: string[] }) => {
    return (
        <ImageList
            sx={{width: "100%"}}
            variant="quilted"
            cols={4}
            rowHeight={121}
        >
            {itemData.map((url, index) => {
                if (index === (itemData.length - 1) && (index % 2) === 0)
                    return {
                        img: url,
                        rows: 2,
                        cols: 4,
                    };
                return {
                    img: url,
                    rows: 2,
                    cols: 2,
                };
            }).map((item) => (
                <ImageListItem
                    key={item.img} cols={item.cols || 1} rows={item.rows || 1}
                    sx={{borderRadius: 3, overflow: "hidden"}}
                >
                    <img
                        {...srcset(item.img, 121, item.rows, item.cols)}
                        alt={""}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
});
const ImagesPreview = memo(() => {
    const theme = useTheme();
    const images = useSelector((state: RootState) => state.loanState.currenBookBorrowing?.bookImagesAfterBorrow, shallowEqual);
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
                                dispatch(setPropToLoanState({
                                    key: "currenBookBorrowing.bookImagesAfterBorrow",
                                    value: images.filter(im => im !== src),
                                }));
                            }}
                            sx={{
                                top: 0,
                                right: 0,
                                position: "absolute",
                                color: theme.palette.text.secondary,
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
const EditableFields = memo(() => {
    return (
        <Grid size={6} justifyContent={"end"} container spacing={3}>

            <Grid size={8}>
                <AfterBorrowField name={"currenBookBorrowing.extendDate"} type={"date-time"}
                                  label={appStrings.borrow.EXTEND_DATE}/>
            </Grid>
            <Grid size={4}>
                <GetTodayButton/>
            </Grid>
            <Grid size={8}>
                <AfterBorrowField name={"currenBookBorrowing.returnDate"} type={"date-time"}
                                  label={appStrings.borrow.NEXT_RETURN_DATE}/>
            </Grid>
            <Grid size={4}>
                <SelectAddDays/>
            </Grid>

            <ExtendButton/>
            <AfterBorrowField name={"currenBookBorrowing.fineType"} label={appStrings.borrow.FINE_TYPE}/>
            <AfterBorrowField name={"currenBookBorrowing.noteAfterBorrow"}
                              label={appStrings.borrow.BOOK_DAMAGE_AFTER_BORROW}/>
        </Grid>
    );
});
const ExtendButton = memo(() => {
    const store = useAppStore();
    const [extend, {data, error, isLoading}] = useExtendLoanMutation();
    const onExtend = () => {
        const request = store.getState().loanState.currenBookBorrowing;
        if (request?.id) {
            extend(request);
        }
    };
    useEffect(() => {
        if (data) {
            appToaster.success(data.message);
        }
    }, [data]);
    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);
    return (
        <NeumorphicButton loading={isLoading} onClick={onExtend} variant_2={"secondary"}
                          sx={{borderColor: color.COMFORT, color: color.COMFORT}}>
            {appStrings.borrow.EXTEND}
        </NeumorphicButton>);
});
const ConfirmReturnButton = memo(() => {
    const store = useAppStore();
    const [extend, {data, error, isLoading}] = useReturnLoanConfirmationMutation();
    const onConfirmReturn = async () => {
        const request = store.getState().loanState.currenBookBorrowing;
        if (request?.id) {
            const files = await Promise.all(
                request.bookImagesAfterBorrow.map(async (img) => {
                    if (img.localUrl) {
                        return await compressImage(await urlToFile(img.localUrl, img.name ?? "", img.fileType ?? "image/png"), "LOWEST_240P");
                    }
                    return null;
                }),
            );
            const validFiles = files.filter(file => file !== null);
            await extend({id: request.id, images: validFiles, noteAfterBorrow: request.noteAfterBorrow});
        }
    };
    useEffect(() => {
        if (data) {
            appToaster.success(data.message);
        }
    }, [data]);
    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);
    return (
        <NeumorphicButton fullWidth loading={isLoading} variant_2={"primary"} color={"success"}
                          sx={{mt: 3}}
                          onClick={onConfirmReturn}>
            {appStrings.borrow.RETURN_CONFIRM}
        </NeumorphicButton>
    );
});
export default memo(BookBorrowingDrawer);

