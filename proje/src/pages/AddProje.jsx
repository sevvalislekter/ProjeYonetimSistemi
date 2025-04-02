import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate'i içe aktar
import '../css/AddPr.css';

function AddProje() {
    const navigate = useNavigate(); // useNavigate hook'unu kullan

    const handleAddProject = (event) => {
        event.preventDefault(); // Formun varsayılan submit işlemini engeller

        // Input alanlarını kontrol et
        const projectName = event.target[0].value;
        const projectDescription = event.target[1].value;
        const startDate = event.target[2].value;
        const endDate = event.target[3].value;

        // Eğer herhangi bir alan boşsa uyarı ver
        if (!projectName || !projectDescription || !startDate || !endDate) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        // Tüm alanlar doluysa başarı mesajı
        alert("Proje başarıyla eklendi!");
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
                <form className='form' onSubmit={handleAddProject}>
                    <h2>Proje ekle</h2>
                    <div style={{ width: '900px' }}>
                        <input style={{ height: '70px' }} type="text" placeholder='Proje adı' required />
                    </div>
                    <div style={{ width: '900px' }}>
                        <input type="text" placeholder='Proje açıklaması' style={{ height: '70px' }} required />
                    </div>
                    <div className="btarih">Başlangıç Tarihi
                        <input type="date" required />
                    </div>
                    <div>
                        Bitiş Tarihi
                        <input type="date" required />
                    </div>
                    <button type="submit">Ekle</button>
                </form>
            </div>
        </div>
    );
}

export default AddProje;
