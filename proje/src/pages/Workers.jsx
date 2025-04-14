import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate kullanabilmek için içe aktarım yapıyoruz

function Workers() {
    const navigate = useNavigate(); // useNavigate hook'u ile yönlendirme işlemi için kullanıyoruz.

    // Başlangıçta eklenmiş olan örnek çalışanlar
    const [workers, setWorkers] = useState([
        { id: 1, name: "Ahmet Yılmaz", position: "Yazılım Geliştirici", dob: "1990-01-01" },
        { id: 2, name: "Elif Demir", position: "Proje Yöneticisi", dob: "1985-03-15" },
        { id: 3, name: "Mehmet Kara", position: "Veritabanı Uzmanı", dob: "1988-07-21" },
        { id: 4, name: "Şevval İşlekter", position: "UI/UX Tasarımcı", dob: "1992-06-10" },
        { id: 5, name: "Zeynep Kaya", position: "Sistem Yöneticisi", dob: "1989-12-05" }
    ]);

    // Çalışanı silme işlemi
    const handleDeleteWorker = (workerId) => {
        const updatedWorkers = workers.filter(worker => worker.id !== workerId);
        setWorkers(updatedWorkers);
        alert("Çalışan başarıyla silindi!");
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
                <h2>Çalışanlar</h2>
                {/* Çalışanlar listesi */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Adı Soyadı</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Pozisyon</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Doğum Tarihi</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workers.map(worker => (
                            <tr key={worker.id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{worker.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{worker.position}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{worker.dob}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                                    <button onClick={() => handleDeleteWorker(worker.id)} style={{ padding: '5px 10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer' }}>
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Workers;
