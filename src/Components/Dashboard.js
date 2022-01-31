import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = (props) => {
  const navigate = useNavigate()
  const [SignInCreds, setSignInCreds] = useState({ email: "", password: "" })

  const onChange = (e) => {
    setSignInCreds({ ...SignInCreds, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      navigate('/dashboard/home')
    }
  });


  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/admin/login`, {
      "method": "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({ ...SignInCreds }),
    })
    const data = await response.json()
    if (data.success) {
      localStorage.setItem("auth_token", data.authtoken)
      props.setshowAlert("Success", "Login Successful")
    }
    console.log(data);
  }
  return <div>
    <div className="text-center">
      <div className='container'>
        <div className='position-absolute top-50 start-50 translate-middle'>
          <h1 className='mb-5'>Welcome</h1>
          <form action='/register/farmer' onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input type="email" name="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={onChange} value={SignInCreds.email} required />
              <label htmlhtmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={onChange} value={SignInCreds.password} required />
              <label htmlhtmlFor="floatingPassword">Password</label>
            </div>
            <button type="submit" className="btn mt-3 btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>;
};

export default Dashboard;
