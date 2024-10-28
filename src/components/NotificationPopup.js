import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationPopup = ({ open, message, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert severity="warning">
                Warning: You have exceeded your budget!
            </Alert>
        </Snackbar>
    );
};

export default NotificationPopup;
