import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await onLogin(email, password);
      localStorage.setItem('authToken', token);
    } catch (error) {
      setError('Login failed: ' + error.message);
    }
  };

  const togglePasswordVisibility = (field) => {
    const input = document.getElementById(field);
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            id="loginPassword"
          />
          <span className="password-toggle" onClick={() => togglePasswordVisibility('loginPassword')}>
            <i className="fas fa-eye"></i>
          </span>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
