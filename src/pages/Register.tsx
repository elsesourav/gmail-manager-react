import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Link, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/inputs/FormInput';
import SubmitButton from '../components/buttons/SubmitButton';
import AuthCard from '../components/cards/AuthCard';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await register(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <AuthCard title="Create an Account" error={error} onSubmit={handleSubmit}>
                <FormInput
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={setEmail}
                />
                <FormInput
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={setPassword}
                />
                <FormInput
                    required
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                />
                <SubmitButton>
                    Register
                </SubmitButton>
                <Box sx={{ textAlign: 'center' }}>
                    <Link href="/login" variant="body2">
                        Already have an account? Sign In
                    </Link>
                </Box>
            </AuthCard>
        </Container>
    );
};

export default Register;
