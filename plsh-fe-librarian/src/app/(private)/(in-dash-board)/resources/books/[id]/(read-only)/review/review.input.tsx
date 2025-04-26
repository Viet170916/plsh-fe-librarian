"use client";
import StarRating from "@/components/primary/StarRating";
import {appToaster} from "@/components/primary/toaster";
import appStrings from "@/helpers/appStrings";
import {MessageDto, ReviewDto} from "@/helpers/appType";
import {parsErrorToBaseResponse} from "@/helpers/error";
import {color} from "@/helpers/resources";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useSelector} from "@/hooks/useSelector";
import {useSendMessageMutation, useSendReviewMutation,} from "@/stores/slices/api/review.api.slice";
import {clearPropInBookState} from "@/stores/slices/book-states/book.slice";
import {useAppStore} from "@/stores/store";
import {Button, IconButton, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {JSX, memo, useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {IoClose} from "react-icons/io5";
import {LuReply} from "react-icons/lu";
import {shallowEqual, useDispatch} from "react-redux";
import NeumorphicButton from "@/components/primary/neumorphic/Button";
import NeumorphicTextField from "@/components/primary/neumorphic/TextField";

function ChatBoxC({review, repliedId}: { review: ReviewDto, repliedId?: number }): JSX.Element {
    const dispatch = useAppDispatch();
    const {control, reset, handleSubmit} = useForm<MessageDto>({
        defaultValues: {
            content: "",
            repliedId: repliedId,
            reviewId: review.id,
        },
    });
    const [sendMessage, {data, error, isLoading}] = useSendMessageMutation();

    function onSubmit(value: MessageDto) {
        sendMessage(value);
    }

    useEffect(() => {
        if (data?.data?.reviewId) {
            // dispatch(
            //   addMessageToReview({ reviewId: data.data.reviewId, data: data.data }),
            // );
            appToaster.success(data.message);
        }
    }, [data, dispatch]);
    useEffect(() => {
        if (error) {
            appToaster.error(
                parsErrorToBaseResponse(error)?.message ??
                appStrings.error.REQUEST_ERROR,
            );
        }
    }, [error]);
    useEffect(() => {
        if (repliedId && review.id) {
            reset({
                content: "",
                repliedId: repliedId,
                reviewId: review.id,
            });
        }
    }, [repliedId, review, reset]);
    const onCloseMessage = () => {
        dispatch(clearPropInBookState("currentMessage"));
    };
    return (
        <Grid width={"100%"} container>
            <Grid size={"grow"}>
                <Typography
                    sx={{color: color.DARK_LIGHTER_TEXT}}
                    variant={"h6"}
                    fontWeight={"lighter"}
                >
                    {review && (
                        <>
                            <LuReply/>
                            {appStrings.review.U_R_REPLYING} <strong>{review.accountSenderName}</strong>
                        </>
                    )}
                </Typography>
            </Grid>
            <IconButton onClick={onCloseMessage}>
                <IoClose/>
            </IconButton>
            <Grid size={12}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid width={"100%"} container alignItems={"end"} spacing={2}>
                        <Grid size={"grow"}>
                            <Controller
                                render={({field}) => {
                                    return (
                                        <NeumorphicTextField
                                            variant={"outlined"}
                                            label={appStrings.review.TYPE_REPLY}
                                            fullWidth
                                            value={field.value ?? ""}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            multiline
                                        />
                                    );
                                }}
                                control={control}
                                name={"content"}
                            />
                        </Grid>
                        <NeumorphicButton
                            loading={isLoading}
                            type={"submit"}
                            sx={{textTransform: "none", height: "fit-content"}}
                            variant_2={"primary"}
                        >
                            {appStrings.SEND}
                        </NeumorphicButton>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

function ReviewBoxC(): JSX.Element {
    const store = useAppStore();
    const dispatch = useDispatch();
    const bookId = useSelector(
        (state) => state.bookState.currentBook?.id,
        shallowEqual,
    );
    const [sendReview, {data, error, isLoading}] = useSendReviewMutation();

    function onSubmit(value: ReviewDto) {
        sendReview(value);
    }

    const {control, reset, handleSubmit} = useForm<ReviewDto>({
        defaultValues: {
            content: "",
            rating: 5,
            bookId,
        },
    });
    useEffect(() => {
        if (data?.data) {
            appToaster.success(data.message);
        }
    }, [data, dispatch, store]);
    useEffect(() => {
        if (error) {
            appToaster.error(
                parsErrorToBaseResponse(error)?.message ??
                appStrings.error.REQUEST_ERROR,
            );
        }
    }, [error]);
    useEffect(() => {
        if (bookId) {
            reset({
                content: "",
                rating: 5,
                bookId,
            });
        }
    }, [bookId, reset]);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid width={"100%"} container alignItems={"end"} spacing={2}>
                <Grid size={"grow"}>
                    <Controller
                        render={({field}) => {
                            return (
                                <StarRating
                                    value={field.value ?? 5}
                                    setValue={(value) => {
                                        field.onChange(value ?? 0);
                                    }}
                                />
                            );
                        }}
                        name={"rating"}
                        control={control}
                    />
                    <Controller
                        render={({field}) => {
                            return (
                                <NeumorphicTextField
                                    variant={"outlined"}
                                    label={appStrings.review.TYPE_REVIEW}
                                    fullWidth
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    multiline
                                />
                            );
                        }}
                        control={control}
                        name={"content"}
                    />
                </Grid>
                <Grid>
                    <NeumorphicButton
                        loading={isLoading}
                        type={"submit"}
                        sx={{textTransform: "none", height: "fit-content"}}
                        variant={"outlined"}
                    >
                        {appStrings.SEND}
                    </NeumorphicButton>
                </Grid>
            </Grid>
        </form>
    );
}

export const ReviewBox = memo(ReviewBoxC);
export const ChatBox = memo(ChatBoxC);
