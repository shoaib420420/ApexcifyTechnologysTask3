import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaSignInAlt, FaUserPlus, FaTachometerAlt } from 'react-icons/fa';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (setUser) setUser(null);
        navigate("/login");
    };

    const getDashboardRoute = () => {
        if (!user) return "/login";
        switch (user.role) {
            case "Admin": return "/admin";
            case "Teacher": return "/teacher";
            case "Student": return "/student";
            case "Parent": return "/parent";
            default: return "/dashboard";
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span>School-Logo</span>
                </Link>

                <div className="navbar-menu">
                    {!user ? (
                        <>
                            <Link to="/login" className="nav-link">
                                {/* <FaSignInAlt className="nav-icon" /> */}
                                Login
                            </Link>
                            <Link to="/register" className="nav-link btn-register">
                                {/* <FaUserPlus className="nav-icon" />  */}
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="user-greeting">
                                {user.name}
                            </span>
                            <Link to={getDashboardRoute()} className="nav-link">
                                <FaTachometerAlt className="nav-icon" /> Dashboard
                            </Link>
                            <button onClick={handleLogout} className="nav-link logout-button">
                                {/* <FaSignOutAlt className="nav-icon" /> */}
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
