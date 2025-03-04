import {Session} from "next-auth";
import React from "react";
import type {OnLoadingComplete, PlaceholderValue} from "next/dist/shared/lib/get-img-props";
import {FileType} from "next/dist/lib/file-exists";

export type VoidFunc = () => void;
export type VoidFuncAsync = () => Promise<void>;
export type SessionType = (Session & { accessToken: string | null; isAuthenticated: boolean }) | null
export type AnyObject = { [key: string]: string | number | undefined }
export type  AnalyticsData = {
    memberCount: number;
    bookCount: number;
    borrowedBookCount: number;
    overdueBookCount: number;
}
export type  BorrowedBookInDay = { day: string, borrowedBookCount: number }
export type LoanAnalyticsData = {
    rateData: BorrowedBookInDay[];//10 dữ liệu từ 10 ngày (của số lượt mượn sách mỗi ngày)
    labels?: string[];//tên 10 ngày tính từ ngày hôm nay trở về trước format <viết tắt của thứ-dd/MM/yy>
    highlightedItemIndex?: number
}
export type BookQuantityAnalyticsData = {
    normalBookCount: number;
    newBookCount: number;//never used
    damageBookCount: number;
    totalBookCount?: number;
}
export type ErrorMessages = {
    FETCH_ERROR_MESSAGE?: string;
    CUSTOM_ERROR_MESSAGE?: string;
    PARSING_ERROR_MESSAGE?: string;
    TIMEOUT_ERROR_MESSAGE?: string;
}
export type PieChartData = { value: number, name: string }
export type LoanSortByCategoryAnalyticsDataRes = {
    analyticData: LoanSortByCategoryAnalyticsData[]
}
export type BookAvailability = {
    bookId: number;
    bookName: string;
    bookAvailabilityStatuses: BookAvailabilityStatusData[];
    position: string
}
// export type BookAvailabilityStatusColors = { [ key: string ]: string }     // Sách có sẵn trên kệ
export type BookAvailabilityStatus =
    "In-Shelf"     // Sách có sẵn trên kệ
    | "Checked Out"  // Sách đã được mượn
    | "Lost"         // Sách bị thất lạc
    | "Damaged"      // Sách bị hỏng
    | "Processing"   // Sách đang nhập kho hoặc kiểm tra
export type BookAvailabilityStatusData = {
    status: BookAvailabilityStatus;
    count: number;
}
export type LoanSortByCategoryAnalyticsData = {

    genre: string, borrowCount: number,
};


//book
export type BookData = {
    category: string;
    version: string;
    imageUrl: string;
    title: string;
    author: {
        id?: number;
        name: string;
        birthYear?: string;
        deathYear?: string;
    };
    rating: number;
    id: number;
    availabilities: Availability[];
    bookStatus: BookAvailability;

}
export type Availability = {
    kind: "e-book" | "audio";
    isChecked?: boolean,
    title?: string,
    resource?: Resource,
} | {
    kind: "physical",
    isChecked?: boolean,
    title?: string,
    position?: string,
}

export type BooksResponse = {
    pageCount: number
    data: BookData[];
}
//pri
export type PagingParams = { page?: number, limit?: number; orderBy?: string } & AnyObject;
export type NextImageProps = React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"> & {
    src: string | import("next/dist//shared/lib/get-img-props").StaticImport;
    alt: string;
    width?: number | `${number}`;
    height?: number | `${number}`;
    fill?: boolean;
    loader?: import("next/dist/shared/lib/get-img-props").ImageLoader;
    quality?: number | `${number}`;
    priority?: boolean;
    loading?: "eager" | "lazy" | undefined;
    placeholder?: PlaceholderValue;
    blurDataURL?: string;
    unoptimized?: boolean;
    overrideSrc?: string;
    onLoadingComplete?: OnLoadingComplete;
    layout?: string;
    objectFit?: string;
    objectPosition?: string;
    lazyBoundary?: string;
    lazyRoot?: string;
} & React.RefAttributes<HTMLImageElement | null>>

export type TabItem = {
    title: string;
    content: React.ReactNode;
}

export type Resource = {
    id?: number,
    type: "image" | "pdf",
    name?: string,
    sizeByte?: number,
    fileType?: FileType | string | "image/jpeg" | "image/png" | "image/heic" | "application/pdf",
    localUrl?: string
    file?: File,
    // localUrl?: string
}
export type ShortBookInfo = {
    id?: number,
    title: string,
    pageCount?: number,
    coverUrl?: string,
    publishDate?: string,

}
export type Author = {
    id?: number,
    name: string,
    avatarUrl: string,
    resource?: Resource,
    description?: string,
    summaryDescription?: string,
    lifeSpan?: {
        birthYear?: string, deadYear?: string
    },
    publications?: ShortBookInfo[]
}
export type Language =
    | "English"
    | "Mandarin Chinese"
    | "Spanish"
    | "Hindi"
    | "French"
    | "Arabic"
    | "Bengali"
    | "Russian"
    | "Portuguese"
    | "Urdu"
    | "Indonesian"
    | "German"
    | "Japanese"
    | "Swahili"
    | "Marathi"
    | "Telugu"
    | "Turkish"
    | "Tamil"
    | "Vietnamese"
    | "Korean"
    | "Italian"
    | "Hausa"
    | "Thai"
    | "Gujarati"
    | "Persian"
    | "Bhojpuri"
    | "Polish"
    | "Ukrainian"
    | "Malayalam"
    | "Kannada"
    | "Odia"
    | "Burmese"
    | "Hakka"
    | "Romanian"
    | "Dutch"
    | "Greek"
    | "Hungarian"
    | "Czech"
    | "Swedish"
    | "Finnish"
    | "Hebrew"
    | "Danish"
    | "Norwegian"
    | "Slovak"
    | "Bulgarian"
    | "Serbian"
    | "Croatian"
    | "Lithuanian"
    | "Latvian"
    | "Estonian"
    | "Slovenian"
    | "Maltese"
    | "Icelandic"
    | "Irish"
    | "Welsh"
    | "Basque"
    | "Catalan"
    | "Galician"
    | "Afrikaans"
    | "Zulu"
    | "Xhosa"
    | "Sesotho"
    | "Tswana"
    | "Shona"
    | "Somali"
    | "Kurdish"
    | "Pashto"
    | "Sindhi"
    | "Tajik"
    | "Turkmen"
    | "Mongolian"
    | "Tibetan"
    | "Uyghur"
    | "Lao"
    | "Khmer"
    | "Sinhalese"
    | "Dzongkha"
    | "Maori"
    | "Tongan"
    | "Samoan"
    | "Hawaiian"
    | "Fijian"
    | "Chamorro"
    | "Tetum";

export type BookWithLanguage = {
    title: string;
    author: string;
    publishDate: string;
    publisher: string;
    language: Language;
    pages: number;
    description?: string;
};


export type AuthorData = {
    id?: number;
    name?: string;
    avatarUrl?: string;
    description?: string;
    summaryDescription?: string;
    birthYear?: string;
    deathYear?: string;
}
