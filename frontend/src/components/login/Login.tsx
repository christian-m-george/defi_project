import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [badCreds, setBadCreds] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginHandler = async () => {
    const url = process.env.URL || 'http://localhost:3030/api/sessions';
    const data = {
      email,
      password
    };

    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then((data) => {
        if (data.status !== 200) {
          setBadCreds(true);
        } else {
          return data.json();
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        navigate('/defi');
      });
  };

  return (
    <div className="login">
      <div
        className="login-form"
        style={{
          borderRadius: 40,
          border: '5px solid white',
          backgroundColor: 'black'
        }}
      >
        <h2 className="form-title blue">Login</h2>
        <form
          className="form-items"
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler();
          }}
        >
          <div className="form-inputs" style={{ padding: 10 }}>
            <label style={{ color: 'white' }}>username or email</label>
            <input
              type="text"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-inputs" style={{ padding: 10 }}>
            <label style={{ color: 'white' }}>password</label>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 10
            }}
          >
            <button className="btn">Log In</button>
          </div>
        </form>
        <div className="form-other" style={{ padding: 10 }}>
          {/* <a href="#" style={{ color: 'black' }}>
            Forgot password?
          </a> */}
          <Link to="/register" style={{ color: 'white' }}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
