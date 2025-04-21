import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate kullanabilmek için içe aktarım yapıyoruz

function UserList() {
    const navigate = useNavigate(); // useNavigate hook'u ile yönlendirme işlemi için kullanıyoruz.

    // Örnek projeler verisi (Gerçek bir uygulamada API'den alınabilir)
    const [users] = useState([ // projects yerine users kullanıyoruz, çünkü bu kullanıcı listesi
        { id: 1, name: "Hümeyra Artut", email: "hosa193@gmail.com", startDate: "2025-03-01", registrationDate: "2025-03-05" },
        { id: 2, name: "Cem Sev", email: "22091167@stu.istinye.edu.tr", startDate: "2025-04-01", registrationDate: "2025-04-05" },
        { id: 3, name: "Pınar Çomar", email: "pinar123@gmail.com", startDate: "2025-05-01", registrationDate: "2025-05-05" },
    ]);

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
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.startDate}</td>
                                            <td>{user.registrationDate}</td>
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
