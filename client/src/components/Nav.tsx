import { Button, Spinner } from 'reactstrap'
import { Outlet, useNavigate } from 'react-router-dom'
import { FiInstagram } from 'react-icons/fi'
import { useAuthContext } from '../contexts/authProvider'
import { useCallback, useState } from 'react'
import axios from 'axios'

const Nav = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { dispatch: dispatchAuthContext, isLoggedIn } = useAuthContext()
    const navigate = useNavigate()

    const logout = useCallback(() => {
        setIsLoading(true)
        dispatchAuthContext({ isLoggedIn: true })
        const deactivateSession = async () => {
            await axios.post('http://localhost:3031/logout')
            setIsLoading(false)
        }
        deactivateSession()
        navigate('/Login')
    }, [])

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h5>Instegram </h5>
                    <FiInstagram
                        style={{ color: "black", fontSize: "20px", margin: "5px" }}
                    />
                </div>
                <Button
                    onClick={logout}
                >
                    {isLoading && <Spinner/>}
                    Log Out
                </Button>
            </div>
            <Outlet />
        </>
    )
}

export default Nav