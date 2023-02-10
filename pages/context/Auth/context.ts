import React from 'react';

export const AuthContext = React.createContext(null);

export const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  user: null
}
