import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchGallery } from '../api/api';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('');
  const [galleryData, setGalleryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://pg-project-s1m0.onrender.com/${url}`;
  };

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setError(null);
        const data = await fetchGallery();
        if (data && Array.isArray(data) && data.length > 0) {
          const groupedData = data.reduce((acc, curr) => {
            const category = curr.title || 'Other';
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(curr.image);
            return acc;
          }, {});
          setGalleryData(groupedData);
          setActiveTab(Object.keys(groupedData)[0]);
        } else {
          // If no images returned, initialize to empty object
          setGalleryData({});
          setActiveTab('');
        }
      } catch (err) {
        console.error(err);
        setError("Unable to retrieve live gallery.");
        setGalleryData({});
        setActiveTab('');
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, []);

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <span className="badge">Visual Tour</span>
          <h2>Our Gallery</h2>
          {error && <p style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{error}</p>}
          
          {Object.keys(galleryData).length > 0 && (
            <div className="gallery-tabs" style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '2.5rem',
              background: 'rgba(255,255,255,0.03)',
              padding: '0.5rem',
              borderRadius: '100px',
              border: '1px solid var(--glass-border)'
            }}>
              {Object.keys(galleryData).map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  style={{ 
                    padding: '10px 24px', 
                    borderRadius: '100px', 
                    border: 'none', 
                    background: activeTab === tab ? 'var(--secondary)' : 'transparent',
                    color: activeTab === tab ? 'var(--primary)' : 'white',
                    fontWeight: '700',
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading gallery...</p>
        ) : Object.keys(galleryData).length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'rgba(255, 255, 255, 0.01)',
            borderRadius: '24px',
            border: '1px dashed var(--glass-border)',
            marginTop: '3.5rem'
          }}>
            <h4 style={{ fontSize: '1.3rem', color: 'var(--secondary)', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif" }}>No Gallery Photos Yet</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>
              Images will appear here once you upload them under categories like "1 Sharing", "2 Sharing", etc. inside your backend Admin Panel.
            </p>
          </div>
        ) : (
          <div className="gallery-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem',
            marginTop: '3rem'
          }}>
            <AnimatePresence mode="wait">
              {galleryData[activeTab]?.map((img, index) => (
                <motion.div 
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="gallery-item glass"
                  style={{ height: '300px', overflow: 'hidden', padding: '0' }}
                >
                  <img 
                    src={getImageUrl(img)} 
                    alt={`${activeTab} room`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
