import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div id="landingPageRoot" className={styles.lpContainer}>
      <main className={styles.lpMainContent}>
        <section className={styles.lpHero}>
          <h1 className={styles.lpTitle}>Welcome to Nexus AI</h1>
          <p className={styles.lpSubtitle}>
            Your intelligent, voice-activated assistant for seamless productivity.
          </p>
          <div className={styles.lpCtaButtons}>
            <Link to="/register" className={styles.lpSignupButton}>Get Started for Free</Link>
            <Link to="/login" className={styles.lpLoginButton}>Log In</Link>
          </div>
        </section>

        <section className={styles.lpFeatures}>
          <h2 className={styles.lpSectionTitle}>Why You'll Love Nexus AI</h2>
          <div className={styles.lpFeaturesGrid}>
            <div className={styles.lpFeatureCard}>
              <h3>Intelligent Conversations</h3>
              <p>Powered by Google's Gemini Pro for natural and helpful responses.</p>
            </div>
            <div className={styles.lpFeatureCard}>
              <h3>Voice-Activated Commands</h3>
              <p>Talk to your assistant and open websites hands-free.</p>
            </div>
            <div className={styles.lpFeatureCard}>
              <h3>Persistent History</h3>
              <p>Never lose a conversation. Your chat history is saved to your account.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.lpFooter}>
        <p>&copy; 2025 Nexus AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
