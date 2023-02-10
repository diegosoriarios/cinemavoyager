import React, { PropsWithChildren, useState } from 'react';
import { AuthContext, initialState } from './context';

export const ContextProvider = ({children}: PropsWithChildren) => {
  const [isLoginPending, setLoginPending] = useState(initialState.isLoginPending);
  const [isLoginSuccess, setLoginSuccess] = useState(initialState.isLoggedIn);
  const [isLoginError, setLoginError] = useState(initialState.loginError);

  const fetchLogin = (email, password, callback) => 
    setTimeout(() => {
      console.log(email, password)
      if (email === 'admin@admin.com' && password === 'admin') {
        return callback(null);
      } else {
        return callback(new Error('Invalid email and password'));
      }
    }, 1000);

  const login = (email, password) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    fetchLogin( email, password, error => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);
      } else {
        setLoginError(error);
      }
    })
  }

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
  }

  return (
    <AuthContext.Provider
      value={{
        state: {
          isLoginError,
          isLoginPending,
          isLoginSuccess
        },
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};