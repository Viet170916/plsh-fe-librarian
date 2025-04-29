"use client";

import React, {memo, useCallback, useMemo, useState} from "react";
import {Badge, Box, Drawer, IconButton, Tooltip, Typography} from "@mui/material";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {motion} from "framer-motion";
import {color} from "@/helpers/resources";
import Grid from "@mui/material/Grid2";
import {BiBell} from "react-icons/bi";
import {TiUserOutline} from "react-icons/ti";
import {useSelector} from "@/hooks/useSelector";
import {shallowEqual} from "react-redux";
import {useAppDispatch} from "@/hooks/useDispatch";
import {setPropToNotificationState} from "@/stores/slices/notification/notification.slice";
import appStrings from "@/helpers/appStrings";
import {Notification} from "@/components/notification/notification";
import {useReadNotificationMutation} from "@/stores/slices/api/notification.api.slice";
import Link from "next/link";

const AppActionBar = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const isRead = useSelector(state => state.notificationState.isRead, shallowEqual);
    const unreadCount = useSelector(state => state.notificationState.unreadCount, shallowEqual);

    function onRead() {
        dispatch(setPropToNotificationState({key: "isRead", value: true}))
    }

    function onOpenNotification() {
        dispatch(setPropToNotificationState({key: "openNotification", value: true}));
    }

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                right: 0,
                height: 100,
                display: "flex",
                alignItems: "center",
                zIndex: 10,
            }}
        >
            <motion.div
                initial={{width: 40}}
                animate={{width: open ? 150 : 40}}
                transition={{type: "spring", stiffness: 200, damping: 20}}
                style={{
                    overflow: 'hidden',
                    display: "flex",
                    alignItems: "center",
                    background: "#fff",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    borderRadius: "20px 0 0 20px",
                    paddingRight: 16,
                    position: "relative",
                    minHeight: 60,
                }}
            >
                <IconButton
                    onClick={() => {
                        onRead();
                        setOpen(!open)
                    }}
                    sx={{
                        height: "60px",
                        color: color.PRIMARY,
                        borderRadius: "20px 0 0 20px",
                        position: "relative",
                        zIndex: 10,
                        flexShrink: 0,
                    }}
                >
                    {open ? <ChevronRight/> :
                        <Badge
                            color="primary"
                            badgeContent={isRead ? 0 : 1}
                            variant="dot"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <ChevronLeft/>
                        </Badge>
                    }
                </IconButton>

                <Grid
                    container
                    sx={{
                        p: 1,
                        color: color.PRIMARY,
                        alignItems: "center",
                        minWidth: 0,
                        flexWrap: "nowrap",
                    }}
                    spacing={2}
                >
                    <Tooltip title={"Thông báo"}>
                        <IconButton onClick={onOpenNotification}>
                            <Badge
                                color="primary"
                                badgeContent={unreadCount}
                                sx={{
                                    '& .MuiBadge-badge': {
                                        color: color.LIGHT_TEXT,
                                        fontWeight: "lighter",
                                        fontSize: 10,
                                    },
                                }}
                                variant="standard"
                            >
                                <BiBell color={color.PRIMARY}/>
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Tài khoản"}>
                        <IconButton component={Link} href={`/user/info`}>
                            <TiUserOutline color={color.PRIMARY}/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </motion.div>
        </Box>
    );
};


export function getRedirectUrlFromNotification(referenceType?: "Review" | "Loan" | "Message", referenceId?: number) {
    switch (referenceType) {
        case "Review":
            return `/resources/books/${referenceId}`
        case "Message":
            return `/resources/books/${referenceId}`
        case "Loan":
            return `/borrow/${referenceId}`
    }
}

export const NotificationDrawer = memo(() => {
        const open = useSelector(state => state.notificationState.openNotification, shallowEqual);
        const [read] = useReadNotificationMutation()
        const dispatch = useAppDispatch();
        const closeDrawer = useCallback(() => {
            dispatch(setPropToNotificationState({key: "openNotification", value: false}));
        }, [dispatch]);
        const notifications = useSelector(state => state.notificationState.currentNotifications, shallowEqual);
        const handleNotificationClick = useCallback(async (id: number) => {
            await read(id);
            closeDrawer();
        }, [closeDrawer, read])
        const notificationList = useMemo(() => {
            return notifications.map((notification) => {
                return (
                    <Grid size={12} key={notification.id} onClick={() => handleNotificationClick(notification.id)}>
                        <Notification notification={notification}
                                      redirectUrl={getRedirectUrlFromNotification(notification.reference, notification.referenceId)}/>
                    </Grid>
                );
            })
        }, [handleNotificationClick, notifications])
        return (
            <Drawer
                anchor="right"
                open={open}
                onClose={closeDrawer}
                sx={{
                    '& .MuiDrawer-paper': {
                        background: "transparent",
                        boxShadow: "none",
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        padding: 5,
                        width: 500,
                    },
                }}
            >
                <Grid container width={"100%"} spacing={2}>
                    <Typography variant="h4" gutterBottom fontWeight={"bold"} sx={{color: color.PRIMARY}}>
                        {appStrings.NOTIFICATION}
                    </Typography>
                    {notificationList}
                </Grid>
            </Drawer>
        );
    }
)


export default memo(AppActionBar);
