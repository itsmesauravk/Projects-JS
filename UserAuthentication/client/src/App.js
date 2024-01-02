import './App.css';
import {  Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './Layout';
import { UserContextProvider } from './userContex';
import Profile from './pages/Profile';

function App() {
  return (
    <UserContextProvider>
      
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          {/* <Route path='/profile' element={<Profile />} /> */}
        </Route>
      </Routes>
   
    </UserContextProvider>
    
  );
}

export default App;
