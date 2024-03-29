import {
  Container,
  Input,
  Button,
  Form,
} from "reactstrap";
import { BsPersonCircle } from "react-icons/bs";
import { FiInstagram } from "react-icons/fi";
import axiosClient from "../apiClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authProvider";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { dispatch: dispatchAuthContext } = useAuthContext();

  const getOnChange = (setFunc: (newValue: string) => void) => {
    const handleOnChange = (e: any) => {
      setFunc(e.target.value);
    };

    return handleOnChange;
  };

  /**
   * Additional explanation:
   * The alternative solution for this onChange handlers can be define two separate functions for email change & password change:
      const handleOnChangeEmail = (e: any) => {
        setEmail(e.target.value);
      };

      const handleOnChangePassword = (e: any) => {
        setPassword(e.target.value);
      };
   */

  const login = async () => {                                                                                 
    const response = await axiosClient.post('http://localhost:3031/login', { username: email, password }, { withCredentials: true });
    if (response?.status === 200) {
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      window.localStorage.setItem('accessToken', accessToken);
      window.localStorage.setItem('refreshToken', refreshToken);
      dispatchAuthContext({ isLoggedIn: true });
      navigate('/Posts');
    } else {
      alert('username or password is incorrect');
    }
  };

  return (
    <>
      <div className='logo' style={{ display: "flex", alignItems: "center" }}>
        <h5>Instagram </h5>
        <FiInstagram
          style={{ color: "black", fontSize: "20px", margin: "5px" }}
        />
      </div>

      <div className="Login ">
        <Container className="my-5 d-flex align-items-center justify-content-center">
          <Form className="my-5 d-flex flex-column align-items-stretch"
            style={{
              width: "300px",
              height: "300px",
              alignItems: "stretch",
              justifyContent: "space-between",
            }}>
            <h5 className="text-center">Log In</h5>
            <div className="text-center fs-1 mb-4"> <BsPersonCircle /></div>
            <Input className="rounded-0" type="email" placeholder="Email ID" onChange={getOnChange(setEmail)} name="email" required />
            <Input className="rounded-0" placeholder="password" onChange={getOnChange(setPassword)} name="password" minLength={8} required />

            <div className="d-flex justify-content-center align-items-center ">
              <Button color="link" className="text-decoration-none" style={{ fontSize: "12px" }} >
                Create new Account
              </Button>
              <Button color="link" className="text-decoration-none" style={{ fontSize: "12px" }} >
                Forgot password?
              </Button>
            </div>
            <Button block color="dark" size="sm" onClick={login}>
              Log In
            </Button>

          </Form>
        </Container>
      </div>
    </>
  )
}
