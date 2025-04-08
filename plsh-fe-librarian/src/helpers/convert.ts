import appStrings from "@/helpers/appStrings";
import { color } from "@/helpers/resources";
import { Dayjs } from "dayjs";
import { number } from "prop-types";

export function objectToQueryParams( obj: object, prefix = '' ): string{
				const termObj = deepClean( obj );
				const queryParams = Object.entries( termObj )
				                          .map( ( [ key, value ] ) => {
								                          const paramKey = prefix ? `${ prefix }[${ key }]` : key;
								                          if( typeof value === 'object' && value !== null ){
												                          return objectToQueryParams( value, paramKey );
								                          }
								                          return `${ encodeURIComponent( paramKey ) }=${ encodeURIComponent( String( value ) ) }`;
				                          } )
				                          .join( '&' );
				return queryParams ? `?${ queryParams }` : '';
}
export function deepCleanObject<T extends Record<string, unknown>>( obj: T ): Partial<T> | undefined{
				if( typeof obj !== "object" || obj === null ) return undefined;
				const result: object = Array.isArray( obj ) ? [] : {};
				for( const [ key, value ] of Object.entries( obj ) ){
								if( value === null || value === undefined || (typeof value === "number" && isNaN( value )) ){
												continue;
								}
								if( typeof value === "object" ){
												const cleanedValue = deepClean( value );
												if( cleanedValue !== undefined && Object.keys( cleanedValue ).length > 0 ){
																(result as Record<string, unknown>)[key] = cleanedValue;
												}
								}else{
												(result as Record<string, unknown>)[key] = value;
								}
				}
				return Object.keys( result ).length > 0 ? result : undefined;
}
export function deepClean<T>( obj: T ): T{
				if( typeof obj !== "object" || obj === null ) return obj;
				return Object.entries( obj as Record<string, unknown> )
				             .reduce( ( acc, [ key, value ] ) => {
								             if( value === null || value === undefined || (typeof value === "number" && isNaN( value )) ){
												             return acc;
								             }
								             if( typeof value === "object" && !Array.isArray( value ) ){
												             const cleaned = deepClean( value );
												             if( Object.keys( cleaned ).length > 0 ){
																             (acc as Record<string, unknown>)[key] = cleaned;
												             }
								             }else{
												             (acc as Record<string, unknown>)[key] = value;
								             }
								             return acc;
				             }, {} as T );
}
export async function fetchUrlAsFile( url: string, fileName: string = 'downloaded-file' ): Promise<File>{
				const response = await fetch( url );
				if( !response.ok ){
								throw new Error( `Error fetching file: ${ response.statusText }` );
				}
				const blob = await response.blob();
				return new File( [ blob ], fileName, { type: blob.type, lastModified: Date.now() } );
}
export async function urlToFile( url: string, fileName: string, mimeType: string ): Promise<File>{
				const response = await fetch( url );
				const blob = await response.blob();
				return new File( [ blob ], fileName, { type: mimeType } );
}
export const file_FilesToUrl = ( file_s: File | File[] ): string | string[] => {
				if( Array.isArray( file_s ) ){
								return file_s.map( ( file ) => URL.createObjectURL( file ) );
				}else{
								const imageUrl = URL.createObjectURL( file_s );
								return (imageUrl);
				}
};
export const objectToFormData = ( obj: object, formData = new FormData(), parentKey = "" ) => {
				Object.entries( obj ).forEach( ( [ key, value ] ) => {
								const fieldName = parentKey ? `${ parentKey }` : key; // Không dùng [index] cho danh sách
								if( Array.isArray( value ) ){
												value.forEach( ( val ) => {
																if( val instanceof File ){
																				formData.append( fieldName, val );
																}else if( val instanceof Object ){
																				objectToFormData( val, formData, fieldName );
																}else{
																				formData.append( fieldName, String( val ) );
																}
												} );
								}else if( value instanceof File ){
												formData.append( fieldName, value );
								}else if( value instanceof Object && !(value instanceof Date) ){
												objectToFormData( value, formData, fieldName );
								}else{
												formData.append( fieldName, String( value ) );
								}
				} );
				return formData;
};
const ImageQuality = {
				UHD_4K: { width: 3840, height: 2160, quality: 1.0 }, // Chất lượng cao nhất
				QHD_1440P: { width: 2560, height: 1440, quality: 0.9 },
				FULL_HD_1080P: { width: 1920, height: 1080, quality: 0.85 },
				HD_720P: { width: 1280, height: 720, quality: 0.7 },
				SD_480P: { width: 854, height: 480, quality: 0.6 },
				LOW_360P: { width: 640, height: 360, quality: 0.5 },
				LOWEST_240P: { width: 426, height: 240, quality: 0.4 }, // Chất lượng thấp nhất
} as const;
export type ImageQualityPreset =
				"UHD_4K"
				| "QHD_1440P"
				| "FULL_HD_1080P"
				| "HD_720P"
				| "SD_480P"
				| "LOW_360P"
				| "LOWEST_240P";
export async function compressImage(
				file: File,
				qualityPreset: ImageQualityPreset,
): Promise<File>{
				return new Promise( ( resolve, reject ) => {
								const reader = new FileReader();
								reader.onload = ( event ) => {
												const img = new Image();
												img.src = event.target?.result as string;
												img.onload = () => {
																const canvas = document.createElement( "canvas" );
																let { width, height } = img;
																// Điều chỉnh kích thước theo preset
																const ratio = Math.min( ImageQuality[qualityPreset].width / width, ImageQuality[qualityPreset].height / height );
																width = Math.round( width * ratio );
																height = Math.round( height * ratio );
																canvas.width = width;
																canvas.height = height;
																const ctx = canvas.getContext( "2d" );
																if( !ctx ){
																				return reject( new Error( "Không thể tạo canvas" ) );
																}
																ctx.drawImage( img, 0, 0, width, height );
																canvas.toBlob( ( blob ) => {
																				if( !blob ){
																								return reject( new Error( "Không thể nén ảnh" ) );
																				}
																				const compressedFile = new File( [ blob ], file.name, { type: blob.type } );
																				resolve( compressedFile );
																}, "image/jpeg", ImageQuality[qualityPreset].quality );
												};
												img.onerror = () => reject( new Error( "Lỗi khi tải ảnh" ) );
								};
								reader.onerror = () => reject( new Error( "Lỗi khi đọc file" ) );
								reader.readAsDataURL( file );
				} );
}
interface Period{
				start: Dayjs;
				end: Dayjs;
}
interface OnLoanPeriods{
				onLoan: Period[];
				overdue: Period[];
				chartData: ChartData[];
}
interface Period{
				start: Dayjs;
				end: Dayjs;
}
type ChartData = {
				label?: string;
				lineWidth?: number;
				color?: string;
				data: (number | null)[];
};
interface OnLoanPeriods{
				onLoan: Period[];
				overdue: Period[];
				chartData: ChartData[];
}
export function getOnLoanPeriods(
    borrowDate: Dayjs,
    expectedReturnDates: Dayjs[],
    renewalStartDates: Dayjs[],
    actualReturnOrToday: Dayjs
): OnLoanPeriods & { labels: string[] } {
    const onLoanPeriods: Period[] = [];
    const overduePeriods: Period[] = [];

    if (expectedReturnDates.length === 0) {
        return { onLoan: onLoanPeriods, overdue: overduePeriods, chartData: [], labels: [] };
    }

    onLoanPeriods.push({ start: borrowDate, end: expectedReturnDates[0] });
    for (let i = 0; i < renewalStartDates.length; i++) {
        const start = renewalStartDates[i];
        const end = expectedReturnDates[i + 1] || actualReturnOrToday;
        onLoanPeriods.push({ start, end });
    }

    const lastEnd = expectedReturnDates[expectedReturnDates.length - 1];
    if (lastEnd.isBefore(actualReturnOrToday, 'day')) {
        overduePeriods.push({ start: lastEnd, end: actualReturnOrToday });
    }

    const dateRange: Dayjs[] = [];
    for (let d = borrowDate; d.isBefore(actualReturnOrToday, 'day'); d = d.add(1, 'day')) {
        dateRange.push(d);
    }

    const labels = dateRange.map((date) => date.format('DD/MM/YY'));

    const chartData: ChartData[] = [];
    let yLevel = 1;

    onLoanPeriods.forEach(({ start, end }) => {
        const seriesData: (number | null)[] = new Array(dateRange.length).fill(null);
        for (let d = start; d.isBefore(end, 'day') || d.isSame(end, 'day'); d = d.add(1, 'day')) {
            const index = dateRange.findIndex((date) => date.isSame(d, 'day'));
            if (index !== -1) seriesData[index] = yLevel;
        }
        chartData.push({ data: seriesData, color:color.COMFORT, label:"Khoảng thời gian mượn" });
        yLevel++;
    });

    const overdueLevel = 1.5;
    for (let i = 0; i < onLoanPeriods.length - 1; i++) {
        const prevEnd = onLoanPeriods[i].end;
        const nextStart = onLoanPeriods[i + 1].start;
        if (prevEnd.isBefore(nextStart, 'day')) {
            overduePeriods.push({ start: prevEnd, end: nextStart });
        }
    }

    overduePeriods.forEach(({ start, end }) => {
        const seriesData: (number | null)[] = new Array(dateRange.length).fill(null);
        for (let d = start; d.isBefore(end, 'day') || d.isSame(end, 'day'); d = d.add(1, 'day')) {
            const index = dateRange.findIndex((date) => date.isSame(d, 'day'));
            if (index !== -1) seriesData[index] = overdueLevel;
        }
        chartData.push({ data: seriesData, color:color.SERIOUS, label:"Khoảng quá hạn" });
    });

    return { onLoan: onLoanPeriods, overdue: overduePeriods, chartData, labels };
}
