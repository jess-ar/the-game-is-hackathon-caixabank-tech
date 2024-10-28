import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

function TransactionRow({ transaction, onEdit, onDelete, showActions }) {
    return (
        <TableRow key={transaction.id} sx={{ transition: 'background-color 0.2s' }}>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</TableCell>
            <TableCell>{transaction.type === 'income' ? 'Income' : 'Expense'}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>{new Date(transaction.date).toLocaleDateString('es-ES')}</TableCell>
            
            {showActions && (
                <TableCell>
                    <Button 
                        variant="outlined" 
                        sx={{ 
                            borderColor: '#339CC5', 
                            marginRight: 1, 
                            borderRadius: 20, 
                            textTransform: 'none', 
                            minWidth: '75px',
                            '&:hover': {
                                borderColor: '#005879',
                                backgroundColor: 'transparent'
                            }
                        }}
                        onClick={() => onEdit(transaction)} 
                    >
                        Edit
                    </Button>
                    <Button 
                        variant="outlined" 
                        sx={{ 
                            borderColor: '#d32f2f', 
                            color: '#d32f2f', 
                            borderRadius: 20, 
                            textTransform: 'none', 
                            minWidth: '75px',
                            '&:hover': {
                                borderColor: '#b22222',
                                backgroundColor: 'transparent'
                            }
                        }}
                        onClick={() => onDelete(transaction.id)}
                    >
                        Delete
                    </Button>
                </TableCell>
            )}
        </TableRow>
    );
}

export default TransactionRow;
