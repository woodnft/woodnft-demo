// src/contexts/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || null);

  localStorage.setItem('user',user);

  useEffect(() => {
    // userIdが変更されたらローカルストレージに保存
    localStorage.setItem('user', user);
  }, [user]);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// コンポーネント内でユーザーIDを使用する
export const useUser = () => useContext(UserContext);
