"use client";
import InformationCard from "@/components/primary/InformationCard";
import appStrings from "@/helpers/appStrings";
import {AnalyticsData} from "@/helpers/appType";
import {toastError} from "@/helpers/error";
import mock from "@/helpers/mockData";
import {color} from "@/helpers/resources";
import {formatNumberWithCommas} from "@/helpers/text";
import {useGetAnalyticsQuery} from "@/stores/slices/api/analysis.api.slice";
import Grid from "@mui/material/Grid2";
import React, {memo, useEffect, useMemo} from "react";
import {TbDirectionSignFilled} from "react-icons/tb";
import Typography from "@/components/primary/typography";
import PostCard, {GradientButton} from "@/app/(private)/(in-dash-board)/dashboard/Card";
import Link from "next/link";
import {SlideInFromLeft, SlideInFromRight} from "@/components/Animation/animation";

interface IProps {
    children?: React.ReactNode;
}

function AnalysisComponent(props: IProps) {
    const {data, error, isLoading} = useGetAnalyticsQuery({}, {
        refetchOnReconnect: true,
        refetchOnFocus: true,
    });
    useEffect(() => {
        if (error) {
            toastError(error, {FETCH_ERROR_MESSAGE: appStrings.CANT_LOAD_COUNT_ANALYSIS_DATA});
        }
    });
    const analyticData: AnalyticsData = useMemo(() => data ?? mock.analyticsData, [data]);
    return (
        <Grid container spacing={4} size={12}>
            <Grid size={6} container justifyContent={"left"}>
                <Grid size={12}>
                    <SlideInFromLeft index={0}>
                        <PostCard left={
                            <InformationCard
                                // backgroundColor={color.PRIMARY}
                                icon={TbDirectionSignFilled}
                                title={appStrings.TOTAL_BOOK}
                                content={formatNumberWithCommas(analyticData.bookCount)}
                            />}>
                            <Grid container height={"100%"} justifyContent={"start"}>
                                <Link href={`/resources/books`}>
                                    <Typography variant="h5" fontWeight={"bold"} mb={1} sx={{color: color.DARK_TEXT}}>
                                        {appStrings.BOOK}
                                    </Typography>
                                </Link>
                                <Typography variant="h6" fontWeight={"lighter"} mb={1}
                                            sx={{color: color.DARK_TEXT}}>
                                    Thư viện của chúng tôi mang đến cho bạn không gian đọc lý tưởng, nội dung phong phú
                                    từ
                                    văn học, khoa học đến kỹ năng sống — sẵn sàng đồng hành trên hành trình khám phá và
                                    học
                                    hỏi của bạn.
                                </Typography>
                                <Grid size={12} container spacing={1}>
                                    <Link href={`/resources/books/add`}>
                                        <Typography variant="h6" fontWeight={"lighter"} mb={1}
                                                    sx={{color: color.DARK_TEXT, textDecoration: "underline"}}>
                                            {appStrings.book.ADD_BOOK}
                                        </Typography>
                                    </Link>
                                    <Link href={`/resources/books/add/lazy`}>
                                        <Typography variant="h6" fontWeight={"lighter"} mb={1}
                                                    sx={{color: color.DARK_TEXT, textDecoration: "underline"}}>
                                            {appStrings.book.ADD_BOOK_LAZY}
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid>
                                </Grid>
                                <Link href={`/resources/books`}>
                                    <GradientButton> {appStrings.BOOK}</GradientButton>
                                </Link>
                            </Grid>
                        </PostCard>
                    </SlideInFromLeft>

                </Grid>
            </Grid>
            <Grid size={6} container justifyContent={"right"}>
                <Grid size={12}>
                    <SlideInFromRight index={1}>

                        <PostCard reverse left={
                            <InformationCard
                                // backgroundColor={color.DARK_BUT_LIGHTER}
                                icon={TbDirectionSignFilled}
                                title={appStrings.MEMBERS}
                                content={formatNumberWithCommas(analyticData.memberCount)}/>
                        }>
                            <Grid container>
                                <Link href={`/members`}>
                                    <Typography variant="h5" fontWeight={"bold"} mb={1} sx={{color: color.DARK_TEXT}}>
                                        {appStrings.MEMBERS}
                                    </Typography>
                                </Link>

                                <Grid>
                                    <Typography variant="h6" fontWeight={"lighter"} mb={1}
                                                sx={{color: color.DARK_TEXT}}>
                                        Lưu trữ và theo dõi thông tin cá nhân của người dùng, phân loại đối tượng thành
                                        viên
                                        (học sinh, sinh viên, giảng viên, v.v.), hỗ trợ trong việc cấp, gia hạn hoặc hủy
                                        thẻ
                                        thư viện một cách linh hoạt và thuận tiện.
                                    </Typography>
                                </Grid>
                                <Grid size={12}>
                                    <Link href={`/members`}>
                                        <Typography variant="h6" fontWeight={"lighter"} mb={1}
                                                    sx={{color: color.DARK_TEXT, textDecoration: "underline"}}>
                                            {appStrings.member.ADD}
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Link href={`/members`}>
                                    <GradientButton>{appStrings.MEMBERS}</GradientButton>
                                </Link>
                            </Grid>
                        </PostCard>
                    </SlideInFromRight>
                </Grid>
            </Grid>
            <Grid size={6} container justifyContent={"left"}>
                <Grid size={12}>
                    <SlideInFromLeft index={2}>

                        <PostCard left={
                            <InformationCard
                                // backgroundColor={color.SIXTH}
                                icon={TbDirectionSignFilled}
                                title={appStrings.BORROWED_BOOK}
                                content={formatNumberWithCommas(analyticData.borrowedBookCount)}/>
                            // <InformationCard
                            // backgroundColor={color.DARK}
                            // icon={TbDirectionSignFilled}
                            // title={appStrings.OVERDUE}
                            // content={formatNumberWithCommas(analyticData.overdueBookCount)}/>
                        }>
                            <Grid container>
                                <Link href={`/borrow`}>
                                    <Typography variant="h5" fontWeight={"bold"} mb={1} sx={{color: color.DARK_TEXT}}>
                                        {appStrings.BORROW}
                                    </Typography>
                                </Link>
                                <Typography variant="h6" fontWeight={"lighter"} mb={1}
                                            sx={{color: color.DARK_TEXT}}>
                                    Cho phép thành viên dễ dàng tìm kiếm, đăng ký mượn và theo dõi sách đang mượn. Hệ
                                    thống
                                    tự động ghi nhận thời gian mượn, hạn trả và hỗ trợ nhắc nhở để đảm bảo việc sử dụng
                                    tài
                                    nguyên thư viện hiệu quả.
                                </Typography>
                                <Grid size={12}>
                                    <Link href={`/borrow/add`}>
                                        <Typography variant="h6" fontWeight={"lighter"} mb={1}
                                                    sx={{color: color.DARK_TEXT, textDecoration: "underline"}}>
                                            {appStrings.borrow.CREATE_BORROWING}
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Link href={`/borrow`}>
                                    <GradientButton>   {appStrings.BORROW}</GradientButton>
                                </Link>
                            </Grid>
                        </PostCard>
                    </SlideInFromLeft>
                </Grid>
            </Grid>
            <Grid size={6} container justifyContent={"right"}>
                <Grid size={12}>
                    <SlideInFromRight index={3}>

                        <PostCard reverse>
                            <Grid container>
                                <Link href={`/account`}>
                                    <Typography variant="h5" fontWeight={"bold"} mb={1} sx={{color: color.DARK_TEXT}}>
                                        {appStrings.ACCOUNT}
                                    </Typography>
                                </Link>
                                <Typography variant="h6" fontWeight={"lighter"} mb={1}
                                            sx={{color: color.DARK_TEXT}}>
                                    Người dùng có thể cập nhật thông tin cá nhân, đổi mật khẩu, theo dõi hoạt động và
                                    tùy
                                    chỉnh các thiết lập phù hợp với nhu cầu sử dụng thư viện.
                                </Typography>
                                <Grid size={12}>
                                    <Link href={`/account`}>
                                        <Typography variant="h6" fontWeight={"lighter"} mb={1}
                                                    sx={{color: color.DARK_TEXT, textDecoration: "underline"}}>
                                            {appStrings.ACCOUNT}
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Link href={`/account`}>
                                    <GradientButton>{appStrings.ACCOUNT}</GradientButton>
                                </Link>
                            </Grid>
                        </PostCard>
                    </SlideInFromRight>
                </Grid>


            </Grid>
        </Grid>);
}

export default memo(AnalysisComponent);
