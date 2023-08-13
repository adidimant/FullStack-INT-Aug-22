import React, { useEffect } from 'react'
import { Button} from "reactstrap";
import { TempLogout, useAuthContext } from "../contexts/authProvider";
import { Location, useLocation } from 'react-router-dom';

function LogOut() {
  const IsLoggedin = useAuthContext();
  
  return (
    <>
    {IsLoggedin.isLoggedIn?
     <Button onClick={TempLogout}>
    LogOut
  </Button>:
  <></>}
   
    </>
   
  )
}

export default LogOut