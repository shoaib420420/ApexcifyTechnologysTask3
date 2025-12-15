import React from 'react';
import Sidebar from '../components/Sidebar';
import { FaChalkboardTeacher, FaUserGraduate, FaClipboardList, FaClock } from 'react-icons/fa';

const TeacherDashboard = () => {
  // Mock data
  const stats = {
    myClasses: 5,
    totalStudents: 150,
    pendingAttendance: 2,
    upcomingExams: 3
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Teacher Dashboard</h1>
          <p className="text-gray-500">Overview of your classes and activities.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
              <FaChalkboardTeacher />
            </div>
            <div className="stat-info">
              <h3>My Classes</h3>
              <p>{stats.myClasses}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
              <FaUserGraduate />
            </div>
            <div className="stat-info">
              <h3>Total Students</h3>
              <p>{stats.totalStudents}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#ffedd5', color: '#ea580c' }}>
              <FaClipboardList />
            </div>
            <div className="stat-info">
              <h3>Pending Attendance</h3>
              <p>{stats.pendingAttendance}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: '#fce7f3', color: '#db2777' }}>
              <FaClock />
            </div>
            <div className="stat-info">
              <h3>Upcoming Exams</h3>
              <p>{stats.upcomingExams}</p>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">My Schedule (Today)</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f3f4f6', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>Time</th>
                  <th style={{ padding: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>Class</th>
                  <th style={{ padding: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>Subject</th>
                  <th style={{ padding: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>Room</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 0', fontWeight: '500' }}>09:00 AM</td>
                  <td style={{ padding: '0.75rem 0' }}>Class 10A</td>
                  <td style={{ padding: '0.75rem 0' }}>Mathematics</td>
                  <td style={{ padding: '0.75rem 0' }}>Rm 101</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 0', fontWeight: '500' }}>10:30 AM</td>
                  <td style={{ padding: '0.75rem 0' }}>Class 9B</td>
                  <td style={{ padding: '0.75rem 0' }}>Physics</td>
                  <td style={{ padding: '0.75rem 0' }}>Lab 2</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 0', fontWeight: '500' }}>01:00 PM</td>
                  <td style={{ padding: '0.75rem 0' }}>Class 10A</td>
                  <td style={{ padding: '0.75rem 0' }}>Mathematics</td>
                  <td style={{ padding: '0.75rem 0' }}>Rm 101</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Quick Tasks</h3>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <button className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>Mark Attendance</button>
              <button className="btn-primary" style={{ width: '100%', textAlign: 'center', backgroundColor: '#8b5cf6' }}>Upload Marks</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TeacherDashboard;
