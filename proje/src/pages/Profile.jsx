import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    // İlk yüklemede localStorage'dan veriyi al
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        profileImage: ''
    });

    // Component yüklendiğinde localStorage'dan veri çek
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);

    // Profil fotoğrafını değiştirme fonksiyonu
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedInfo = {
                    ...userInfo,
                    profileImage: reader.result
                };
                setUserInfo(updatedInfo);
                localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
            };
            reader.readAsDataURL(file);
        }
    };

    // Profil bilgilerini güncelleme fonksiyonu
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        alert("Profil başarıyla güncellendi!");
    };

    return (
        <div className="dashboard-container">
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

            <div className="main-content">
                <h2>Profilim</h2>

                <div className="profile-image">
                    <img
                        src={userInfo.profileImage || 'https://via.placeholder.com/150'}
                        alt="Profil"
                        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                    />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        id="profile-image-input"
                        style={{ display: 'none' }}
                    />
                    <button onClick={() => document.getElementById('profile-image-input').click()}>
                        Resmi Değiştir
                    </button>
                </div>

                <form onSubmit={handleUpdateProfile}>
                    <div className="form-group">
                        <label htmlFor="username">Kullanıcı Adı:</label>
                        <input
                            type="text"
                            id="username"
                            value={userInfo.username}
                            onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-posta:</label>
                        <input
                            type="email"
                            id="email"
                            value={userInfo.email}
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Telefon:</label>
                        <input
                            type="text"
                            id="phone"
                            value={userInfo.phone}
                            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Adres:</label>
                        <input
                            type="text"
                            id="address"
                            value={userInfo.address}
                            onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                            required
                        />
                    </div>

                    <button className='buton' type="submit">Profili Güncelle</button>
                </form>
            </div>
        </div>
    );
}

export default Profile;
