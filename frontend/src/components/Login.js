import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8083/auth/login', {
                username,
                password
            });
            localStorage.setItem("currentUser", JSON.stringify(response.data));
            
            // Sync favorites from backend
            try {
                const favoritesResponse = await axios.get(`http://localhost:8083/users/${response.data.id}/favorites`);
                const favorites = favoritesResponse.data || [];
                localStorage.setItem(`favorites_${response.data.id}`, JSON.stringify(favorites));
            } catch (favoritesError) {
                console.error("Error syncing favorites:", favoritesError);
                // If favorites sync fails, initialize with empty array
                localStorage.setItem(`favorites_${response.data.id}`, JSON.stringify([]));
            }
            
            navigate('/');
            window.location.reload();
        } catch (error) {
            alert("Neuspešna prijava! Proverite podatke.");
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '2rem'
        }}>
            <form 
                onSubmit={handleLogin}
                style={{
                    padding: '3rem',
                    background: 'var(--bg-white)',
                    borderRadius: 'var(--border-radius)',
                    boxShadow: 'var(--shadow-lg)',
                    width: '100%',
                    maxWidth: '420px'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '0.5rem'
                    }}>
                        Welcome Back
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        Sign in to access your recipes
                    </p>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            borderRadius: '8px',
                            border: '2px solid var(--border-color)',
                            fontSize: '1rem',
                            transition: 'var(--transition)',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                            e.target.style.outline = 'none';
                            e.target.style.borderColor = 'var(--primary-color)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(211, 47, 47, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'var(--border-color)';
                            e.target.style.boxShadow = 'none';
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '2rem' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            borderRadius: '8px',
                            border: '2px solid var(--border-color)',
                            fontSize: '1rem',
                            transition: 'var(--transition)',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                            e.target.style.outline = 'none';
                            e.target.style.borderColor = 'var(--primary-color)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(211, 47, 47, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'var(--border-color)';
                            e.target.style.boxShadow = 'none';
                        }}
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;