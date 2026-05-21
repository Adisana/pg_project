import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Phone, ChevronRight, Home, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to resident/user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Basic frontend checks
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Username, Email, and Password are required.');
      setLoading(false);
      return;
    }

    try {
      await register(username.trim(), email.trim(), password, phone.trim(), role);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.data) {
        // Detailed error messages from DRF backend serializers
        const errorData = err.response.data;
        if (typeof errorData === 'object') {
          const firstKey = Object.keys(errorData)[0];
          const val = errorData[firstKey];
          const errorMsg = Array.isArray(val) ? val[0] : (typeof val === 'string' ? val : JSON.stringify(val));
          const keyLabel = firstKey === 'non_field_errors' ? 'Error' : firstKey.charAt(0).toUpperCase() + firstKey.slice(1);
          setError(`${keyLabel}: ${errorMsg}`);
        } else if (typeof errorData === 'string') {
          setError(errorData);
        } else {
          setError('Registration failed. Please check details.');
        }
      } else {
        setError('Connection failed. Please ensure the backend is running.');
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
          <h2>Join Ruchi Elite</h2>
          <p>Create your co-living account</p>
        </div>

        {success ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem 0',
            color: '#22c55e',
          }}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Registration Successful!</h4>
            <p style={{ color: 'var(--text-muted)' }}>Redirecting to login page...</p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="login-form">
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
              <label>Username</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="Choose username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <Phone size={18} className="input-icon" />
                <input 
                  type="tel" 
                  placeholder="10-digit mobile number" 
                  maxLength="10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
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

            <div className="input-group">
              <label>Register As</label>
              <div className="input-wrapper">
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 1.2rem',
                    background: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    outline: 'none',
                  }}
                >
                  <option value="user">Resident</option>
                  <option value="admin">Manager (Admin)</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary login-btn">
              {loading ? 'Creating Account...' : 'Register'} <ChevronRight size={20} />
            </button>
          </form>
        )}

        <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--secondary)', fontWeight: '600', textDecoration: 'none' }}>Login</Link>
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
          padding: 2.5rem 3rem;
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
        .login-header p { color: var(--text-muted); margin-bottom: 2rem; font-size: 0.9rem; }
        .login-form { text-align: left; }
        .input-group { margin-bottom: 1.25rem; }
        .input-group label { display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--secondary); text-transform: uppercase; letter-spacing: 0.05em; }
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

export default Register;
