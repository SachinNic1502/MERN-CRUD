// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName'); // Retrieve username from localStorage

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName'); // Clear username
    window.location.href = '/auth';
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-white text-xl font-bold">
          MERN App
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {token ? (
          <>
            <span className="text-white font-medium">Welcome, {userName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Login/Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
