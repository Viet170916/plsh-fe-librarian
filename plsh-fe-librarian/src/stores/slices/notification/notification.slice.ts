import {NotificationDto} from "@/helpers/appType";
import {RootState} from "@/stores/store";
import {createSlice, PayloadAction, Slice, SliceSelectors,} from "@reduxjs/toolkit";
import {WritableDraft} from "immer";
import {get, Path, PathValue, set} from "react-hook-form";
import {createSelector} from "reselect";
// type
type NotificationState = {
    currentNotification?: NotificationDto;
    currentNotifications: NotificationDto[];
    isRead: boolean;
    openNotification: boolean,
    unreadCount: number;
};
export const initNotificationState: NotificationState = {
    currentNotification: undefined,
    currentNotifications: [],
    isRead: true,
    openNotification: false,
    unreadCount: 0,
};
export type PayLoad<ParentObj, Key extends Path<ParentObj>> = {
    key: Key;
    value: PathValue<ParentObj, Key>;
};
type NotificationStateSlice = Slice<
    NotificationState,
    {
        addUnread: (state: WritableDraft<NotificationState>) => void;
        setPropToNotificationState: <K extends Path<NotificationState>>(
            state: WritableDraft<NotificationState>,
            action: PayloadAction<PayLoad<NotificationState, K>>,
        ) => void;
        addNotificationToTop: (
            state: WritableDraft<NotificationState>,
            action: PayloadAction<NotificationDto>,
        ) => void;
        clearPropToNotificationState: <K extends Path<NotificationState>>(
            state: WritableDraft<NotificationState>,
            action: PayloadAction<K>,
        ) => void;
        clearAllNotificationState: (
            state: WritableDraft<NotificationState>,
        ) => void;
    },
    "notificationState",
    "notificationState",
    SliceSelectors<NotificationState>
>;
//slice
const notificationStateSlice: NotificationStateSlice = createSlice({
    name: "notificationState",
    initialState: initNotificationState,
    reducers: {
        addUnread(state) {
            state.unreadCount = state.unreadCount + 1;
        },
        addNotificationToTop(state, {payload: notification}) {
            state.currentNotifications.unshift(notification);
        },
        setPropToNotificationState(state, {payload: {key, value}}) {
            set(state, key, value);
        },
        clearPropToNotificationState(state, {payload: key}) {
            set(state, key, get(initNotificationState, key));
        },
        clearAllNotificationState(state) {
            state.currentNotification = initNotificationState.currentNotification;
            state.currentNotifications = initNotificationState.currentNotifications;
        },
    },
});
//export
export const selectNotificationById = createSelector(
    (state: RootState) => state.notificationState.currentNotifications ?? [],
    (_, notificationId?: number) => notificationId,
    (notifications: NotificationDto[], notificationId?: number) =>
        notifications.find((s) => s.id === notificationId),
);
export const {
    setPropToNotificationState,
    addNotificationToTop,
    addUnread,
    clearPropToNotificationState,
    clearAllNotificationState,
} = notificationStateSlice.actions;
const notificationStateReducer = notificationStateSlice.reducer;
export default notificationStateReducer;
//...............
