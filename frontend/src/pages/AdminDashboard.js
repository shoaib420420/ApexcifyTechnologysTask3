import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FaUserGraduate, FaChalkboardTeacher, FaSchool, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../api/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back, Admin. Here's what's happening today.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
              <FaUserGraduate />
            </div>
            <div className="stat-info">
              <h3>Total Students</h3>
              <p>{stats.totalStudents}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
              <FaChalkboardTeacher />
            </div>
            <div className="stat-info">
              <h3>Total Teachers</h3>
              <p>{stats.totalTeachers}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#ffedd5', color: '#ea580c' }}>
              <FaSchool />
            </div>
            <div className="stat-info">
              <h3>Total Classes</h3>
              <p>{stats.totalClasses}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#fce7f3', color: '#db2777' }}>
              <FaMoneyBillWave />
            </div>
            <div className="stat-info">
              <h3>Total Revenue</h3>
              <p>${stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Activities</h3>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4f46e5', marginRight: '1rem' }}></div>
                <div>
                  <p style={{ margin: 0, fontWeight: 500 }}>New Student Registration</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>2 minutes ago</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', marginRight: '1rem' }}></div>
                <div>
                  <p style={{ margin: 0, fontWeight: 500 }}>Fees Collected - Class 10A</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>1 hour ago</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b', marginRight: '1rem' }}></div>
                <div>
                  <p style={{ margin: 0, fontWeight: 500 }}>Teacher Meeting Scheduled</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>3 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <Link to="/students" className="btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block', textDecoration: 'none', boxSizing: 'border-box' }}>Add Student</Link>
              <Link to="/teachers" className="btn-primary" style={{ width: '100%', textAlign: 'center', backgroundColor: '#10b981', display: 'block', textDecoration: 'none', boxSizing: 'border-box' }}>Add Teacher</Link>
              <Link to="/classes" className="btn-primary" style={{ width: '100%', textAlign: 'center', backgroundColor: '#ea580c', display: 'block', textDecoration: 'none', boxSizing: 'border-box' }}>Add Class</Link>
              <Link to="/notices" className="btn-primary" style={{ width: '100%', textAlign: 'center', backgroundColor: '#6366f1', display: 'block', textDecoration: 'none', boxSizing: 'border-box' }}>Create Notice</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
