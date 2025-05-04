import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPass() {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Konsola gönderilen veriyi yazdıralım
            console.log('Gönderilen Veriler:', {
                username,
                email,
                new_password: pass
            });

            const response = await axios.post('http://localhost/proje/forgotpass.php', {
                username,
                email,
                new_password: pass
            });

            console.log('Backend Cevabı:', response.data); // Backend'den gelen cevabı kontrol edelim

            alert(response.data.message);
            if (response.data.success) {
                alert("şifre yenilendi"); // Başarılı şifre yenileme sonrası giriş sayfasına yönlendir
            }
        } catch (error) {
            console.error('Şifre yenileme başarısız:', error);
            alert('Şifre yenileme başarısız: ' + error.message);
        }
    };

    return (
        <div>
            <div className='login-container'>
                <div style={{ border: '1px solid black', padding: '50px', backgroundColor: 'ghostwhite' }}>
                    <h2 style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>Şifre Yenileme</h2>
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
                            <label>E-mail: </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className='pass'>Yeni Şifre: </label>
                            <input
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button className='btn' type="submit">Yenile</button>
                        </div>
                    </form>
                    <div>
                        <button className='btn' onClick={() => navigate('/')}>Giriş</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPass;
