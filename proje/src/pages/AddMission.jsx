import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddMission() {
    const navigate = useNavigate();

    // Örnek projeler ve çalışanlar listesi
    const [projects] = useState([
        { id: 1, name: "Proje 1" },
        { id: 2, name: "Proje 2" },
        { id: 3, name: "Proje 3" },
        { id: 4, name: "Proje 4" },
        { id: 5, name: "Proje 5" }
    ]);

    const [workers] = useState([
        { id: 1, name: "Ahmet Yılmaz" },
        { id: 2, name: "Elif Demir" },
        { id: 3, name: "Mehmet Kara" },
        { id: 4, name: "Şevval İşlekter" },
        { id: 5, name: "Zeynep Kaya" }
    ]);

    const handleAddProject = (event) => {
        event.preventDefault(); // Formun varsayılan submit işlemini engeller
        alert("Görev başarıyla eklendi!");
    };

    return (
        <div className="dashboard-container">
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
                    <li onClick={() => navigate('/proj')}>Projeleriniz</li>
                    <li onClick={() => navigate('/exit')}>Çıkış</li>
                </ul>
            </div>
            <div className="main-content">
                <form className='form' onSubmit={handleAddProject}>
                    <h2>Görev Ekle</h2>

                    {/* Proje Seç */}
                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <label>Proje Seç</label>
                        <select required>
                            <option value="">Proje Seçiniz</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Çalışan Seç */}
                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <label>Çalışan Seç</label>
                        <select required>
                            <option value="">Çalışan Seçiniz</option>
                            {workers.map((worker) => (
                                <option key={worker.id} value={worker.id}>
                                    {worker.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Proje Açıklaması */}
                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <input type="text" placeholder="Görev açıklaması" style={{ height: '70px' }} required />
                    </div>

                    {/* Başlangıç Tarihi */}
                    <div className="btarih" style={{ marginBottom: '20px' }}>
                        Başlangıç Tarihi:
                        <input type="date" required />
                    </div>

                    {/* Bitiş Tarihi */}
                    <div style={{ marginBottom: '20px' }}>
                        Bitiş Tarihi:
                        <input type="date" required />
                    </div>

                    {/* Submit Button */}
                    <button type="submit">Ekle</button>
                </form>
            </div>
        </div>
    );
}

export default AddMission;
