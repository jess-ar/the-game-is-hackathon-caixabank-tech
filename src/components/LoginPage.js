import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../stores/authStore';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Grid,
    IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showCredentials, setShowCredentials] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const defaultCredentials = {
        email: 'default@example.com',
        password: 'password123'
    };

    const validateFields = () => {
        if (!email || !password) {
            setError('Please fill in all fields.');
            return false;
        }
        return true;
    };

    const validateCredentials = () => {
        if (email === defaultCredentials.email && password === defaultCredentials.password) {
            login();
            navigate('/');
        } else {
            setError('Incorrect credentials. Please try again.');
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (validateFields()) {
            validateCredentials();
        }
    };

    const handleShowDefaultCredentials = () => {
        setEmail(defaultCredentials.email);
        setPassword(defaultCredentials.password);
        setShowCredentials(true);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleLogin}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            aria-label="Email"
                            required
                            error={Boolean(error && !email)}
                            helperText={error && !email ? "The email is required." : ''}
                            InputLabelProps={{ required: false }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            aria-label="Password"
                            required
                            error={Boolean(error && !password)}
                            helperText={error && !password ? 'The password is required.' : ''}
                            InputLabelProps={{ required: false }}
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
                    </Grid>
                    <Grid item xs={12}>
                        {error && !(!email || !password) && (
                            <Alert severity="error" sx={{ mt: 2 }} role="alert">
                                {error}
                            </Alert>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Button
                variant="text"
                color="secondary"
                onClick={handleShowDefaultCredentials}
                sx={{ mt: 2 }}
                fullWidth
            >
                Show Default Credentials
            </Button>

            {showCredentials && (
                <Alert severity="info" sx={{ mt: 2 }} role="alert">
                    <strong>Email</strong> {defaultCredentials.email}<br />
                    <strong>Password</strong> {defaultCredentials.password}
                </Alert>
            )}
        </Box>
    );
}

export default LoginPage;
