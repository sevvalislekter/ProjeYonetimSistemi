import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyMissions() {
    const navigate = useNavigate();
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMissions = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost/proje/mission.php');

                if (response.data.success) {
                    setMissions(response.data.missions || []);
                } else {
                    setError(response.data.message || "Görevler alınırken bir hata oluştu.");
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

    const handleCompleteMission = async (missionId) => {
        try {
            const response = await axios.post('http://localhost/proje/complete_mission.php', {
                missionId: missionId
            });

            if (response.data.success) {
                setMissions(missions.filter(mission => mission.id !== missionId));
                alert("Görev başarıyla tamamlandı!");
            } else {
                alert(response.data.message || "Görev tamamlanırken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Görev tamamlanırken hata:", error);
            alert("Görev tamamlanırken bir hata oluştu.");
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
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

            <div className="main-content">
                <h2>Görevleriniz</h2>

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
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Görev ID</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Görev Açıklaması</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {missions.map(mission => (
                                <tr key={mission.id}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mission.id}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mission.task_description || '-'}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                        <button
                                            onClick={() => handleCompleteMission(mission.id)}
                                            style={{
                                                padding: '5px 10px',
                                                backgroundColor: '#2ecc71',
                                                color: 'white',
                                                border: 'none',
                                                cursor: 'pointer',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            Tamamla
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default MyMissions;