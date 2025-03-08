import {AnalyticsData} from "@/helpers/appType";

const mock = {
    analyticsData: {
        bookCount: 12,
        borrowedBookCount: 4009,
        memberCount: 1424,
        overdueBookCount: 12
    },
    borrowedRate: {
        rateData: [
            {day: "12/2", borrowedBookCount: 24},
            {day: "13/2", borrowedBookCount: 56},
            {day: "14/2", borrowedBookCount: 4},
            {day: "15/2", borrowedBookCount: 6},
            {day: "16/2", borrowedBookCount: 34},
            {day: "17/2", borrowedBookCount: 86},
            {day: "18/2", borrowedBookCount: 14},
            {day: "19/2", borrowedBookCount: 53},
            {day: "20/2", borrowedBookCount: 23},
            {day: "21/2", borrowedBookCount: 90},],
        labels: undefined,//tên 10 ngày tính từ ngày hôm nay trở về trước format <viết tắt của thứ-dd/MM/yy>
        highlightedItemIndex: undefined
    },
    bookQuantityAnalyticsData: {
        normalBookCount: 12,
        newBookCount: 32,//never used
        damageBookCount: 15,
        totalBookCount: 89,
    },
    loanSortByCategoryAnalyticDataRes: {
        analyticData: [
            {genre: "Fiction", borrowCount: 120, color: "#8884d8"},  // Màu xanh tím
            {genre: "Mystery", borrowCount: 95, color: "#82ca9d"},   // Màu xanh lá
            {genre: "Science", borrowCount: 80, color: "#ffc658"},   // Màu vàng cam
            {genre: "History", borrowCount: 60, color: "#ff7f50"},   // Màu cam đỏ
            {genre: "History", borrowCount: 60, color: "#ff7f50"},   // Màu cam đỏ
            {genre: "History", borrowCount: 60, color: "#ff7f50"},   // Màu cam đỏ
            {genre: "Fantasy", borrowCount: 110, color: "#6a5acd"},  // Màu tím đậm
        ]
    },
    image_url: "https://i.redd.it/c3uhsgo1vx541.jpg",

    borrowers: [
        {
            id: 1,
            name: "Nguyễn Văn A",
            email: "a@example.com",
            phone: "0123456789",
            avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
            identityCardNumber: 123456789,
            aboutRole: {
                kind: "student",
                title: "Sinh viên",
                classRoom: "CT22A",
                address: "Hà Nội",
            },
            analytics: {
                contribution: {count: 5},
                bookReading: {count: 10},
                loan: {count: 3},
                totalAmountTransaction: {count: 500000},
            },
        },
        {
            id: 2,
            name: "Trần Thị B",
            email: "b@example.com",
            phone: "0987654321",
            avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
            identityCardNumber: 987654321,
            aboutRole: {
                kind: "teacher",
                title: "Giáo viên",
                address: "Hồ Chí Minh",
            },
            analytics: {
                contribution: {count: 2},
                bookReading: {count: 15},
                loan: {count: 5},
                totalAmountTransaction: {count: 1200000},
            },
        },
        {
            id: 3,
            name: "Phạm Văn C",
            email: "c@example.com",
            phone: "0321654987",
            avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
            identityCardNumber: 567891234,
            aboutRole: {
                kind: "guest",
                title: "Khách",
                address: "Đà Nẵng",
            },
            analytics: {
                contribution: {count: 0},
                bookReading: {count: 2},
                loan: {count: 1},
                totalAmountTransaction: {count: 100000},
            },
        },
        {
            id: 4,
            name: "Đinh Thị D",
            email: "d@example.com",
            phone: "0123589746",
            avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
            identityCardNumber: 234567891,
            aboutRole: {
                kind: "other",
                title: "Người dùng khác",
                who: "Nhà nghiên cứu",
                address: "Cần Thơ",
            },
            analytics: {
                contribution: {count: 8},
                bookReading: {count: 20},
                loan: {count: 7},
                totalAmountTransaction: {count: 3000000},
            },
        },
        {
            id: 5,
            name: "Lê Quốc E",
            email: "e@example.com",
            phone: "0963852147",
            avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
            identityCardNumber: 456789123,
            aboutRole: {
                kind: "student",
                title: "Sinh viên",
                classRoom: "CT21B",
                address: "Hải Phòng",
            },
            analytics: {
                contribution: {count: 3},
                bookReading: {count: 5},
                loan: {count: 2},
                totalAmountTransaction: {count: 200000},
            },
        },
    ],

    borrowing: [
        {
            borrowDate: "2024-03-01",
            id: 1,
            code: "BRW-001",
            borrower: {
                id: 1,
                name: "Nguyễn Văn A",
                email: "a@example.com",
                phone: "0123456789",
                avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
                identityCardNumber: 123456789,
                aboutRole: {
                    kind: "student",
                    title: "Sinh viên",
                    classRoom: "CT22A",
                    address: "Hà Nội",
                },
                analytics: {
                    contribution: {count: 3},
                    bookReading: {count: 5},
                    loan: {count: 2},
                    totalAmountTransaction: {count: 200000},
                },
            },
            status: {
                kind: "on-loan",
                title: "Đang mượn",
                dayLeftCount: 5,
            },
            bookCount: 2,
            borrowedBooks: [
                {
                    id: 101,
                    code: "BK-001",
                    book: {
                        id: 1001,
                        title: "Lập trình JavaScript",
                        author: {name: "John Doe"},
                        category: "Lập trình",
                        version: "1.0",
                        imageUrl: "https://via.placeholder.com/150",
                        rating: 4.5,
                        availabilities: [{kind: "physical", isChecked: true, position: "A1"}],
                        bookStatus: {
                            bookId: 1001,
                            bookName: "Lập trình JavaScript",
                            bookAvailabilityStatuses: [{status: "In-Shelf", count: 1}],
                            position: "A1"
                        },
                    },
                    borrowStatus: {
                        kind: "on-loan",
                        title: "Đang mượn",
                        dayLeftCount: 5,
                    },
                    borrowDateRange: {start: "2024-03-01", end: "2025-04-10"},
                },
            ],
            dayUsageCount: 7,
        },
        {
            borrowDate: "2024-03-01",
            id: 3,
            code: "BRW-003",
            borrower: {
                id: 1,
                name: "Nguyễn Văn A",
                email: "a@example.com",
                phone: "0123456789",
                avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
                identityCardNumber: 123456789,
                aboutRole: {
                    kind: "student",
                    title: "Sinh viên",
                    classRoom: "CT22A",
                    address: "Hà Nội",
                },
                analytics: {
                    contribution: {count: 3},
                    bookReading: {count: 5},
                    loan: {count: 2},
                    totalAmountTransaction: {count: 200000},
                },
            },
            status: {
                kind: "on-loan",
                title: "Đang mượn",
                dayLeftCount: 5,
            },
            bookCount: 2,
            borrowedBooks: [
                {
                    id: 101,
                    code: "BK-001",
                    book: {
                        id: 1001,
                        title: "Lập trình JavaScript",
                        author: {name: "John Doe"},
                        category: "Lập trình",
                        version: "1.0",
                        imageUrl: "https://via.placeholder.com/150",
                        rating: 4.5,
                        availabilities: [{kind: "physical", isChecked: true, position: "A1"}],
                        bookStatus: {
                            bookId: 1001,
                            bookName: "Lập trình JavaScript",
                            bookAvailabilityStatuses: [{status: "In-Shelf", count: 1}],
                            position: "A1"
                        },
                    },
                    borrowStatus: {
                        kind: "on-loan",
                        title: "Đang mượn",
                        dayLeftCount: 5,
                    },
                    borrowDateRange: {start: new Date("2024-03-01"), end: new Date("2024-03-10")},
                },
            ],
            dayUsageCount: 7,
        },
        {
            borrowDate: "2024-03-01",
            id: 2,
            code: "BRW-002",
            borrower: {
                id: 2,
                name: "Trần Thị B",
                email: "b@example.com",
                phone: "0987654321",
                avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
                identityCardNumber: 987654321,
                aboutRole: {
                    kind: "teacher",
                    title: "Giáo viên",
                    address: "Hồ Chí Minh",
                },
                analytics: {
                    contribution: undefined,
                    bookReading: {count: 5},
                    loan: {count: 2},
                    totalAmountTransaction: {count: 200000},
                },
            },
            status: {
                kind: "returned",
                title: "Đã trả",
            },
            bookCount: 1,
            borrowedBooks: [
                {
                    id: 101,
                    code: "BK-001",
                    book: {
                        id: 1001,
                        title: "Lập trình JavaScript",
                        author: {name: "John Doe"},
                        category: "Lập trình",
                        version: "1.0",
                        imageUrl: "https://via.placeholder.com/150",
                        rating: 4.5,
                        availabilities: [{kind: "physical", isChecked: true, position: "A1"}],
                        bookStatus: {
                            bookId: 1001,
                            bookName: "Lập trình JavaScript",
                            bookAvailabilityStatuses: [{status: "In-Shelf", count: 1}],
                            position: "A1"
                        },
                    },
                    borrowStatus: {
                        kind: "on-loan",
                        title: "Đang mượn",
                        dayLeftCount: 5,
                    },
                    borrowDateRange: {start: new Date("2024-03-01"), end: new Date("2024-03-10")},
                }, {
                    id: 1076,
                    code: "BK-001",
                    book: {
                        id: 1001,
                        title: "Lập trình JavaScript",
                        author: {name: "John Doe"},
                        category: "Lập trình",
                        version: "1.0",
                        imageUrl: "https://i.redd.it/c3uhsgo1vx541.jpg",
                        rating: 4.5,
                        availabilities: [{
                            kind: "physical",
                            isChecked: true,
                            position: "A1"
                        }, {
                            kind: "audio",
                            isChecked: true,
                            resource: null
                        }, {
                            kind: "e-book",
                            isChecked: true,
                            resource: null
                        }],
                        bookStatus: {
                            bookId: 1001,
                            bookName: "Lập trình JavaScript",
                            bookAvailabilityStatuses: [{status: "In-Shelf", count: 1}],
                            position: "A1"
                        },
                    },
                    borrowStatus: {
                        kind: "overdue",
                        title: "Quá hạn",
                        overdueDateCount: 3,
                    },
                    borrowDateRange: {start: new Date("2024-03-01"), end: new Date("2025-03-10")},
                },
            ],
            dayUsageCount: 10,
        },
    ]


};

export default mock;