import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { signup, login } from './../../auth/localAuth'; // Adjust path if needed
import './Login.css'; // 👉 new CSS file for styling

const Login = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN
        await login(email, password);
        await Swal.fire({
          icon: 'success',
          title: 'Logged in!',
          timer: 1200,
          showConfirmButton: false
        });
        setIsAuthenticated(true);
      } else {
        // SIGN UP
        if (password.length < 6) {
          await Swal.fire({
            icon: 'warning',
            title: 'Password too short',
            text: 'At least 6 characters'
          });
          return;
        }
        await signup(email, password);
        await Swal.fire({
          icon: 'success',
          title: 'Account created!',
          timer: 1200,
          showConfirmButton: false
        });
        setIsLogin(true); 
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Oops!', text: err.message });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="login-subtitle">
          {isLogin ? 'Login to continue' : 'Sign up to get started'}
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="login-switch">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <span onClick={() => setIsLogin(false)}>Create one</span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
