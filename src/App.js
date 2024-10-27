import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container, CircularProgress } from '@mui/material';
import { lightTheme, darkTheme } from './theme'; 
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import Analysis from './components/Analysis';
import Settings from './components/Settings';
import Footer from './components/Footer';
import SupportPage from './components/SupportPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute'; 
import { authStore } from './stores/authStore';
import { useStore } from '@nanostores/react';
import BudgetAlert from './components/BudgetAlert';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const auth = useStore(authStore);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        let user = null;

        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch (error) {
            console.error("Error parsing 'user' data from localStorage:", error);
        }

        if (isAuthenticated && user) {
            authStore.set({ isAuthenticated, user });
        } else {
            authStore.set({ isAuthenticated: false, user: null });
        }
    }, []);

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <Container sx={{ flex: 1, mt: 4 }}>
            <BudgetAlert />
            <ErrorBoundary>
              <Suspense fallback={<CircularProgress />}>
                <Routes>
                  <Route element={<ProtectedRoute isAuthenticated={auth.isAuthenticated} />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/transactions" element={<TransactionList />} />
                    <Route path="/analysis" element={<Analysis />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/support" element={<SupportPage />} />
                  </Route>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </Container>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;