import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { CircularProgress, Typography, Paper } from '@mui/material';

function Recommendations() {
    const transactions = useStore(transactionsStore); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    const getMonthlyExpenses = (transactionsArray, month, year) => {
        const validTransactions = Array.isArray(transactionsArray) ? transactionsArray : [];
        
        return validTransactions
            .filter(transaction => 
                transaction.type === 'expense' &&
                new Date(transaction.date).getMonth() === month &&
                new Date(transaction.date).getFullYear() === year
            )
            .reduce((total, transaction) => total + transaction.amount, 0);
    };

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const expenseThisMonth = getMonthlyExpenses(transactions, currentMonth, currentYear);
    const expenseLastMonth = getMonthlyExpenses(transactions, lastMonth, lastMonthYear);

    let comparisonMessage = '';

    if (expenseLastMonth === 0) {
        comparisonMessage = "This is your first month recording expenses. Keep it up!";
    } else {
        const difference = expenseThisMonth - expenseLastMonth;
        const percentageChange = Math.abs((difference / expenseLastMonth) * 100).toFixed(2);

        if (difference > 0) {
            comparisonMessage = `Your expenses have increased by ${percentageChange}%. Consider reviewing your expenses.`;
        } else if (difference < 0) {
            comparisonMessage = `Great job! Your expenses have decreased by ${percentageChange}%. Keep up the good work!`;
        } else {
            comparisonMessage = "Your spending hasn't changed compared to last month.";
        }
    }

    return (
        <Paper
            sx={{
                padding: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                mt: 2
            }}
        >
            <Typography variant="h6" gutterBottom>Recommendations</Typography>
            <Typography>{comparisonMessage}</Typography>
        </Paper>
    );
}

export default Recommendations;
