import React, { useState } from 'react'
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
function ForgotPass() {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    return (
        <div>
            <div className='login-container'>
                <h2>Şifre Yenileme</h2>
                <form className='form' >
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
                        <label className='pass'>Yeni Şifre: </label>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
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
    )
}

export default ForgotPass