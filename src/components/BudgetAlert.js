import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { Alert } from '@mui/material';
import { budgetAlertStore, updateBudgetAlert } from '../stores/budgetAlertStore';
import { userSettingsStore } from '../stores/userSettingsStore';
import { transactionsStore } from '../stores/transactionStore';

const BudgetAlert = () => {
    const userSettings = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);
    const budgetAlert = useStore(budgetAlertStore);

    const totalExpense = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const budgetExceeded = totalExpense > userSettings.totalBudgetLimit;

    useEffect(() => {
        if (budgetExceeded) {
            updateBudgetAlert(true, `Warning: You have exceeded your budget limit of ${userSettings.totalBudgetLimit} €!`);
        } else {
            updateBudgetAlert(false, '');
        }
    }, [budgetExceeded, userSettings.totalBudgetLimit, transactions.length]);

    /*return (
        budgetAlert.isVisible && (
            <Alert severity="warning">
                {budgetAlert.message}
            </Alert>
        )
    );*/
};

export default BudgetAlert;
