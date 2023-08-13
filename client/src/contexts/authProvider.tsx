import { useState, createContext, useLayoutEffect, useCallback, useContext, Dispatch } from "react";
import { AxiosResponse } from 'axios';
import apiClient from '../apiClient';
import { useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

type AuthContextType = {
  isLoggedIn: boolean;
  userName:string;
};

export const AuthContext = createContext<{ state: AuthContextType; dispatch: Dispatch<AuthContextType> }>({ state: { isLoggedIn: false,userName:'' }, dispatch: () => undefined });

const getDefaultAuthState = () => {
  return {
    isLoggedIn: false,
    userName:''
  }; 
};
 export let TempLogout : ()=>void;
const AuthHelper = function ({ children, authState, setAuthState }: { children: any, authState: AuthContextType, setAuthState: (newState: AuthContextType) => void }) {
  const navigate = useNavigate();
  const logout = useCallback(async () => {
    const Out = await axiosClient.patch('http://localhost:3031/Logout',{userName:authState.userName},{withCredentials:true});
    setAuthState({
      ...authState,
      isLoggedIn: false,
      userName:''
    });
   
    navigate('/login');
  }, [authState]);

  TempLogout=logout;
 
  useLayoutEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      (res) => res,
      (error: Error & { response: AxiosResponse }) => {
        if (error?.response?.status === 401) {
          logout();
        }

        alert(`Error from server, status: ${error?.response?.status}`);
      }
    );

    return () => apiClient.interceptors.response.eject(interceptor);
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