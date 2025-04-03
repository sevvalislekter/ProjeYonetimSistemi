import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/AddPr.css';

function AddProje() {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleAddProject = async (event) => {
        event.preventDefault();

        if (!projectName || !projectDescription || !startDate || !endDate) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            const response = await axios.post('http://localhost/proje/projeadd.php', {
                pname: projectName,
                pdesc: projectDescription,
                bdate: startDate,
                fdate: endDate,
            });

            if (response.data.success) {
                alert("Proje başarıyla eklendi!");
                navigate('/projects'); // Projeler sayfasına yönlendir
            } else {
                alert("Proje eklenirken bir hata oluştu: " + response.data.message);
            }
        } catch (error) {
            alert("Bir hata oluştu, lütfen tekrar deneyin.");
        }
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
                        <input style={{ height: '70px' }} type="text" placeholder='Proje adı' value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
                    </div>
                    <div style={{ width: '900px' }}>
                        <input type="text" placeholder='Proje açıklaması' style={{ height: '70px' }} value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} required />
                    </div>
                    <div className="btarih">Başlangıç Tarihi
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    </div>
                    <div>
                        Bitiş Tarihi
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                    </div>
                    <button type="submit">Ekle</button>
                </form>
            </div>
        </div>
    );
}

export default AddProje;