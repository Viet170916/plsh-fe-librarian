"use client";
import {ChatBox} from "@/app/(private)/(in-dash-board)/resources/books/[id]/(read-only)/review/review.input";
import {Zoom} from "@/components/Animation/animation";
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
import {Box, CircularProgress, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid2";
import {SimpleTreeView} from "@mui/x-tree-view/SimpleTreeView";
import React, {JSX, memo, useCallback, useEffect, useMemo} from "react";
import {shallowEqual} from "react-redux";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";

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
            ? reviews.map((review, index) => <ReviewItem key={review.id} review={review} index={index}/>)
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

const ReviewItem = memo(({review, index}: { review: ReviewDto, index: number }) => {
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
            return messagesInReview.map((message, index) => {
                return (
                    <Grid key={message.id} size={12}>
                        <MessageItem message={message} review={review} index={index}/>
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
        <Grid size={12} sx={{
            boxShadow: NEUMORPHIC_SHADOW.SHADOW(), borderRadius: 2, pb: .2,
            mb: 2,
        }}>
            <ReviewItemPreview review={review} index={index}/>
            <Grid size={12}>
                {currentMessage?.reviewId === review.id &&
                    <ChatBox review={review} repliedId={review.accountSenderId}/>}
            </Grid>
            <Grid sx={{m: 1, boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(), borderRadius: 2, p: 1}}>
                {messages}
                {isLoading && <CircularProgress size="10px"/>}
                {/*<Typography*/}
                {/*    onClick={onSeeMoreMessage}*/}
                {/*    variant={"h6"}*/}
                {/*    sx={{*/}
                {/*        fontWeight: "bold",*/}
                {/*        textDecoration: "underline",*/}
                {/*        cursor: "pointer",*/}
                {/*    }}*/}
                {/*>*/}
                {/*    {appStrings.review.SEE_REPLY}*/}
                {/*</Typography>*/}
            </Grid>

        </Grid>
    );
});
const ReviewItemPreview = memo(({review, index}: { review: ReviewDto, index: number }) => {
    const dispatch = useAppDispatch();
    const ME = useSelector((state) => state.global.me);
    const onReply = () => {
        dispatch(
            setPropToBookState({key: "currentMessage.reviewId", value: review.id}),
        );
        dispatch(clearPropInBookState("currentMessage.repliedId"));
    };
    return (
        <Zoom index={index}>
            <Grid
                container
                width={"100%"}
                sx={{
                    color: color.DARK_TEXT,
                    borderRadius: 2,
                    p: 1.5,
                    boxShadow: NEUMORPHIC_SHADOW.SHADOW(),
                }}
                spacing={1}
            >
                <Grid>
                    <Box sx={{boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(), p: 1, borderRadius: "50%"}}>
                        <Avatar/>
                    </Box>
                </Grid>
                <Grid size={"grow"} container>
                    <Grid size={12}>
                        <Typography
                            variant={"h6"}
                            color={review.accountSenderId === ME?.id ? "primary" : "textPrimary"}
                            sx={{fontWeight: "bold", textDecoration: "underline"}}
                        >
                            {review.accountSenderName}
                        </Typography>
                        <Grid size={"grow"}>
                            <StarRating readOnly value={review.rating ?? 5} size="small"/>
                        </Grid>
                    </Grid>
                    <Grid size={12}
                        // sx={{boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(), p: 1, borderRadius: 1}}
                    >
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
        </Zoom>
    );
});
const MessageItem = memo(
    ({message, index}: { message: MessageDto; review: ReviewDto, index: number }) => {
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
            <Zoom index={index}
                  style={{display: "flex", justifyContent: message.senderId === ME?.id ? "end" : "start"}}>
                <Box sx={{
                    // boxShadow: NEUMORPHIC_SHADOW.SHADOW(),
                    borderRadius: 2,
                    my: .5,
                    p: 1,
                    width: "fit-content",
                    justifySelf: "end",
                }}>
                    <Grid
                        container
                        sx={{
                            boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
                            // bgcolor:
                            //     message.senderId === ME?.id ? color.PRIMARY_O10 : color.WHITE,
                            borderRadius: 2,
                            p: 2,

                        }}
                        spacing={1}
                    >

                        <Grid>
                            <Avatar src={message.senderAvatar}/>
                        </Grid>
                        <Grid size={"grow"} container>
                            <Grid size={12}>
                                <Typography
                                    color={message.senderId === ME?.id ? "primary" : "textPrimary"}
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
                </Box>

            </Zoom>
        );
    },
);
export default memo(ReviewContainer);
