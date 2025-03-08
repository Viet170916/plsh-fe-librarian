import mock from "@/helpers/mockData";
import {NextRequest, NextResponse} from "next/server";


export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const borrowerId = searchParams.get("borrowerId");

    if (borrowerId) {
        const filteredItems = mock.borrowing.filter((item) => item.borrower.id === parseInt(borrowerId));
        return NextResponse.json(filteredItems);
    }

    return NextResponse.json(mock.borrowing);
}
