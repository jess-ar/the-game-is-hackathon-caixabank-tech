import React, { Profiler, useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { Box, Typography, Grid } from '@mui/material';
import ExportButton from './ExportButton';
import DownloadProfilerData from './DownloadProfilerData';
import { onRenderCallback } from '../utils/onRenderCallback';
import { transactionsStore } from '../stores/transactionStore';
import InfoCard from './InfoCard';
const AnalysisGraph = React.lazy(() => import('./AnalysisGraph'));
const BalanceOverTime = React.lazy(() => import('./BalanceOverTime'));
const Statistics = React.lazy(() => import('./Statistics'));
const Recommendations = React.lazy(() => import('./Recommendations'));
const RecentTransactions = React.lazy(() => import('./RecentTransactions'));

function calculateTotals(transactions) {
    const validTransactions = Array.isArray(transactions) ? transactions : [];

    return validTransactions.reduce(
        (totals, transaction) => {
            if (transaction.type === 'income') totals.income += transaction.amount;
            if (transaction.type === 'expense') totals.expense += transaction.amount;
            return totals;
        },
        { income: 0, expense: 0 }
    );
}

function Dashboard() {
    const transactions = useStore(transactionsStore);
    const [totals, setTotals] = useState({ income: 0, expense: 0 });
    const [balance, setBalance] = useState(0);
    const budgetLimit = 1000;

    useEffect(() => {
        const { income, expense } = calculateTotals(transactions);
        setTotals({ income, expense });
        setBalance(income - expense);
    }, [transactions]);

    return (
        <Box sx={{ mt: 2 }}>
            <Profiler id="Dashboard" onRender={onRenderCallback}>
                <Box component="section" aria-labelledby="financial-summary-heading" sx={{ p: 3 }}>
                    <Typography
                        id="financial-summary-heading"
                        variant="h4"
                        gutterBottom
                        sx={{ color: 'rgb(0, 126, 174)', mb: 3 }}
                    >
                        Financial Summary
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <ExportButton
                            data={transactions || []}
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

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} md={4}>
                            <InfoCard
                                title="Total Income"
                                value={totals.income.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                                valueColor="green"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <InfoCard
                                title="Total Expenses"
                                value={totals.expense.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                                valueColor="red"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <InfoCard
                                title="Balance"
                                value={balance.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                                valueColor={balance >= 0 ? 'green' : 'error.main'}
                                description={
                                    balance < 0
                                        ? "Warning: Your balance is negative!"
                                        : totals.expense > budgetLimit
                                            ? "Alert: You have exceeded your budget limit!"
                                            : null
                                }
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                            <AnalysisGraph />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <BalanceOverTime />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                            <Statistics />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Recommendations />
                        </Grid>
                    </Grid>

                    <Box component="section" aria-labelledby="recent-transactions-heading" sx={{ mt: 4 }}>
                        <Typography id="recent-transactions-heading" variant="h5" gutterBottom>
                            Recent Transactions
                        </Typography>
                        <RecentTransactions
                            transactions={transactions}
                        />
                    </Box>
                </Box>
            </Profiler>
        </Box>
    );
}

export default Dashboard;