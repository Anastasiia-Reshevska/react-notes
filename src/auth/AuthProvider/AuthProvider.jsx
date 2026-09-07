import { createContext, useState } from 'react';
import { AUTH_STORAGE } from '../../constants';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const isLogin = JSON.parse(localStorage.getItem(AUTH_STORAGE)) || false;
  const [isAuth, setAuth] = useState(isLogin);
  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
