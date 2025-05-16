import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Workers() {
    const navigate = useNavigate();
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost/proje/worker.php'); // PHP backend API
                if (response.data.success) {
                    setWorkers(response.data.workers); // API'den gelen çalışan verilerini kaydediyoruz
                } else {
                    setError(response.data.message || "Çalışanlar alınırken bir hata oluştu.");
                }
            } catch (error) {
                setError("Çalışanlar alınırken bir ağ hatası oluştu.");
                console.error("Çalışanlar alınırken bir hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkers();
    }, []);

    const handleDeleteWorker = async (workerId) => {
        if (window.confirm(`Bu çalışanı silmek istediğinize emin misiniz (ID: ${workerId})?`)) {
            try {
                const response = await axios.post('http://localhost/proje/delete_worker.php', { id: workerId });

                if (response.data.success) {
                    const updatedWorkers = workers.filter(worker => worker.id !== workerId);
                    setWorkers(updatedWorkers);
                    alert("Çalışan başarıyla silindi!");
                } else {
                    alert("Çalışan silinirken bir hata oluştu: " + response.data.message);
                }
            } catch (error) {
                alert("Çalışan silinirken bir ağ hatası oluştu, lütfen tekrar deneyin.");
                console.error("Çalışan silinirken bir hata oluştu:", error);
            }
        }
    };

    if (loading) {
        return <div>Çalışanlar yükleniyor...</div>;
    }

    if (error) {
        return <div>Hata: {error}</div>;
    }

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar" style={{ width: '220px', padding: '20px', height: '100vh' }}>
                <h3>Menü</h3>
                <ul>
                    <li onClick={() => navigate('/home')}>Anasayfa</li>
                    <li onClick={() => navigate('/add-proje')}>Proje Ekle</li>
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

            {/* Main Content */}
            <div className="main-content">
                <h3 style={{ color: 'black' }}>Çalışanlar</h3>
                <p>Mevcut çalışanlar listesi</p>
                <div className="list">
                    <table className="tbl">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Adı Soyadı</th>
                                <th>Pozisyon</th>
                                <th>E-posta</th>
                                <th>Telefon</th>
                                <th>İşe Alım Tarihi</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workers.length === 0 ? (
                                <tr><td colSpan="7">Hiç çalışan bulunamadı.</td></tr>
                            ) : (
                                workers.map((worker) => (
                                    <tr key={worker.id}>
                                        <td>{worker.id}</td>
                                        <td>{worker.first_name} {worker.last_name}</td>
                                        <td>{worker.position}</td>
                                        <td>{worker.email}</td>
                                        <td>{worker.phone}</td>
                                        <td>{worker.hire_date}</td>
                                        <td>
                                            <button onClick={() => handleDeleteWorker(worker.id)}>Sil</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Workers;
