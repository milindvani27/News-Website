import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Validation from "./Validation";
import "./register.css"
import { Navbar } from "./Components/Navbar";
function Register() {

  const values={
    username : "",
    password : ""
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [errors, setErrors] = useState({})  

  const handleSubmit = (event) => {

    event.preventDefault();
      values.username = username;
      values.password = password;

     
      const data = Validation(values);
      setErrors(data);
      console.log(values)

      if(data.username === "" && data.password === ""){
          Axios.post('http://localhost:3001/register', values)
          .then((res) => {
            window.alert(res.data.message);
              navigate('/login');
          })
          .catch((err) => 
              console.log(err));
          
      }
  }
         
return (
  
  <div className="main">
    <Navbar />
    <div className="sub">
      <h2 className="card-registration"><b>Registration</b></h2>
      <form action="" onSubmit={handleSubmit}>
          <div className="card-user form-group">
              <label htmlFor="username"  className="form-label">UserName</label>
              <input type="text" placeholder="Enter Name" id="username" name='username' 
              onChange={(e) => { setUsername(e.target.value);} }
               className="form-control "></input>
              {errors.username && <span className="text-danger">{errors.username}</span>}
          </div>
          
          <div className="card-user form-group">
            <label htmlFor="password" className="form-label">Password</label>
              <input type="password" placeholder="Enter Password" id="password" name = 'password'
              onChange={(e) => { setPassword(e.target.value);} }
               className="form-control "></input>
              {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          
          <div className="card-btn">
              <button className='btn btn-success'>Register</button>
          </div>
          
          <p className="card-login">Already have an account ? <a href="/login">Login</a></p>
      </form>
    </div>  
  </div>
)
}

export default Register
