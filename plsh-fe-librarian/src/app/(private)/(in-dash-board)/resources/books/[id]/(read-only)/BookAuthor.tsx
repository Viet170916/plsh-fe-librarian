"use client";
import ImageWithBgCover, {ImageWithBgCoverWithoutSkeleton} from "@/components/primary/ImageWithBgCover";
import appStrings from "@/helpers/appStrings";
import {Author} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {useSelector} from "@/hooks/useSelector";
import {useLazyGetBooksQuery} from "@/stores/slices/api/book.api.slice";
import {useGenerateContentMutation} from "@/stores/slices/api/gemini.api.slice";
import {truncateMaxLineTextStyle, truncateTextStyle} from "@/style/text.style";
import {Box, LinearProgress, Skeleton, Tab, Tabs, Tooltip, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import React, {JSX, memo, useEffect, useMemo} from "react";
import {useTheme} from "@mui/material/styles";

const BookAuthors = () => {
    const theme = useTheme();
    const authors = useSelector(state => state.bookState.currentBook?.authors);
    const [value, setValue] = React.useState(0);
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    if (!authors) {
        return (<BookAuthorSkeleton/>);
    }
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                minWidth: 100,
                // maxWidth: 386,
                minHeight: 418,
                // bgcolor: "white",
                borderRadius: 1,
                overflow: "hidden",
                pt: 0,
                margin: 0,
            }}
        >
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs
                        variant="scrollable"
                        scrollButtons="auto"
                        value={value} onChange={handleChange}
                    >
                        {authors.map((author, index) => (<Tab
                            sx={{
                                height: 20,
                                borderRadius: 3,
                                m: 1,
                                textTransform: 'none',
                                minWidth: 0,
                                fontWeight: theme.typography.fontWeightRegular,
                                marginRight: theme.spacing(1),
                                color: color.DARK_TEXT,
                                fontFamily: [
                                    '-apple-system',
                                    'BlinkMacSystemFont',
                                    '"Segoe UI"',
                                    'Roboto',
                                    '"Helvetica Neue"',
                                    'Arial',
                                    'sans-serif',
                                    '"Apple Color Emoji"',
                                    '"Segoe UI Emoji"',
                                    '"Segoe UI Symbol"',
                                ].join(','),
                                '&:hover': {
                                    backgroundColor: color.PRIMARY_O10,
                                    opacity: 1,
                                },
                                '&.Mui-selected': {
                                    color: color.PRIMARY,
                                    backgroundColor: color.PRIMARY_O10,
                                    fontWeight: "lighter",
                                },
                            }}
                            key={author.id} label={author.fullName} {...a11yProps(index)} />))}
                    </Tabs>
                </Box>
                {authors.map((author, index) => {
                    return (
                        <CustomTabPanel key={author.id} value={value} index={index}>
                            <BookAuthor author={author}/>
                        </CustomTabPanel>
                    );
                })}
            </Box>
        </Box>
    );
};
const prompt = (name: string) => `hãy cho tôi biết đôi nét về tác giả ${name}, giới thiệu ngắn gọn khoảng 100 từ về tác giả, năm sinh năm mất, quê quán và hoạt động sáng tác của tác giả này, nói bằng tiếng Việt. Đưa luôn ra thông tin, không thêm bất cứ lời nói nào như "kiểu sau đây là", "chắc chắn rồi", ...`;
const BookAuthor = memo(({author}: { author: Author }): JSX.Element => {
    const [generateContent, {data, isLoading}] = useGenerateContentMutation();
    const [getBooks, {data: bookData, isLoading: bookLoading}] = useLazyGetBooksQuery();
    useEffect(() => {
        if (author.id) {
            getBooks({
                page: 1,
                limit: 10,
                authorId: author.id,
            });
        }
    }, [author.id, getBooks]);
    useEffect(() => {
        if (!author.description && author.fullName) {
            generateContent(prompt(author.fullName));
        }
    }, [author.description, author.fullName, generateContent]);
    const books = useMemo(() => {
        return bookData?.data.map(b => {
            return (
                <Tooltip key={b.id} title={b.title}>
                    <Link href={`/resources/books/${b.id}`}>
                        <Box width={75} height={99} position={"relative"}>
                            <ImageWithBgCover
                                src={b.coverImageUrl ?? b.thumbnail}
                            />
                        </Box>
                    </Link>
                </Tooltip>
            );
        });
    }, [bookData]);
    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <Grid container width={"100%"} spacing={1}>
                    <Grid size={6}>
                        <Typography
                            variant="h6"
                            component="p"
                            sx={{
                                width: "100%",
                                top: 0,
                                left: 0,
                                fontWeight: "bold",
                                fontFamily: "Inter, Helvetica",
                                color: "transparent",
                                background: "linear-gradient(90deg, #f27851 50%, #4c4c4c 50%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                            }}
                        >
                            Đôi nét về tác giả
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                width: "100%",
                                ...truncateTextStyle,
                                top: 51,
                                left: 0,
                                fontFamily: "Inter, Helvetica",
                                color: "#4c4c4c",
                            }}
                        >
                            {author.fullName ?? `${appStrings.AUTHOR_NAME}...`}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        size={6}
                        justifyContent="end"
                    >
                        <div style={{width: 88, height: 101, position: "relative"}}>
                            <ImageWithBgCoverWithoutSkeleton
                                src={author.avatarUrl ?? "/images/author.svg"}
                            />
                        </div>
                    </Grid>
                </Grid>
                <Tooltip
                    title={author.summaryDescription ?? (isLoading ? "Đang lấy dữ liệu" : data?.data || "Chưa có phản hồi")}>
                    <Typography
                        variant="body2"
                        component="p"
                        sx={{
                            ...truncateMaxLineTextStyle(5),
                            width: "100%",
                            maxHeight: 100,
                            fontFamily: "Inter, Helvetica",
                            color: color.DARK_TEXT,
                        }}
                    >
                        {author.summaryDescription ?? (isLoading ? "Đang lấy dữ liệu" : data?.data || "Chưa có phản hồi ")}
                    </Typography>
                </Tooltip>
            </Box>
            <Typography
                variant="subtitle2"
                component="div"
                sx={{
                    paddingTop: 2,
                    fontWeight: "bold",
                    fontFamily: "Inter, Helvetica",
                    color: "#4c4c4c",
                }}
            >
                {appStrings.author.PUBLICATION}
            </Typography>
            {bookLoading ?? <LinearProgress/>}
            <Grid sx={{overflowX: "auto", width: "100%"}}>
                <Grid
                    container
                    spacing={6}
                >
                    {books}
                </Grid>
            </Grid>
        </Box>
    );
});
const BookAuthorSkeleton = memo(() => {
    return (
        <Box
            sx={{
                position: "relative",
                minWidth: 100,
                maxWidth: 386,
                height: 418,
                bgcolor: "white",
                borderRadius: 1,
                overflow: "hidden",
                p: 3,
                padding: "30px",
                margin: 0,
            }}
        >
            <Box sx={{width: "100%"}}>
                <Grid container width="100%" spacing={1}>
                    <Grid size={6}>
                        <Skeleton variant="text" width={120} height={24}/>
                        <Skeleton variant="text" width={150} height={20} sx={{mt: 1}}/>
                    </Grid>
                    <Grid size={6} container justifyContent="end">
                        <Skeleton variant="rectangular" width={88} height={101}/>
                    </Grid>
                </Grid>
                <Skeleton variant="text" width="100%" height={80} sx={{mt: 2}}/>
            </Box>
            <Box sx={{paddingTop: "40px"}}>
                <Skeleton variant="text" width={100} height={20}/>
                <Grid container spacing={6} sx={{mt: 2}}>
                    <Skeleton variant="rectangular" width={75} height={99}/>
                    <Skeleton variant="rectangular" width={75} height={99}/>
                </Grid>
            </Box>
        </Box>
    );
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default memo(BookAuthors);
