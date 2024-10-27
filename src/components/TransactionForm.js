import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid, Box } from '@mui/material';
import { categoryKeywords } from '../constants/categoryKeywords';
import { allCategories } from '../constants/categories';


function TransactionForm({ transactionToEdit, onClose }) {
    const transactions = useStore(transactionsStore);
    
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const assignCategory = (desc) => {
            for (const [keyword, cat] of Object.entries(categoryKeywords)) {
                if (desc.toLowerCase().includes(keyword.toLowerCase())) {
                    return cat;
                }
            }
            return 'Other Expenses';
        };
    
        if (transactionToEdit) {
            setDescription(transactionToEdit.description);
            setAmount(transactionToEdit.amount);
            setType(transactionToEdit.type);
            setCategory(transactionToEdit.category);
            setDate(transactionToEdit.date);
        } else {
            setCategory(assignCategory(description));
        }
    }, [transactionToEdit, description]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description || !amount || !type || !category || !date) {
            alert("Please fill out all fields.");
            return;
        }

        const transaction = {
            id: transactionToEdit ? transactionToEdit.id : new Date().getTime(),
            description,
            amount: parseFloat(amount),
            type,
            category,
            date,
        };

        if (transactionToEdit) {
            transactions.update((existingTransactions) => {
                return existingTransactions.map((t) =>
                    t.id === transactionToEdit.id ? transaction : t
                );
            });
        } else {
            transactions.update((existingTransactions) => [...existingTransactions, transaction]);
        }

        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>
                {transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                margin="normal"
                                required
                                name="description"
                                className="border border-gray-300 rounded-lg p-2"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Amount (€)"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                fullWidth
                                margin="normal"
                                required
                                inputProps={{ min: 0, step: '0.01' }}
                                name="amount"
                                className="border border-gray-300 rounded-lg p-2"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" required >
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    label="Type"
                                    name="type"
                                    className="border border-gray-300 rounded-lg"
                                >
                                    <MenuItem value="income">Income</MenuItem>
                                    <MenuItem value="expense">Expense</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal" required>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    label="Category"
                                    name="category"
                                >
                                    {allCategories.map((cat) => (
                                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                    ))}
                                    <MenuItem value="Other Expenses">Other Expenses</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                fullWidth
                                margin="normal"
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', p: 2 }}>
                        <Button onClick={onClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" data-testid="add-transaction-button">
                            {transactionToEdit ? 'Update' : 'Add'}
                        </Button>
                    </Box>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default TransactionForm;