import { useState, type FormEvent } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import { login } from '../services/authService'; // Import our new login function

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ email, password });
      // If login is successful, navigate to the main chat page
      navigate('/'); 
      window.location.reload(); // Force a reload to update auth state
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Log in to access your conversations.</p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email Address</label>
            <input 
              className={styles.input} 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input 
              className={styles.input} 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          {error && <p style={{ color: '#ff4d4d', textAlign: 'center' }}>{error}</p>}
          
          <button className={styles.button} type="submit">Log In</button>
        </form>
        
        <p className={styles.footerText}>
          Don't have an account? <Link to="/register" className={styles.link}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;