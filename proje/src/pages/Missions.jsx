// AllMissions.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AllMissions() {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await axios.get('http://localhost/proje/mission.php');
                console.log(response.data);

                if (response.data.success) {
                    setMissions(response.data.missions || []);
                } else {
                    setError("Görevler alınırken bir hata oluştu.");
                }
            } catch (error) {
                setError("Görevler alınırken bir hata oluştu.");
                console.error("Hata:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMissions();
    }, []);

    return (
        <div className="dashboard-container" style={{ display: 'flex' }}>
            {/* Sidebar */}
            <div className="sidebar" style={{ width: '220px', padding: '20px', height: '100vh' }}>
                <h3>Menü</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li onClick={() => navigate('/home')}>Anasayfa</li>
                    <li onClick={() => navigate('/add-proje')} >Proje Ekle</li>
                    <li onClick={() => navigate('/projects')} >Projeler</li>
                    <li onClick={() => navigate('/add-mission')} >Görev Ekle</li>
                    <li onClick={() => navigate('/users')} >Kullanıcı Listesi</li>
                    <li onClick={() => navigate('/profile')} >Profil</li>
                    <li onClick={() => navigate('/add-worker')} >Çalışan Ekle</li>
                    <li onClick={() => navigate('/workers')} >Çalışanlar</li>
                    <li onClick={() => navigate('/mission')} >Görevler</li>
                    <li onClick={() => navigate('/')}>Çıkış</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content" style={{ flex: 1, padding: '20px' }}>
                <h2>Tüm Görevler </h2>

                {loading ? (
                    <p>Yükleniyor...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : missions.length === 0 ? (
                    <p>Hiç görev bulunamadı.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Görev Açıklaması</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Başlangıç Tarihi</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Bitiş Tarihi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {missions.map((mission, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mission.task_description || 'Bilgi Yok'}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mission.startdate || 'Bilgi Yok'}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mission.enddate || 'Bilgi Yok'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AllMissions;
