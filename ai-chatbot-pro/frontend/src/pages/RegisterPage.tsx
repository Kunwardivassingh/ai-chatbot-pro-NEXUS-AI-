import { useState, type FormEvent } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import { register } from '../services/authService'; // Import our new function

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register({ full_name: fullName, email, password });
      // If registration is successful, automatically navigate to the login page
      navigate('/login');
    } catch (err: unknown) {
      // Handle errors from the backend (e.g., email already exists)
      if (err && typeof err === 'object' && 'response' in err && 
          err.response && typeof err.response === 'object' && 'data' in err.response &&
          err.response.data && typeof err.response.data === 'object' && 'detail' in err.response.data) {
        setError(err.response.data.detail as string);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Create Your Account</h1>
        <p className={styles.subtitle}>Get started with your personal AI assistant.</p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="fullName">Full Name</label>
            <input 
              className={styles.input} 
              type="text" 
              id="fullName" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required 
            />
          </div>
          
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

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
            <input 
              className={styles.input} 
              type="password" 
              id="confirmPassword" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          
          <button className={styles.button} type="submit">Create Account</button>
        </form>
        
        <p className={styles.footerText}>
          Already have an account? <Link to="/login" className={styles.link}>Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;