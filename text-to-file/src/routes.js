// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import UserPage from './componets/ManagerModule/UserPage'; // Import UserPage
import Hostelers from './componets/Hostel/Hostelers';   // Import Hostelers

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<UserPage />} /> {/* Add route for UserPage */}
        <Route path="/hostelers" element={<Hostelers />} /> {/* Add route for Hostelers */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
