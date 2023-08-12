import React, { useEffect } from 'react'
import { Button} from "reactstrap";
import { TempLogout } from "../contexts/authProvider";
import { Location, useLocation } from 'react-router-dom';

function LogOut() {
  const Location:Location = useLocation();
  
  return (
    <>
    {Location.pathname !== '/login'?
     <Button onClick={TempLogout}>
    LogOut
  </Button>:
  <></>}
   
    </>
   
  )
}

export default LogOut