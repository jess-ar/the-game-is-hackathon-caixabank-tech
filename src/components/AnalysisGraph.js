import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Paper, Typography } from '@mui/material';

function AnalysisGraph() {
    const transactions = useStore(transactionsStore) || [];

    const categories = [...new Set(Array.isArray(transactions) ? transactions.map((transaction) => transaction.category) : [])];

    const data = categories.map((category) => {
        const income = transactions
            .filter((transaction) => transaction.category === category && transaction.type === 'income')
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        const expense = transactions
            .filter((transaction) => transaction.category === category && transaction.type === 'expense')
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        return { category, Income: income, Expense: expense };
    });

    return (
        <Paper
            sx={{
                padding: 3,
                width: '100%',
                maxWidth: '900px',
                minHeight: '500px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" gutterBottom sx={{ alignSelf: 'flex-start' }}>
                Income and Expenses by Category
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Income" stackId="a" fill="#82ca9d" name="Income" />
                    <Bar dataKey="Expense" stackId="a" fill="#8884d8" name="Expense" />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
}

export default AnalysisGraph;
