import { BaseResponse, ErrorMessages } from "@/helpers/appType";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

export function toastError( error: FetchBaseQueryError | SerializedError, message?: ErrorMessages ){
				const fetchingError = error as FetchBaseQueryError;
				switch( fetchingError.status ){
								case "FETCH_ERROR":
												toast.error( message?.FETCH_ERROR_MESSAGE ?? fetchingError.error );
												break;
								case "CUSTOM_ERROR":
												toast.error( message?.CUSTOM_ERROR_MESSAGE ?? fetchingError.error );
												break;
								case "PARSING_ERROR":
												toast.error( message?.PARSING_ERROR_MESSAGE ?? fetchingError.error );
												break;
								case "TIMEOUT_ERROR":
												toast.error( message?.TIMEOUT_ERROR_MESSAGE ?? fetchingError.error );
												break;
				}
}
export function parsErrorToBaseResponse<T = string>( error: unknown ): BaseResponse<T> | null{
				if( typeof error === "object" && error !== null && "data" in error ){
								try{
												return error.data as BaseResponse<T>;
								}catch{
												return null;
								}
				}
				return null;
}
