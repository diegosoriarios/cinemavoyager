import api from '@/pages/utils/api';
import React, { PropsWithChildren, useState } from 'react';
import { AuthContext, initialState } from './context';

export const ContextProvider = ({children}: PropsWithChildren) => {
  const [isLoginPending, setLoginPending] = useState(initialState.isLoginPending);
  const [isLoginSuccess, setLoginSuccess] = useState(initialState.isLoggedIn);
  const [isLoginError, setLoginError] = useState(initialState.loginError);
  const [user, setUser] = useState(initialState.user);

  const fetchLogin = async (email, password, callback) => {
    const { data } = await api.post("/login", {
      email, password
    }, {
      headers: { "Content-Type" : "application/json"},
    });

    console.log(data);

    if (data.isLoggedIn) return callback(data.user, null);
   
    return callback(null, new Error('Invalid email and password'));
  }

  const login = (email, password) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    fetchLogin( email, password, (loggedUser, error) => {
      setLoginPending(false);

      if (!error) {
        setUser(loggedUser);
        setLoginSuccess(true);
      } else {
        setLoginError(error);
      }
    })
  }

  const logout = async () => {
    const { data } = await api.post("/login/logout", { email: user.email }, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    setLoginPending(data.isLoggedIn);
    setLoginSuccess(data.isLoggedIn);
    setLoginError(null);
    setUser(data.user);
  }

  const checkLogin = async () => {
    const { data } = await api.get("/login/isLoggedIn", {
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      }
    });

    setUser(data.user);
    setLoginSuccess(data.isLoggedIn);
  }

  return (
    <AuthContext.Provider
      value={{
        state: {
          isLoginError,
          isLoginPending,
          isLoginSuccess,
          user,
        },
        login,
        logout,
        checkLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};