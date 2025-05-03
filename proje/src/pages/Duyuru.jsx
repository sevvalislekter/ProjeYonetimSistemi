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
                />
                <textarea
                    placeholder="Duyuru İçeriği"
                    value={icerik}
                    onChange={(e) => setIcerik(e.target.value)}
                />
                <button type="submit">Duyuru Ekle</button>
            </form>

            <div className="duyuru-listesi">
                {duyurular.length === 0 ? (
                    <p>Henüz duyuru yok.</p>
                ) : (
                    duyurular.map((duyuru) => (
                        <div key={duyuru.id} className="duyuru-karti">
                            <h3>{duyuru.baslik}</h3>
                            <p>{duyuru.icerik}</p>
                            <span>{duyuru.tarih}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Duyuru;
