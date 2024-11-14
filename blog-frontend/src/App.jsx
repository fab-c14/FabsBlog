import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import CreatePostPage from './Pages/CreatePostPage';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppNavbar from './Components/Navbar';
import PrivateRoute from './Components/PrivateRoute';

import ProfilePage from './Pages/Profile';
import Footer from './Components/Footer';


const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route
          path="/create-post"
          element={
            <PrivateRoute>
              <CreatePostPage />
            </PrivateRoute>
          }
        />
       
      </Routes>
    </Router>
  );
};

export default App;
