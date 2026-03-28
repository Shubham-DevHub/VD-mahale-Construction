import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiBriefcase, FiFileText, FiTarget, FiLogOut, FiPlus } from 'react-icons/fi';
import './ProjectDashboard.css'; 

const ProjectDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.background = '#f8fafc';
    
    // Allow managers or admins to view models
    if (!token || (user?.role !== 'manager' && user?.role !== 'admin')) {
      navigate('/login');
      return;
    }
    fetchData(activeTab);

    return () => { document.body.style.background = ''; };
  }, [activeTab, navigate, token]);

  const fetchData = async (tab) => {
    setLoading(true);
    try {
      let endpoint = '';
      if (tab === 'projects') endpoint = '/api/projects';
      if (tab === 'reports') endpoint = '/api/reports';

      if (endpoint) {
        const res = await axios.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });
        setData(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let endpoint = '';
      if (activeTab === 'projects') endpoint = '/api/projects';
      if (activeTab === 'reports') endpoint = '/api/reports';

      await axios.post(endpoint, formData, { headers: { Authorization: `Bearer ${token}` } });
      setShowForm(false);
      setFormData({});
      fetchData(activeTab);
      alert('Recorded successfully!');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const tabs = [
    { id: 'projects', label: 'Assign & Track Projects', icon: <FiBriefcase /> },
    { id: 'reports', label: 'Manage Daily Reports', icon: <FiFileText /> },
    { id: 'progress', label: 'Update Site Progress', icon: <FiTarget /> }, // Usually linked with specific project tracking
  ];

  const renderTable = () => {
    if (activeTab === 'progress') {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
          <h3>Specific Site Progress Module is under construction.</h3>
          <p>Update site statuses temporarily through the "Assign & Track Projects" tab.</p>
        </div>
      );
    }

    if (loading) return <div style={{ padding: '2rem' }}>Loading project data...</div>;
    if (data.length === 0) return <div style={{ padding: '2rem' }}>No records found. Click "Add New" to get started.</div>;

    const keys = Object.keys(data[0]).filter(k => !['createdAt', 'updatedAt'].includes(k));

    return (
      <table className="proj-table">
        <thead>
          <tr>{keys.map(k => <th key={k}>{k.replace(/([A-Z])/g, ' $1')}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {keys.map(k => <td key={k}>{row[k]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderForm = () => {
    if (activeTab === 'progress') return null;

    let fields = [];
    if (activeTab === 'projects') {
      fields = [
        { name: 'name', label: 'Project Name' },
        { name: 'location', label: 'Project Site/Location' },
        { name: 'budget', label: 'Assigned Budget ($/₹)', type: 'number' },
        { name: 'status', label: 'Site Progress Phase', type: 'select', options: ['Planning', 'Ongoing', 'Completed', 'On Hold'] }
      ];
    } else if (activeTab === 'reports') {
      fields = [
        { name: 'description', label: 'Daily Work Overview' },
        { name: 'progressPercentage', label: 'Progress (%)', type: 'number' }
      ];
    }

    return (
      <div className="proj-modal-overlay">
        <div className="proj-modal">
          <h2>New {activeTab === 'projects' ? 'Project' : 'Report'}</h2>
          <form onSubmit={handleSubmit}>
            {fields.map(f => (
              <div key={f.name} className="proj-form-group">
                <label>{f.label}</label>
                {f.type === 'select' ? (
                  <select name={f.name} required onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}>
                    <option value="">Select current state</option>
                    {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input 
                    type={f.type || 'text'} 
                    name={f.name} 
                    required 
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} 
                  />
                )}
              </div>
            ))}
            <div className="proj-modal-actions">
              <button type="button" onClick={() => setShowForm(false)} className="proj-btn-cancel">Cancel</button>
              <button type="submit" className="proj-btn-save">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="proj-container">
      <aside className="proj-sidebar">
        <div className="proj-brand">
          VD <span>PlannerERP</span>
        </div>
        <nav className="proj-nav">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`proj-nav-btn ${activeTab === tab.id ? 'active' : ''}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <div className="proj-logout">
          <button onClick={handleLogout} className="proj-logout-btn">
            <FiLogOut /> Secure Logout
          </button>
        </div>
      </aside>

      <main className="proj-main">
        <div className="proj-header">
          <div className="proj-title">
            <h1>{tabs.find(t => t.id === activeTab)?.label}</h1>
            <p>Control flow and execution of construction efforts securely.</p>
          </div>
          {activeTab !== 'progress' && (
            <button onClick={() => setShowForm(true)} className="proj-add-btn">
              <FiPlus /> Record Entry
            </button>
          )}
        </div>

        <div className="proj-table-container">
           {renderTable()}
        </div>
      </main>

      {showForm && renderForm()}
    </div>
  );
};

export default ProjectDashboard;
