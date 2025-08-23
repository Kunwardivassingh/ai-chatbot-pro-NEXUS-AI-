import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1>Nexus AI</h1>
        </Link>

        {/* Hamburger Menu Button */}
        <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Navigation Links - now with logic to handle mobile */}
        <div className={`${styles.navLinksContainer} ${isMenuOpen ? styles.active : ''}`}>
          <div className={styles.navLinks}>
            <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} onClick={() => setIsMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
          </div>
          <div className={styles.authButtons}>
            <Link to="/login" className={styles.loginButton} onClick={() => setIsMenuOpen(false)}>Log In</Link>
            <Link to="/register" className={styles.signupButton} onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;