import React from 'react';
import { Phone, Globe, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const NRLogo = () => (
  <svg width="60" height="60" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C5A021" />
        <stop offset="50%" stopColor="#ECD06F" />
        <stop offset="100%" stopColor="#C5A021" />
      </linearGradient>
    </defs>
    {/* Architectural Pillar Background */}
    <rect x="54" y="30" width="12" height="60" rx="2" fill="url(#goldGrad)" opacity="0.9" />
    <path d="M40 90H80V94H40V90Z" fill="url(#goldGrad)" />
    
    {/* Minimalist Crown */}
    <path d="M50 30L60 20L70 30H50Z" fill="url(#goldGrad)" />
    <circle cx="60" cy="15" r="3" fill="url(#goldGrad)" />
    
    {/* Stylized N and R Intertwined */}
    <path d="M30 45V85M30 45L55 85V45" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M65 85V45H85C92 45 98 51 98 58C98 65 92 71 85 71H65M85 71L98 85" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Navbar = () => {
  const token = localStorage.getItem('access_token');
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="navbar glass">
      <div className="logo-container">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
          <NRLogo />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="logo-text">Ruchi Elite</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--secondary)', letterSpacing: '0.2em', fontWeight: '800' }}>ULTIMATE MENS LIVING</span>
          </div>
        </Link>
      </div>
      
      <div className="nav-links">
        <a href="/#rooms" className="nav-link">Suites</a>
        <a href="/#amenities" className="nav-link">Amenities</a>
        <a href="/#gallery" className="nav-link">Gallery</a>
        <a href="https://maps.app.goo.gl/Yd2HSCsoRhcYe2aQ8?g_st=aw" target="_blank" rel="noopener noreferrer" className="nav-link">
          <Globe size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          Chennai
        </a>
      </div>

      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a href="tel:+917287879882" className="icon-btn" title="Call Us" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Phone size={20} />
        </a>
        {token && user ? (
          <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="btn-primary auth-btn" style={{ textDecoration: 'none', padding: '10px 24px' }}>
            <User size={18} />
            <span>Dashboard</span>
          </Link>
        ) : (
          <Link to="/login" className="btn-primary auth-btn" style={{ textDecoration: 'none', padding: '10px 24px' }}>
            <User size={18} />
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
