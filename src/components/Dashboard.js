import React, { Profiler, useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import ExportButton from './ExportButton';
import DownloadProfilerData from './DownloadProfilerData';
import { onRenderCallback } from '../utils/onRenderCallback';
import { transactionsStore } from '../stores/transactionStore';

const AnalysisGraph = React.lazy(() => import('./AnalysisGraph'));
const BalanceOverTime = React.lazy(() => import('./BalanceOverTime'));
const Statistics = React.lazy(() => import('./Statistics'));
const Recommendations = React.lazy(() => import('./Recommendations'));
const RecentTransactions = React.lazy(() => import('./RecentTransactions'));

function Dashboard() {
    const transactions = useStore(transactionsStore);

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [balance, setBalance] = useState(0);
    const budgetLimit = 1000;

    useEffect(() => {
        console.log("Current transactions:", transactions);

        const income = transactions.reduce((acc, transaction) => {
            return transaction.type === 'income' ? acc + transaction.amount : acc;
        }, 0);

        const expense = transactions.reduce((acc, transaction) => {
            return transaction.type === 'expense' ? acc + transaction.amount : acc;
        }, 0);

        setTotalIncome(income);
        setTotalExpense(expense);
        setBalance(income - expense);
    }, [transactions]);

    const handleEdit = (transaction) => {
        console.log("Edit transaction:", transaction);
    };

    const handleDelete = (id) => {
        console.log("Delete transaction with id:", id);
    };




    return (
        <Profiler id="Dashboard" onRender={onRenderCallback}>
            <Box sx={{ p: 4 }}>
                <Typography variant="h3" gutterBottom>
                Financial Summary
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <ExportButton
                        data={transactions}
                        headers={['description', 'amount', 'type', 'category', 'date']}
                        filename="transactions.csv"
                    />
                    <DownloadProfilerData />
                </Box>

                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Total Income
                            </Typography>
                            <Typography variant="h5" data-testid="total-income">
                                {totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Total Expenses
                            </Typography>
                            <Typography variant="h5" data-testid="total-expenses">

                                {totalExpense.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Balance
                            </Typography>
                            <Typography variant="h5" data-testid="balance">

                                {balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </Typography>

                            {balance < 0 && (
                                <Typography variant="body1" color="error">
                                    Warning: Your balance is negative!
                                </Typography>
                            )}
                            {totalExpense > budgetLimit && (
                                <Typography variant="body1" color="warning">
                                    Alert: You have exceeded your budget limit!
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Statistics />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Recommendations />
                    </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <AnalysisGraph />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <BalanceOverTime />
                    </Grid>
                </Grid>

                <div>
                    <RecentTransactions
                        transactions={transactions}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </Box>
        </Profiler>
    );
}

export default Dashboard;
