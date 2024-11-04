import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css'
const AppNavbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold hover:text-gray-300">
          BlogApp
        </Link>
        <div className="flex space-x-4">
          {!token ? (
            <>
              <Link
                to="/login"
                className="text-lg hover:text-gray-300 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-lg hover:text-gray-300 transition duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="text-lg hover:text-gray-300 transition duration-200"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-lg bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
