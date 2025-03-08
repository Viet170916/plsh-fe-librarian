import {NextRequest, NextResponse} from "next/server";
import mock from "@/helpers/mockData";

export async function GET(req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const itemId = parseInt((await params).id);
    const borrowItem = mock.borrowing.find((item) => item.id === itemId);

    if (!borrowItem) {
        return NextResponse.json({error: "Borrow item not found"}, {status: 404});
    }

    return NextResponse.json(borrowItem);
}
