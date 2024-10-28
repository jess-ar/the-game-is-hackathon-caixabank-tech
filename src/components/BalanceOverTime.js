import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

function BalanceOverTime() {
    const transactions = useStore(transactionsStore) || [];

    const sortedTransactions = Array.isArray(transactions) 
        ? [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))
        : [];

    const data = sortedTransactions.reduce((acc, transaction) => {
        const lastBalance = acc.length ? acc[acc.length - 1].Balance : 0;
        const newBalance = transaction.type === 'income' 
            ? lastBalance + transaction.amount 
            : lastBalance - transaction.amount;

        acc.push({
            date: new Date(transaction.date).toLocaleDateString('en-GB'),
            Balance: newBalance,
        });

        return acc;
    }, []);

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
                Balance Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Balance" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
}

export default BalanceOverTime;
