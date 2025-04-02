import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPages from './pages/LoginPages';
import DashboardPages from './pages/DashboardPages';
import RegisterPages from './pages/RegisterPages';
import ForgotPass from './pages/ForgotPass';
import AddProje from './pages/AddProje';
import Projects from './pages/Projects';
import AddMission from './pages/AddMission';
import UserList from './pages/UserList';
import Profile from './pages/Profile';
function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPages />} />
            <Route path="/home" element={<DashboardPages />} />
            <Route path='/register' element={<RegisterPages />} />
            <Route path='/forgot-password' element={<ForgotPass />} />
            <Route path='/add-proje' element={<AddProje />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/add-mission' element={<AddMission />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    );
}

export default App;