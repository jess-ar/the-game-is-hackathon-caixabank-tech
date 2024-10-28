import React, { useState, useMemo, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore, setTransactions } from '../stores/transactionStore';
import TransactionForm from './TransactionForm';
import TransactionRow from './TransactionRow';
import { allCategories } from '../constants/categories';
import TablePagination from '@mui/material/TablePagination';
import ExportButton from './ExportButton';
import DownloadProfilerData from './DownloadProfilerData';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    Typography,
} from '@mui/material';

function TransactionList() {
    const storeTransactions = useStore(transactionsStore);

    const [filterCategory, setFilterCategory] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortField, setSortField] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const deleteTransaction = useCallback((id) => {
        const updatedTransactions = storeTransactions.filter((transaction) => transaction.id !== id);
        setTransactions(updatedTransactions);
    }, [storeTransactions]);

    const handleEdit = useCallback((updatedTransaction) => {
        const updatedTransactions = storeTransactions.map((transaction) =>
            transaction.id === updatedTransaction.id ? updatedTransaction : transaction
        );
        setTransactions(updatedTransactions);
    }, [storeTransactions]);

    const filteredTransactions = useMemo(() => {
        if (!Array.isArray(storeTransactions)) return [];
        return storeTransactions
            .filter(transaction =>
                (!filterCategory || transaction.category === filterCategory) &&
                (!filterType || transaction.type === filterType)
            )
            .sort((a, b) => {
                if (sortField === 'amount') return b.amount - a.amount;
                if (sortField === 'date') return new Date(b.date) - new Date(a.date);
                return 0;
            });
    }, [storeTransactions, filterCategory, filterType, sortField]);

    const paginatedTransactions = useMemo(() => {
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredTransactions.slice(start, end);
    }, [filteredTransactions, page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography
                id="financial-summary-heading"
                variant="h4"
                gutterBottom
                sx={{ color: 'rgb(0, 126, 174)', mb: 3 }}
            >
                Transaction List
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Transaction
                    </Button>
                    <ExportButton
                        data={storeTransactions || []}
                        headers={['description', 'amount', 'type', 'category', 'date']}
                        filename="transactions.csv"
                        sx={{
                            bgcolor: 'grey.300',
                            color: 'text.secondary',
                            borderRadius: 1,
                            px: 2,
                            py: 1,
                            boxShadow: 1,
                            '&:hover': { bgcolor: 'grey.400' },
                        }}
                        aria-label="Export Transactions"
                    />
                </Box>
                <Box>
                    <DownloadProfilerData
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            borderRadius: 1,
                            px: 3,
                            py: 1.5,
                            boxShadow: 2,
                            '&:hover': { bgcolor: 'primary.dark' },
                        }}
                        aria-label="Download Profiler Data"
                    />
                </Box>
            </Box>

            {isModalOpen && (
                <TransactionForm onClose={() => setIsModalOpen(false)} />
            )}

            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-category-label">Category</InputLabel>
                    <Select
                        labelId="filter-category-label"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {allCategories.map((cat) => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-type-label">Type</InputLabel>
                    <Select
                        labelId="filter-type-label"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="sort-field-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-field-label"
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="amount">Amount</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <TableContainer component={Paper} sx={{ marginBottom: 5 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount (€)</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedTransactions.map((transaction) => (
                            <TransactionRow 
                                key={transaction.id} 
                                transaction={transaction} 
                                onEdit={handleEdit} 
                                onDelete={deleteTransaction} 
                                showActions={true}
                            />
                        ))}
                    </TableBody>
                </Table>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 0 }}>
                    <TablePagination
                        component="div"
                        count={filteredTransactions.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </TableContainer>
        </Box>
    );
}

export default TransactionList;
