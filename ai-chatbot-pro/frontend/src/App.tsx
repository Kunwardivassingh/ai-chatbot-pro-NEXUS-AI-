import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthLayout from './pages/AuthLayout';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage'; // Import the new SettingsPage
import './App.css';

function App() {
  const token = localStorage.getItem('user_token');

  return (
    <div className="App">
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<ChatPage />} />
            <Route path="/settings" element={<SettingsPage />} /> {/* Add the settings route */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;