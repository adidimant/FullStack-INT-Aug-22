import { Button, Spinner } from 'reactstrap'
import { Outlet, useNavigate } from 'react-router-dom'
import { FiInstagram } from 'react-icons/fi'
import { useAuthContext } from '../contexts/authProvider'
import { useCallback, useState } from 'react'
import apiClient from '../apiClient';

const Nav = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { dispatch: dispatchAuthContext, isLoggedIn } = useAuthContext();
    const navigate = useNavigate();

    const logout = useCallback(async () => {
        setIsLoading(true);
        const deactivateSession = async () => {
            apiClient.post('http://localhost:3031/logout', {}, { withCredentials: true }).finally(() => {
                window.localStorage.removeItem('accessToken');
                window.localStorage.removeItem('refreshToken');
            });
            dispatchAuthContext({ isLoggedIn: false });
            setIsLoading(false);
        };

        await deactivateSession();
        navigate('/Login');
    }, [dispatchAuthContext, navigate]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h5>Instagram </h5>
                    <FiInstagram
                        style={{ color: "black", fontSize: "20px", margin: "5px" }}
                    />
                </div>
                {isLoggedIn && 
                <Button
                    onClick={logout}
                >
                    {isLoading && <Spinner/>}
                    Log Out
                </Button>
                }
            </div>
            <Outlet />
        </>
    )
}

export default Nav;