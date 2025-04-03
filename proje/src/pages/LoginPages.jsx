import React, { useState } from 'react';
import axios from 'axios'; // axios import ediliyor
import '../css/Login.css';
import { useNavigate } from 'react-router-dom'; // useNavigate import ediliyor

const LoginPages = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook'u kullanılıyor

  const handleLogin = async (e) => {
    e.preventDefault();

    // API'ye login isteği gönderiyoruz
    try {
      const response = await axios.post('http://localhost/proje/login.php', {
        username: username,
        email: email,
        password: password,
      });

      if (response.data.success) {
        // Başarılı giriş
        navigate('/home'); // Başarılı giriş sonrası yönlendirme yapılır
      } else {
        // Hata mesajını göster
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="login-container">
      <h1>Proje Yönetim Takip Sistemi</h1>
      <h2>Giriş Yap</h2>
      <form className="form" onSubmit={handleLogin}>
        <div>
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
  );
};

export default LoginPages;
