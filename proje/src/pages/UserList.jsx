import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate kullanabilmek için içe aktarım yapıyoruz

function UserList() {
    const navigate = useNavigate(); // useNavigate hook'u ile yönlendirme işlemi için kullanıyoruz.

    // Örnek projeler verisi (Gerçek bir uygulamada API'den alınabilir)
    const [projects] = useState([
        { id: 1, name: "Hümeyra Artut", desc: "hosa193@gmail.com", startDate: "2025-03-01", endDate: "2025-06-01" },
        { id: 2, name: "Cem Sev", desc: "22091167@stu.istinye.edu.tr", startDate: "2025-04-01", endDate: "2025-07-01" },
        { id: 3, name: "Pınar Çomar", desc: "pinar123@gmail.com", startDate: "2025-05-01", endDate: "2025-08-01" },
    ]);

    // Proje Ekle sayfasına yönlendirecek fonksiyon
    const handleAddProject = () => {
        navigate('/add-proje');
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
                <h3 style={{ color: 'black' }}>Kullanıcı Listesi</h3>
                Tüm Kullanıcılar:
                <form>
                    <div className="cont">
                        <div className="list">
                            <table className="tbl">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Adı Soyadı</th>
                                        <th>E-mail Adresi</th>
                                        <th>Başlangıç Tarihi</th>
                                        <th>Kayıt Tarihi</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.id}>
                                            <td>{project.id}</td>
                                            <td>{project.name}</td>
                                            <td>{project.desc}</td>
                                            <td>{project.startDate}</td>
                                            <td>{project.endDate}</td>
                                            <td>{project.status}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserList;
