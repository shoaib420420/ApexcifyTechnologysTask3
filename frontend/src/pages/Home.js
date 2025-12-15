import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1 className="hero-title">Welcome to School Management System</h1>
                {/* <p className="hero-subtitle">Streamline your educational institution's operations with our professional platform. Manage students, teachers, and administration seamlessly.</p> */}
                <div className="hero-buttons">
                    {/* <Link to="/login" className="btn-hero-primary">Login</Link> */}
                    <Link to="/register" className="btn-hero-secondary">
                        Join Here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
