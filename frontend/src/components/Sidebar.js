import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaHome,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaBook,
    FaClipboardList,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from 'react-icons/fa';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user?.role;

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div>
                    <h2>School System</h2>
                    <p>Welcome, {user?.name}</p>
                </div>
                <button className="menu-toggle" onClick={toggleSidebar}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            <nav className="sidebar-nav">
                {role === 'Admin' && (
                    <>
                        <NavLink to="/admin" className="sidebar-link" end>
                            <FaHome className="icon" /> Dashboard
                        </NavLink>
                        <NavLink to="/classes" className="sidebar-link">
                            <FaBook className="icon" /> Classes
                        </NavLink>
                        <NavLink to="/subjects" className="sidebar-link">
                            <FaBook className="icon" /> Subjects
                        </NavLink>
                        <NavLink to="/teachers" className="sidebar-link">
                            <FaChalkboardTeacher className="icon" /> Teachers
                        </NavLink>
                        <NavLink to="/students" className="sidebar-link">
                            <FaUserGraduate className="icon" /> Students
                        </NavLink>
                        <NavLink to="/notices" className="sidebar-link">
                            <FaClipboardList className="icon" /> Notices
                        </NavLink>
                    </>
                )}

                {role === 'Teacher' && (
                    <>
                        <NavLink to="/teacher" className="sidebar-link" end>
                            <FaHome className="icon" /> Dashboard
                        </NavLink>
                        <NavLink to="/classes" className="sidebar-link">
                            <FaBook className="icon" /> My Classes
                        </NavLink>
                        <NavLink to="/students" className="sidebar-link">
                            <FaUserGraduate className="icon" /> Students
                        </NavLink>
                        <NavLink to="/attendance" className="sidebar-link">
                            <FaClipboardList className="icon" /> Attendance
                        </NavLink>
                        <NavLink to="/exams" className="sidebar-link">
                            <FaClipboardList className="icon" /> Exams
                        </NavLink>
                    </>
                )}

                {role === 'Student' && (
                    <>
                        <NavLink to="/student" className="sidebar-link" end>
                            <FaHome className="icon" /> Dashboard
                        </NavLink>
                        <NavLink to="/subjects" className="sidebar-link">
                            <FaBook className="icon" /> Subjects
                        </NavLink>
                        <NavLink to="/attendance" className="sidebar-link">
                            <FaClipboardList className="icon" /> Attendance
                        </NavLink>
                        <NavLink to="/timetable" className="sidebar-link">
                            <FaCalendarAlt className="icon" /> Timetable
                        </NavLink>
                        <NavLink to="/fees" className="sidebar-link">
                            <FaMoneyBillWave className="icon" /> Fees
                        </NavLink>
                    </>
                )}

                {role === 'Parent' && (
                    <>
                        <NavLink to="/parent" className="sidebar-link" end>
                            <FaHome className="icon" /> Dashboard
                        </NavLink>
                        {/* Assuming parent can see similar things to student but for their child */}
                    </>
                )}

                <button onClick={handleLogout} className="sidebar-link logout-btn">
                    <FaSignOutAlt className="icon" /> Logout
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
