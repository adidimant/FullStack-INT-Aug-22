import { useState, createContext, useLayoutEffect, useCallback, useContext, Dispatch } from "react";
import { AxiosResponse } from 'axios';
import apiClient from '../apiClient';
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isLoggedIn: boolean;
};

export const AuthContext = createContext<{ state: AuthContextType; dispatch: Dispatch<AuthContextType> }>({ state: { isLoggedIn: false }, dispatch: () => undefined });

const getDefaultAuthState = () => {
  return {
    isLoggedIn: false,
  };
};

const AuthHelper = function ({ children, authState, setAuthState }: { children: any, authState: AuthContextType, setAuthState: (newState: AuthContextType) => void }) {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setAuthState({
      ...authState,
      isLoggedIn: false,
    });
    navigate('/login');
  }, [authState]);

  useLayoutEffect(() => {
    const interceptorRequests = apiClient.interceptors.request.use(
      (req) => {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken) {
          req.headers.Authorization = `Bearer ${accessToken}`;
        }
        return req;
      },
      (error: Error) => error,
    );

    const interceptorResponses = apiClient.interceptors.response.use(
      (res) => res,
      (error: Error & { response: AxiosResponse }) => {
        if (error?.response?.status === 401) {
          console.log(error);
          logout();
        }
        alert(`Error from server, status: ${error?.response?.status}`);
      }
    );

    return () => {
      apiClient.interceptors.response.eject(interceptorRequests);
      apiClient.interceptors.response.eject(interceptorResponses);
    }
  }, [authState]);

  return <>{children}</>;
};

const AuthProvider = ({ children }: { children: any }) => {
  const [authState, setAuthState] = useState(getDefaultAuthState());

  return (
    <AuthContext.Provider value={{ state: authState, dispatch: setAuthState }}>
      <AuthHelper authState={authState} setAuthState={setAuthState} >
        {children}
      </AuthHelper>
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within App');
  }
  const { state, dispatch } = context;

  return {
    ...state,
    dispatch: (renewObject: Partial<AuthContextType>) => {
      dispatch({ ...state, ...renewObject });
    },
  };
}

export { useAuthContext };
export default AuthProvider;