import React, { createContext, useContext, useState } from 'react';

// Context oluşturuluyor
const UserContext = createContext();

// UserProvide component'i, context sağlayıcı olarak kullanılacak
const UserProvide = ({ children }) => {
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    // Username'ı güncellemeye yarayan fonksiyon
    const updateUsername = (newUsername) => {
        setUsername(newUsername);
        localStorage.setItem('username', newUsername);  // Yeni username localStorage'a kaydediliyor
    };

    return (
        <UserContext.Provider value={{ username, updateUsername }}>
            {children}
        </UserContext.Provider>
    );
};

// UserContext'i kullanmak için custom hook
const useUser = () => useContext(UserContext);

export { UserProvide, useUser };
