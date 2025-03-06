export function formatNumberWithCommas(num: number): string {
    return num.toLocaleString("en-US");
}

export const formatFileSize = (size: number) => {
    const units = ['Bytes', 'KB', 'MB', 'GB'];
    let index = 0;
    while (size >= 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }
    return `${size.toFixed(2)} ${units[index]}`;
};