import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './login.css';

import imgslink from "../../../Assets/mappng.png";
// import imgslink from "../../../Assets/beachpng.png";


async function loginHandlefetch(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password
    })
  };
  const response = await fetch('api/Authenticate/login', requestOptions);
  const data = await response.json();
  return data;
}
const Login = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  // State to manage form input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    if(token){
      navigate("/dashboard", { replace: true });
    }
  },[token,navigate]);

  // Function to handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add your authentication logic here
  //   console.log('Username:', username);
  //   console.log('Password:', password);
  // };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  }
  const handleLogin = async (e) => {
      e.preventDefault();
    const data = await loginHandlefetch(username, password);
    setToken(data);
    
  // setTimeout(() => {
    // handleLogin();
    
    navigate("/dashboard", { replace: true });
  // }, 6 * 1000);
  };

  // setTimeout(() => {
  //   handleLogin();
  // }, 3 * 1000);

  return (
    <section className="h-100 gradient-form mainsec">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">

                    <div className="text-center">
                      <img className="imgstl" src={imgslink} alt="logo" />
                      {/* <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4> */}
                    </div>

                    <form>
                      {/* <p>Please login to your account</p> */}

                      <div className="form-outline mb-4">
                        <label className="form-label">User Name</label>
                        <input type="text" id="form2Example11" className="form-control" onChange={handleUserNameChange}
                          placeholder="User Name" />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" id="form2Example22" className="form-control" onChange={handlePasswordChange} />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button onClick={handleLogin} className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Log
                          in</button>
                        {/* <a className="text-muted" href="#!">Forgot password?</a> */}
                      </div>

                      {/* <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Don't have an account?</p>
                        <button type="button" className="btn btn-outline-danger">Create new</button>
                      </div> */}

                    </form>

                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">Dubai Visa plans</h4>
                    <p className="small mb-0">some Admin yes yes yes yes yes yes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;