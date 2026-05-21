import React from 'react';
import { Star, MapPin, Wifi, Wind, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const PGCard = ({ pg }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="pg-card glass"
    >
      <div className="pg-image">
        <img src={pg.image} alt={pg.name} />
        <div className="pg-tag">{pg.type}</div>
        <button className="favorite-btn">
          <Star size={18} fill={pg.rating > 4.5 ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="pg-info">
        <div className="pg-header">
          <h3>{pg.name}</h3>
          <div className="pg-rating">
            <Star size={14} fill="currentColor" className="text-yellow-400" />
            <span>{pg.rating}</span>
          </div>
        </div>
        <div className="pg-location">
          <MapPin size={14} />
          <span>{pg.location}</span>
        </div>
        <div className="pg-amenities">
          <Wifi size={16} title="Free WiFi" />
          <Wind size={16} title="AC Rooms" />
          <Coffee size={16} title="Breakfast Included" />
          <span className="more-amenities">+3 more</span>
        </div>
        <div className="pg-footer">
          <div className="pg-price">
            <span className="price">₹{pg.price}</span>
            <span className="period">/month</span>
          </div>
          <button className="btn-primary small">View Details</button>
        </div>
      </div>
    </motion.div>
  );
};

export default PGCard;
