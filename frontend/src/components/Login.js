import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ChevronRight, Home, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Pre-validation check for empty fields
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username/email and password.');
      setLoading(false);
      return;
    }

    try {
      const user = await login(username.trim(), password);
      if (user) {
        navigate(user.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      // Capture and show exact user-friendly errors from Django backend
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.status === 401) {
        setError('Invalid username or password.');
      } else if (err.response?.status === 500) {
        setError('Backend Internal Server Error (500). Please check your Django terminal.');
      } else if (err.message === 'Network Error' || !err.response) {
        setError('Connection failed. Please ensure the Django backend is running at https://pg-project-s1m0.onrender.com/');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Link to="/" className="back-home">
        <Home size={20} />
        <span>Back to Home</span>
      </Link>
      
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="login-card glass"
      >
        <div className="login-header">
          <div className="logo-icon large">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h2>Secure Login</h2>
          <p>Access your co-living dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && (
            <div style={{
              color: '#ef4444',
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '0.75rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}>
              {error}
            </div>
          )}

          <div className="input-group">
            <label>Username or Email</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="Username or email" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary login-btn">
            {loading ? 'Logging in...' : 'Sign In'} <ChevronRight size={20} />
          </button>
        </form>

        <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--secondary)', fontWeight: '600', textDecoration: 'none' }}>Register</Link>
        </div>

        <div className="auth-footer" style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <p>By continuing, you agree to Ruchi Elite's <br /> <b>Terms of Service</b> and <b>Privacy Policy</b>.</p>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #001f3f 0%, #050505 100%);
          position: relative;
        }
        .back-home {
          position: absolute;
          top: 2rem;
          left: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .back-home:hover { color: var(--secondary); }
        .login-card {
          width: 100%;
          max-width: 420px;
          padding: 3.5rem 3rem;
          text-align: center;
          border: 1px solid var(--glass-border);
        }
        .logo-icon.large {
          width: 64px;
          height: 64px;
          background: var(--gold-gradient);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 8px 20px var(--secondary-glow);
        }
        .login-header h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; margin-bottom: 0.5rem; }
        .login-header p { color: var(--text-muted); margin-bottom: 2.5rem; font-size: 0.9rem; }
        .login-form { text-align: left; }
        .input-group { margin-bottom: 1.5rem; }
        .input-group label { display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--secondary); text-transform: uppercase; letter-spacing: 0.05em; }
        .input-wrapper { position: relative; }
        .input-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--secondary); }
        .input-wrapper input {
          width: 100%;
          padding: 1rem 1rem 1rem 3.2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          outline: none;
          transition: all 0.2s;
        }
        .input-wrapper input:focus { border-color: var(--secondary); background: rgba(255, 255, 255, 0.07); }
        .login-btn { width: 100%; margin-top: 1rem; height: 56px; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
      `}} />
    </div>
  );
};

export default Login;
