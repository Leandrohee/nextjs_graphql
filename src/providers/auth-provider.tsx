import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.get('token');

    if (token) {
    }
  });
};
