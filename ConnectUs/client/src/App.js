import React from 'react';
import {Route, Routes}  from 'react-router-dom'
import MainPage from './pages/MainPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default route for Layout */}
          <Route index element={<MainPage />} />
          {/* Other routes within the Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </>
  );
  
}

export default App;
