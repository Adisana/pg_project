import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';

const RoomCard = ({ room }) => {
  const [showBooking, setShowBooking] = useState(false);
  const navigate = useNavigate();

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://pg-project-s1m0.onrender.com/${url}`;
  };

  const handleBookClick = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    } else {
      setShowBooking(true);
    }
  };

  return (
    <>
      <motion.div 
        whileHover={{ y: -10 }}
        className="pg-card glass"
      >
        <div className="pg-image">
          <img src={getImageUrl(room.image)} alt={room.title || room.name} />
          <div className="pg-tag">Verified</div>
        </div>
        <div className="pg-info">
          <div className="pg-header">
            <h3>{room.title || room.name}</h3>
            <div className="pg-rating">
              <Star size={14} fill="var(--secondary)" style={{ color: 'var(--secondary)' }} />
              <span>{room.rating || '4.5'}</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            {room.description}
          </p>
          <div className="pg-amenities" style={{ borderTop: 'none', paddingTop: 0, flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
            {(room.amenities || ['Free WiFi', 'Attached Bath', 'Daily Cleaning']).map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--secondary)' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="pg-footer" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
            <div className="pg-price">
              <span className="price">₹{room.price}</span>
              <span className="period">/month</span>
            </div>
            <button 
              onClick={handleBookClick} 
              className="btn-primary small"
            >
              Book Room
            </button>
          </div>
        </div>
      </motion.div>

      {showBooking && (
        <BookingForm room={room} onClose={() => setShowBooking(false)} />
      )}
    </>
  );
};

export default RoomCard;
