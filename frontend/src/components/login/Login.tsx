import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

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
        localStorage.setItem('token', data.accessToken);
        navigate('/defi')
      });
  };

  return (
    <div className="login">
      <div className="login-form">
        <div className="form-title">
          Log<span>I</span>n
        </div>
        <form
          className="form-items"
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler();
          }}
        >
          <div className="form-inputs">
            <label>username or email</label>
            <input
              type="text"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <label>password</label>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="form-button">Log In</button>
        </form>
        <div className="form-other">
          <a href="#" style={{ color: 'black' }}>
            Forgot password?
          </a>
          <a href="#" style={{ color: 'black' }}>
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
