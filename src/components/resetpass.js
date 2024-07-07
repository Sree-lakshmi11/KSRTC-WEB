import React, { useState } from 'react';
import './resetpass.css';

function ResetPassword({ token }) {
  const [resetEmail, setResetEmail] = useState('');
  const [resetOldPassword, setResetOldPassword] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();

    if (resetNewPassword !== resetConfirmPassword) {
      setResetError('New passwords do not match');
      setResetSuccess('');
      return;
    }

    try {
      const response = await fetch('https://getmevimal1442.pythonanywhere.com/api/auth/reset_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          old_password: resetOldPassword,
          new_password: resetNewPassword
        })
      });

      if (response.ok) {
        setResetSuccess('Password reset successfully');
        setResetError('');
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        setResetError(errorData.message || 'Password reset failed');
        setResetSuccess('');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setResetError('An error occurred while resetting the password');
      setResetSuccess('');
    }
  };

  const togglePasswordVisibility = (fieldId) => {
    const field = document.getElementById(fieldId);
    field.type = field.type === 'password' ? 'text' : 'password';
  };

  return (
    <div className="reset-password-form">
      <form onSubmit={handleResetPasswordSubmit}>
        <h2>RESET PASSWORD</h2>
        {resetError && <p className="error">{resetError}</p>}
        {resetSuccess && <p className="success">{resetSuccess}</p>}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Old Password:</label>
          <input
            type="password"
            value={resetOldPassword}
            onChange={(e) => setResetOldPassword(e.target.value)}
            required
            id="resetOldPassword"
          />
          <span className="password-toggle" onClick={() => togglePasswordVisibility('resetOldPassword')}>
            <i className="fas fa-eye"></i>
          </span>
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={resetNewPassword}
            onChange={(e) => setResetNewPassword(e.target.value)}
            required
            id="resetNewPassword"
          />
          <span className="password-toggle" onClick={() => togglePasswordVisibility('resetNewPassword')}>
            <i className="fas fa-eye"></i>
          </span>
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={resetConfirmPassword}
            onChange={(e) => setResetConfirmPassword(e.target.value)}
            required
            id="resetConfirmPassword"
          />
          <span className="password-toggle" onClick={() => togglePasswordVisibility('resetConfirmPassword')}>
            <i className="fas fa-eye"></i>
          </span>
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
