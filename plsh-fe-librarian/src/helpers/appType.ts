import appStrings from "@/helpers/appStrings";
import { Category } from "@/stores/slices/book-states/book.add-edit.slice";
import { Session } from "next-auth";
import { FileType } from "next/dist/lib/file-exists";
import type { OnLoadingComplete, PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import React from "react";

export type BaseResponse<DataType, StatusType = string> = {
				message: string;
				pageCount?: number;
				data: DataType;
				status?: StatusType;
				count?: number,
				page?: number,
				limit?: number,
				currenPage?: number;
}
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
				id?: number;
				title?: string;
				description?: string;
				authorId?: number;
				kind?: number | string;
				coverImageResourceId?: number;
				coverImageResource?: Resource,
				previewPdfResource?: Resource,
				epubResource?: Resource,
				audioResource?: Resource,
				coverImageUrl?: string;
				contentPdfName?: string;
				audioName?: string;
				coverImage?: File;
				contentPdf?: File;
				audioFile?: File;
				previewPdfResourceId?: number;
				audioResourceId?: number;
				version?: string;
				publisher?: string;
				publishDate?: string;
				language?: LanguageCode;
				pageCount: number;
				categoryId?: number;
				isbnNumber13?: string;
				isbnNumber10?: string;
				rating?: number;
				totalCopies?: number;
				availableCopies?: number;
				price?: number;
				otherIdentifier?: string;
				thumbnail?: string;
				fine?: number;
				createDate?: string;
				updateDate?: string;
				deletedAt?: string;
				isChecked?: boolean;
				height?: number;
				width?: number;
				thickness?: number;
				weight?: number;
				bookReviewId?: number;
				quantity?: number;
				libraryCode?: string;
				resource?: Resource;
				// Các thuộc tính N
				category: Category;
				authors: Author[];
				availabilities: Availability[];
				bookStatus?: BookAvailability;
}
export type BookInstance = {
				shelfPosition?: string;
				isInBorrowing?: boolean;
				bookName?: string;
				id?: number;
				code?: string;
				bookThumbnail?: string;
				bookVersion?: string;
				bookAuthor?: string;
				bookCategory?: string;
				bookId?: number;
				position?: number;
				// book?: BookData;
				rowShelfId?: number;
				// rowShelf?: RowShelf;
}
export type Availability = {
				kind: "audio" | "epub" | "pdf" | "image";
				isChecked?: boolean,
				title?: string,
				resource?: Resource,
} | {
				kind: "physical",
				isChecked?: boolean,
				title?: string,
				quantity?: number,
				bookInstances?: BookInstance[]
				// position?: string,
}
export interface Member{
				analytics?: {
								bookReading?: BaseResponse<BookInstance>;
								contribution?: BaseResponse<BookInstance>;
				};
				classRoom?: string;
				isVerified?: boolean;
				id?: number;
				role: Role;
				fullName?: string;
				gender?: boolean;
				birthdate?: string;
				address?: string;
				phoneNumber?: string;
				email?: string;
				avatarUrl?: string;
				identityCardNumber?: string;
				cardMemberNumber?: number;
				cardMemberStatus?: number;
				cardMemberExpiredDate?: string;
				status: "active" | "inactive" | "forbidden";
}
export type Role = "student" | "teacher" | "undefined";
export function getRoleTitle( role: Role ): string{
				switch( role ){
								case "student":
												return appStrings.member.STUDENT;
								case "teacher":
												return appStrings.member.TEACHER;
								default:
												return appStrings.member.UNKNOWN;
				}
}
export type LanguageCode =
				| "en" | "vi" | "es" | "fr" | "de" | "zh" | "ja" | "ko" | "ru" | "ar"
				| "hi" | "pt" | "it" | "nl" | "tr" | "pl" | "uk" | "th" | "sv" | "id"
				| "fi" | "no" | "da" | "he" | "el" | "hu" | "ro" | "cs" | "sk" | "bg"
				| "hr" | "sr" | "sl" | "ms" | "bn" | "ta" | "te" | "kn" | "ml" | "ur"
				| "fa" | "sw" | "am" | "yo" | "ig" | "ha" | "my" | "km" | "lo" | "mn"
				| "si" | "uz" | "kk" | "az" | "hy" | "ka" | "tg" | "ky" | "ps" | "sd"
				| "ne" | "bo" | "dz" | "gl" | "eu" | "cy" | "ga" | "mt" | "lb" | "is"
				| "af" | "xh" | "zu" | "st" | "sn" | "nso" | "ts" | "ve" | "tn" | "undefined";
export type Language = { code: LanguageCode, name: string, langInVn?: string, };
export type LanguageCodeKey = {
				[key in (LanguageCode)]: string;
};
export type BooksResponse = {
				pageCount: number;
				totalBook: number;
				currentPage: number;
				data: BookData[];
}
//pri
export type PagingParams = { page?: number, limit?: number; orderBy?: string } & AnyObject;
export type NextImageProps = React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"> & {
				src: string | import("next/dist//shared/lib/get-img-props").StaticImport;
				alt: string;
				width?: number | `${ number }`;
				height?: number | `${ number }`;
				fill?: boolean;
				loader?: import("next/dist/shared/lib/get-img-props").ImageLoader;
				quality?: number | `${ number }`;
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
				kind: "normal";
				title: string;
				content: React.ReactNode;
} | {
				kind: "link";
				segment?: string,
				title: string;
}
export type Resource = {
				referenceId?: number;
				id?: number,
				type: "image" | "pdf" | "audio" | "epub",
				name?: string,
				sizeByte?: number,
				fileType?: FileType | string | "image/jpeg" | "audio/mpeg" | "image/png" | "image/heic" | "application/pdf" | "application/epub+zip",
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
				deathYear?: string;
				birthYear?: string;
				id?: number,
				fullName?: string,
				avatarUrl?: string,
				resource?: Resource,
				authorImageResource?: File,
				description?: string,
				summaryDescription?: string,
				publications?: ShortBookInfo[]
}
export type LanguageFullText =
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
export type Borrower = {
				aboutRole?: {
								kind: "student",
								title: "Sinh viên";
								classRoom: string;
								address: string
				} | {
								kind: "teacher",
								title: "Giáo viên";
								address: string;
				} | {
								title: "Khách";
								kind: "guest",
								address: string;
				} | {
								title: "Người dùng khác";
								who?: string;
								kind: "other",
								address: string;
				}
				identityCardNumber?: number;
				id?: number;
				name?: string;
				avatarUrl?: string;
				email: string;
				phone?: string;
				analytics?: {
								contribution?: {
												count?: number;
								},
								bookReading?: {
												count?: number;
								};
								loan?: {
												count?: number;
								};
								totalAmountTransaction?: {
												count?: number;
								};
				}
}
export type BorrowStatus = {
				kind: "overdue";
				title: string;
				overdueDateCount: number;
} | {
				kind: "on-loan",
				title: string;
				dayLeftCount: number;
} | {
				kind: "returned";
				title: string;
} | {
				kind: "partially-returned";
				title: string;
				total: number;
				returnedCount: number;
				leftCount: number;
}
export type BorrowedBook = {
				id?: number;
				code?: string;
				book?: BookData;
				beforeBorrow?: {
								imageUrl?: string[];
								note?: string;
								status?: BookDamageStatus;
				};
				borrowStatus?: BorrowStatus;
				afterBorrow?: {
								imageUrl?: string[];
								note?: string;
								status: BookDamageStatus;
				};
				count?: number;
				borrowDateRange?: {
								start: string;
								end: string;
				};
}
export type BookDamageStatus = "new" | "normal" | "slight-damage" | "moderate-damage" | "heavy-damage" | "destroyed"
export type BorrowItemData = {
				borrowDate?: string;
				id?: number;
				code: string;
				note?: string;
				borrower: Borrower;
				status: BorrowStatus;
				bookCount: number;
				borrowedBooks: BorrowedBook[];
				dayUsageCount: number;
};

