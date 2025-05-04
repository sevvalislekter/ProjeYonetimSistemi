import React, { useState } from 'react';
import '../css/Duyuru.css';

function Duyuru() {
    const [duyurular, setDuyurular] = useState([]);
    const [baslik, setBaslik] = useState('');
    const [icerik, setIcerik] = useState('');

    const duyuruEkle = (e) => {
        e.preventDefault();
        if (!baslik || !icerik) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }

        const yeniDuyuru = {
            id: Date.now(),
            baslik,
            icerik,
            tarih: new Date().toLocaleString(),
        };

        setDuyurular([yeniDuyuru, ...duyurular]);
        setBaslik('');
        setIcerik('');
    };

    return (
        <div className="duyuru-container">
            <h2>📢 Duyurular</h2>

            <form onSubmit={duyuruEkle} className="duyuru-form">
                <input
                    type="text"
                    placeholder="Duyuru Başlığı"
                    value={baslik}
                    onChange={(e) => setBaslik(e.target.value)}
<<<<<<< HEAD
                    required
=======
>>>>>>> 6b259ab8356402dc9decd185d87fef440d829ad7
                />
                <textarea
                    placeholder="Duyuru İçeriği"
                    value={icerik}
                    onChange={(e) => setIcerik(e.target.value)}
<<<<<<< HEAD
                    required
                />
                <div>
                    <button className="buton" type="submit">Duyuru Ekle</button>
                </div>
=======
                />
                <button type="submit">Duyuru Ekle</button>
>>>>>>> 6b259ab8356402dc9decd185d87fef440d829ad7
            </form>

            <div className="duyuru-listesi">
                {duyurular.length === 0 ? (
                    <p>Henüz duyuru yok.</p>
                ) : (
<<<<<<< HEAD
                    <table className="duyuru-tablo">
                        <thead>
                            <tr>
                                <th>Duyuru Başlığı</th>
                                <th>Duyuru İçeriği</th>
                                <th>Duyuru Tarihi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {duyurular.map((duyuru) => (
                                <tr key={duyuru.id}>
                                    <td>{duyuru.baslik}</td>
                                    <td>{duyuru.icerik}</td>
                                    <td>{duyuru.tarih}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
=======
                    duyurular.map((duyuru) => (
                        <div key={duyuru.id} className="duyuru-karti">
                            <h3>{duyuru.baslik}</h3>
                            <p>{duyuru.icerik}</p>
                            <span>{duyuru.tarih}</span>
                        </div>
                    ))
>>>>>>> 6b259ab8356402dc9decd185d87fef440d829ad7
                )}
            </div>
        </div>
    );
}

export default Duyuru;
