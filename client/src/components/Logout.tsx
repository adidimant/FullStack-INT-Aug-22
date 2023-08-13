import { Outlet } from 'react-router-dom';
import { Button } from 'reactstrap';
import axiosClient from '../apiClient';
import { useAuthContext } from '../contexts/authProvider';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  const {isLoggedIn,username, dispatch: dispatchAuthContext } = useAuthContext();

    const logOut = async ()=>{
        try {
          if(isLoggedIn == true){
            const response = await axiosClient.put(`http://localhost:3031/logout/${username}`,{ withCredentials:true })
            if(response.status === 401){
              dispatchAuthContext({isLoggedIn:false, username:''})
              navigate('/Login');
            }
            console.log(response)
          }
        }catch(err){
        console.log( err)
        }
    }

  return (
    <>
    <Button onClick={logOut}>Log Out</Button>
    <Outlet/>
    </>
  )
}
