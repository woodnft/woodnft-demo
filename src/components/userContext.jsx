// src/contexts/UserContext.js



import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

  localStorage.setItem('userId',userId);

  useEffect(() => {
    // userIdが変更されたらローカルストレージに保存
    localStorage.setItem('userId', userId);
  }, [userId]);


  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// コンポーネント内でユーザーIDを使用する
export const useUser = () => useContext(UserContext);





/*
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
*/