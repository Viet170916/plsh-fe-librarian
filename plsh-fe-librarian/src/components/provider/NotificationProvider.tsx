"use client";
import {appToaster} from "@/components/primary/toaster";
import {NotificationDto} from "@/helpers/appType";
import {useAppDispatch} from "@/hooks/useDispatch";
import {useSignalR} from "@/signalR/signal-r.config";
import {useLazyGetNotificationsQuery} from "@/stores/slices/api/notification.api.slice";
import {
    addNotificationToTop,
    addUnread,
    setPropToNotificationState,
} from "@/stores/slices/notification/notification.slice";
import React, {memo, useEffect} from "react";
import {LoanNotification, MessageNotification, ReviewNotification} from "@/components/notification/notification";


function NotificationProvider() {
    const dispatch = useAppDispatch();
    const [getNotifications, {data: notificationResponse}] =
        useLazyGetNotificationsQuery();
    const {data: notification} = useSignalR<NotificationDto>(
        "bookHiveHub",
        "ReceiveNotification",
    );
    useEffect(() => {
        getNotifications({page: 1, limit: 20});
    }, [getNotifications]);
    useEffect(() => {
        if (notificationResponse) {
            dispatch(
                setPropToNotificationState({
                    key: "currentNotifications",
                    value: notificationResponse.data,
                }),
            );
            dispatch(
                setPropToNotificationState({
                    key: "unreadCount",
                    value: notificationResponse.unreadCount,
                }),
            );
            if (notificationResponse.unreadCount > 0) {
                dispatch(
                    setPropToNotificationState({
                        key: "isRead",
                        value: false
                    }),
                );
            }
            dispatch(addUnread());
        }
    }, [notificationResponse, dispatch]);
    useEffect(() => {
        if (notification) {
            dispatch(addNotificationToTop(notification));
            if (notification.referenceData)
                switch (notification.reference) {
                    case "Review":
                        appToaster.custom(
                            <ReviewNotification review={notification.referenceData}/>,
                            "top-right",
                            26000,
                        );
                        break;
                    case "Message":
                        appToaster.custom(
                            <MessageNotification message={notification.referenceData}/>,
                            "top-right",
                            26000,
                        );
                        break;
                    case "Loan":
                        appToaster.custom(
                            <LoanNotification loan={notification.referenceData} notification={notification}/>,
                            "top-right",
                            26000,
                        );
                        break;
                    default:
                        appToaster.info(notification.content);
                        break;
                }
        }
    }, [notification, dispatch]);
    return <></>;
}

export default memo(NotificationProvider);
