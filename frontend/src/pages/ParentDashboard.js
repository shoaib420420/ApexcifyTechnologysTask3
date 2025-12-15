import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FaUserGraduate, FaMoneyBillWave, FaExclamationTriangle, FaBell } from 'react-icons/fa';

const ParentDashboard = () => {
  // Mock data for children selector
  const children = [
    { id: 1, name: 'John Doe', grade: '10A' },
    { id: 2, name: 'Jane Doe', grade: '6B' }
  ];

  const [selectedChild, setSelectedChild] = useState(children[0]);

  // Mock stats dependent on child
  const stats = {
    attendance: '92%',
    feesDue: 500,
    notifications: 3,
    performance: 'Good'
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Parent Dashboard</h1>
            <p className="text-gray-500">Monitor your child's progress and school updates.</p>
          </div>
          <div>
            <select
              value={selectedChild.id}
              onChange={(e) => setSelectedChild(children.find(c => c.id === parseInt(e.target.value)))}
              style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', fontSize: '1rem' }}
            >
              {children.map(child => (
                <option key={child.id} value={child.id}>{child.name} ({child.grade})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
              <FaUserGraduate />
            </div>
            <div className="stat-info">
              <h3>Attendance Ratio</h3>
              <p>{stats.attendance}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
              <FaMoneyBillWave />
            </div>
            <div className="stat-info">
              <h3>Fees Pending</h3>
              <p>${stats.feesDue}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#ffedd5', color: '#ea580c' }}>
              <FaBell />
            </div>
            <div className="stat-info">
              <h3>New Notices</h3>
              <p>{stats.notifications}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#fce7f3', color: '#db2777' }}>
              <FaExclamationTriangle />
            </div>
            <div className="stat-info">
              <h3>Remark</h3>
              <p style={{ fontSize: '1.2rem' }}>{stats.performance}</p>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Payment History</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f3f4f6', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>Invoice ID</th>
                  <th style={{ padding: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>Date</th>
                  <th style={{ padding: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>Amount</th>
                  <th style={{ padding: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 0' }}>#INV-2023-001</td>
                  <td style={{ padding: '0.75rem 0' }}>Nov 15, 2023</td>
                  <td style={{ padding: '0.75rem 0' }}>$1200.00</td>
                  <td style={{ padding: '0.75rem 0' }}><span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.85rem' }}>Paid</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 0' }}>#INV-2023-002</td>
                  <td style={{ padding: '0.75rem 0' }}>Dec 01, 2023</td>
                  <td style={{ padding: '0.75rem 0' }}>$500.00</td>
                  <td style={{ padding: '0.75rem 0' }}><span style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.85rem' }}>Pending</span></td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button className="btn-primary" style={{ width: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>Pay Now</button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Teacher Messages</h3>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', borderLeft: '4px solid #4f46e5' }}>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: '#6b7280' }}>Mrs. Smith (Math)</p>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#1f2937' }}>John is doing great in Algebra this week!</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem', borderLeft: '4px solid #ef4444' }}>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: '#6b7280' }}>Mr. Jones (History)</p>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#1f2937' }}>Please ensure Jane brings her textbook tomorrow.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ParentDashboard;
