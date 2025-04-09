import {DependencyList, useEffect} from "react";
import {appToaster} from "@/components/primary/toaster";
import {BaseResponse} from "@/helpers/appType";
import appStrings from "@/helpers/appStrings";
import {parsErrorToBaseResponse} from "@/helpers/error";

function useFetchingToast<ResponseType>(data: BaseResponse<ResponseType> | undefined | null, error: unknown | undefined | null, successDeps: DependencyList, errorDeps: DependencyList, option?: {
    success?: string,
    error?: string,
    handleSuccess?: (data: ResponseType) => void,
    handleError?: (errorData: BaseResponse<string> | null) => void
},) {

    useEffect(() => {
        if (data) {
            option?.handleSuccess?.(data.data);
            appToaster.success(data.message ?? option?.success);
        }
    }, [data, ...successDeps]);
    useEffect(() => {
        if (error) {
            const err = parsErrorToBaseResponse(error);
            option?.handleError?.(err);
            appToaster.success(err?.message ?? option?.error ?? appStrings.error.REQUEST_ERROR);
        }
    }, [error, ...errorDeps]);

}

export default useFetchingToast;
