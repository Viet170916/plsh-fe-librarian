import HistoryPage from "@/app/(private)/(in-dash-board)/transaction/history/HistoryPage";
import WithClientOnly from "@/components/primary/WithClientOnly";

export default function Page() {
    return (
        <WithClientOnly>
            <HistoryPage/>
        </WithClientOnly>
    );
}


// 'use client';
// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, TextField, InputAdornment, MenuItem, Select, FormControl,
//   InputLabel, Button, Typography, Pagination, Stack, Box, CircularProgress,
//   IconButton, Tooltip, Alert
// } from '@mui/material';
// import {
//   Search as SearchIcon,
//   FilterAlt as FilterIcon,
//   Refresh as RefreshIcon,
//   Sort as SortIcon
// } from '@mui/icons-material';
// import { DatePicker } from '@mui/x-date-pickers';
// import dayjs, { Dayjs } from 'dayjs';
//
// interface Transaction {
//   id: number;
//   amount: number;
//   currency: string;
//   status: number;
//   transactionDate: string;
//   referenceId: string;
//   transactionType: number;
//   note: string;
//   fines: {
//     id: number;
//     bookTitle: string;
//     bookCode: string;
//     fineDate: string;
//     fineType: number;
//     fineAmount: number;
//     status: number;
//   }[];
// }
//
// interface ApiPagedResponse {
//   success: boolean;
//   data: Transaction[];
//   pagination: {
//     currentPage: number;
//     pageSize: number;
//     totalRecords: number;
//     totalPages: number;
//   };
//   message?: string;
// }
//
// const API_URL = 'https://localhost:7147/api/v1/transaction';
// //https://localhost:7147/api/v1/transaction/account/1
// const DEFAULT_PAGE_SIZE = 10;
//
// const HistoryPage = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<number | ''>('');
//   const [fromDate, setFromDate] = useState<Dayjs | null>(null);
//   const [toDate, setToDate] = useState<Dayjs | null>(null);
//   const [sortBy, setSortBy] = useState('transactionDate');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     pageSize: DEFAULT_PAGE_SIZE,
//     totalRecords: 0,
//     totalPages: 1
//   });
//
//   const accountId = 1;
//
//   const fetchTransactions = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//
//       const params = {
//         page: pagination.page,
//         pageSize: pagination.pageSize,
//         sortBy,
//         sortOrder,
//         ...(searchTerm && { searchTerm }),
//         ...(statusFilter !== '' && { status: statusFilter }),
//         ...(fromDate && { fromDate: fromDate.format('YYYY-MM-DD') }),
//         ...(toDate && { toDate: toDate.format('YYYY-MM-DD') })
//       };
//       const response = await axios.get<ApiPagedResponse>(`${API_URL}/account/1`, {
//         params,
//         paramsSerializer: { indexes: null }
//       });
//
//       if (response.data.success) {
//         setTransactions(response.data.data);
//         setPagination(prev => ({
//           ...prev,
//           totalRecords: response.data.pagination.totalRecords,
//           totalPages: response.data.pagination.totalPages,
//         }));
//       } else {
//         throw new Error(response.data.message || 'Failed to fetch transactions');
//       }
//     } catch (err) {
//       console.error('Error fetching transactions:', err);
//       setError('Failed to connect to the server. Please check the API endpoint or try again later.');
//     } finally {
//       setLoading(false);
//     }
//   }, [pagination.page, pagination.pageSize, searchTerm, statusFilter, fromDate, toDate, sortBy, sortOrder]);
//
//   const handleSearch = () => {
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };
//
//   const handleResetFilters = () => {
//     setSearchTerm('');
//     setStatusFilter('');
//     setFromDate(null);
//     setToDate(null);
//     setSortBy('transactionDate');
//     setSortOrder('desc');
//     setPagination({
//       page: 1,
//       pageSize: DEFAULT_PAGE_SIZE,
//       totalRecords: 0,
//       totalPages: 1
//     });
//   };
//
//   const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
//     setPagination(prev => ({ ...prev, page }));
//   };
//
//   const handleSort = (field: string) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(field);
//       setSortOrder('desc');
//     }
//   };
//
//   useEffect(() => {
//     fetchTransactions();
//   }, [fetchTransactions]);
//
//   const statusOptions = [
//     { value: 0, label: 'Chờ xử lý' },
//     { value: 1, label: 'Hoàn thành' },
//     { value: 2, label: 'Thất bại' }
//   ];
//
//   const fineTypeOptions = [
//     { value: 0, label: 'Trả muộn' },
//     { value: 1, label: 'Hư hỏng' },
//     { value: 2, label: 'Mất sách' },
//     { value: 3, label: 'Đã thanh toán' }
//   ];
//
//   const getStatusText = (status: number) =>
//     statusOptions.find(opt => opt.value === status)?.label || 'Khác';
//
//   const getStatusColor = (status: number) =>
//     ['warning.main', 'success.main', 'error.main'][status] || 'text.primary';
//
//   const getFineTypeText = (type: number) =>
//     fineTypeOptions.find(opt => opt.value === type)?.label || 'Khác';
//
//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
//         Lịch sử giao dịch
//       </Typography>
//
//       {/* Filter Section */}
//       <Paper sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
//         <Stack direction="row" spacing={2} alignItems="center" mb={2}>
//           <TextField
//             label="Tìm kiếm"
//             variant="outlined"
//             size="small"
//             fullWidth
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               )
//             }}
//           />
//
//           <FormControl size="small" sx={{ minWidth: 120 }}>
//             <InputLabel>Trạng thái</InputLabel>
//             <Select
//               value={statusFilter}
//               label="Trạng thái"
//               onChange={(e) => setStatusFilter(e.target.value as number | '')}
//             >
//               <MenuItem value="">Tất cả</MenuItem>
//               {statusOptions.map(option => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//
//           <DatePicker
//             label="Từ ngày"
//             value={fromDate}
//             onChange={setFromDate}
//             format="DD/MM/YYYY"
//             slotProps={{ textField: { size: 'small' } }}
//           />
//           <DatePicker
//             label="Đến ngày"
//             value={toDate}
//             onChange={setToDate}
//             format="DD/MM/YYYY"
//             slotProps={{ textField: { size: 'small' } }}
//           />
//           <Button
//             variant="contained"
//             onClick={handleSearch}
//             startIcon={<FilterIcon />}
//             sx={{ whiteSpace: 'nowrap' }}
//             disabled={Boolean(fromDate && toDate && fromDate.isAfter(toDate))}
//           >
//             Áp dụng
//           </Button>
//           <Tooltip title="Đặt lại bộ lọc">
//             <IconButton onClick={handleResetFilters}>
//               <RefreshIcon />
//             </IconButton>
//           </Tooltip>
//         </Stack>
//
//         {fromDate && toDate && fromDate.isAfter(toDate) && (
//           <Alert severity="error" sx={{ mt: 1 }}>
//             Ngày bắt đầu không thể sau ngày kết thúc
//           </Alert>
//         )}
//       </Paper>
//
//       {/* Loading State */}
//       {loading && (
//         <Box display="flex" justifyContent="center" p={4}>
//           <CircularProgress />
//         </Box>
//       )}
//
//       {/* Error State */}
//       {error && !loading && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       )}
//
//       {/* Empty State */}
//       {!loading && !error && (transactions?.length??0) === 0 && (
//         <Alert severity="info" sx={{ mb: 3 }}>
//           Không tìm thấy giao dịch nào phù hợp
//         </Alert>
//       )}
//
//       {/* Transaction Table */}
//       {!loading && (transactions?.length??0) > 0 && (
//         <>
//           <TableContainer component={Paper} sx={{ mb: 3 }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Mã GD</TableCell>
//                   <TableCell>
//                     <Stack direction="row" alignItems="center" spacing={1}>
//                       <span>Ngày GD</span>
//                       <IconButton
//                         size="small"
//                         onClick={() => handleSort('transactionDate')}
//                       >
//                         <SortIcon
//                           fontSize="small"
//                           sx={{
//                             opacity: sortBy === 'transactionDate' ? 1 : 0.5,
//                             transform: sortBy === 'transactionDate' && sortOrder === 'asc' ? 'scaleY(-1)' : 'scaleY(1)'
//                           }}
//                         />
//                       </IconButton>
//                     </Stack>
//                   </TableCell>
//                   <TableCell>Số tiền</TableCell>
//                   <TableCell>Trạng thái</TableCell>
//                   <TableCell>Tên sách</TableCell>
//                   <TableCell>Loại phí</TableCell>
//                   <TableCell>Số tiền phạt</TableCell>
//                   <TableCell>Mã tham chiếu</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {transactions.map((transaction) => (
//                   <TableRow key={transaction.id} hover>
//                     <TableCell>{transaction.id}</TableCell>
//                     <TableCell>
//                       {dayjs(transaction.transactionDate).format('DD/MM/YYYY HH:mm')}
//                     </TableCell>
//                     <TableCell>
//                       {transaction.amount.toLocaleString('vi-VN')} {transaction.currency}
//                     </TableCell>
//                     <TableCell>
//                       <Typography color={getStatusColor(transaction.status)}>
//                         {getStatusText(transaction.status)}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       {transaction.fines?.length??0 > 0 ? (
//                         <Tooltip title={transaction.fines.map(f => f.bookTitle).join(', ')}>
//                           <span>{transaction.fines.map(f => f.bookTitle).join(', ')}</span>
//                         </Tooltip>
//                       ) : 'N/A'}
//                     </TableCell>
//                     <TableCell>
//                       {transaction.fines?.length??0 > 0 ? (
//                         <Tooltip title={transaction.fines.map(f => getFineTypeText(f.fineType)).join(', ')}>
//                           <span>{transaction.fines.map(f => getFineTypeText(f.fineType)).join(', ')}</span>
//                         </Tooltip>
//                       ) : 'N/A'}
//                     </TableCell>
//                     <TableCell>
//                       {transaction.fines?.length??0 > 0 ? (
//                         <Tooltip title={transaction.fines.map(f => `${f.fineAmount.toLocaleString('vi-VN')} VND`).join(', ')}>
//                           <span>{transaction.fines.map(f => `${f.fineAmount.toLocaleString('vi-VN')} VND`).join(', ')}</span>
//                         </Tooltip>
//                       ) : 'N/A'}
//                     </TableCell>
//                     <TableCell>{transaction.referenceId}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//
//           {/* Pagination */}
//           <Box display="flex" justifyContent="center">
//             <Pagination
//               count={pagination.totalPages}
//               page={pagination.page}
//               onChange={handlePageChange}
//               color="primary"
//               showFirstButton
//               showLastButton
//               siblingCount={1}
//               boundaryCount={1}
//             />
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };
//
// export default HistoryPage;
