import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout'; 
import HomePage from './pages/HomePage';
import HomeLayout from './HomeLayout';
import { UserContextProvider } from './UserContext';
import NewPostPage from './pages/NewPostPage';
import YourPost from './pages/YourPost';
import ProfileSetting from './pages/ProfileSetting';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default route for Layout */}
          <Route index element={<MainPage />} />
          {/* Other routes within the Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />

          <Route path='/home' element={<HomeLayout/>}>
            <Route path="/home" element={<HomePage />} />
            <Route path='/home/users' element={<UsersPage/>} />
          </Route>
          {/* <Route path='/users' element={<UsersPage/>} /> */}
          <Route path='/newpost/:userId' element={<NewPostPage/>} />
          <Route path='/yourpost/:userId' element={<YourPost/>} />
          <Route path='/profilesetting/:userId' element={<ProfileSetting/>} />

        </Route>
      </Routes>

    </UserContextProvider>
  );
}

export default App;
