import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SettingsPage.module.css';
import { clearAllConversations } from '../services/chatService';

const SettingsPage = () => {
  const [theme, setTheme] = useState('dark');
  const [isVoiceInputEnabled, setIsVoiceInputEnabled] = useState(true);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedVoiceInput = localStorage.getItem('voice_input_enabled') !== 'false';
    const savedVoiceOutput = localStorage.getItem('voice_output_enabled') === 'true';

    setTheme(savedTheme);
    setIsVoiceInputEnabled(savedVoiceInput);
    setIsVoiceOutputEnabled(savedVoiceOutput);
    
    document.documentElement.className = savedTheme;
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  const handleVoiceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isEnabled = e.target.checked;
    setIsVoiceInputEnabled(isEnabled);
    localStorage.setItem('voice_input_enabled', String(isEnabled));
  };

  const handleVoiceOutputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isEnabled = e.target.checked;
    setIsVoiceOutputEnabled(isEnabled);
    localStorage.setItem('voice_output_enabled', String(isEnabled));
  };

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    navigate('/login');
    window.location.reload();
  };

  // --- THIS IS THE NEW, FULLY FUNCTIONAL CODE ---
  const handleClearConversations = async () => {
    if (window.confirm("Are you sure you want to delete all your conversations? This action cannot be undone.")) {
      try {
        await clearAllConversations();
        alert("All conversations have been deleted.");
        navigate('/');
        window.location.reload(); // Force a reload to ensure the chat page fetches the new empty list
      } catch (error) {
        console.error("Failed to clear conversations:", error);
        alert("Could not clear conversations. Please try again.");
      }
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.header}>
        <Link to="/" className={styles.backButton}>← Back to Chat</Link>
        <h1>Settings</h1>
      </div>
      <div className={styles.card}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Appearance</h2>
          <div className={styles.option}>
            <span>Theme</span>
            <div className={styles.themeSelector}>
              <button onClick={() => handleThemeChange('light')} className={`${styles.themeButton} ${theme === 'light' ? styles.active : ''}`}>Light</button>
              <button onClick={() => handleThemeChange('dark')} className={`${styles.themeButton} ${theme === 'dark' ? styles.active : ''}`}>Dark</button>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Functionality</h2>
          <div className={styles.option}>
            <div>
              <p>Voice Input</p>
              <p className={styles.optionDescription}>Show or hide the microphone button in the chat input.</p>
            </div>
            <label className={styles.switch}>
              <input type="checkbox" checked={isVoiceInputEnabled} onChange={handleVoiceInputChange} />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.option} style={{ marginTop: '20px' }}>
            <div>
              <p>Voice Output</p>
              <p className={styles.optionDescription}>Have the assistant's responses read aloud automatically.</p>
            </div>
            <label className={styles.switch}>
              <input type="checkbox" checked={isVoiceOutputEnabled} onChange={handleVoiceOutputChange} />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Account</h2>
          <button onClick={handleClearConversations} className={`${styles.actionButton} ${styles.clearButton}`}>Clear All Conversations</button>
          <button onClick={handleLogout} className={styles.actionButton}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;