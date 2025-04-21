import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPages from './pages/LoginPages';
import DashboardPages from './pages/DashboardPages';
import AddProje from './pages/AddProje';
import Projects from './pages/Projects';
import AddMission from './pages/AddMission';
import UserList from './pages/UserList';
import Profile from './pages/Profile';
import AddWorker from './pages/AddWorker';
import Workers from './pages/Workers';
import Missions from './pages/Missions';
import { UserProvide } from './UserContext';

function App() {
    return (
        <UserProvide>
            <Routes>
                {/* LoginPage rotasını sadece bir kez tanımlayın */}
                <Route path="/" element={<LoginPages />} />

                <Route path="/home" element={<DashboardPages />} />
                <Route path='/add-proje' element={<AddProje />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/add-mission' element={<AddMission />} />
                <Route path='/users' element={<UserList />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/add-worker' element={<AddWorker />} />
                <Route path='/workers' element={<Workers />} />
                <Route path='/mission' element={<Missions />} />
            </Routes>
        </UserProvide>
    );
}

export default App;
