import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    // Kullanıcı bilgilerini tanımlıyoruz
    const [userInfo, setUserInfo] = useState({
        username: "Şevval İşlekter",
        email: "sevval.45@example.com",
        phone: "+90 555 555 55 55",
        address: "İstanbul, Türkiye",
        profileImage: '/image/img.jpg' // Public klasöründe /image/img.jpg yoluyla resmi referans gösteriyoruz.
    });

    // Profil fotoğrafını değiştirme fonksiyonu
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserInfo({
                    ...userInfo,
                    profileImage: reader.result // Yeni resmi base64 formatında güncelle
                });
            };
            reader.readAsDataURL(file); // Dosyayı base64 formatına çevir
        }
    };

    // Profil bilgilerini güncelleme fonksiyonu
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        alert("Profil başarıyla güncellendi!");
    };

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
                <h2>Profilim</h2>

                {/* Profil fotoğrafı */}
                <div className="profile-image">
                    <img
                        src={userInfo.profileImage}
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
                    <button
                        onClick={() => document.getElementById('profile-image-input').click()}
                    >
                        Resmi Değiştir
                    </button>
                </div>

                {/* Profil bilgilerini güncelleme formu */}
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

                    <button type="submit">Profili Güncelle</button>
                </form>
            </div>
        </div>
    );
}

export default Profile;
