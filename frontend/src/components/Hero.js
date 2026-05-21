import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
            style={{ textAlign: 'center' }}
          >
            <span className="badge">Establishment 2026</span>
            <h1 className="hero-title">
              Comfort that <br />
              <span className="text-gold">feels like Home.</span>
            </h1>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 3rem' }}>
              Experience an unparalleled co-living lifestyle tailored for the modern man. 
              Luxury suites, gourmet dining, and an elite community of like-minded professionals.
            </p>
            
            <div className="hero-cta-group" style={{ justifyContent: 'center', display: 'flex', gap: '1.5rem' }}>
              <button 
                className="btn-primary" 
                style={{ padding: '16px 40px' }}
                onClick={() => window.open("https://wa.me/917287879882", "_blank", "noopener,noreferrer")}
              >
                Book Your Stay <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
