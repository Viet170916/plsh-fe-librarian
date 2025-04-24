import {useEffect} from "react";
import {appToaster} from "@/components/primary/toaster";
import {BaseResponse} from "@/helpers/appType";
import appStrings from "@/helpers/appStrings";
import {parsErrorToBaseResponse} from "@/helpers/error";

function useFetchingToast<ResponseType>(
    data: BaseResponse<ResponseType> | undefined | null,
    error: unknown | undefined | null,
    successDeps: unknown[] = [],
    errorDeps: unknown[] = [],
    option?: {
        success?: string,
        error?: string,
        handleSuccess?: (data: ResponseType) => void,
        handleError?: (errorData: BaseResponse<string> | null) => void
    }
) {
    useEffect(() => {
        if (data) {
            option?.handleSuccess?.(data.data);
            appToaster.success(data.message ?? option?.success);
        }
    }, [data, option, successDeps]);

    // Error effect
    useEffect(() => {
        if (error) {
            const err = parsErrorToBaseResponse(error);
            option?.handleError?.(err);
            appToaster.error(err?.message ?? option?.error ?? appStrings.error.REQUEST_ERROR);
        }
    }, [error, option, errorDeps]);
}


export default useFetchingToast;
