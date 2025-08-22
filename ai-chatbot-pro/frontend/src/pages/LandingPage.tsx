import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.landingContainer}>
      <main className={styles.mainContent}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Welcome to Nexus AI</h1>
          <p className={styles.subtitle}>
            Your intelligent, voice-activated assistant for seamless productivity.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/register" className={styles.signupButton}>Get Started for Free</Link>
            <Link to="/login" className={styles.loginButton}>Log In</Link>
          </div>
        </section>

        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Why You'll Love Nexus AI</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <h3>Intelligent Conversations</h3>
              <p>Powered by Google's Gemini Pro for natural and helpful responses.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Voice-Activated Commands</h3>
              <p>Talk to your assistant and open websites hands-free.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Persistent History</h3>
              <p>Never lose a conversation. Your chat history is saved to your account.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 Nexus AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;