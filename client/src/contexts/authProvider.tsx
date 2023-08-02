import { useState, createContext, useEffect, useCallback } from "react";
import { AxiosResponse } from 'axios';
import apiClient from '../apiClient';
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isLoggedIn: boolean;
};

export const AuthContext = createContext<AuthContextType>({ isLoggedIn: false });

const getDefaultAuthState = () => {
  return {
    isLoggedIn: false,
  };
}

const AuthHelper = function ({ children, authState, setAuthState }: { children: any, authState: AuthContextType, setAuthState: (newState: AuthContextType) => void }) {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setAuthState({
      ...authState,
      isLoggedIn: false,
    });
    navigate('/login');
  }, [authState]);

  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      (res) => res,
      (error: Error & { response: AxiosResponse }) => {
        if (authState.isLoggedIn && error?.response?.status === 401) {
          logout();
        }

        throw error;
      },
    );

    return () => apiClient.interceptors.response.eject(interceptor);
  }, [authState]);

  return <>{children}</>;
};

const AuthProvider = ({ children }: { children: any }) => {
  const [authState, setAuthState] = useState(getDefaultAuthState());

  return (
    <AuthContext.Provider value={authState}>
      <AuthHelper authState={authState} setAuthState={setAuthState} >
        {children}
      </AuthHelper>
    </AuthContext.Provider>
  );
};

export default AuthProvider;