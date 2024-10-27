import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../stores/authStore';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        // Password must be at least 8 characters, with at least one lowercase letter and one number
        // This requirement aligns with the default password provided for the hackathon.
        const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setGeneralError('');

        let isValid = true;

        if (!email) {
            setEmailError("Email is required.");
            isValid = false;
        } else if (!isValidEmail(email)) {
            setEmailError("Please enter a valid email.");
            isValid = false;
        }

        if (!password) {
            setPasswordError("Password is required.");
            isValid = false;
        } else if (!isValidPassword(password)) {
            setPasswordError("Password must be at least 8 characters and include a lowercase letter and a number.");
            isValid = false;
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Please confirm your password.");
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            isValid = false;
        }

        if (!isValid) return;

        const existingUser = localStorage.getItem(email);
        if (existingUser) {
            setGeneralError("This email is already registered.");
            return;
        }

        localStorage.setItem(email, JSON.stringify({ email, password }));
        login({ email });
        setSuccess(true);

        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleRegister}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ required: false }}
                    error={Boolean(emailError)}
                    helperText={emailError}
                />

                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ required: false }}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ required: false }}
                    error={Boolean(confirmPasswordError)}
                    helperText={confirmPasswordError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Register
                </Button>
            </form>

            {generalError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {generalError}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Account created successfully! Redirecting to login...
                </Alert>
            )}
        </Box>
    );
}

export default RegisterPage;
