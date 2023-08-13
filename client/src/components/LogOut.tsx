import React, { useEffect } from 'react'
import { Button} from "reactstrap";
import { TempLogout, useAuthContext } from "../contexts/authProvider";
import { Location, useLocation } from 'react-router-dom';
import axiosClient from '../apiClient';

function LogOut() {
  const IsLoggedin = useAuthContext();
  async function LogOutSession() {
    try {
      const Out = await axiosClient.patch('http://localhost:3031/Logout',{},{withCredentials:true});
      console.log(Out);
      TempLogout();
    } catch (error) {
      console.log(error);
    }
    
  }
  
  return (
    <>
    {IsLoggedin.isLoggedIn?
     <Button onClick={LogOutSession}>
    LogOut
  </Button>:
  <></>}
   
    </>
   
  )
}

export default LogOut