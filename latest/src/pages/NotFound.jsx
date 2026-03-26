import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="not-found-page" style={{ 
      height: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div className="not-found-card" style={{ padding: '60px', maxWidth: '600px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
        <h1 style={{ fontSize: '120px', fontWeight: '800', margin: 0, color: 'var(--primary-blue)', opacity: 0.1 }}>404</h1>
        <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '40px', fontSize: '18px' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button onClick={() => window.history.back()} className="btn btn-outline">
            <FiArrowLeft /> Go Back
          </button>
          <Link to="/" className="btn btn-primary">
            <FiHome /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
