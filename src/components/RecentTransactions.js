import React, { useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';
import TransactionRow from './TransactionRow';

function RecentTransactions({  transactions, onEdit, onDelete }) {

    const recentTransactions = useMemo(() => {
        if (!Array.isArray(transactions)) {
            return [];
        }
        return transactions
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
    }, [transactions]);

    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Recent Transactions
            </Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount (€)</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {recentTransactions.map((transaction) => (
                            <TransactionRow 
                                key={transaction.id} 
                                transaction={transaction} 
                                onEdit={onEdit} 
                                onDelete={onDelete} 
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default RecentTransactions;
