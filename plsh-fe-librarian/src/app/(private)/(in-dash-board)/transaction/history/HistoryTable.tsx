"use client"
import {memo} from 'react';
import {
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import {Sort as SortIcon} from '@mui/icons-material';
import dayjs from 'dayjs';
import {Transaction} from "@/stores/slices/api/transaction.api.slice";

interface TransactionTableProps {
    transactions: Transaction[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    onSort: (field: string) => void;
    getStatusText: (status: number) => string;
    getStatusColor: (status: number) => string;
    getFineTypeText: (type: number) => string;
}

const TransactionTable = memo(({
    transactions,
    sortBy,
    sortOrder,
    onSort,
    getStatusText,
    getStatusColor,
    getFineTypeText
}: TransactionTableProps) => {
    return (
        <TableContainer component={Paper} sx={{mb: 3}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Mã GD</TableCell>
                        <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <span>Ngày GD</span>
                                <IconButton
                                    size="small"
                                    onClick={() => onSort('transactionDate')}
                                >
                                    <SortIcon
                                        fontSize="small"
                                        sx={{
                                            opacity: sortBy === 'transactionDate' ? 1 : 0.5,
                                            transform: sortBy === 'transactionDate' && sortOrder === 'asc' ? 'scaleY(-1)' : 'scaleY(1)'
                                        }}
                                    />
                                </IconButton>
                            </Stack>
                        </TableCell>
                        <TableCell>Số tiền</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Tên sách</TableCell>
                        <TableCell>Loại phí</TableCell>
                        <TableCell>Số tiền phạt</TableCell>
                        <TableCell>Mã tham chiếu</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id} hover>
                            <TableCell>{transaction.id}</TableCell>
                            <TableCell>
                                {dayjs(transaction.transactionDate).format('DD/MM/YYYY HH:mm')}
                            </TableCell>
                            <TableCell>
                                {transaction.amount.toLocaleString('vi-VN')} {transaction.currency}
                            </TableCell>
                            <TableCell>
                                <Typography color={getStatusColor(transaction.status)}>
                                    {getStatusText(transaction.status)}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {transaction.fines?.length > 0 ? (
                                    <Tooltip title={transaction.fines.map(f => f.bookTitle).join(', ')}>
                                        <span>{transaction.fines.map(f => f.bookTitle).join(', ')}</span>
                                    </Tooltip>
                                ) : 'N/A'}
                            </TableCell>
                            <TableCell>
                                {transaction.fines?.length > 0 ? (
                                    <Tooltip title={transaction.fines.map(f => getFineTypeText(f.fineType)).join(', ')}>
                                        <span>{transaction.fines.map(f => getFineTypeText(f.fineType)).join(', ')}</span>
                                    </Tooltip>
                                ) : 'N/A'}
                            </TableCell>
                            <TableCell>
                                {transaction.fines?.length > 0 ? (
                                    <Tooltip
                                        title={transaction.fines.map(f => `${f.fineAmount.toLocaleString('vi-VN')} VND`).join(', ')}>
                                        <span>{transaction.fines.map(f => `${f.fineAmount.toLocaleString('vi-VN')} VND`).join(', ')}</span>
                                    </Tooltip>
                                ) : 'N/A'}
                            </TableCell>
                            <TableCell>{transaction.referenceId}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});


export default TransactionTable;
