import {NextRequest, NextResponse} from "next/server";
import mockData from "@/helpers/mockData";
import {Author} from "@/helpers/appType";


// Danh sách tác giả giả lập
const authors: Author[] = [
    {
        id: 1,
        name: "William Shakespeare",
        avatarUrl: "https://via.placeholder.com/50",
        lifeSpan: {birthYear: "1564", deadYear: "1616"},
        summaryDescription: "Steve Krug is a usability consultant who has more than 30 years of\n" +
            "                        experience as a user advocate for companies like Apple, Netscape, AOL,\n" +
            "                        Lexus, and others. Based in part on the success of his first book,\n" +
            "                        Don&#39;t Make Me Think, he has become a highly sought-after speaker\n" +
            "                        on usability design."
    },
    {
        id: 2,
        name: "Jane Austen",
        avatarUrl: "https://via.placeholder.com/50",
        lifeSpan: {birthYear: "1775", deadYear: "1817"},
        summaryDescription: "Steve Krug is a usability consultant who has more than 30 years of\n" +
            "                        experience as a user advocate for companies like Apple, Netscape, AOL,\n" +
            "                        Lexus, and others. Based in part on the success of his first book,\n" +
            "                        Don&#39;t Make Me Think, he has become a highly sought-after speaker\n" +
            "                        on usability design."
    },
    {
        id: 3,
        name: "Mark Twain",
        avatarUrl: "https://via.placeholder.com/50",
        lifeSpan: {birthYear: "1835", deadYear: "1910"},
        summaryDescription: "Steve Krug is a usability consultant who has more than 30 years of\n" +
            "                        experience as a user advocate for companies like Apple, Netscape, AOL,\n" +
            "                        Lexus, and others. Based in part on the success of his first book,\n" +
            "                        Don&#39;t Make Me Think, he has become a highly sought-after speaker\n" +
            "                        on usability design."
    },
    {
        id: 4,
        name: "George Orwell",
        avatarUrl: mockData.image_url,
        lifeSpan: {birthYear: "1903", deadYear: "1950"},
    },
    {
        id: 5,
        name: "J.K. Rowling",

        avatarUrl: mockData.image_url,
        lifeSpan: {birthYear: "1965"},
        summaryDescription: "Steve Krug is a usability consultant who has more than 30 years of\n" +
            "                        experience as a user advocate for companies like Apple, Netscape, AOL,\n" +
            "                        Lexus, and others. Based in part on the success of his first book,\n" +
            "                        Don&#39;t Make Me Think, he has become a highly sought-after speaker\n" +
            "                        on usability design."
    },
];

// API xử lý tìm kiếm tác giả
export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const keyWord = searchParams.get("keyWord") || "";


    // Lọc tác giả dựa trên từ khóa (không phân biệt hoa thường)
    const filteredAuthors = authors.filter((author) =>
        author.name.toLowerCase().includes(keyWord.toLowerCase())
    );
    return NextResponse.json({data: filteredAuthors});
}
