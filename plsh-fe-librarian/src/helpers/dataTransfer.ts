import {BookData, BookInstance, Member, Resource} from "@/helpers/appType";
import {compressImage, urlToFile} from "@/helpers/convert";
import {AddEditBorrowData, BorrowStatusData} from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import {AddEditBookData, BookBaseInfo, BookOverview} from "@/stores/slices/book-states/book.add-edit.slice";

export async function mapToLoanApi(data: AddEditBorrowData, isKeepFile: boolean = false): Promise<LoanDto> {
    return {
        id: data.id ?? 0,
        note: data.baseInfo.note ?? "",
        borrowerId: data.borrower.id ?? 0,
        librarianId: 0, // Nếu có thông tin librarian, cần cập nhật tại đây
        borrowingDate: data.baseInfo.borrowDate ? new Date(data.baseInfo.borrowDate).toISOString() : new Date().toISOString(),
        returnDate: null, // Cập nhật nếu có returnDate
        aprovalStatus: "approved", // Chỉnh lại nếu có trạng thái cụ thể
        extensionCount: 0, // Giữ mặc định, nếu có logic khác thì cập nhật
        bookBorrowings: await Promise.all(
            data.borrowedBooks.map(async (book) => ({
                id: book.id,
                bookInstanceId: book.bookInstance.id ?? 0,
                noteBeforeBorrow: book.beforeBorrow.note,
                noteAfterBorrow: book.afterBorrow.note,
                loanId: data.id,
                borrowingStatus: book.borrowingStatus,
                borrowDate: book.borrowDateRange.start ? new Date(book.borrowDateRange.start).toISOString() : new Date().toISOString(),
                createdAt: new Date().toISOString(),
                returnDates: book.borrowDateRange.end ? [new Date(book.borrowDateRange.end).toISOString()] : [],
                extendDates: [],
                isFined: false,
                fineType: null,
                note: book.beforeBorrow.note,
                bookImagesBeforeBorrow: await Promise.all(
                    book.beforeBorrow.images?.map(async (re) => ({
                        ...re,
                        file: isKeepFile && re.localUrl ? await compressImage(await urlToFile(re.localUrl, re.name ?? "", re.fileType ?? "image/png"), "SD_480P") : undefined,
                        localUrl: undefined,
                    })) ?? [],
                ),
                bookImagesAfterBorrow: [],
            }))),
    };
}

export type LoanDto = {
    isReturnAll?: boolean;
    isCart?: boolean;
    dayUsageCount?: number;
    id: number;
    note: string;
    borrowerId: number;
    borrower?: Member;
    librarianId: number;
    borrowingDate: string;
    returnDate?: string | null;
    aprovalStatus: LoanStatus;
    extensionCount: number;
    bookBorrowings: BookBorrowingDto[];
};
export type BookBorrowingDto = {
    borrowerId?: number;
    borrowerAvatar?: string;
    borrowerFullName?: string;
    borrowerEmail?: string;
    borrowerPhone?: string;
    borrowerClass?: string;
    borrowerRole?: string;
    actualReturnDate?: string;
    overdueDateCount?: number;
    overdueDays?: number;
    bookImagesBeforeBorrow: Resource[];
    bookImageUrlsBeforeBorrow?: string[];
    bookImagesAfterBorrow: Resource[];
    bookImageUrlsAfterBorrow?: string[];
    //
    id?: number;
    bookInstanceId: number;
    bookInstance?: BookInstance;
    noteBeforeBorrow?: string;
    noteAfterBorrow?: string;
    loanId?: number;
    borrowingStatus: BorrowStatusData;
    borrowDate: string;
    createdAt: string;
    returnDates: string[];
    returnDate?: string;
    extendDates: string[];
    extendDate?: string;
    isFined: boolean;
    fineType?: FineType | null;
    note?: string;
};
type BookImage = {
    file: File;
    localUrl: string;
};

function mergeBookImages(
    rawData: BookBorrowingDto[],
    processedData: BookBorrowingDto[],
): BookImage[] {
    const mergedImages: BookImage[] = [];
    rawData.forEach((rawItem) => {
        const processedItem = processedData.find(
            (p) => p.bookInstanceId === rawItem.bookInstanceId,
        );
        if (processedItem) {
            rawItem.bookImagesBeforeBorrow.forEach((rawImage, index) => {
                const processedImage = processedItem.bookImagesBeforeBorrow[index];
                if (processedImage) {
                    if (rawImage.file && processedImage.localUrl) {
                        mergedImages.push({
                            file: rawImage.file,
                            localUrl: processedImage.localUrl,
                        });
                    }
                }
            });
        }
    });
    return mergedImages;
}

function splitBookImages(mergedImages: BookImage[]): { beforeBorrowImages: File[]; pathsToFile: string[] } {
    const beforeBorrowImages: File[] = [];
    const pathsToFile: string[] = [];
    mergedImages.forEach((image) => {
        beforeBorrowImages.push(image.file);
        pathsToFile.push(image.localUrl);
    });
    return {beforeBorrowImages, pathsToFile};
}

export function mergeToUploadImage(rawData: BookBorrowingDto[],
    processedData: BookBorrowingDto[]) {
    return splitBookImages(mergeBookImages(rawData, processedData));
}

export type BorrowingStatus = "Borrowed" | "Returned" | "Overdue"; // Trạng thái sách đã mượn
export type FineType = "lateReturn" | "damagedBook" | "lostBook"; // Loại phạt
export type LoanStatus = "pending" | "approved" | "rejected" | "taken" | "cancel" | "return-all" | ""; // Trạng thái duyệt

function isValidValue(value: unknown): boolean {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (typeof value === 'number' && isNaN(value)) return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (typeof value === 'object' && Object.keys(value).length === 0) return false;
    return true;
}

export function mergeBookDataToAddEdit(
    bookData: BookData,
    existing: AddEditBookData
): AddEditBookData {
    const mergedBaseInfo: BookBaseInfo = {
        ...existing.baseInfo,
        ...(isValidValue(bookData.title) && {title: bookData.title}),
        ...(isValidValue(bookData.version) && {version: bookData.version}),
        ...(isValidValue(bookData.publisher) && {publisher: bookData.publisher}),
        ...(isValidValue(bookData.publishDate) && {publishDate: bookData.publishDate}),
        ...(isValidValue(bookData.language) && {language: bookData.language}),
        ...(isValidValue(bookData.pageCount) && {pageCount: bookData.pageCount}),
        ...(isValidValue(bookData.isbnNumber13) && {isbnNumber13: bookData.isbnNumber13}),
        ...(isValidValue(bookData.isbnNumber10) && {isbnNumber10: bookData.isbnNumber10}),
        ...(isValidValue(bookData.price) && {price: bookData.price}),
        ...(isValidValue(bookData.otherIdentifier) && {otherIdentifier: bookData.otherIdentifier}),
        ...(isValidValue(bookData.height) && {height: bookData.height}),
        ...(isValidValue(bookData.width) && {width: bookData.width}),
        ...(isValidValue(bookData.thickness) && {thickness: bookData.thickness}),
        ...(isValidValue(bookData.weight) && {weight: bookData.weight}),
        ...(isValidValue(bookData.category) && {category: bookData.category}),
        ...(isValidValue(bookData.newCategory) && {newCategory: bookData.newCategory}),
    };

    const mergedOverview: BookOverview = {
        ...existing.overview,
        ...(isValidValue(bookData.language) && {language: bookData.language}),
        ...(isValidValue(bookData.pageCount) && {pageCount: bookData.pageCount}),
        ...(isValidValue(bookData.publisher) && {publisher: bookData.publisher}),
        ...(isValidValue(bookData.publishDate) && {publishDate: bookData.publishDate}),
        ...(isValidValue(bookData.isbnNumber13) && {isbnNumber13: bookData.isbnNumber13}),
        ...(isValidValue(bookData.isbnNumber10) && {isbnNumber10: bookData.isbnNumber10}),
        ...(isValidValue(bookData.price) && {price: bookData.price}),
        ...(isValidValue(bookData.otherIdentifier) && {otherIdentifier: bookData.otherIdentifier}),
        ...(isValidValue(bookData.description) && {description: bookData.description}),
        ...(isValidValue(bookData.height) && {height: bookData.height}),
        ...(isValidValue(bookData.width) && {width: bookData.width}),
        ...(isValidValue(bookData.thickness) && {thickness: bookData.thickness}),
        ...(isValidValue(bookData.weight) && {weight: bookData.weight}),
    };

    const mergedAuthors = isValidValue(bookData.authors)
        ? bookData.authors
        : existing.authors;

    return {
        resource: existing.resource,
        baseInfo: mergedBaseInfo,
        overview: mergedOverview,
        authors: mergedAuthors,
    };
}

