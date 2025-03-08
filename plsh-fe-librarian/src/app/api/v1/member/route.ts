import {NextResponse} from "next/server";
import mock from "@/helpers/mockData";
import {Borrower} from "@/helpers/appType"; // Import danh sách giả lập

export async function GET() {
    return NextResponse.json(mock.borrowers as Borrower[]);
}
