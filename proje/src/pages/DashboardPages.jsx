import React, { useState, useEffect } from 'react'; // useEffect buraya eklendi
import '../css/Dashboard.css';
import { useNavigate } from 'react-router-dom';

function DashboardPages() {
    const [projects, setProjects] = useState([
        { id: 1, name: 'Proje 1', desc: 'Açıklama1' },
        { id: 2, name: 'Proje 2', desc: 'Açıklama2' },
        { id: 3, name: 'Proje 3', desc: 'Açıklama3' },
    ]);
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);

    const handleAddProject = () => {
        navigate('/add-proje');
    };

    useEffect(() => {
        const savedPlans = JSON.parse(localStorage.getItem('plans')) || [];
        setPlans(savedPlans);
    }, []);

    const username = localStorage.getItem('username');

    return (
        <div className="dashboard-container">
            <div className="sidebar" style={{ width: '220px', padding: '20px', height: '100vh' }}>
                <h2 style={{ fontFamily: 'sans-serif' }}>{username ? `${username.charAt(0).toUpperCase() + username.slice(1)}` : 'Ziyaretçi'}</h2>
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
                        <h3 onClick={() => navigate('/planlayıcı')}>Planlayıcı</h3>
                    </div>
                    <div className="box4">
                        <h3 onClick={() => navigate('/duyuru')}>Duyurular</h3>
                    </div>
                </div>

                <div className="projeler" style={{ marginTop: '40px' }}>
                    <h3 className="pro">Planlayıcı Görevleri</h3>
                    Kullanıcı tarafından
                    <div className="list">
                        <table className="tbl">
                            <thead>
                                <tr>
                                    <th>Görev</th>
                                    <th>Tarih</th>
                                    <th>Durum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plans.length > 0 ? (
                                    plans.map(plan => (
                                        <tr key={plan.id}>
                                            <td>{plan.title}</td>
                                            <td>{plan.date}</td>
                                            <td>{plan.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">Henüz görev eklenmedi.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPages;
