import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUsers, FiTruck, FiBox, FiTool, FiLogOut, FiPlus, FiTrash2, FiClock, FiCalendar } from 'react-icons/fi';
import './AdminDashboard.css'; // Import Vanilla Premium CSS

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('employees');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Basic Layout setup to override global styles that might interfere
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = '#0f172a';
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token || user?.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData(activeTab);

    return () => {
      document.body.style.background = '';
    };
  }, [activeTab, navigate, token]);

  const fetchData = async (tab) => {
    setLoading(true);
    try {
      let endpoint = '';
      if (tab === 'employees') endpoint = '/api/employees';
      if (tab === 'attendance') endpoint = '/api/attendance';
      if (tab === 'leaves') endpoint = '/api/leave';
      if (tab === 'vehicles') endpoint = '/api/vehicle';
      if (tab === 'inventory') endpoint = '/api/inventory';
      if (tab === 'equipment') endpoint = '/api/equipment';

      const res = await axios.get(endpoint, { headers: { Authorization: `Bearer ${token}` } });
      setData(res.data.data || []);
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let endpoint = '';
      if (activeTab === 'employees') endpoint = '/api/employees';
      if (activeTab === 'attendance') endpoint = '/api/attendance';
      if (activeTab === 'leaves') endpoint = '/api/leave';
      if (activeTab === 'vehicles') endpoint = '/api/vehicle';
      if (activeTab === 'inventory') endpoint = '/api/inventory';
      if (activeTab === 'equipment') endpoint = '/api/equipment';

      await axios.post(endpoint, formData, { headers: { Authorization: `Bearer ${token}` } });
      setShowForm(false);
      setFormData({});
      fetchData(activeTab); // refresh data
      alert('Added successfully!');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      let endpoint = '';
      if (activeTab === 'employees') endpoint = `/api/employees/${id}`;
      if (activeTab === 'attendance') endpoint = `/api/attendance/${id}`;
      if (activeTab === 'leaves') endpoint = `/api/leave/${id}`;
      if (activeTab === 'vehicles') endpoint = `/api/vehicle/${id}`;
      if (activeTab === 'inventory') endpoint = `/api/inventory/${id}`;
      if (activeTab === 'equipment') endpoint = `/api/equipment/${id}`;

      await axios.delete(endpoint, { headers: { Authorization: `Bearer ${token}` } });
      fetchData(activeTab); // refresh data
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const tabs = [
    { id: 'employees', label: 'Employee Directory', icon: <FiUsers /> },
    { id: 'attendance', label: 'Attendance Logs', icon: <FiClock /> },
    { id: 'leaves', label: 'Leave Requests', icon: <FiCalendar /> },
    { id: 'vehicles', label: 'Vehicle Management', icon: <FiTruck /> },
    { id: 'inventory', label: 'Inventory Management', icon: <FiBox /> },
    { id: 'equipment', label: 'Equipment Management', icon: <FiTool /> },
  ];

  const renderTable = () => {
    if (loading) return <div className="admin-empty-state">Loading secured data...</div>;
    if (data.length === 0) return <div className="admin-empty-state">No records found. Click "Add New" to create one.</div>;

    const keys = Object.keys(data[0]).filter(k => !['createdAt', 'updatedAt'].includes(k));

    return (
      <table className="admin-table">
        <thead>
          <tr>
            {keys.map(k => <th key={k}>{k.replace(/([A-Z])/g, ' $1')}</th>)}
            <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {keys.map(k => (
                <td key={k}>{row[k]}</td>
              ))}
              <td style={{ textAlign: 'center' }}>
                <button 
                  onClick={() => handleDelete(row.id)}
                  style={{ color: '#ef4444', border: 'none', background: 'transparent', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }}
                  title="Delete Record"
                >
                  <FiTrash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderForm = () => {
    let fields = [];
    if (activeTab === 'employees') {
      fields = [
        { name: 'empId', label: 'Employee ID' },
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'email', label: 'Login Email' },
        { name: 'password', label: 'Login Password', type: 'password' },
        { name: 'role', label: 'Role (admin/manager/employee)', type: 'select', options: ['employee', 'manager', 'admin'] },
        { name: 'salary', label: 'Salary', type: 'number' },
        { name: 'phone', label: 'Phone Number' },
        { name: 'joinDate', label: 'Joining Date', type: 'date' }
      ];
    } else if (activeTab === 'attendance') {
      fields = [
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'status', label: 'Status', type: 'select', options: ['Present', 'Absent', 'Half-Day'] },
        { name: 'checkIn', label: 'Check-In', type: 'time' },
        { name: 'checkOut', label: 'Check-Out', type: 'time' },
        { name: 'hoursWorked', label: 'Hours', type: 'number' },
        { name: 'employeeId', label: 'Employee ID' }
      ];
    } else if (activeTab === 'leaves') {
      fields = [
        { name: 'startDate', label: 'Start Date', type: 'date' },
        { name: 'endDate', label: 'End Date', type: 'date' },
        { name: 'reason', label: 'Reason for Leave' },
        { name: 'status', label: 'Approval Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'] }
      ];
    } else if (activeTab === 'vehicles') {
      fields = [
        { name: 'vehicleNo', label: 'Vehicle No' },
        { name: 'type', label: 'Type' },
        { name: 'model', label: 'Model' },
        { name: 'status', label: 'Status (Active/Maintenance)' }
      ];
    } else if (activeTab === 'inventory') {
      fields = [
        { name: 'itemName', label: 'Item Name' },
        { name: 'category', label: 'Category' },
        { name: 'quantity', label: 'Quantity', type: 'number' },
        { name: 'pricePerUnit', label: 'Price Per Unit', type: 'number' }
      ];
    } else if (activeTab === 'equipment') {
      fields = [
        { name: 'equipmentName', label: 'Equipment Name' },
        { name: 'serialNo', label: 'Serial No.' },
        { name: 'status', label: 'Status' }
      ];
    }

    return (
      <div className="admin-modal-overlay">
        <div className="admin-modal">
          <h2>Add New {activeTab.slice(0, -1)}</h2>
          <form onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              {fields.map(f => (
                <div key={f.name} className="admin-form-group">
                  <label>{f.label}</label>
                  {f.type === 'select' ? (
                    <select name={f.name} required onChange={handleInputChange} className="w-full">
                      <option value="">Select an option</option>
                      {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input 
                      type={f.type || 'text'} 
                      name={f.name} 
                      required 
                      onChange={handleInputChange} 
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="admin-modal-actions">
              <button type="button" onClick={() => setShowForm(false)} className="admin-btn-cancel">Cancel</button>
              <button type="submit" className="admin-btn-save">Save Record</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          VD <span>AdminERP</span>
        </div>
        <nav className="admin-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`admin-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="admin-logout">
          <button onClick={handleLogout} className="admin-logout-btn">
            <FiLogOut /> Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-header">
          <div className="admin-title">
            <h1>{tabs.find(t => t.id === activeTab)?.label}</h1>
            <p>Manage and monitor {activeTab} data across the organization.</p>
          </div>
          <button onClick={() => setShowForm(true)} className="admin-add-btn">
            <FiPlus /> Add New {activeTab.slice(0, -1)}
          </button>
        </div>

        <div className="admin-table-container">
           {renderTable()}
        </div>
      </main>

      {showForm && renderForm()}
    </div>
  );
};

export default AdminDashboard;
