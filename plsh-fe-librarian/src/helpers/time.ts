"use client"
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import {constants} from "@/helpers/constants";
import dayjs from "dayjs";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("vi");

export function getPreviousDaysNames() {
    const today = new Date();
    const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const dateFormat = new Intl.DateTimeFormat("vi-VN", {day: "2-digit", month: "2-digit", year: "2-digit"});
    const previousDays = [];
    for (let i = 9; i >= 0; i--) { // Bắt đầu từ 9 ngày trước để kết quả theo thứ tự tăng dần
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = dateFormat.format(date);
        const dayName = dayNames[date.getDay()];
        previousDays.push(`${dayName}\n(${formattedDate})`);
    }
    return previousDays;
}

export function getDayFromNow(numOfDayMove: number): Date {
    const today = new Date();
    today.setDate(today.getDate() + numOfDayMove);
    return today;
}

export function formatTimeAgo(inputDate: string): string {

    const now = dayjs();
    const date = dayjs(inputDate).utc(true);
    if (date.isAfter(now)) {
        return "Vừa gửi";
    }
    const diffInMinutes = now.diff(date, "minute");
    const diffInHours = now.diff(date, "hour");
    const diffInDays = now.diff(date, "day");
    const diffInWeeks = now.diff(date, "week");
    const diffInYears = now.diff(date, "year");
    if (diffInMinutes < 1) {
        return "Vừa gửi";
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
        return `${diffInHours} giờ trước`;
    } else if (diffInDays < 7) {
        return `${diffInDays} ngày trước`;
    } else if (diffInWeeks < 4) {
        return `${diffInWeeks} tuần trước`;
    } else if (diffInYears < 1) {
        return date.format("DD/MM/YYYY");
    } else {
        return date.format("DD/MM/YYYY");
    }
}

export function formatTime(ioString: string) {

    return dayjs(correctTime(ioString)).format(constants.dateFormat);
}

export function correctTime(ioString: string) {
    const term = (ioString?.endsWith("z") || ioString?.includes("+") || ioString?.endsWith("Z")) ? ioString : `${ioString}Z`;
    return term;
}
