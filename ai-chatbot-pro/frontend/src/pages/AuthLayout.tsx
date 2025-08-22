import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        {/* This Outlet component will render the specific page (Login or Register) */}
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;