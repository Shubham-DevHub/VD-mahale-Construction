import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock, FiArrowRight, FiInfo } from 'react-icons/fi';
import axios from 'axios';
import '../components/auth/ERPLogin.css';

const ERPLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect based on role
        if (response.data.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (response.data.user.role === 'manager') {
          navigate('/project-dashboard');
        } else {
          navigate('/employee-dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="erp-login-page">
      <div className="erp-container">
        <div className="erp-card shadow-2xl">
          <div className="erp-header">
            <div className="erp-icon"><FiLock /></div>
            <h2>Internal ERP Access</h2>
            <p>Employees & Partner Login for VD Mahale Infra System</p>
          </div>
          
          {error && <div className="erp-alert-error" style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</div>}

          <form className="erp-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Employee ID / Email</label>
              <input 
                type="text" 
                placeholder="Enter your Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            
            <div className="form-utils">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember Me
              </label>
              <a href="#reset" className="forgot-link">Forgot Password?</a>
            </div>
            
            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? 'Authenticating...' : 'Security Login'} <FiArrowRight />
            </button>
          </form>
          
          <div className="erp-notice">
            <FiInfo />
            <span>Authorized Personnel Only. Access is Monitored.</span>
          </div>
        </div>
        
        <div className="back-to-site">
          <Link to="/">← Back to Corporate Website</Link>
        </div>
      </div>
      
      <style>{`
        .w-full { width: 100%; }
        .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
      `}</style>
    </div>
  );
};

export default ERPLogin;
