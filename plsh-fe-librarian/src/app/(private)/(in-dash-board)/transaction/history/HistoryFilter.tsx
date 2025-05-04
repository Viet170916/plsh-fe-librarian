"use client"
import {memo} from 'react';
import {
    Alert,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Tooltip
} from '@mui/material';
import {FilterAlt as FilterIcon, Refresh as RefreshIcon, Search as SearchIcon} from '@mui/icons-material';
import {DatePicker} from '@mui/x-date-pickers';
import {Dayjs} from 'dayjs';
import NeumorphicButton from "@/components/primary/neumorphic/Button";

interface TransactionFiltersProps {
    searchTerm: string;
    statusFilter: number | '';
    fromDate: Dayjs | null;
    toDate: Dayjs | null;
    statusOptions: { value: number; label: string }[];
    onSearchTermChange: (value: string) => void;
    onStatusFilterChange: (value: number | '') => void;
    onFromDateChange: (value: Dayjs | null) => void;
    onToDateChange: (value: Dayjs | null) => void;
    onSearch: () => void;
    onReset: () => void;
}

const TransactionFilters = memo(({
    searchTerm,
    statusFilter,
    fromDate,
    toDate,
    statusOptions,
    onSearchTermChange,
    onStatusFilterChange,
    onFromDateChange,
    onToDateChange,
    onSearch,
    onReset
}: TransactionFiltersProps) => {
    return (
        <Paper sx={{
            p: 3, mb: 3,
            bgcolor: 'primary.main',
            boxShadow: "none"
        }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <TextField
                    label="Tìm kiếm"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => onSearchTermChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        )
                    }}
                />

                <FormControl size="small" sx={{minWidth: 120}}>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                        value={statusFilter}
                        label="Trạng thái"
                        onChange={(e) => onStatusFilterChange(e.target.value as number | '')}
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        {statusOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <DatePicker
                    label="Từ ngày"
                    value={fromDate}
                    onChange={onFromDateChange}
                    format="DD/MM/YYYY"
                    slotProps={{textField: {size: 'small'}}}
                />
                <DatePicker
                    label="Đến ngày"
                    value={toDate}
                    onChange={onToDateChange}
                    format="DD/MM/YYYY"
                    slotProps={{textField: {size: 'small'}}}
                />
                <NeumorphicButton
                    variant_2="secondary"
                    color={"primary"}
                    onClick={onSearch}
                    startIcon={<FilterIcon/>}
                    sx={{whiteSpace: 'nowrap', p: 1, px: 2}}
                    disabled={Boolean(fromDate && toDate && fromDate.isAfter(toDate))}
                >
                    Áp dụng
                </NeumorphicButton>
                <Tooltip title="Đặt lại bộ lọc">
                    <IconButton onClick={onReset}>
                        <RefreshIcon/>
                    </IconButton>
                </Tooltip>
            </Stack>

            {fromDate && toDate && fromDate.isAfter(toDate) && (
                <Alert severity="error" sx={{mt: 1}}>
                    Ngày bắt đầu không thể sau ngày kết thúc
                </Alert>
            )}
        </Paper>
    );
});

TransactionFilters.displayName = 'TransactionFilters';

export default TransactionFilters;

