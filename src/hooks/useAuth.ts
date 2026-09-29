import { useState, useCallback } from 'react';
import { demoCredentials } from '../data/mockData';

interface AuthState {
  isAuthenticated: boolean;
  userType: 'customer' | 'broker' | null;
  userId: string | null;
}

const STORAGE_KEY = 'ts_auth';

function loadAuth(): AuthState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { isAuthenticated: false, userType: null, userId: null };
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(loadAuth);

  const login = useCallback((email: string, password: string, type: 'customer' | 'broker'): boolean => {
    const cred = type === 'customer' ? demoCredentials.customer : demoCredentials.broker;
    if (email === cred.email && password === cred.password) {
      const userId = type === 'customer' ? (cred as typeof demoCredentials.customer).customerId : (cred as typeof demoCredentials.broker).brokerId;
      const state = { isAuthenticated: true, userType: type, userId };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setAuth(state);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuth({ isAuthenticated: false, userType: null, userId: null });
  }, []);

  return { ...auth, login, logout };
}
