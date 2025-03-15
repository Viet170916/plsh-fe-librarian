export function objectToQueryParams(obj: object, prefix = ''): string {
    const termObj = deepClean(obj);
    const queryParams = Object.entries(termObj)
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

function deepClean<T>(obj: T): T {
    if (typeof obj !== "object" || obj === null) return obj;

    return Object.entries(obj as Record<string, unknown>)
        .reduce((acc, [key, value]) => {
            if (value === null || value === undefined || (typeof value === "number" && isNaN(value))) {
                return acc;
            }

            if (typeof value === "object" && !Array.isArray(value)) {
                const cleaned = deepClean(value);
                if (Object.keys(cleaned).length > 0) {
                    (acc as Record<string, unknown>)[key] = cleaned;
                }
            } else {
                (acc as Record<string, unknown>)[key] = value;
            }

            return acc;
        }, {} as T);
}
export async function fetchUrlAsFile(url: string, fileName: string = 'downloaded-file'): Promise<File> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching file: ${response.statusText}`);
    }
    const blob = await response.blob();
    return new File([blob], fileName, {type: blob.type, lastModified: Date.now()});
}

export async function urlToFile(url: string, fileName: string, mimeType: string): Promise<File> {
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