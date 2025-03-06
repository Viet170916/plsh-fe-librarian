import {usePathname} from "next/navigation";

const useLastSegment = () => {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean); // Lọc ra các phần tử hợp lệ
    return segments[segments.length - 1]; // Lấy phần tử cuối cùng
};
export default useLastSegment;