import { AnalyticsData } from "@/helpers/appType";

const mock = {
  analyticsData: {
    bookCount: 12,
    borrowedBookCount: 4009,
    memberCount: 1424,
    overdueBookCount: 12
  },
  borrowedRate: {
    rateData: [
      { day: "12/2", borrowedBookCount: 24 },
      { day: "13/2", borrowedBookCount: 56 },
      { day: "14/2", borrowedBookCount: 4 },
      { day: "15/2", borrowedBookCount: 6 },
      { day: "16/2", borrowedBookCount: 34 },
      { day: "17/2", borrowedBookCount: 86 },
      { day: "18/2", borrowedBookCount: 14 },
      { day: "19/2", borrowedBookCount: 53 },
      { day: "20/2", borrowedBookCount: 23 },
      { day: "21/2", borrowedBookCount: 90 }, ],
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
      { genre: "Fiction", borrowCount: 120, color: "#8884d8" },  // Màu xanh tím
      { genre: "Mystery", borrowCount: 95, color: "#82ca9d" },   // Màu xanh lá
      { genre: "Science", borrowCount: 80, color: "#ffc658" },   // Màu vàng cam
      { genre: "History", borrowCount: 60, color: "#ff7f50" },   // Màu cam đỏ
      { genre: "History", borrowCount: 60, color: "#ff7f50" },   // Màu cam đỏ
      { genre: "History", borrowCount: 60, color: "#ff7f50" },   // Màu cam đỏ
      { genre: "Fantasy", borrowCount: 110, color: "#6a5acd" },  // Màu tím đậm
    ]
  },
  image_url:"https://i.redd.it/c3uhsgo1vx541.jpg"
};
export default mock;