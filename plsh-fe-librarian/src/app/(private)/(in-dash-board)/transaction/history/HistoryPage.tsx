"use client"
import {useCallback, useMemo, useState} from 'react';
import {Alert, Box, CircularProgress, Pagination, Typography} from '@mui/material';
import {Dayjs} from 'dayjs';
import TransactionFilters from "@/app/(private)/(in-dash-board)/transaction/history/HistoryFilter";
import TransactionTable from "@/app/(private)/(in-dash-board)/transaction/history/HistoryTable";
import {useGetTransactionsQuery} from "@/stores/slices/api/transaction.api.slice";

const DEFAULT_PAGE_SIZE = 10;

const statusOptions = [
    {value: 0, label: 'Chờ xử lý'},
    {value: 1, label: 'Hoàn thành'},
    {value: 2, label: 'Thất bại'}
];

const fineTypeOptions = [
    {value: 0, label: 'Trả muộn'},
    {value: 1, label: 'Hư hỏng'},
    {value: 2, label: 'Mất sách'},
    {value: 3, label: 'Đã thanh toán'}
];

const HistoryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<number | ''>('');
    const [fromDate, setFromDate] = useState<Dayjs | null>(null);
    const [toDate, setToDate] = useState<Dayjs | null>(null);
    const [sortBy, setSortBy] = useState('transactionDate');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [page, setPage] = useState(1);

    const {data, error, isLoading} = useGetTransactionsQuery({
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        sortBy,
        sortOrder,
        ...(searchTerm && {searchTerm}),
        ...(statusFilter !== '' && {status: statusFilter}),
        ...(fromDate && {fromDate: fromDate.format('YYYY-MM-DD')}),
        ...(toDate && {toDate: toDate.format('YYYY-MM-DD')})
    });

    const handleSearch = useCallback(() => {
        setPage(1);
    }, []);

    const handleResetFilters = useCallback(() => {
        setSearchTerm('');
        setStatusFilter('');
        setFromDate(null);
        setToDate(null);
        setSortBy('transactionDate');
        setSortOrder('desc');
        setPage(1);
    }, []);

    const handlePageChange = useCallback((event: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const handleSort = useCallback((field: string) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    }, [sortBy, sortOrder]);

    const getStatusText = useCallback((status: number) =>
        statusOptions.find(opt => opt.value === status)?.label || 'Khác', []);

    const getStatusColor = useCallback((status: number) =>
        ['warning.main', 'success.main', 'error.main'][status] || 'text.primary', []);

    const getFineTypeText = useCallback((type: number) =>
        fineTypeOptions.find(opt => opt.value === type)?.label || 'Khác', []);

    const transactions = useMemo(() => data?.data || [], [data?.data]);
    const totalPages = useMemo(() => data?.pagination?.totalPages || 1, [data?.pagination]);

    return (
        <Box sx={{p: 3}}>
            <Typography variant="h4" gutterBottom sx={{mb: 3}}>
                Lịch sử giao dịch
            </Typography>

            <TransactionFilters
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                fromDate={fromDate}
                toDate={toDate}
                statusOptions={statusOptions}
                onSearchTermChange={setSearchTerm}
                onStatusFilterChange={setStatusFilter}
                onFromDateChange={setFromDate}
                onToDateChange={setToDate}
                onSearch={handleSearch}
                onReset={handleResetFilters}
            />

            {isLoading && (
                <Box display="flex" justifyContent="center" p={4}>
                    <CircularProgress/>
                </Box>
            )}

            {error && !isLoading && (
                <Alert severity="error" sx={{mb: 3}}>
                    {'message' in error ? error.message : 'Failed to fetch transactions'}
                </Alert>
            )}

            {!isLoading && !error && transactions.length === 0 && (
                <Alert severity="info" sx={{mb: 3}}>
                    Không tìm thấy giao dịch nào phù hợp
                </Alert>
            )}

            {!isLoading && transactions.length > 0 && (
                <>
                    <TransactionTable
                        transactions={transactions}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onSort={handleSort}
                        getStatusText={getStatusText}
                        getStatusColor={getStatusColor}
                        getFineTypeText={getFineTypeText}
                    />

                    <Box display="flex" justifyContent="center">
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            showFirstButton
                            showLastButton
                            siblingCount={1}
                            boundaryCount={1}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default HistoryPage;
