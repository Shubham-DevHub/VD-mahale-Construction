import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiClock, FiCalendar, FiDollarSign, FiLogOut, FiPlus } from 'react-icons/fi';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('attendance');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = '#f0fdf4';
    
    if (!token || (user?.role !== 'employee' && user?.role !== 'admin')) {
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
      if (tab === 'attendance') endpoint = '/api/attendance';
      if (tab === 'leave') endpoint = '/api/leave';
      if (tab === 'directory') endpoint = '/api/employees';

      if (endpoint) {
        const res = await axios.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });
        // Hide salaries from employees for privacy
        if (tab === 'directory' && Array.isArray(res.data.data)) {
          const sanitized = res.data.data.map(({ salary, ...rest }) => rest);
          setData(sanitized);
        } else {
          setData(res.data.data || []);
        }
      } else {
        setData([]);
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
      if (activeTab === 'attendance') endpoint = '/api/attendance';
      if (activeTab === 'leave') endpoint = '/api/leave';

      if (endpoint) {
        await axios.post(endpoint, formData, { headers: { Authorization: `Bearer ${token}` } });
        setShowForm(false);
        setFormData({});
        fetchData(activeTab);
        alert('Submitted successfully!');
      }
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Personal Dashboard', icon: <FiUser /> },
    { id: 'directory', label: 'Employee Directory', icon: <FiUser /> },
    { id: 'attendance', label: 'Mark/View Attendance', icon: <FiClock /> },
    { id: 'leave', label: 'Request Leave', icon: <FiCalendar /> },
    { id: 'salary', label: 'Salary & Pay Slips', icon: <FiDollarSign /> },
  ];

  const renderTable = () => {
    if (activeTab === 'dashboard') {
      return (
        <div style={{ padding: '2rem' }}>
          <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Welcome back, {user?.name}!</h2>
          <p>Please click on "Employee Directory" from the left menu to view your registered profile and colleagues.</p>
        </div>
      );
    }
    if (activeTab === 'salary') {
      return (
        <div style={{ padding: '2rem' }}>
          <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Recent Pay Slips</h2>
          <p>No recent pay slips generated for the current month. Please contact HR for further details.</p>
        </div>
      );
    }

    if (loading) return <div className="p-4 text-gray-500">Loading your data...</div>;
    if (data.length === 0) return <div className="p-4 text-gray-500">No records found. Click add to create an entry.</div>;

    const keys = Object.keys(data[0]).filter(k => !['createdAt', 'updatedAt'].includes(k));

    return (
      <table className="emp-table">
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
    if (activeTab === 'dashboard' || activeTab === 'salary') return null;

    let fields = [];
    if (activeTab === 'attendance') {
      fields = [
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'status', label: 'Status', type: 'select', options: ['Present', 'Absent', 'Half-Day', 'Leave'] },
        { name: 'checkIn', label: 'Check-In Time', type: 'time' },
        { name: 'checkOut', label: 'Check-Out Time', type: 'time' },
        { name: 'hoursWorked', label: 'Hours Worked', type: 'number' }
      ];
    } else if (activeTab === 'leave') {
      fields = [
        { name: 'startDate', label: 'Start Date', type: 'date' },
        { name: 'endDate', label: 'End Date', type: 'date' },
        { name: 'reason', label: 'Reason for Leave' }
      ];
    }

    return (
      <div className="emp-modal-overlay">
        <div className="emp-modal">
          <h2>Add {activeTab} Record</h2>
          <form onSubmit={handleSubmit}>
            {fields.map(f => (
              <div key={f.name} className="emp-form-group">
                <label>{f.label}</label>
                {f.type === 'select' ? (
                  <select name={f.name} required onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}>
                    <option value="">Select an option</option>
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
            <div className="emp-modal-actions">
              <button type="button" onClick={() => setShowForm(false)} className="emp-btn-cancel">Cancel</button>
              <button type="submit" className="emp-btn-save">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="emp-container">
      <aside className="emp-sidebar">
        <div className="emp-brand">
          VD <span>Employee</span>
        </div>
        <nav className="emp-nav">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`emp-nav-btn ${activeTab === tab.id ? 'active' : ''}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <div className="emp-logout">
          <button onClick={handleLogout} className="emp-logout-btn">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      <main className="emp-main">
        <div className="emp-header">
          <div className="emp-title">
            <h1>{tabs.find(t => t.id === activeTab)?.label}</h1>
            <p>Your secure self-service portal.</p>
          </div>
          {(activeTab === 'attendance' || activeTab === 'leave') && (
            <button onClick={() => setShowForm(true)} className="emp-add-btn">
              <FiPlus /> New Entry
            </button>
          )}
        </div>

        <div className="emp-table-container">
           {renderTable()}
        </div>
      </main>

      {showForm && renderForm()}
    </div>
  );
};

export default EmployeeDashboard;
