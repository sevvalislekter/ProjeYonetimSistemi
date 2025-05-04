import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

function RegisterPages() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Yeni e-posta state'i
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost/proje/register.php', {
                username,
                email,  // e-posta bilgisi de gönderiliyor
                password
            });
            alert(response.data.message);
            navigate('/'); // Başarılı bir şekilde kaydedildikten sonra giriş sayfasına yönlendir
        } catch (error) {
            console.error('Kayıt işlemi başarısız:', error);
            alert('Kayıt sırasında bir hata oluştu');
        }
    };

    return (
        <div className='login-container'>
            <div style={{ border: '1px solid black', padding: '50px', backgroundColor: 'ghostwhite' }}>
                <h2 style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>Kayıt Sayfası</h2>

                <form className='form' onSubmit={handleSubmit}>
                    <div>
                        <label>Kullanıcı Adı: </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>E-mail: </label> {/* E-posta alanı eklendi */}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // E-posta state'ini güncelliyoruz
                            required
                        />
                    </div>
                    <div>
                        <label className='pass'>Şifre Oluştur: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button className='btn' type="submit">Kaydol</button>
                    </div>
                </form>
                <div>
                    <button className='btn' onClick={() => navigate('/')}>Giriş</button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPages;
