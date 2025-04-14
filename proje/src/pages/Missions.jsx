import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyMissions() {
    const navigate = useNavigate();

    // Örnek görevler
    const [missions, setMissions] = useState([
        { id: 1, project: "Proje 1", description: "Görev 1 Açıklaması", startDate: "2025-04-01", endDate: "2025-04-10", status: "Devam Ediyor" },
        { id: 2, project: "Proje 2", description: "Görev 2 Açıklaması", startDate: "2025-04-05", endDate: "2025-04-12", status: "Devam Ediyor" },
        { id: 3, project: "Proje 3", description: "Görev 3 Açıklaması", startDate: "2025-04-02", endDate: "2025-04-08", status: "Tamamlandı" },
        { id: 4, project: "Proje 4", description: "Görev 4 Açıklaması", startDate: "2025-04-03", endDate: "2025-04-15", status: "Devam Ediyor" },
        { id: 5, project: "Proje 5", description: "Görev 5 Açıklaması", startDate: "2025-04-10", endDate: "2025-04-20", status: "Devam Ediyor" }
    ]);

    // Görevi tamamlama işlemi
    const handleCompleteMission = (missionId) => {
        const updatedMissions = missions.map(mission =>
            mission.id === missionId ? { ...mission, status: "Tamamlandı" } : mission
        );
        setMissions(updatedMissions);
        alert("Görev başarıyla tamamlandı!");
    };

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

            {/* Main Content */}
            <div className="main-content">
                <h2>Görevleriniz</h2>

                {/* Görevler listesi */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Proje</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Açıklama</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Başlangıç Tarihi</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Bitiş Tarihi</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Durum</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {missions.map(mission => (
                            <tr key={mission.id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mission.project}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mission.description}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mission.startDate}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mission.endDate}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{mission.status}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                    {mission.status === "Devam Ediyor" ? (
                                        <button
                                            onClick={() => handleCompleteMission(mission.id)}
                                            style={{
                                                padding: '5px 10px',
                                                backgroundColor: '#2ecc71',
                                                color: 'white',
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Tamamla
                                        </button>
                                    ) : (
                                        <span style={{ color: '#7f8c8d' }}>Tamamlandı</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyMissions;
