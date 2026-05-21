import React, { useState, useEffect } from 'react';
import { 
  Users, Home, Calendar, Settings, LogOut, 
  TrendingUp, CheckCircle, Clock, MoreVertical 
} from 'lucide-react';
import { fetchBookings, logoutUser } from '../api/api';

const AdminDashboard = () => {
  const handleLogout = () => {
    logoutUser();
  };

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stats = [
    { label: 'Total Rooms', value: '45', icon: <Home />, color: '#6366f1' },
    { label: 'Active Bookings', value: recentBookings.filter(b => b.status === 'confirmed' || b.status === 'Confirmed').length || '12', icon: <CheckCircle />, color: '#22d3ee' },
    { label: 'Pending Visits', value: recentBookings.filter(b => b.status === 'pending' || b.status === 'pending').length || '4', icon: <Clock />, color: '#fbbf24' },
    { label: 'Monthly Revenue', value: '₹4.2L', icon: <TrendingUp />, color: '#a855f7' },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        const data = await fetchBookings();
        if (data && data.length > 0) {
          setRecentBookings(data);
        } else {
          setRecentBookings([
            { id: 1, user_name: 'Rahul Sharma', room: 'Single Occupancy', check_in: '2026-05-04', status: 'Confirmed' },
            { id: 2, user_name: 'Amit Verma', room: 'Double Sharing', check_in: '2026-05-03', status: 'Pending' },
            { id: 3, user_name: 'Suresh Raina', room: 'Triple Sharing', check_in: '2026-05-03', status: 'Confirmed' },
            { id: 4, user_name: 'Vikram Singh', room: 'Single Occupancy', check_in: '2026-05-02', status: 'Cancelled' },
          ]);
        }
      } catch (err) {
        console.error(err);
        setError('Could not load bookings from backend. Showing fallback listings.');
        setRecentBookings([
          { id: 1, user_name: 'Rahul Sharma', room: 'Single Occupancy', check_in: '2026-05-04', status: 'Confirmed' },
          { id: 2, user_name: 'Amit Verma', room: 'Double Sharing', check_in: '2026-05-03', status: 'Pending' },
          { id: 3, user_name: 'Suresh Raina', room: 'Triple Sharing', check_in: '2026-05-03', status: 'Confirmed' },
          { id: 4, user_name: 'Vikram Singh', room: 'Single Occupancy', check_in: '2026-05-02', status: 'Cancelled' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar glass">
        <div className="sidebar-logo">
          <div className="logo-icon small">
            <Home size={20} className="text-white" />
          </div>
          <span>Ruchi Elite</span>
        </div>
        <nav className="sidebar-nav">
          <a href="/admin" className="active"><Home size={18} /> Dashboard</a>
          <a href="/admin/residents"><Users size={18} /> Residents</a>
          <a href="/admin/rooms"><Home size={18} /> Rooms</a>
          <a href="/admin/bookings"><Calendar size={18} /> Bookings</a>
          <a href="/admin/settings"><Settings size={18} /> Settings</a>
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Dashboard Overview</h1>
          <div className="admin-user">
            <span>Welcome, Admin</span>
            <div className="user-avatar">A</div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card glass">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <p>{stat.label}</p>
                <h3>{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings Table */}
        <div className="dashboard-section glass">
          <div className="section-title">
            <h2>Recent Stay Requests</h2>
            {error && <span style={{ color: 'var(--secondary)', fontSize: '0.85rem' }}>{error}</span>}
            <button className="text-btn">View All</button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Room Type/ID</th>
                <th>Check In Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{ textAlign: 'center' }}>Loading bookings...</td></tr>
              ) : recentBookings.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No bookings found</td></tr>
              ) : (
                recentBookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.user_name || booking.name}</td>
                    <td>{booking.room}</td>
                    <td>{booking.check_in || booking.date}</td>
                    <td>
                      <span className={`status-badge ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td><MoreVertical size={16} cursor="pointer" /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .admin-container {
          display: flex;
          min-height: 100vh;
          background: #0f172a;
          color: white;
        }
        .admin-sidebar {
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
        .admin-main {
          flex: 1;
          padding: 3rem 4rem 3rem 2rem;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }
        .admin-user {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .user-avatar {
          width: 40px;
          height: 40px;
          background: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .stat-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-info h3 { font-size: 1.5rem; margin-top: 0.25rem; }
        .stat-info p { font-size: 0.85rem; color: var(--text-muted); }
        .dashboard-section {
          padding: 2rem;
        }
        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .admin-table th {
          padding: 1rem;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.85rem;
          border-bottom: 1px solid var(--glass-border);
        }
        .admin-table td {
          padding: 1.25rem 1rem;
          border-bottom: 1px solid var(--glass-border);
          font-size: 0.9rem;
        }
        .status-badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .status-badge.confirmed { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
        .status-badge.pending { background: rgba(251, 191, 36, 0.1); color: #fbbf24; }
        .status-badge.cancelled { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
      `}} />
    </div>
  );
};

export default AdminDashboard;
