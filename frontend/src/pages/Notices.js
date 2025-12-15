import React, { useState, useEffect } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";

const Notices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("App");

    const user = JSON.parse(localStorage.getItem("user"));
    // Notices usually can be created by Admin
    const isAdmin = user?.role === "Admin" || user?.role === "admin";

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const { data } = await API.get("/notifications");
            setNotices(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to load notices.");
            setLoading(false);
        }
    };

    const handleAddNotice = async (e) => {
        e.preventDefault();
        try {
            const newNotice = { title, message, type };
            const res = await API.post("/notifications", newNotice);
            setNotices([res.data, ...notices]);
            setTitle("");
            setMessage("");
            alert("Notice created successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to create notice: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dashboard-header">
                    <h1>Notices & Announcements</h1>
                    <p className="text-gray-500">Create and view system-wide notices.</p>
                </div>

                {isAdmin && (
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Create New Notice</h3>
                        <form onSubmit={handleAddNotice} style={{ display: 'grid', gap: '1rem' }}>
                            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="form-input" />
                            <textarea placeholder="Message Content" value={message} onChange={(e) => setMessage(e.target.value)} required className="form-input" style={{ minHeight: '100px' }}></textarea>
                            <select value={type} onChange={(e) => setType(e.target.value)} className="form-input">
                                <option value="App">App</option>
                                <option value="Email">Email</option>
                                <option value="SMS">SMS</option>
                            </select>
                            <button type="submit" className="btn-primary" style={{ width: 'auto', justifySelf: 'start' }}>Post Notice</button>
                        </form>
                    </div>
                )}

                <div className="card">
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Notice Board</h3>
                    {loading ? <p>Loading...</p> : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {notices.length > 0 ? notices.map(n => (
                                <div key={n._id} style={{
                                    padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: '#f9fafb'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <h4 style={{ margin: 0, fontWeight: 'bold', color: '#1f2937' }}>{n.title}</h4>
                                        <span style={{ fontSize: '0.8rem', color: '#6b7280', backgroundColor: '#e5e7eb', padding: '2px 8px', borderRadius: '12px' }}>{n.type}</span>
                                    </div>
                                    <p style={{ margin: 0, color: '#4b5563' }}>{n.message}</p>
                                    <span style={{ fontSize: '0.8rem', color: '#9ca3af', display: 'block', marginTop: '0.5rem' }}>
                                        {new Date(n.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            )) : <p className="text-gray-500">No notices found.</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notices;
