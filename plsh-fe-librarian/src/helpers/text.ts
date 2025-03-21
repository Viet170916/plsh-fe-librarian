export function formatNumberWithCommas( num: number ): string{
				return num.toLocaleString( "en-US" );
}
export const formatFileSize = ( size: number ) => {
				const units = [ 'Bytes', 'KB', 'MB', 'GB' ];
				let index = 0;
				while( size >= 1024 && index < units.length - 1 ){
								size /= 1024;
								index++;
				}
				return `${ size.toFixed( 2 ) } ${ units[index] }`;
};
export function formatDate( input?: Date | string ){
				if( !input ){
								return undefined;
				}
				const date = new Date( input );
				if( isNaN( date.getTime() ) ){
								throw new Error( "Invalid date format" );
				}
				const day = date.getDate();
				const monthNames = [ "Thg1", "Thg2", "Thg3", "Thg4", "Thg5", "Thg6",
								"Thg7", "Thg8", "Thg9", "Thg10", "Thg11", "Thg12" ];
				const month = monthNames[date.getMonth()];
				const year = date.getFullYear();
				let hours = date.getHours();
				const minutes = date.getMinutes().toString().padStart( 2, "0" );
				const ampm = hours >= 12 ? "Chiều" : "Sáng";
				hours = hours % 12 || 12;
				return `${ day } ${ month } ${ year } ${ hours }:${ minutes } ${ ampm }`;
}
export function isInternalUrl( url?: string ): "blob" | "know host" | "unknown"{
				if( !url ){return "unknown";}
				try{
								const inputUrl = new URL( url, window.location.origin );
								if( inputUrl.protocol === "blob:" ){
												return "blob";
								}else if( inputUrl.origin === "https://book-hive-api.space" || inputUrl.origin === window.location.origin ){
												return "know host";
								}
				}catch{
								return "unknown";
				}
				return "unknown";
}
export function formatImageUrl( url?: string ){
				return `${ process.env.NEXT_PUBLIC_STATIC_FILE_SERVER_API_URL ?? "http://104.197.134.164/static/v1" }/file${ url ?? "" }`;
}
