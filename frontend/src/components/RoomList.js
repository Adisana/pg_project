import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import { fetchRooms } from '../api/api';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setError(null);
        const data = await fetchRooms();
        if (data && data.length > 0) {
          setRooms(data);
        } else {
          // Fallback static data if backend is empty
          setRooms([
            { id: 1, title: "1 Sharing Room", description: "Perfect for those who value privacy and quiet study time.", price: "16,000", rating: 4.9, amenities: ["Attached Bath", "Work Desk", "Balcony"], image: "https://images.unsplash.com/photo-1536376074432-bf12177d4f4f?auto=format&fit=crop&q=80&w=800", available: true },
            { id: 2, title: "2 Sharing Room", description: "Spacious room with individual cupboards and study tables.", price: "12,000", rating: 4.8, amenities: ["Spacious", "Separate Storage", "High-Speed WiFi"], image: "https://images.unsplash.com/photo-1555854817-5b2738a71581?auto=format&fit=crop&q=80&w=800", available: true },
            { id: 3, title: "3 Sharing Room", description: "Budget-friendly option without compromising on comfort.", price: "9,500", rating: 4.7, amenities: ["Economical", "Community Vibes"], image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800", available: true },
            { id: 4, title: "4 Sharing Room", description: "Great for groups looking for a comfortable shared space.", price: "8,000", rating: 4.6, amenities: ["Bunk Beds", "Shared Area"], image: "https://images.unsplash.com/photo-1522771739844-649fb49b2d88?auto=format&fit=crop&q=80&w=800", available: true },
            { id: 5, title: "5 Sharing Room", description: "The most economical choice for large groups.", price: "6,500", rating: 4.5, amenities: ["Highly Affordable", "Large Space"], image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800", available: true },
          ]);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load live listings. Showing offline catalog.");
        setRooms([
          { id: 1, title: "1 Sharing Room", description: "Perfect for those who value privacy and quiet study time.", price: "16,000", rating: 4.9, amenities: ["Attached Bath", "Work Desk", "Balcony"], image: "https://images.unsplash.com/photo-1536376074432-bf12177d4f4f?auto=format&fit=crop&q=80&w=800", available: true },
          { id: 2, title: "2 Sharing Room", description: "Spacious room with individual cupboards and study tables.", price: "12,000", rating: 4.8, amenities: ["Spacious", "Separate Storage", "High-Speed WiFi"], image: "https://images.unsplash.com/photo-1555854817-5b2738a71581?auto=format&fit=crop&q=80&w=800", available: true },
          { id: 3, title: "3 Sharing Room", description: "Budget-friendly option without compromising on comfort.", price: "9,500", rating: 4.7, amenities: ["Economical", "Community Vibes"], image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800", available: true },
          { id: 4, title: "4 Sharing Room", description: "Great for groups looking for a comfortable shared space.", price: "8,000", rating: 4.6, amenities: ["Bunk Beds", "Shared Area"], image: "https://images.unsplash.com/photo-1522771739844-649fb49b2d88?auto=format&fit=crop&q=80&w=800", available: true },
          { id: 5, title: "5 Sharing Room", description: "The most economical choice for large groups.", price: "6,500", rating: 4.5, amenities: ["Highly Affordable", "Large Space"], image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800", available: true },
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  return (
    <section id="rooms" className="pg-list-section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="badge">Our Accommodations</span>
            <h2>Choose Your Comfort</h2>
            {error && <p style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{error}</p>}
          </div>
        </div>
        
        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading rooms...</p>
        ) : (
          <div className="pg-grid">
            {rooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomList;
