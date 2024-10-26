import React from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { profilerData } from '../utils/profilerData';

function DownloadProfilerData() {
    const handleDownload = () => {
        if (profilerData.length === 0) {
            alert('No profiler data available to download.');
            return;
        }

        const json = JSON.stringify(profilerData, null, 2);

        const blob = new Blob([json], { type: 'application/json' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'profiler-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
        >
            Download Profiler Data
        </Button>
    );
}

export default DownloadProfilerData;
