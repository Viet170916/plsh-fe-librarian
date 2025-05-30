import {Account} from "@/app/(public)/auth/store/account.slice";
import {BorrowedBookData} from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import dayjs from "dayjs";
import {correctTime} from "@/helpers/time";

export function deepEqual<T>(obj1: T, obj2: T): boolean {
    if (obj1 === obj2) return true;
    if (
        typeof obj1 !== "object" || typeof obj2 !== "object" ||
        obj1 === null || obj2 === null
    ) {
        return false;
    }
    const keys1 = Object.keys(obj1) as (keyof T)[];
    const keys2 = Object.keys(obj2) as (keyof T)[];
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!deepEqual(obj1[key], obj2[key])) return false;
    }
    return true;
}


export function validateBorrowedBooks(borrowedBooks: BorrowedBookData[]): "complete" | "incomplete" | "warning" {
    if (borrowedBooks.length === 0) {
        return "incomplete";
    }

    const now = dayjs();
    const nowMinus30Min = now.subtract(30, "minute");
    const nowPlus30Min = now.add(30, "minute");

    let hasWarning = false;

    for (const book of borrowedBooks) {
        if (
            !book.bookInstance ||
            !book.beforeBorrow ||
            !book.borrowDateRange.start ||
            !book.borrowDateRange.end
        ) {
            return "incomplete";
        }

        const start = dayjs(correctTime(book.borrowDateRange.start));
        const end = dayjs(correctTime(book.borrowDateRange.end));

        if (!start.isValid() || !end.isValid() || start.isBefore(nowMinus30Min) || end.isBefore(start.add(30, "minute"))) {
            return "incomplete";
        }

        if (
            !book.beforeBorrow.images ||
            book.beforeBorrow.images.length <= 0 ||
            !book.beforeBorrow.note
        ) {
            hasWarning = true;
        }
    }

    return hasWarning ? "warning" : "complete";
}

const fieldNames: Record<keyof Account, string> = {
    id: "Thông tin người dùng",
    role: "Kiểu người dùng",
    fullName: "Họ và tên",
    birthdate: "Ngày sinh",
    address: "Địa chỉ",
    phoneNumber: "Số điện thoại",
    email: "Email",
    identityCardNumber: "Số CMND/CCCD",
    status: "Trạng thái",
    googleToken: "Token Google",
    googleUserId: "ID Google",
    password: "Mật khẩu",
    classRoom: "Lớp học",
    avatarUrl: "Ảnh đại diện",
    cardMemberNumber: "Số thẻ thành viên",
    cardMemberStatus: "Trạng thái thẻ",
};

export function validateBorrower(borrower: Account): { field: keyof Account, fieldName: string }[] {
    const missingFields: (keyof Account)[] = [];
    if (!borrower || !borrower.id) {
        return [{field: "id", fieldName: "Không xác định được thành viên"}];
    }
    if (!borrower.role) {
        return [{field: "role", fieldName: "Không xác định được quyền của thành viên trong hệ thống "}];
    }
    if (!borrower.fullName) missingFields.push("fullName");
    // if (!borrower.birthdate) missingFields.push("birthdate");
    // if (!borrower.address) missingFields.push("address");
    if (!borrower.phoneNumber) missingFields.push("phoneNumber");
    if (!borrower.email) missingFields.push("email");
    if (!borrower.identityCardNumber) missingFields.push("identityCardNumber");
    // if( !borrower.status ) missingFields.push( "status" );
    return missingFields.map(f => ({
        field: f,
        fieldName: fieldNames[f],
    }));
}

