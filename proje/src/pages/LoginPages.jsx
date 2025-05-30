import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const LoginPages = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook'u kullanılıyor

  // handleLogin fonksiyonu, formun submit edilmesiyle çalışacak
  const handleLogin = async (e) => {
    e.preventDefault(); // Form gönderimi engelleniyor

    try {
      const response = await axios.post('http://localhost/proje/login.php', {
        username: username,
        email: email,
        password: password,
      });

      if (response.data.success) {
        // Başarılı giriş sonrası kullanıcı ID'sini localStorage'a kaydediyoruz
        localStorage.setItem('userId', response.data.userId); // Kullanıcı ID'sini localStorage'a kaydediyoruz
        localStorage.setItem('username', username); // Kullanıcı adını localStorage'a kaydediyoruz
        navigate('/home'); // Başarılı giriş sonrası yönlendirme yapılır
      } else {
        setErrorMessage(response.data.message); // Hata mesajını göster
      }
    } catch (error) {
      setErrorMessage('Bir hata oluştu, lütfen tekrar deneyin.'); // Ağ hatası durumunda mesaj
    }
  };

  return (
    <div className="login-container">
      <div style={{ border: '1px solid black', padding: '50px', backgroundColor: '#ffffff' }}>
        <h1 >Proje Yönetim Takip Sistemi</h1>
        <form className="form" onSubmit={handleLogin}>
          <h2 style={{ fontFamily: 'initial', textAlign: 'center', fontFamily: 'Garamond' }}>Giriş Yap</h2>
          <div >
            <label>Kullanıcı Adı:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>E-mail:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="pass">Şifre:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div>
            <button className="btn" type="submit">
              Giriş Yap
            </button>
          </div>
        </form>
        <div>
          <button className="btn" onClick={() => navigate('/register')}>
            Kayıt Ol
          </button>
          <button className="btn" onClick={() => navigate('/forgot-password')}>
            Şifremi Unuttum
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPages;
