import React from 'react';
import { 
  User, CreditCard, Bell, HelpCircle, LogOut, 
  Wifi, Coffee, Shield, Home, Clock
} from 'lucide-react';
import { logoutUser } from '../api/api';

const UserDashboard = () => {
  const userData = JSON.parse(localStorage.getItem('user') || '{"username": "Resident"}');

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar glass">
        <div className="sidebar-logo">
          <div className="logo-icon small">
            <Home size={20} className="text-white" />
          </div>
          <span>Ruchi Elite</span>
        </div>
        <nav className="sidebar-nav">
          <a href="/dashboard" className="active"><User size={18} /> My Profile</a>
          <a href="/dashboard/payments"><CreditCard size={18} /> Payments</a>
          <a href="/dashboard/notifications"><Bell size={18} /> Notifications</a>
          <a href="/dashboard/support"><HelpCircle size={18} /> Support</a>
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Hello, {userData.first_name || userData.username}!</h1>
            <p style={{ color: 'var(--text-muted)' }}>Welcome back to your co-living dashboard.</p>
          </div>
          <div className="user-profile">
            <Bell size={20} className="text-muted" style={{ cursor: 'pointer' }} />
            <div className="user-avatar">{(userData.first_name || userData.username).charAt(0)}</div>
          </div>
        </header>

        <div className="dashboard-grid">
          {/* Booking Status */}
          <div className="dash-card glass">
            <div className="card-header">
              <h3>Stay Status</h3>
              <span className="status-badge active">Active</span>
            </div>
            <div className="stay-details">
              <div className="detail-item">
                <Home size={20} />
                <div>
                  <label>Room Number</label>
                  <p>B-302 (Double Sharing)</p>
                </div>
              </div>
              <div className="detail-item">
                <Clock size={20} />
                <div>
                  <label>Rent Cycle</label>
                  <p>Due in 5 days</p>
                </div>
              </div>
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>Pay Rent ₹12,000</button>
          </div>

          {/* Quick Services */}
          <div className="dash-card glass">
            <h3>Quick Services</h3>
            <div className="services-grid">
              <button className="service-btn">
                <Wifi size={24} />
                <span>WiFi Issues</span>
              </button>
              <button className="service-btn">
                <Shield size={24} />
                <span>Housekeeping</span>
              </button>
              <button className="service-btn">
                <Coffee size={24} />
                <span>Meal Opt-out</span>
              </button>
              <button className="service-btn">
                <HelpCircle size={24} />
                <span>Other Help</span>
              </button>
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="announcements glass" style={{ marginTop: '2rem', padding: '1.5rem' }}>
          <h3>Latest Announcements</h3>
          <div className="announcement-item">
            <div className="bullet"></div>
            <p>Maintenance work scheduled for Sunday, 10 AM - 1 PM.</p>
          </div>
          <div className="announcement-item">
            <div className="bullet"></div>
            <p>New high-speed router installed on the 3rd floor.</p>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: #0f172a;
          color: white;
        }
        .dashboard-sidebar {
          width: 260px;
          margin: 1.5rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          border-radius: 24px;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 3rem;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }
        .sidebar-nav a {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.8rem 1rem;
          color: var(--text-muted);
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.2s;
        }
        .sidebar-nav a.active, .sidebar-nav a:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }
        .logout-btn {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          border: none;
          color: #ef4444;
          cursor: pointer;
          font-weight: 600;
          padding: 1rem;
        }
        .dashboard-main {
          flex: 1;
          padding: 3rem 4rem;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3rem;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .user-avatar {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          border: 2px solid rgba(255,255,255,0.1);
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 2rem;
        }
        .dash-card { padding: 2rem; }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .status-badge.active {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .stay-details { display: flex; flex-direction: column; gap: 1.5rem; }
        .detail-item { display: flex; gap: 1rem; align-items: center; }
        .detail-item label { display: block; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; }
        .detail-item p { font-weight: 600; }
        .services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .service-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--glass-border);
          padding: 1.5rem;
          border-radius: 16px;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .service-btn:hover { background: rgba(255,255,255,0.08); transform: translateY(-3px); }
        .announcement-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        .bullet { width: 8px; height: 8px; background: var(--primary); border-radius: 50%; }
        @media (max-width: 1024px) {
          .dashboard-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

export default UserDashboard;
