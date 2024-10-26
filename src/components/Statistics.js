import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { Paper, Typography } from '@mui/material';

function Statistics() {
    const transactions = useStore(transactionsStore);

    const expenses = transactions.filter(transaction => transaction.type === 'expense');

    const totalExpense = expenses.reduce((acc, transaction) => acc + transaction.amount, 0);
    const uniqueDates = [...new Set(expenses.map(transaction => new Date(transaction.date).toLocaleDateString()))];
    const averageDailyExpense = uniqueDates.length > 0 
        ? (totalExpense / uniqueDates.length) 
        : 0;

    const categoryExpenses = {};
    
    expenses.forEach(transaction => {
        if (categoryExpenses[transaction.category]) {
            categoryExpenses[transaction.category] += transaction.amount;
        } else {
            categoryExpenses[transaction.category] = transaction.amount;
        }
    });
    let maxCategory = null;
    let maxAmount = 0;

    for (const [category, amount] of Object.entries(categoryExpenses)) {
        if (amount > maxAmount) {
            maxAmount = amount;
            maxCategory = category;
        }
    }

    return (
        <Paper sx={{ padding: 2, mt: 2 }}>
            <Typography variant="h6">Key Statistics</Typography>
            <Typography>
                Average Daily Expense: {averageDailyExpense.toFixed(2)} €
            </Typography>
            <Typography>
                Highest Spending Category:{' '}
                {maxCategory
                    ? `${maxCategory} (${categoryExpenses[maxCategory].toFixed(2)} €)`
                    : 'No data available'}
            </Typography>
        </Paper>
    );
}

export default Statistics;
