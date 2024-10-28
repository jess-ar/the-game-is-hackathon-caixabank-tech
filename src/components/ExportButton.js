import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const ExportButton = React.memo(function ExportButton({ data, filename, headers, label }) {
    const handleExport = useCallback(() => {
        if (!data || data.length === 0) return;

        const csv = convertArrayOfObjectsToCSV(data, headers);
        if (!csv) return;

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [data, filename, headers]);

    const convertArrayOfObjectsToCSV = (data, headers) => {
        if (!data || !data.length) return null;

        const headerString = headers.join(',') + '\n';
        const rows = data.map((item) => {
            return headers.map((header) => {
                const value = item[header] !== undefined ? item[header] : '';
                return `"${value}"`;
            }).join(',');
        });

        return headerString + rows.join('\n');
    };

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={!data || data.length === 0}
        >
            {label || 'Export CSV'}
        </Button>
    );
});


ExportButton.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    filename: PropTypes.string,
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
};

ExportButton.defaultProps = {
    data: [],
    filename: 'data.csv',
    label: 'Export Transactions',
};

export default ExportButton;