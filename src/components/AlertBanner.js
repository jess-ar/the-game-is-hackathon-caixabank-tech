import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { userSettingsStore } from '../stores/userSettingsStore';
import { Alert, Collapse } from '@mui/material';

function AlertBanner() {
    const transactions = useStore(transactionsStore);
    const userSettings = useStore(userSettingsStore);

    const { totalBudgetLimit, categoryLimits, alertsEnabled } = userSettings;

    if (!alertsEnabled) return null;

    const totalExpenses = transactions.reduce((acc, transaction) => 
        transaction.type === 'expense' ? acc + transaction.amount : acc,
        0
    );

    const overTotalBudget = totalExpenses > totalBudgetLimit;

    const categoryExpenses = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'expense') {
            acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        }
        return acc;
    }, {});

    const exceededCategories = Object.keys(categoryLimits).filter(
        (category) => categoryExpenses[category] > categoryLimits[category]
    );

    return (
        <div>

            <Collapse in={overTotalBudget}>
                <Alert severity="warning" sx={{ mb: 2 }}>
                    You have exceeded your total budget limit of {totalBudgetLimit} €!
                </Alert>
            </Collapse>

            {exceededCategories.map((category) => (
                <Alert severity="warning" sx={{ mb: 2 }} key={category}>
                    You have exceeded your budget limit for {category} ({categoryLimits[category]} €)!
                </Alert>
            ))}
        </div>
    );
}

export default AlertBanner;
