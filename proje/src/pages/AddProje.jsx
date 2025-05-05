import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AddPr.css';

function AddProje() {
    const navigate = useNavigate();

    const handleAddProject = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('pname', e.target.pname.value);
        formData.append('descc', e.target.descc.value);
        formData.append('startdate', e.target.startdate.value);
        formData.append('enddate', e.target.enddate.value);

        try {
            const response = await axios.post('http://localhost/proje/projeadd.php', formData);
            console.log("Sunucu cevabı:", response.data);

            if (response.data.success) {
                alert("Proje başarıyla eklendi!");
                navigate('/projects');
            } else {
                alert("Hata: " + response.data.message);
            }
        } catch (err) {
            console.error("İstek hatası:", err);
            alert("Bir hata oluştu, lütfen tekrar deneyin.");
        }
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
                <form onSubmit={handleAddProject}>
                    <h2>Proje Ekle</h2>

                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <input type="text" name="pname" placeholder="Proje Adı" style={{ height: '70px' }} required />
                    </div>

                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <input type="text" name="descc" placeholder="Proje Açıklaması" style={{ height: '70px' }} required />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        Başlangıç Tarihi:
                        <input type="date" name="startdate" required />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        Bitiş Tarihi:
                        <input type="date" name="enddate" required />
                    </div>

                    <button className='buton' type="submit">Ekle</button>
                </form>
            </div>
        </div>
    );
}

export default AddProje;
