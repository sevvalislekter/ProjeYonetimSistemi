import React, { useState } from 'react';
import '../css/Dashboard.css';
import { useNavigate } from 'react-router-dom';

function DashboardPages() {
    const [projects, setProjects] = useState([
        { id: 1, name: 'Proje 1', desc: 'Açıklama1' },
        { id: 2, name: 'Proje 2', desc: 'Açıklama2' },
        { id: 3, name: 'Proje 3', desc: 'Açıklama3' },
    ]);
    const navigate = useNavigate();

    const handleAddProject = () => {
        navigate('/add-proje');
    };

    // Kullanıcı adı, localStorage'dan alınır
    const username = localStorage.getItem('username');

    return (
        <div className="dashboard-container">
            <div className="sidebar" style={{ width: '220px', padding: '20px', height: '100vh' }}>
                <h2>{username ? `${username.charAt(0).toUpperCase() + username.slice(1)}` : 'Ziyaretçi'}</h2>

                <ul>
                    <li onClick={() => navigate('/home')}>Anasayfa</li>
                    <li onClick={handleAddProject}>Proje Ekle</li>
                    <li onClick={() => navigate('/projects')}>Projeler</li>
                    <li onClick={() => navigate('/add-mission')}>Görev Ekle</li>
                    <li onClick={() => navigate('/users')}>Kullanıcı Listesi</li>
                    <li onClick={() => navigate('/profile')}>Profil</li>
                    <li onClick={() => navigate('/add-worker')}>Çalışan Ekle</li>
                    <li onClick={() => navigate('/workers')}>Çalışanlar</li>
                    <li onClick={() => navigate('/mission')}>Görevler</li>
                    <li onClick={() => navigate('/')}>Çıkış</li>
                </ul>
            </div>

            <div className="main-content">
                <h1>HOŞ GELDİNİZ</h1>
                <div className="box-container">
                    <div className="box1">
                        <h3 onClick={() => navigate('/projects')}>Tüm Projeler</h3>
                    </div>
                    <div className="box2">
                        <h3 onClick={() => navigate('/feedbacks')}>Geri Bildirim</h3>
                    </div>
                    <div className="box3">
                        <h3 onClick={() => navigate('/planlayıcı')}>Planlayıcı </h3>
                    </div>
                    <div className="box4">
                        <h3 onClick={() => navigate('/duyuru')}>Duyurular</h3>
                    </div>
                </div>

                <div className="projeler">
                    <h3 className="pro">Duyurular</h3>
                    Kullanıcılar tarafından
                    <div className="list">
                        <table className="tbl">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Proje Adı</th>
                                    <th>Açıklama</th>
                                    <th>Başlangıç Tarihi</th>
                                    <th>Bitiş Tarihi</th>
                                    <th>Durum</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map(project => (
                                    <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>{project.name}</td>
                                        <td>{project.desc}</td>
                                        <td>2025-03-01</td> {/* Örnek tarih */}
                                        <td>2025-06-01</td> {/* Örnek tarih */}
                                        <td>Devam Ediyor</td> {/* Örnek durum */}
                                        <td>
                                            <button>Detay</button>
                                            <button>Sil</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPages;
