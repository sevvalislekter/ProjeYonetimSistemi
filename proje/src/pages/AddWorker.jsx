import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddWorker() {
    const navigate = useNavigate();

    // Örnek pozisyonlar listesi
    const [positions] = useState([
        { id: 1, title: "Yazılım Geliştirici" },
        { id: 2, title: "Veritabanı Uzmanı" },
        { id: 3, title: "Proje Yöneticisi" },
        { id: 4, title: "UI/UX Tasarımcı" },
        { id: 5, title: "Sistem Yöneticisi" }
    ]);

    const [message, setMessage] = useState('');

    // Çalışan ekleme fonksiyon
    const handleAddWorker = async (event) => {
        event.preventDefault(); // Formun varsayılan submit işlemini engeller

        // Formdan alınan veriler
        const newWorker = {
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            position: event.target.position.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            hire_date: event.target.hire_date.value,
            salary: event.target.salary.value
        };

        // Burada veriyi konsola loglayalım
        console.log("Yeni Çalışan Verisi:", newWorker);

        // Verileri PHP backend'e gönder
        try {
            const response = await axios.post('http://localhost/proje/add_worker.php', newWorker);

            if (response.data.success) {
                setMessage("Çalışan başarıyla eklendi!");
            } else {
                setMessage(response.data.message);
            }

            // Formu sıfırlama
            event.target.reset();
        } catch (error) {
            console.error("Çalışan eklerken bir hata oluştu:", error);
            setMessage("Çalışan eklenirken bir hata oluştu.");
        }
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
                <form className="form" onSubmit={handleAddWorker}>
                    <h2>Çalışan Ekle</h2>

                    {/* Çalışan Adı */}
                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <label>Çalışan Adı</label>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="Ad"
                            required
                            style={{ width: '100%', height: '40px' }}
                        />
                    </div>

                    {/* Çalışan Soyadı */}
                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <label>Çalışan Soyadı</label>
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Soyad"
                            required
                            style={{ width: '100%', height: '40px' }}
                        />
                    </div>

                    {/* Pozisyon Seç */}
                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <label>Pozisyon Seç</label>
                        <select
                            name="position"
                            required
                            style={{ width: '100%', height: '40px' }}
                        >
                            <option value="">Pozisyon Seçiniz</option>
                            {positions.map((position) => (
                                <option key={position.id} value={position.title}>
                                    {position.title}
                                </option>
                            ))}
                        </select>
                    </div>



                    {/* E-posta */}
                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <label>E-posta</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="E-posta"
                            required
                            style={{ width: '100%', height: '40px' }}
                        />
                    </div>

                    {/* Telefon Numarası */}
                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <label>Telefon Numarası</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Telefon Numarası"
                            required
                            style={{ width: '100%', height: '40px' }}
                        />
                    </div>

                    {/* İşe Alım Tarihi */}
                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <label>İşe Alım Tarihi</label>
                        <input
                            type="date"
                            name="hire_date"
                            required
                            style={{ width: '100%', height: '40px' }}
                        />
                    </div>

                    {/* Maaş */}
                    <div style={{ width: '900px', marginBottom: '20px' }}>
                        <label>Maaş</label>
                        <input
                            type="number"
                            name="salary"
                            placeholder="Maaş"
                            required
                            style={{ width: '100%', height: '40px' }}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            marginTop: '20px',
                        }}
                    >
                        Ekle
                    </button>
                </form>

                {message && <div style={{ marginTop: '20px' }}>{message}</div>}
            </div>
        </div>
    );
}

export default AddWorker;
