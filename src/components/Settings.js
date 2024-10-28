/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore, updateUserSettings } from '../stores/userSettingsStore';
import { budgetAlertStore, updateBudgetAlert } from '../stores/budgetAlertStore';
import {
    Box,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Grid,
    Paper,
    Alert,
} from '@mui/material';
import { expenseCategories } from '../constants/categories';
import { transactionsStore } from '../stores/transactionStore';

function Settings() {
    const userSettings = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);

    const [budgetExceeded, setBudgetExceeded] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [totalBudgetLimit, setTotalBudgetLimit] = useState(userSettings.totalBudgetLimit);
    const [alertsEnabled, setAlertsEnabled] = useState(userSettings.alertsEnabled);
    const [categoryLimits, setCategoryLimits] = useState(userSettings.categoryLimits || {});

    useEffect(() => {
        checkBudgetExceeded();
    }, [transactions, totalBudgetLimit]);

    const checkBudgetExceeded = () => {
        const totalExpense = transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((acc, transaction) => acc + transaction.amount, 0);
        
        const exceeded = totalExpense > totalBudgetLimit;
        setBudgetExceeded(exceeded);
        updateBudgetAlert(exceeded ? `Budget limit of ${totalBudgetLimit.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })} exceeded!` : '');
    };

    const handleSave = () => {
        const totalCategoryLimit = Object.values(categoryLimits).reduce((acc, limit) => acc + (parseFloat(limit) || 0), 0);

        if (totalCategoryLimit > totalBudgetLimit) {
            setError('The total of category limits exceeds the total budget limit.');
            setSuccessMessage('');
            return;
        }

        setError('');
        updateUserSettings({
            alertsEnabled,
            totalBudgetLimit,
            categoryLimits,
        });
        setSuccessMessage('Settings saved successfully!');
    };

    const handleCategoryLimitChange = (category, value) => {
        setCategoryLimits(prevLimits => ({
            ...prevLimits,
            [category]: value,
        }));
    };

    return (
        <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
            <Typography variant="h4" gutterBottom color="primary">
                Settings
            </Typography>

            <FormControlLabel
                control={
                    <Switch
                        color="primary"
                        checked={alertsEnabled}
                        onChange={(e) => setAlertsEnabled(e.target.checked)}
                    />
                }
                label="Enable Alerts"
            />

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Total Budget Limit (€)</Typography>
                <TextField
                    type="number"
                    name="totalBudgetLimit"
                    fullWidth
                    margin="normal"
                    value={totalBudgetLimit}
                    onChange={(e) => setTotalBudgetLimit(parseFloat(e.target.value) || 0)}
                    inputProps={{ min: 0, step: '0.01' }}
                    sx={{ mt: 1 }}
                />
            </Paper>

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Category Budget Limits (€)</Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {expenseCategories.map((category) => (
                        <Grid item xs={12} sm={6} md={4} key={category}>
                            <TextField
                                label={category}
                                type="number"
                                fullWidth
                                margin="normal"
                                value={categoryLimits[category] || ''}
                                onChange={(e) => handleCategoryLimitChange(category, e.target.value)}
                                inputProps={{ min: 0, step: '0.01' }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ boxShadow: 2 }}
                    onClick={handleSave}
                >
                    Save Settings
                </Button>
            </Box>

            {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {successMessage}
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
}

export default Settings;
