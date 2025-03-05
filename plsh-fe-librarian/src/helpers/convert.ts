import {AnyObject} from "@/helpers/appType";

export function objectToQueryParams(obj: object, prefix = ''): string {
    const queryParams = Object.entries(obj)
        .map(([key, value]) => {
            const paramKey = prefix ? `${prefix}[${key}]` : key;
            if (typeof value === 'object' && value !== null) {
                return objectToQueryParams(value, paramKey);
            }
            return `${encodeURIComponent(paramKey)}=${encodeURIComponent(String(value))}`;
        })
        .join('&');

    return queryParams ? `?${queryParams}` : '';
}

async function urlToFile(url: string, fileName: string, mimeType: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, {type: mimeType});
}

export const file_FilesToUrl = (file_s: File | File[]): string | string[] => {
    if (Array.isArray(file_s)) {
        return file_s.map((file) => URL.createObjectURL(file));
    } else {
        const imageUrl = URL.createObjectURL(file_s);
        return (imageUrl);
    }
};
export const objectToFormData = (obj: object, formData = new FormData(), parentKey = "") => {
    Object.entries(obj).forEach(([key, value]) => {
        const fieldName = parentKey ? `${parentKey}[${key}]` : key;

        if (value instanceof File) {
            formData.append(fieldName, value);
        } else if (value instanceof Object && !(value instanceof Date)) {
            objectToFormData(value, formData, fieldName);
        } else {
            formData.append(fieldName, String(value));
        }
    });

    return formData;
};