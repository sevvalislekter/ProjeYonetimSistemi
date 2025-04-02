import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Projects() {
    const navigate = useNavigate();

    // Örnek projeler dizisi (Gerçek bir uygulamada API'den alınabilir)
    const [projects] = useState([
        { id: 1, name: "Pınar Gül", pname: "Proje 1", desc: "Proje1 açıklama", status: "Devam ediyor" },
        { id: 2, name: "Enes Ak", pname: "Proje 2 ", desc: "Proje2 açıklama", status: "Tamamlanacak" },
        { id: 3, name: "Yaprak Durmaz", pname: "Proje 3", desc: "Proje3 açıklama", status: "Devam ediyor" },
        { id: 4, name: "Şevval İşlekter", pname: "Proje4", desc: "Proje4 4", status: "Tamamlandı" },
        { id: 5, name: "Çağla Yılmaz", pname: "Proje5", desc: "Proje5 5", status: "Tamamlandı" }
    ]);

    const handleAddProject = () => {
        navigate('/add-proje'); // Proje ekleme sayfasına yönlendirme
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2>Kullanıcı</h2>
                <ul>
                    <li onClick={() => navigate('/home')}>Anasayfa</li>
                    <li onClick={handleAddProject}>Proje Ekle</li>
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
                <h1>HOŞ GELDİNİZ</h1>
                <div className="box-container">
                    <div className="box1">
                        <h3 sty>Tüm Projeler </h3>
                        <h3 >5</h3>
                    </div>
                    <div className="box2">
                        <h3>Tamamlanan Projeler</h3>
                        <h3>2</h3>
                    </div>
                    <div className="box3">
                        <h3>Devam Eden Projeler</h3>
                        <h3>2</h3>
                    </div>
                    <div className="box4">
                        <h3>Tamamlanacak Projeler</h3>
                        <h3>1</h3>
                    </div>
                </div>

                <div className="main-container">
                    <h3 className="pro">Projeler</h3>
                    Kullanıcılar tarafından oluşturulacak projeler
                    <div className="list">
                        <table className="tbl">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Proje Oluşturan</th>
                                    <th>Proje Adı</th>
                                    <th>Açıklama</th>
                                    <th>Başlangıç Tarihi</th>
                                    <th>Bitiş Tarihi</th>
                                    <th>Durum</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>{project.name}</td>
                                        <td>{project.pname}</td>
                                        <td>{project.desc}</td>
                                        <td>2025-03-01</td> {/* Örnek tarih */}
                                        <td>2025-06-01</td> {/* Örnek tarih */}
                                        <td>{project.status}</td> {/* Örnek durum */}
                                        <td>
                                            <button>Detay</button>
                                            <button>Sil</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
