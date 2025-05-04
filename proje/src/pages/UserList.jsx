import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserList() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]); // Başlangıçta boş dizi

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost/proje/user.php');
                if (response.data.success) {
                    setUsers(response.data.users); // users'ı güncelliyoruz
                } else {
                    setError(response.data.message || "Kullanıcılar alınırken bir hata oluştu.");
                }
            } catch (error) {
                setError("Kullanıcılar alınırken bir ağ hatası oluştu.");
                console.error("Hata:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []); // Component mount olduğunda çalışacak

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
                    <li onClick={() => navigate('/mission')}>Görevleriniz</li>
                    <li onClick={() => navigate('/')}>Çıkış</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <h3 style={{ color: 'gray' }}>Kullanıcı Listesi</h3>
                {loading ? (
                    <p>Yükleniyor...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Adı </th>
                                <th>E-mail Adresi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length > 0 ? ( // users dizisini kontrol et
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="3">Hiç kullanıcı bulunamadı.</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default UserList;
