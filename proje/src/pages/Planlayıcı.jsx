<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 6b259ab8356402dc9decd185d87fef440d829ad7
import '../css/Planlayıcı.css';

function PlanlayiciSayfasi() {
    const [plans, setPlans] = useState([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

<<<<<<< HEAD
    // Sayfa yüklendiğinde localStorage'dan verileri çek
    useEffect(() => {
        const storedPlans = JSON.parse(localStorage.getItem('plans')) || [];
        setPlans(storedPlans);
    }, []);

=======
>>>>>>> 6b259ab8356402dc9decd185d87fef440d829ad7
    const insert = (e) => {
        e.preventDefault();

        if (!title || !date || !status) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }

        const newPlan = {
            id: Date.now(),
            title,
            date,
            status
        };

<<<<<<< HEAD
        const updatedPlans = [...plans, newPlan];
        setPlans(updatedPlans);
        localStorage.setItem('plans', JSON.stringify(updatedPlans)); // localStorage'a kaydet

=======
        setPlans([...plans, newPlan]);
>>>>>>> 6b259ab8356402dc9decd185d87fef440d829ad7
        setTitle('');
        setDate('');
        setStatus('');
    };

    return (
        <div className="plan-container">
            <h2>🗂️ Planlayıcı</h2>

            <table>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th>Görev</th>
                        <th>Tarih</th>
                        <th>Durum</th>
                    </tr>
                </thead>
                <tbody>
                    {plans.map((plan) => (
                        <tr key={plan.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                            <td>{plan.title}</td>
                            <td>{plan.date}</td>
                            <td>{plan.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="plan-form">
                <h3 style={{ color: 'black' }}>Yeni Görev Ekle</h3>
                <form onSubmit={insert}>
                    <div>
                        <input
                            type="text"
                            placeholder="Görev"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Durum Seçin</option>
                            <option value="Yapılacak">Yapılacak</option>
                            <option value="Devam Ediyor">Devam Ediyor</option>
                            <option value="Tamamlandı">Tamamlandı</option>
                        </select>
                    </div>
                    <button className='buton' type="submit">Gönder</button>
                </form>
            </div>
        </div>
    );
}

export default PlanlayiciSayfasi;
