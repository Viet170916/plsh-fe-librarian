import {BaseResponse, FilterParams, NotificationDto} from "@/helpers/appType";
import {constants} from "@/helpers/constants";
import {baseQueryWithReAuth} from "@/stores/slices/api/api.config";
import {createApi} from "@reduxjs/toolkit/query/react";

const httpMethods = constants.http.method;
export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["Notifications", "Notification"],
    endpoints: (builder) => ({
        getNotifications: builder.query<
            BaseResponse<NotificationDto[]> & { unreadCount: number },
            FilterParams<NotificationDto>
        >({
            query: (param) => ({
                url: `/notification`,
                params: param,
            }),
            providesTags: () => [{type: "Notifications"}],
        }),
        readNotification: builder.mutation<
            BaseResponse<NotificationDto> & { unreadCount: number },
            number
        >({
            query: (id: number) => ({
                url: `/notification/read/${id}`,
                method: httpMethods.POST,
            }),
            invalidatesTags: () => [{type: "Notifications"}],
        }),
    }),
});
export const {useLazyGetNotificationsQuery, useReadNotificationMutation, usePrefetch} = notificationApi;
