import React from 'react';
import { Paper, Typography } from '@mui/material';

const InfoCard = ({ title, value, valueColor, description, sx, titleAlign = 'center', titleSize = 'h6' }) => (
    <Paper
        sx={{
            padding: 1,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: 2, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ...sx,
        }}
    >
        <Typography
            variant={titleSize}
            gutterBottom
            sx={{ alignSelf: titleAlign === 'left' ? 'flex-start' : 'center' }}
        >
            {title}
        </Typography>
        <Typography
            variant="h5"
            sx={{ color: valueColor }}
            data-testid={title.toLowerCase().replace(" ", "-")}
        >
            {value}
        </Typography>
        
        {description && (
            <Typography variant="body1" color="error" sx={{ mt: 1 }}>
                {description}
            </Typography>
        )}
    </Paper>
);

export default InfoCard;
