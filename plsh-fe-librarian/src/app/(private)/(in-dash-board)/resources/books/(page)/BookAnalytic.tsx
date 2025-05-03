"use client"
import React, {memo, useEffect} from "react";

import {
    Box,
    CircularProgress,
    Collapse,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    AddCircle as NewBookIcon,
    BarChart as ChartIcon,
    Book as BookIcon,
    BrokenImage as DamagedIcon,
    Category as GenreIcon,
    CheckCircle as AvailableIcon,
    ExpandLess,
    ExpandMore,
    ImportContacts as BorrowedIcon,
    MenuBook as TitleIcon,
    Person as AuthorIcon,
    WatchLater as OverdueIcon
} from '@mui/icons-material';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as ChartTooltip, XAxis, YAxis} from 'recharts';
import Grid from "@mui/material/Grid2";
import {useTheme} from "@mui/material/styles";
import AppChip from "@/components/primary/display/AppChip";
import {useGetBookAnalytics_AllQuery} from "@/stores/slices/api/analysis.api.slice";
import {appToaster} from "@/components/primary/toaster";
import {parsErrorToBaseResponse} from "@/helpers/error";
import List from "@mui/material/List";
import {PiChartPieSliceBold} from "react-icons/pi";

export interface BookStatistics {
    totalBooks: number;
    totalTitles: number;
    totalGenres: number;
    booksAddedThisMonth: number;
    availableBooks: number;
    borrowedBooks: number;
    overdueBooks: number;
    lostOrDamagedBooks: number;
    topBorrowedBooks: { title: string; borrowCount: number }[];
    topGenres: { genre: string; borrowCount: number }[];
    topAuthors: { author: string; borrowCount: number }[];
    borrowHistoryByMonth: { month: string; borrowCount: number }[];
}

interface StatChipProps {
    icon: React.ReactNode;
    value: number;
    tooltip: string;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const StatChip: React.FC<StatChipProps> = ({icon, value, tooltip, color = 'primary'}) => {
    return (
        <Tooltip title={tooltip}>
            <AppChip
                variant="outlined"
                color={color}
                sx={{py: 1, mx: 0.5}}
                label={
                    <Grid container spacing={1} alignItems="center">
                        {icon}
                        <Typography variant="body1" sx={{ml: 0.5}}>
                            {value}
                        </Typography>
                    </Grid>
                }
            />
        </Tooltip>
    );
};

const BookAnalytic: React.FC<{ data: BookStatistics }> = memo(({data}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{width: '100%', mt: 3}}>
            <Box sx={{overflowX: 'auto', mb: 4}}>
                <Grid container spacing={1} sx={{flexWrap: 'nowrap', pb: 1}}>
                    <StatChip
                        icon={<BookIcon fontSize="small"/>}
                        value={data.totalBooks}
                        tooltip="Tổng số sách (bao gồm tất cả bản sao)"
                    />
                    <StatChip
                        icon={<TitleIcon fontSize="small"/>}
                        value={data.totalTitles}
                        tooltip="Tổng số đầu sách"
                    />
                    <StatChip
                        icon={<GenreIcon fontSize="small"/>}
                        value={data.totalGenres}
                        tooltip="Tổng số thể loại"
                    />
                    <StatChip
                        icon={<NewBookIcon fontSize="small"/>}
                        value={data.booksAddedThisMonth}
                        tooltip="Sách thêm mới trong tháng"
                        color="info"
                    />
                    <StatChip
                        icon={<AvailableIcon fontSize="small"/>}
                        value={data.availableBooks}
                        tooltip="Sách còn trong kho"
                        color="success"
                    />
                    <StatChip
                        icon={<BorrowedIcon fontSize="small"/>}
                        value={data.borrowedBooks}
                        tooltip="Sách đang được mượn"
                        color="warning"
                    />
                    <StatChip
                        icon={<OverdueIcon fontSize="small"/>}
                        value={data.overdueBooks}
                        tooltip="Sách bị quá hạn"
                        color="error"
                    />
                    <StatChip
                        icon={<DamagedIcon fontSize="small"/>}
                        value={data.lostOrDamagedBooks}
                        tooltip="Sách bị mất/hỏng"
                        color="error"
                    />
                </Grid>
            </Box>
            <List sx={{mb: 2}}>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <PiChartPieSliceBold size={23}/>
                    </ListItemIcon>
                    <ListItemText primary="Xem chi tiết"/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Grid container spacing={4}>
                        <Grid size={12}>
                            <Paper elevation={3} sx={{p: 2, height: 400}}>
                                <Typography variant="h6" gutterBottom sx={{display: 'flex', alignItems: 'center'}}>
                                    <ChartIcon sx={{mr: 1}}/>
                                    Lịch sử mượn sách (12 tháng gần nhất)
                                </Typography>
                                <ResponsiveContainer width="100%" height="90%">
                                    <BarChart data={data.borrowHistoryByMonth}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="month"/>
                                        <YAxis/>
                                        <ChartTooltip/>
                                        <Bar
                                            dataKey="borrowCount"
                                            fill={theme.palette.primary.main}
                                            name="Số lần mượn"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>

                        <Grid size={12} container spacing={2}>
                            <Grid size={8} container spacing={3} direction="column">
                                <Paper elevation={3} sx={{p: 2}}>
                                    <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                                        Sách được mượn nhiều nhất
                                    </Typography>
                                    {data.topBorrowedBooks.map((book, index) => (
                                        <Box key={index}
                                             sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                                            <Typography variant="body1" noWrap sx={{maxWidth: '70%'}}>
                                                {book.title}
                                            </Typography>
                                            <Typography variant="body1" color="text.primary">
                                                {book.borrowCount}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Paper>
                            </Grid>
                            <Grid size={4} container spacing={2}>
                                <Grid size={12}>
                                    <Paper elevation={3} sx={{p: 2}}>
                                        <Typography variant="h6" gutterBottom>
                                            Thể loại phổ biến
                                        </Typography>
                                        {data.topGenres.map((genre, index) => (
                                            <Box key={index}
                                                 sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                                                <Typography variant="body1" noWrap sx={{maxWidth: '70%'}}>
                                                    {genre.genre}
                                                </Typography>
                                                <Typography variant="body1" color="text.primary">
                                                    {genre.borrowCount}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Paper>
                                </Grid>
                                <Grid size={12}>
                                    <Paper elevation={3} sx={{p: 2}}>
                                        <Typography variant="h6" gutterBottom>
                                            Tác giả phổ biến
                                        </Typography>
                                        {data.topAuthors.map((author, index) => (
                                            <Box key={index}
                                                 sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                                                <Typography variant="body1" noWrap sx={{maxWidth: '70%'}}>
                                                    <AuthorIcon fontSize="small" sx={{mr: 1, verticalAlign: 'middle'}}/>
                                                    {author.author}
                                                </Typography>
                                                <Typography variant="body1" color="text.primary">
                                                    {author.borrowCount}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Collapse>
            </List>

        </Box>
    );
});

export const BookAnalyticContainer = memo(() => {
    const {data, error, isFetching} = useGetBookAnalytics_AllQuery();
    useEffect(() => {
        if (error) {
            appToaster.error(parsErrorToBaseResponse(error)?.message);
        }
    }, [error]);
    return (
        <Grid container spacing={4}>
            {isFetching && <CircularProgress/>}
            {data?.data && <Grid size={12}>
                        <BookAnalytic data={data.data}/>
            </Grid>}

        </Grid>
    )
})


