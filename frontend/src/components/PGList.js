import React from 'react';
import PGCard from './PGCard';

const mockPGs = [
  {
    id: 1,
    name: "Skyline Premium PG",
    location: "Koramangala, Bangalore",
    price: "12,000",
    rating: 4.8,
    type: "Boys",
    image: "https://images.unsplash.com/photo-1555854817-5b2738a71581?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Urban Living Hostel",
    location: "HSR Layout, Bangalore",
    price: "10,500",
    rating: 4.6,
    type: "Girls",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Elite Co-Living",
    location: "Indiranagar, Bangalore",
    price: "15,000",
    rating: 4.9,
    type: "Unisex",
    image: "https://images.unsplash.com/photo-1522771739844-649fb49b2d88?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Green Oasis PG",
    location: "Whitefield, Bangalore",
    price: "9,000",
    rating: 4.4,
    type: "Boys",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Modern Nest",
    location: "BTM Layout, Bangalore",
    price: "11,000",
    rating: 4.7,
    type: "Girls",
    image: "https://images.unsplash.com/photo-1626808642875-0aa545452ef8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "The Hub Hostel",
    location: "Electronic City, Bangalore",
    price: "8,500",
    rating: 4.5,
    type: "Boys",
    image: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&q=80&w=800"
  }
];

const PGList = () => {
  return (
    <section className="pg-list-section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="badge">Recommended</span>
            <h2>Popular Stays Near You</h2>
          </div>
          <button className="text-btn">View All Listings</button>
        </div>
        
        <div className="pg-grid">
          {mockPGs.map(pg => (
            <PGCard key={pg.id} pg={pg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PGList;
