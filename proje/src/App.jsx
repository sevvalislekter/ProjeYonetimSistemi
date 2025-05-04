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
import Feedbacks from './pages/Feedbacks';
import Planlayıcı from './pages/Planlayıcı';
import Duyuru from './pages/Duyuru';
import RegisterPages from './pages/RegisterPages';
import ForgotPass from './pages/ForgotPass';

function App() {
    return (

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
            <Route path='/feedbacks' element={<Feedbacks />} />
            <Route path='/planlayıcı' element={<Planlayıcı />} />
            <Route path='/duyuru' element={<Duyuru />} />
            <Route path='/register' element={<RegisterPages />} />
            <Route path='/forgot-password' element={<ForgotPass />} />


        </Routes>

    );
}

export default App;
