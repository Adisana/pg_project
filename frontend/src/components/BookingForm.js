import React, { useState, useEffect } from 'react';
import { fetchRooms, createBooking } from '../api/api';
import { X } from 'lucide-react';

const BookingForm = ({ room, onClose }) => {
  const [rooms, setRooms] = useState([]);
  
  // Load authenticated user details to pre-populate booking parameters
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [formData, setFormData] = useState({
    user_name: user ? (user.first_name || user.username) : '',
    user_phone: user ? (user.phone || '') : '',
    room: room ? room.id : '',
    check_in: '',
    check_out: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await fetchRooms();
        // filter only available rooms
        const availableRooms = data.filter(r => r.available);
        setRooms(availableRooms);
      } catch (err) {
        console.error('Error fetching rooms for dropdown:', err);
      }
    };
    loadRooms();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!formData.room) {
      setError('Please select a room.');
      setLoading(false);
      return;
    }

    try {
      await createBooking({
        user_name: formData.user_name,
        user_phone: formData.user_phone,
        room: parseInt(formData.room),
        check_in: formData.check_in,
        check_out: formData.check_out,
      });
      setSuccess(true);
      setFormData({
        user_name: '',
        user_phone: '',
        room: '',
        check_in: '',
        check_out: '',
      });
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div className="glass" style={{
        width: '90%',
        maxWidth: '500px',
        padding: '2.5rem',
        borderRadius: '24px',
        position: 'relative',
        border: '1px solid var(--glass-border)',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'transparent',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
        }}>
          <X size={24} />
        </button>

        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '700' }}>
          Book Your Stay
        </h3>

        {success ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem 0',
            color: '#22c55e',
          }}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Booking Successful!</h4>
            <p style={{ color: 'var(--text-muted)' }}>We look forward to welcoming you.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {error && (
              <div style={{
                color: '#ef4444',
                background: 'rgba(239, 68, 68, 0.1)',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
              }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Name</label>
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                required
                readOnly
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  outline: 'none',
                  cursor: 'not-allowed',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phone Number</label>
              <input
                type="tel"
                name="user_phone"
                value={formData.user_phone}
                onChange={handleChange}
                required
                readOnly
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  outline: 'none',
                  cursor: 'not-allowed',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Select Room</label>
              <select
                name="room"
                value={formData.room}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  color: 'white',
                  outline: 'none',
                }}
              >
                <option value="" disabled>Choose a room</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} (₹{r.price}/month)
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Check In</label>
                <input
                  type="date"
                  name="check_in"
                  value={formData.check_in}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    color: 'white',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Check Out</label>
                <input
                  type="date"
                  name="check_out"
                  value={formData.check_out}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    color: 'white',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                fontWeight: '700',
                marginTop: '1rem',
              }}
            >
              {loading ? 'Submitting...' : 'Confirm Stay'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
