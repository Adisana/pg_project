import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import RoomList from '../components/RoomList';
import Gallery from '../components/Gallery';
import { Wifi, Wind, Coffee, Shield, Zap, Monitor, CheckCircle2, Home, Car, Video } from 'lucide-react';
import { fetchAmenities } from '../api/api';

const IconMap = {
  wifi: Wifi,
  wind: Wind,
  coffee: Coffee,
  shield: Shield,
  zap: Zap,
  monitor: Monitor,
  home: Home,
  car: Car,
  video: Video,
  default: CheckCircle2,
};

const Amenities = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAmenities = async () => {
      try {
        setError(null);
        const data = await fetchAmenities();
        if (data && data.length > 0) {
          setItems(data);
        } else {
          // Fallback static data if backend is empty/down
          setItems([
            { icon_name: "coffee", name: "3 Times Homely Food", desc: "Nutritious home-style meals served daily." },
            { icon_name: "wifi", name: "High-Speed WiFi", desc: "Seamless connectivity for work and entertainment." },
            { icon_name: "zap", name: "Geyser", desc: "24/7 hot water supply in all bathrooms." },
            { icon_name: "car", name: "Bike Parking", desc: "Safe and spacious parking area for two-wheelers." },
            { icon_name: "home", name: "New Building", desc: "Modern infrastructure with brand new facilities." },
            { icon_name: "video", name: "CCTV & 24/7 Security", desc: "Round-the-clock surveillance and biometric access." },
          ]);
        }
      } catch (err) {
        console.error(err);
        setError("Could not load amenities. Showing fallback options.");
        setItems([
          { icon_name: "coffee", name: "3 Times Homely Food", desc: "Nutritious home-style meals served daily." },
          { icon_name: "wifi", name: "High-Speed WiFi", desc: "Seamless connectivity for work and entertainment." },
          { icon_name: "zap", name: "Geyser", desc: "24/7 hot water supply in all bathrooms." },
          { icon_name: "car", name: "Bike Parking", desc: "Safe and spacious parking area for two-wheelers." },
          { icon_name: "home", name: "New Building", desc: "Modern infrastructure with brand new facilities." },
          { icon_name: "video", name: "CCTV & 24/7 Security", desc: "Round-the-clock surveillance and biometric access." },
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadAmenities();
  }, []);

  return (
    <section id="amenities" className="glass" style={{ margin: '0 1.5rem', padding: '80px 2rem' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <span className="badge">Why Choose Us</span>
          <h2 style={{ textAlign: 'center' }}>World-Class Amenities</h2>
          {error && <p style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{error}</p>}
        </div>
        
        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading amenities...</p>
        ) : (
          <div className="amenities-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {items.map((item, i) => {
              const IconComponent = IconMap[item.icon_name?.toLowerCase()] || IconMap.default;
              return (
                <div key={i} className="amenity-item" style={{ 
                  padding: '2rem', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '20px',
                  border: '1px solid rgba(197, 160, 33, 0.1)',
                  transition: 'transform 0.3s'
                }}>
                  <div style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>
                    {item.icon && item.icon.includes('http') ? (
                      <img src={item.icon} alt={item.name || item.title} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                    ) : (
                      <IconComponent size={48} />
                    )}
                  </div>
                  <h4 style={{ marginBottom: '0.5rem' }}>{item.name || item.title}</h4>
                  {(item.desc || item.description) && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.desc || item.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="glass" style={{ 
    margin: '80px 1.5rem 1.5rem', 
    padding: '60px 0 30px',
    borderRadius: '30px'
  }}>
    <div className="container">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '3rem',
        marginBottom: '60px'
      }}>
        <div>
          <h3 style={{ marginBottom: '1.5rem' }}>Ruchi Elite</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            The ultimate co-living experience for mens. Premium amenities, secure environment, and comfort like home.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '1.5rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', color: 'var(--text-muted)', lineHeight: '2' }}>
            <li><a href="/#rooms" style={{ color: 'inherit', textDecoration: 'none' }}>Rooms</a></li>
            <li><a href="/#amenities" style={{ color: 'inherit', textDecoration: 'none' }}>Amenities</a></li>
            <li><a href="/#gallery" style={{ color: 'inherit', textDecoration: 'none' }}>Gallery</a></li>
            <li><a href="/#location" style={{ color: 'inherit', textDecoration: 'none' }}>Location</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '1.5rem' }}>Contact</h4>
          <ul style={{ listStyle: 'none', color: 'var(--text-muted)', lineHeight: '2' }}>
            <li><a href="tel:+917287879882" style={{ color: 'inherit', textDecoration: 'none' }}>+91 72878 79882</a></li>
            <li><a href="tel:+917993043029" style={{ color: 'inherit', textDecoration: 'none' }}>+91 79930 43029</a></li>
            <li>
              <a 
                href="https://maps.app.goo.gl/Yd2HSCsoRhcYe2aQ8?g_st=aw" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                1/134, Post Office St, Seevaram, Thoraipakkam, Chennai - 600097
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ 
        borderTop: '1px solid var(--glass-border)', 
        paddingTop: '30px', 
        textAlign: 'center', 
        color: 'var(--text-muted)',
        fontSize: '0.9rem'
      }}>
        © 2026 Ruchi Elite Mens PG. All rights reserved.
      </div>
    </div>
  </footer>
);

const HomePage = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Amenities />
      <Gallery />
      <RoomList />
    </main>
    <Footer />
  </>
);

export default HomePage;
