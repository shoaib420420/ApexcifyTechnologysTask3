import React from 'react';
import Sidebar from '../components/Sidebar';
import { FaBook, FaCalendarCheck, FaPercentage, FaChartLine } from 'react-icons/fa';

const StudentDashboard = () => {
  // Mock data
  const stats = {
    attendance: '85%',
    assignmentsPending: 4,
    nextExam: 'Mathematics',
    gradeAverage: 'A-'
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
          <p className="text-gray-500">Keep track of your academic progress.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
              <FaPercentage />
            </div>
            <div className="stat-info">
              <h3>Attendance</h3>
              <p>{stats.attendance}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
              <FaBook />
            </div>
            <div className="stat-info">
              <h3>Assignments Due</h3>
              <p>{stats.assignmentsPending}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#ffedd5', color: '#ea580c' }}>
              <FaCalendarCheck />
            </div>
            <div className="stat-info">
              <h3>Next Exam</h3>
              <p style={{ fontSize: '1.2rem' }}>{stats.nextExam}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#fce7f3', color: '#db2777' }}>
              <FaChartLine />
            </div>
            <div className="stat-info">
              <h3>Overall Grade</h3>
              <p>{stats.gradeAverage}</p>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Grades</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f3f4f6', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>Subject</th>
                  <th style={{ padding: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>Test</th>
                  <th style={{ padding: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>Score</th>
                  <th style={{ padding: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 0' }}>Mathematics</td>
                  <td style={{ padding: '0.75rem 0' }}>Midterm</td>
                  <td style={{ padding: '0.75rem 0' }}>85/100</td>
                  <td style={{ padding: '0.75rem 0' }}><span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.85rem' }}>A</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 0' }}>Physics</td>
                  <td style={{ padding: '0.75rem 0' }}>Unit Test 3</td>
                  <td style={{ padding: '0.75rem 0' }}>78/100</td>
                  <td style={{ padding: '0.75rem 0' }}><span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.85rem' }}>B+</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 0' }}>English</td>
                  <td style={{ padding: '0.75rem 0' }}>Essay</td>
                  <td style={{ padding: '0.75rem 0' }}>92/100</td>
                  <td style={{ padding: '0.75rem 0' }}><span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.85rem' }}>A+</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Announcements</h3>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#1f2937' }}>School Picnic</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#4b5563' }}>Remember to sign up for the annual picnic by Friday!</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#1f2937' }}>Library Books</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#4b5563' }}>All borrowed books must be returned before the break.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;
