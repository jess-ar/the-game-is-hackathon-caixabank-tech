import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

function TransactionRow({ transaction, onEdit, onDelete }) {
    return (
        <TableRow key={transaction.id} className="hover:bg-gray-100 transition-colors duration-200">
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.amount.toFixed(2)}</TableCell>
            <TableCell>{transaction.type === 'income' ? 'Income' : 'Expense'}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>{new Date(transaction.date).toLocaleDateString('en-US')}</TableCell>
            <TableCell>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className="mr-2"
                    onClick={() => onEdit(transaction)} 
                >
                    Edit
                </Button>
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => onDelete(transaction.id)}
                >
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default TransactionRow;
