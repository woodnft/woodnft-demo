// src/contexts/UserContext.js

/*
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

*/


import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      return null; // ストレージにユーザーが保存されていない場合はnullを返す
    }
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error('Parsing error on retrieving "user" from localStorage:', error);
      return null;
    }
  };

  const [user, setUser] = useState(getUserFromLocalStorage);

  useEffect(() => {
    // userがnullの場合はローカルストレージから削除、それ以外の場合は保存
    if (user === null) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
