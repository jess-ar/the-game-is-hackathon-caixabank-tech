import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '@nanostores/react';
import { authStore } from '../stores/authStore';

function ProtectedRoute() {
    const { isAuthenticated } = useStore(authStore);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;