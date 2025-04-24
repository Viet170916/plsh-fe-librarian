"use client";
import {ChatBox} from "@/app/(private)/(in-dash-board)/resources/books/[id]/(read-only)/review/review.input";
import {ZoomInAnimation} from "@/components/Animation/animation";
import StarRating from "@/components/primary/StarRating";
import appStrings from "@/helpers/appStrings";
import {MessageDto, ReviewDto} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {formatTimeAgo} from "@/helpers/time";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useSelector} from "@/hooks/useSelector";
import {useLazyGetMessagesQuery} from "@/stores/slices/api/review.api.slice";
import {
    clearPropInBookState,
    selectMessageByReviewId,
    setMessagesToReview,
    setPropToBookState,
} from "@/stores/slices/book-states/book.slice";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {CircularProgress, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid2";
import {SimpleTreeView} from "@mui/x-tree-view/SimpleTreeView";
import React, {JSX, memo, useCallback, useEffect, useMemo} from "react";
import {shallowEqual} from "react-redux";

declare module "react" {
    interface CSSProperties {
        "--tree-view-color"?: string;
        "--tree-view-bg-color"?: string;
    }
}

function EndIcon() {
    return <div style={{width: 24}}/>;
}

function ReviewContainer(): JSX.Element {
    const reviews = useSelector(
        (state) => state.bookState.currentBookReviews,
        shallowEqual,
    );
    const reviewsList = useMemo(() => {
        return reviews
            ? reviews.map((review) => <ReviewItem key={review.id} review={review}/>)
            : [];
    }, [reviews]);
    return (
        <SimpleTreeView
            slots={{
                expandIcon: ArrowRightIcon,
                collapseIcon: ArrowDropDownIcon,
                endIcon: EndIcon,
            }}
        >
            {reviewsList}
        </SimpleTreeView>
    );
}

const ReviewItem = memo(({review}: { review: ReviewDto }) => {
    const [getMessages, {data, error, isLoading}] = useLazyGetMessagesQuery();
    const currentMessage = useSelector((state) => state.bookState.currentMessage);
    const messagesInReview = useSelector((state) =>
        selectMessageByReviewId(state, review.id),
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data?.data && review?.id) {
            dispatch(
                setMessagesToReview({
                    reviewId: review.id,
                    data: data?.data,
                }),
            );
        }
    }, [data, dispatch, review.id]);
    const messages = useMemo(() => {
        if (messagesInReview) {
            return messagesInReview.map((message) => {
                return (
                    <Grid key={message.id} size={12}>
                        <MessageItem message={message} review={review}/>
                        {currentMessage?.repliedId === message.id && (
                            <ChatBox review={review} repliedId={message.senderId}/>
                        )}
                    </Grid>
                );
            });
        } else return [];
    }, [currentMessage?.repliedId, messagesInReview, review]);
    const onSeeMoreMessage = useCallback(() => {
        if (review.id) getMessages({reviewId: review.id, page: 1, limit: 40});
    }, [getMessages, review.id]);
    useEffect(() => {
        onSeeMoreMessage();
    }, [onSeeMoreMessage]);
    return (
        <Grid size={12}>
            <ReviewItemPreview review={review}/>
            <Grid size={12}>
                {currentMessage?.reviewId === review.id && <ChatBox review={review}/>}
            </Grid>
            {messages}
            {isLoading && <CircularProgress size="10px"/>}
            <Typography
                onClick={onSeeMoreMessage}
                variant={"h6"}
                sx={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    cursor: "pointer",
                }}
            >
                {appStrings.review.SEE_REPLY}
            </Typography>
        </Grid>
    );
});
const ReviewItemPreview = memo(({review}: { review: ReviewDto }) => {
    const dispatch = useAppDispatch();
    const ME = useSelector((state) => state.global.me);
    const onReply = () => {
        dispatch(
            setPropToBookState({key: "currentMessage.reviewId", value: review.id}),
        );
        dispatch(clearPropInBookState("currentMessage.repliedId"));
    };
    return (
        <ZoomInAnimation>
            <Grid
                mt={6}
                container
                width={"100%"}
                sx={{
                    color: color.DARK_TEXT,
                    bgcolor:
                        review.accountSenderId === ME?.id
                            ? color.PRIMARY_20
                            : color.WARNING_10,
                    borderRadius: 3,
                    p: 2,
                    boxShadow: `0.3rem 0.3rem 0.6rem ${color.LIGHTER_SHADOW}, -0.2rem -0.2rem 0.5rem ${color.WHITE}`,
                }}
                spacing={1}
            >
                <Grid>
                    <Avatar/>
                </Grid>
                <Grid size={"grow"} container>
                    <Grid size={12}>
                        <Typography
                            variant={"h6"}
                            sx={{fontWeight: "bold", textDecoration: "underline"}}
                        >
                            {review.accountSenderName}
                        </Typography>
                        <Grid size={"grow"}>
                            <StarRating readOnly value={review.rating ?? 5} size="small"/>
                        </Grid>
                    </Grid>
                    <Grid size={12}>
                        <Typography>{review.content}</Typography>
                    </Grid>
                </Grid>
                <Grid size={12} container spacing={2}>
                    <Typography
                        onClick={onReply}
                        variant={"h6"}
                        sx={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                    >
                        {appStrings.review.REPLY}
                    </Typography>
                    <Typography
                        variant={"h6"}
                        sx={{
                            fontWeight: "lighter",
                            textDecoration: "underline",
                        }}
                    >
                        {formatTimeAgo(review.createdDate)}
                    </Typography>
                </Grid>
            </Grid>
        </ZoomInAnimation>
    );
});
const MessageItem = memo(
    ({message}: { message: MessageDto; review: ReviewDto }) => {
        const dispatch = useAppDispatch();
        const ME = useSelector((state) => state.global.me);
        const onReplyMess = () => {
            dispatch(
                setPropToBookState({
                    key: "currentMessage.repliedId",
                    value: message.id,
                }),
            );
            dispatch(clearPropInBookState("currentMessage.reviewId"));
        };
        return (
            <ZoomInAnimation>
                <Grid
                    container
                    sx={{
                        color: color.DARK_TEXT,
                        bgcolor:
                            message.senderId === ME?.id ? color.PRIMARY_O10 : color.WHITE,
                        borderRadius: 10,
                        p: 2,
                        ml: message.senderId === ME?.id ? 10 : 0,
                        mr: message.senderId === ME?.id ? 0 : 10,
                    }}
                    spacing={1}
                >
                    <Grid>
                        <Avatar src={message.senderAvatar}/>
                    </Grid>
                    <Grid size={"grow"} container>
                        <Grid size={12}>
                            <Typography
                                sx={{fontWeight: "bold", textDecoration: "underline"}}
                            >
                                {message.senderName}
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            <Typography>{message.content}</Typography>
                        </Grid>
                    </Grid>
                    <Grid size={12} container>
                        <Typography
                            onClick={onReplyMess}
                            variant={"h6"}
                            sx={{
                                fontWeight: "bold",
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                        >
                            {appStrings.review.REPLY}
                        </Typography>
                        <Typography
                            variant={"h6"}
                            sx={{
                                fontWeight: "lighter",
                                textDecoration: "underline",
                            }}
                        >
                            {formatTimeAgo(message.createdDate)}
                        </Typography>
                    </Grid>
                </Grid>
            </ZoomInAnimation>
        );
    },
);
export default memo(ReviewContainer);
