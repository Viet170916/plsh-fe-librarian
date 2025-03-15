import {NextRequest, NextResponse} from "next/server";
import mockData from "@/helpers/mockData";
import {Author} from "@/helpers/appType";


// Danh sách tác giả giả lập
const authors: Author[] = [];

// API xử lý tìm kiếm tác giả
export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const keyWord = searchParams.get("keyWord") || "";


    // Lọc tác giả dựa trên từ khóa (không phân biệt hoa thường)
    const filteredAuthors = authors.filter((author) =>
        author.fullName?.toLowerCase().includes(keyWord.toLowerCase())
    );
    return NextResponse.json({data: filteredAuthors});
}
