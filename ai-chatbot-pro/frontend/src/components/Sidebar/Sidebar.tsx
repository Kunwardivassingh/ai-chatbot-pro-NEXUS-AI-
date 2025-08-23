import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import axios from 'axios';
import type { Conversation } from '../../pages/ChatPage';

interface User {
  full_name: string;
  email: string;
}

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean; // Add isMobile prop
  conversations: Conversation[];
  activeConversationId: number | null;
  onNewChat: () => void;
  onSelectConversation: (id: number) => void;
  onDeleteConversation: (id: number) => void;
  onToggleSidebar: () => void;
}

const Sidebar = ({
  isOpen,
  isMobile,
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  onToggleSidebar
}: SidebarProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('user_token');
      if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user", error);
          handleLogout();
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    navigate('/login');
    window.location.reload();
  };

  const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase() : name.substring(0, 2).toUpperCase();
  };

  const sidebarClasses = `${styles.sidebar} ${!isOpen ? styles.collapsed : ''} ${isMobile ? styles.mobile : ''}`;

  return (
    <div className={sidebarClasses}>
      <div className={styles.topHeader}>
        <div className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17L12 22L22 17" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12L12 17L22 12" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h1>Nexus AI</h1>
        </div>
        <button className={styles.toggleButton} onClick={onToggleSidebar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
        </button>
      </div>

      <div className={styles.header}>
        <button className={styles.newChatButton} onClick={onNewChat}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>New Chat</span>
        </button>
      </div>

      <div className={styles.history}>
        {conversations.map((convo) => (
          <div
            key={convo.id}
            className={`${styles.historyItem} ${convo.id === activeConversationId ? styles.active : ''}`}
            onClick={() => onSelectConversation(convo.id)}
          >
            <span className={styles.historyTitle}>{convo.title}</span>
            <button 
              className={styles.deleteButton} 
              onClick={(e) => { e.stopPropagation(); onDeleteConversation(convo.id); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        {user && (
          <div className={styles.userProfile} onClick={() => setMenuOpen(!menuOpen)}>
            <div className={styles.profileIcon}>{getInitials(user.full_name)}</div>
            <span className={styles.userName}>{user.full_name}</span>
            {menuOpen && (
              <div className={styles.menu}>
                <div className={styles.mmenuItem} onClick={() => navigate('/settings')}>Settings</div>
                <div className={styles.mmenuItem} onClick={handleLogout}>Log Out</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;