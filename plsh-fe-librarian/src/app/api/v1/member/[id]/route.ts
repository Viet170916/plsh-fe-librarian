import {NextRequest, NextResponse} from "next/server";
import mock from "@/helpers/mockData";
import {Borrower} from "@/helpers/appType";

export async function GET(req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const parameters = await params;
    const borrower = (mock.borrowers as Borrower[])
        .find((b) => b.id === parseInt(parameters.id));

    if (!borrower) {
        return NextResponse.json({error: "Borrower not found"}, {status: 404});
    }

    return NextResponse.json(borrower);
}
