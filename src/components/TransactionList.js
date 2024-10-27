import React, { useState, useMemo, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import TransactionForm from './TransactionForm';
import TransactionRow from './TransactionRow';
import { allCategories } from '../constants/categories';
import TablePagination from '@mui/material/TablePagination';

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
    Typography
} from '@mui/material';


function TransactionList() {
    const transactions = useStore(transactionsStore);

    const [filterCategory, setFilterCategory] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortField, setSortField] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const deleteTransaction = useCallback((id) => {
        transactionsStore.update((prev) => prev.filter((transaction) => transaction.id !== id));
    }, []);

    const handleEdit = useCallback((transaction) => {
        transactionsStore.update((prev) =>
            prev.map((t) => t.id === transaction.id ? transaction : t)
        );
    }, []);

    const filteredTransactions = useMemo(() =>
        transactions
            .filter(transaction =>
                (!filterCategory || transaction.category === filterCategory) &&
                (!filterType || transaction.type === filterType)
            )
            .sort((a, b) => {
                if (sortField === 'amount') return b.amount - a.amount;
                if (sortField === 'date') return new Date(b.date) - new Date(a.date);
                return 0;
            })
        , [transactions, filterCategory, filterType, sortField]);

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
            <Typography variant="h4" gutterBottom>
                Transaction List
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsModalOpen(true)}
            >
                Add Transaction
            </Button>
            {isModalOpen && (
                <TransactionForm
                    onClose={() => setIsModalOpen(false)}
                />
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

            <TableContainer component={Paper}>
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
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={filteredTransactions.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}

export default TransactionList;
