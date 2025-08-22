import styles from './AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.apContainer}>
      <div className={styles.apContentCard}>
        <h1 className={styles.apTitle}>About Nexus AI</h1>
        <p className={styles.apText}>
          Nexus AI was born from a passion for exploring the intersection of human-computer interaction and artificial intelligence. This project is a demonstration of what's possible with modern web technologies and powerful large language models.
        </p>
        <p className={styles.apText}>
          The application was built by <strong>Kunwar Divas Singh</strong> with the creative and coding assistance of AI, showcasing a true collaboration between human ingenuity and machine intelligence.
        </p>
        <div className={styles.apTechSection}>
          <h2>Core Technologies</h2>
          <ul>
            <li><strong>Backend:</strong> FastAPI (Python)</li>
            <li><strong>Frontend:</strong> React (TypeScript)</li>
            <li><strong>AI Engine:</strong> Google Gemini Pro</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;