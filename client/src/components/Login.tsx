import React from 'react';
import {
    Container,
    FormGroup,
    Input,
    Button,
    Form,
    InputGroup,
    InputGroupText,
  } from "reactstrap";
  import { BsPersonCircle } from "react-icons/bs";
  import { FiInstagram } from "react-icons/fi";
export default function Login() {
  
  return (

  <>
    <div className='logo' style={{ display: "flex", alignItems: "center" }}>
    <h5>Instegram </h5>
    <FiInstagram
      style={{ color: "black", fontSize: "20px", margin: "5px" }}
    />
  </div>

    <div className="Login ">
      <Container className="my-5 d-flex align-items-center justify-content-center">
        <Form   className="my-5 d-flex flex-column align-items-stretch"
          style={{
            width: "300px",
            height: "300px",
            alignItems: "stretch",
            justifyContent: "space-between",
          }}>
            <h5 className="text-center">LogIn</h5>
            <div className="text-center fs-1 mb-4"> <BsPersonCircle/></div>
            <Input className="rounded-0" type="email" placeholder="Email ID" name="email" required />
            <Input  className="rounded-0" placeholder="password"name="password"minLength={8} required/>
            
            <div className="d-flex justify-content-center align-items-center ">
            <Button color="link" className="text-decoration-none" style={{fontSize:"12px"}} >
              Create new Account
            </Button>
            <Button color="link" className="text-decoration-none" style={{fontSize:"12px"}} >
            Forgot password?
            </Button>
            </div>
            <Button block color="dark" size="sm">
              LogIn
            </Button>
   
        </Form>
      </Container>
    </div>
    </> 
  )
}
