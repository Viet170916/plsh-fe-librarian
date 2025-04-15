import React, {memo} from "react";
import {MessageDto, NotificationDto, ReviewDto} from "@/helpers/appType";
import Link from "next/link";
import Grid from "@mui/material/Grid2";
import {color} from "@/helpers/resources";
import Avatar from "@mui/material/Avatar";
import {Badge, Typography} from "@mui/material";
import {objectToQueryParams} from "@/helpers/convert";
import {LoanDto} from "@/helpers/dataTransfer";
import {formatTimeAgo} from "@/helpers/time";

export const ReviewNotification = memo(({review}: { review: ReviewDto }) => {
    return (
        <Link href={`/resources/books/${review.bookId}`}>
            <Grid
                width={"100%"}
                sx={{
                    background: `linear-gradient(to right, ${color.FIFTH},${color.FOUR})`,
                    borderRadius: 4,
                    width: "100%",
                    p: 3,
                    boxShadow: `0.3rem 0.3rem 0.6rem ${color.LIGHTER_SHADOW}`,
                }}
                container spacing={2}
            >
                <Avatar src={review.accountSenderAvatar}/>
                <Grid size={"grow"}>
                    <Typography sx={{color: color.LIGHT_TEXT}}>
                        <strong>{review.accountSenderName}</strong>
                        {` vừa mới phản hồi đánh giá của bạn với nội dung ${'"'}${review.content}$ `}
                    </Typography>
                </Grid>
            </Grid>
        </Link>
    );
});
export const LoanNotification = memo(({loan, notification}: { loan: LoanDto, notification: NotificationDto }) => {
    return (
        <Link href={`/borrow/${notification.referenceId}`}>
            <Grid
                width={"100%"}

                sx={{
                    background: `linear-gradient(to right, ${color.FIFTH},${color.FOUR})`,
                    borderRadius: 4,
                    width: "100%",
                    p: 3,
                    boxShadow: `0.3rem 0.3rem 0.6rem ${color.LIGHTER_SHADOW}`,
                }}
                container spacing={2}
            >
                <Avatar src={loan.borrower?.avatarUrl}/>
                <Grid size={"grow"}>
                    <Typography sx={{color: color.LIGHT_TEXT}}>
                        {notification.content}
                    </Typography>
                </Grid>
            </Grid>
        </Link>
    );
});
export const MessageNotification = memo(({message}: { message: MessageDto }) => {
    return (
        <Link
            href={`/resources/books/${message.review?.bookId}${objectToQueryParams({review: message.reviewId})}`}
        >
            <Grid
                width={"100%"}

                sx={{
                    background: `linear-gradient(to right, ${color.SIXTH},${color.PRIMARY})`,
                    borderRadius: 4,
                    width: "100%",
                    p: 3,
                    boxShadow: `0.3rem 0.3rem 0.6rem ${color.LIGHTER_SHADOW}`,
                }}
                spacing={2}
                container
            >
                <Avatar src={message.senderAvatar}/>
                <Grid size={"grow"}>
                    <Typography
                        sx={{color: color.LIGHT_TEXT}}
                        fontWeight={"lighter"}
                        variant={"h6"}
                    >
                        <strong>{message.senderName}</strong>
                        {` vừa mới phản hồi bạn với nội dung ${'"'}${message.content}${'"'}`}
                    </Typography>
                </Grid>
            </Grid>
        </Link>
    );
});
export const Notification = memo(({notification, redirectUrl, image}: {
    notification: NotificationDto,
    redirectUrl?: string,
    image?: string
}) => {
    return (
        <Link
            href={redirectUrl ?? ""}
        >
            <Badge anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }} color={"primary"} variant={"dot"} badgeContent={notification.isRead ? 0 : 1} sx={{width: "100%"}}>
                <Grid
                    width={"100%"}
                    sx={{
                        background: notification.isRead ? `linear-gradient(to right, ${color.DARK},${color.LESS_DARK})` : `linear-gradient(to right, ${color.PRIMARY},${color.SIXTH})`,
                        borderRadius: 4,
                        width: "100%",
                        p: 3,
                        boxShadow: `0.3rem 0.3rem 0.6rem ${color.LIGHTER_SHADOW}`,
                    }}
                    spacing={2}
                    container
                >
                    {image && <Avatar src={image}/>}
                    <Grid size={"grow"}>
                        <Typography sx={{color: notification.isRead ? color.DARK_LIGHTER_TEXT : color.LIGHT_TEXT}}
                                    fontWeight={"bold"}
                                    variant={"h6"}>
                            {notification.title}
                        </Typography>
                        <Typography
                            sx={{color: notification.isRead ? color.DARK_LIGHTER_TEXT : color.LIGHT_TEXT}}
                            variant={"h6"}
                        >
                            {notification.content}
                        </Typography>
                        <Typography sx={{color: notification.isRead ? color.DARK_LIGHTER_TEXT : color.LIGHT_TEXT}}
                                    fontWeight={"lighter"}
                                    fontSize={9}>
                            {formatTimeAgo(notification.date)}
                        </Typography>
                    </Grid>
                </Grid>
            </Badge>
        </Link>
    );
});
