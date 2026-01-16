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
            navigate('/');
            window.location.reload();
        } catch (error) {
            alert("Neuspešna prijava! Proverite podatke.");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleLogin} style={styles.form}>
                <h2 style={{textAlign: 'center', color: '#333'}}>Dobrodošli</h2>
                <input
                    type="text"
                    placeholder="Korisničko ime"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Lozinka"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>Prijavi se</button>
            </form>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' },
    form: { padding: '2rem', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '320px' },
    input: { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' },
    button: { width: '100%', padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }
};

export default Login;