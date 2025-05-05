import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddMission() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form değerlerini tutmak için state
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedWorker, setSelectedWorker] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Sayfa yüklendiğinde proje ve çalışan listelerini çek
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Projeleri çek
                const projectsResponse = await axios.get('http://localhost/proje/projelerigetirr.php');
                if (!projectsResponse.data.success) {
                    throw new Error(projectsResponse.data.message || 'Projeler alınamadı');
                }
                setProjects(projectsResponse.data.projects);

                // Çalışanları çek
                const workersResponse = await axios.get('http://localhost/proje/workerr.php');
                if (!workersResponse.data.success) {
                    throw new Error(workersResponse.data.message || 'Çalışanlar alınamadı');
                }
                setWorkers(workersResponse.data.workers);

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                console.error("Veri çekme hatası:", error);
            }
        };

        fetchData();
    }, []);

    const handleAddMission = async (event) => {
        event.preventDefault();

        if (!selectedProject || !selectedWorker || !taskDescription || !startDate || !endDate) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            const response = await axios.post('http://localhost/proje/missionadd.php', {
                project_id: selectedProject,
                worker_id: selectedWorker,
                task_description: taskDescription,
                startdate: startDate,
                enddate: endDate
            });

            if (response.data.success) {
                alert(response.data.message);
                setSelectedProject('');
                setSelectedWorker('');
                setTaskDescription('');
                setStartDate('');
                setEndDate('');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Görev eklerken bir hata oluştu:", error);
            alert("Görev eklenirken bir hata oluştu.");
        }
    };

    if (loading) {
        return <div>Yükleniyor...</div>;
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
                                    {project.pname}
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
                                    {worker.first_name}
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
                    <button className='buton' type="submit">Ekle</button>
                </form>
            </div>
        </div>
    );
}

export default AddMission;