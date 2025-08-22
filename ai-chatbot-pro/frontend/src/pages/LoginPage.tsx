import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import { login } from '../services/authService';

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
      navigate('/chat'); // UPDATED THIS LINE
      window.location.reload(); // Force a reload to update auth state
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err && 
          err.response && typeof err.response === 'object' && 'data' in err.response &&
          err.response.data && typeof err.response.data === 'object' && 'detail' in err.response.data) {
        setError(err.response.data.detail as string);
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