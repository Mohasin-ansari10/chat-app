import React,{useState , useEffect} from 'react';
import { Link  } from "react-router-dom";
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
    const [values, setValues] = useState({
    
      email: "",
      password: "",
    
    });
  
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      alert("user login");
      //if return true we will call the api
      const { email,password} = values;
        console.log("ttttttttttttttt" , email , password);
      const data = await axios.get(loginRoute, {
        email,
        password,
      }).then((result)=>{
        console.log(result,"working")
      });
    }
  };

  const handleValidation = () => {
    const { password, email } = values;
    if (email === "") {
      toast.error("email is required", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "password should be equal or greater then 8 character",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
return (
  <FormContainer>
      <form onSubmit={(event)=>handleSubmit(event)}>
          <div className="brand">
              <img src={Logo} alt="" />
              <h1>snappy</h1>
          </div>
          <input type="email" placeholder='Email' name='email' onChange={ e =>handleChange(e)} />
          <input type="password" placeholder='password' name='password' onChange={ e =>handleChange(e)} />
          <button type='submit'>Login</button>
          <span>Don't have an account ? <Link  to="/login">Create Account </Link></span>
      </form>
  </FormContainer>
)
}

const FormContainer = styled.div`
height: 100vh;
width: 100vW;
display: flex;
flex-directions: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324 ;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
      height : 5rem;
  }
  h1 {
      color: white;
      text-transform: uppercase;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-raadius: 2rem;
  padding: 3rem 5rem;
  input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0%.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus{
          border: 1px solid #997af0;
          outline-color: #997af0;
          
          
          
      }
  }

  button {
      background-color: #997af0;
      color: white;
      font-weight: bold;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
          background-color: #4e0eff
      }
}
  span {
      color: white;
      text-transform: uppercase;
      a {
          color: #4e0eff;
          text-decoration: none;
          font-weight: bold;
      }
  }
}`

export default Login
