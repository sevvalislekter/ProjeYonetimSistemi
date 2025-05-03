import React, { useState } from 'react';
import axios from 'axios';
import '../css/Feedback.css'
function FeedbackForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedbackType, setFeedbackType] = useState('Genel');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost/proje/submit_feedback.php', {
                name,
                email,
                feedbackType,
                message,
                rating
            });

            if (response.data.success) {
                setSuccess(true);
                setName('');
                setEmail('');
                setMessage('');
                setRating(5);
            } else {
                setError('Geri bildirim gönderilirken bir hata oluştu.');
            }
        } catch (error) {
            setError('Bir ağ hatası oluştu.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feedback-form">
            <h2 style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>Geri Bildirim Gönder</h2>
            {success && <p style={{ color: 'green' }}>Geri bildiriminiz başarıyla gönderildi!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Adınız</label>
                    <input style={{ width: '300px' }}
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Adınızı girin (isteğe bağlı)"
                    />
                </div>
                <div>
                    <label htmlFor="email">E-posta</label>
                    <input style={{ width: '300px' }}
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-posta adresinizi girin (isteğe bağlı)"
                    />
                </div>
                <div>
                    <label htmlFor="feedbackType">Geri Bildirim Türü</label>
                    <select
                        id="feedbackType"
                        value={feedbackType}
                        onChange={(e) => setFeedbackType(e.target.value)}
                    >
                        <option value="Genel">Genel</option>
                        <option value="Öneri">Öneri</option>
                        <option value="Hata">Hata Bildirimi</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="message">Mesajınız</label>
                    <textarea className='mesaj'
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Geri bildiriminizi buraya yazın"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rating">Derecelendirme (1-5)</label>
                    <input style={{ width: '100px', height: '20px' }}
                        type="number"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                    />
                </div>
                <div>
                    <button className='buton' type="submit" disabled={loading}>
                        {loading ? 'Gönderiliyor...' : 'Gönder'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FeedbackForm;
