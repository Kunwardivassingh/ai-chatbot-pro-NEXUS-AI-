import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthLayout from './pages/AuthLayout';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import LandingPage from './pages/LandingPage'; // Import new page
import AboutPage from './pages/AboutPage';   // Import new page
import ContactPage from './pages/ContactPage'; // Import new page
import './App.css';

function App() {
  const token = localStorage.getItem('user_token');

  return (
    <div className="App">
      <Routes>
        {token ? (
          // Routes for logged-in users
          <>
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* If logged in, redirect from root to chat */}
            <Route path="*" element={<Navigate to="/chat" />} />
          </>
        ) : (
          // Routes for logged-out users
          <>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            {/* If a logged-out user tries any other path, send them to the landing page */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;