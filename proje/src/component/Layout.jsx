// src/components/Layout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Layout({ children }) {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Kullanıcı</h2>
                <ul>
                    <li onClick={() => navigate('/home')}>Anasayfa</li>
                    <li onClick={() => navigate('/add-proje')}>Proje Ekle</li>
                    <li onClick={() => navigate('/projects')}>Projeler</li>
                    <li onClick={() => navigate('/add-mission')}>Görev Ekle</li>
                    <li onClick={() => navigate('/users')}>Kullanıcı Listesi</li>
                    <li onClick={() => navigate('/profile')}>Profil</li>
                    <li onClick={() => navigate('/add-worker')}>Çalışan Ekle</li>
                    <li onClick={() => navigate('/workers')}>Çalışanlar</li>
                    <li onClick={() => navigate('/mission')}>Görevleriniz</li>
                    <li onClick={() => navigate('/')}>Çıkış</li>
                </ul>
            </div>
            {/* Main content area */}
            <div className="main-content">
                {children} {/* Burada alt bileşenlerin içeriği render edilecek */}
            </div>
        </div>
    );
}

export default Layout;