import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Projects() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost/proje/projelerigetir.php');
                if (response.data.success) {
                    setProjects(response.data.projects);
                } else {
                    setError(response.data.message || "Projeler alınırken bir hata oluştu.");
                }
            } catch (error) {
                setError("Projeler alınırken bir ağ hatası oluştu.");
                console.error("Projeler alınırken bir hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleViewProject = (projectId) => {
        navigate(`/project-detail/${projectId}`);
    };

    const handleDeleteProject = async (projectId) => {
        if (window.confirm(`Bu projeyi silmek istediğinize emin misiniz (ID: ${projectId})?`)) {
            try {
                const response = await axios.post('http://localhost/proje/projesil.php', { id: projectId });

                if (response.data.success) {
                    const updatedProjects = projects.filter(project => project.id !== projectId);
                    setProjects(updatedProjects);
                    alert("Proje başarıyla silindi!");
                } else {
                    alert("Proje silinirken bir hata oluştu: " + response.data.message);
                }
            } catch (error) {
                alert("Proje silinirken bir ağ hatası oluştu, lütfen tekrar deneyin.");
                console.error("Proje silinirken bir hata oluştu:", error);
            }
        }
    };

    if (loading) {
        return <div>Projeler yükleniyor...</div>;
    }

    if (error) {
        return <div>Hata: {error}</div>;
    }

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
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

            {/* Main Content */}
            <div className="main-content">
                <h3 className="pro">Projeler</h3>
                <p>Kullanıcılar tarafından oluşturulacak projeler</p>
                <div className="list">
                    <table className="tbl">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Proje Adı</th>
                                <th>Açıklama</th>
                                <th>Başlangıç Tarihi</th>
                                <th>Bitiş Tarihi</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.length === 0 ? (
                                <tr><td colSpan="6">Hiç proje bulunamadı.</td></tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>{project.pname}</td>
                                        <td>{project.descc}</td>
                                        <td>{project.startdate}</td>
                                        <td>{project.enddate}</td>
                                        <td>
                                            <button onClick={() => handleViewProject(project.id)}>Detay</button>
                                            <button onClick={() => handleDeleteProject(project.id)}>Sil</button>
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

export default Projects;
