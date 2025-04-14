import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    // Form değerlerini tutmak için state
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedWorker, setSelectedWorker] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleAddMission = async (event) => {
        event.preventDefault(); // Formun varsayılan submit işlemini engeller

        // Formda seçilen projeleri ve çalışanları kontrol et
        if (!selectedProject || !selectedWorker || !taskDescription || !startDate || !endDate) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        // API'ye veri gönderimi
        try {
            const response = await axios.post('http://localhost/proje/missionadd.php', {
                project_id: selectedProject,
                worker_id: selectedWorker,
                task_description: taskDescription,
                start_date: startDate,
                end_date: endDate
            });

            if (response.data.success) {
                alert(response.data.message); // Görev başarıyla eklendiğinde kullanıcıya mesaj göster
                // Formu sıfırlama
                setSelectedProject('');
                setSelectedWorker('');
                setTaskDescription('');
                setStartDate('');
                setEndDate('');
            } else {
                alert(response.data.message); // Hata mesajı
            }
        } catch (error) {
            console.error("Görev eklerken bir hata oluştu:", error);
            alert("Görev eklenirken bir hata oluştu.");
        }
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

            {/* Main content area */}
            <div className="main-content">
                <form className="form" onSubmit={handleAddMission}>
                    <h2>Görev Ekle</h2>

                    {/* Proje Seç */}
                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <label>Proje Seç</label>
                        <select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            required
                        >
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
                        <select
                            value={selectedWorker}
                            onChange={(e) => setSelectedWorker(e.target.value)}
                            required
                        >
                            <option value="">Çalışan Seçiniz</option>
                            {workers.map((worker) => (
                                <option key={worker.id} value={worker.id}>
                                    {worker.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Görev Açıklaması */}
                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Görev açıklaması"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            required
                            style={{ height: '70px' }}
                        />
                    </div>

                    {/* Başlangıç Tarihi */}
                    <div className="btarih" style={{ marginBottom: '20px' }}>
                        Başlangıç Tarihi:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Bitiş Tarihi */}
                    <div style={{ marginBottom: '20px' }}>
                        Bitiş Tarihi:
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit">Ekle</button>
                </form>
            </div>
        </div>
    );
}

export default AddMission;
