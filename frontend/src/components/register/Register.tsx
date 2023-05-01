import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [badCreds, setBadCreds] = useState<boolean>(false);
  const navigate = useNavigate();

  const registerHandler = async () => {
    const url = process.env.URL || 'http://localhost:3030/api/users';
    const data = {
      email,
      firstName,
      lastName,
      password,
      passwordConfirmation
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((data) => {
      if (data.status !== 200) {
        setBadCreds(true);
      } else {
        navigate('/login');
      }
    });
  };

  return (
    <div className="login">
      <div
        className="register-form"
        style={{
          borderRadius: 40,
          border: '5px solid white',
          backgroundColor: 'black'
        }}
      >
        <h2 className="form-title blue">Register</h2>
        <form
          className="form-items"
          onSubmit={(e) => {
            e.preventDefault();
            registerHandler();
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
            <label style={{ color: 'white' }}>first name</label>
            <input
              type="text"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-inputs" style={{ padding: 10 }}>
            <label style={{ color: 'white' }}>last name</label>
            <input
              type="text"
              required
              onChange={(e) => setLastName(e.target.value)}
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
          <div className="form-inputs" style={{ padding: 10 }}>
            <label style={{ color: 'white' }}>password</label>
            <input
              type="password"
              required
              onChange={(e) => setPasswordConfirmation(e.target.value)}
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
            <button className="btn">Register</button>
          </div>
        </form>
        <div className="form-other" style={{ padding: 10 }}>
          {/* <a href="#" style={{ color: 'black' }}>
            Forgot password?
          </a> */}
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
