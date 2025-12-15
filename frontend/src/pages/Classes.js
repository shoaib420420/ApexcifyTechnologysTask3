import React, { useState, useEffect } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState("");
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "Admin" || user?.role === "admin";

    const [error, setError] = useState(null);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const { data } = await API.get("/classes");
            setClasses(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching classes:", error);
            setError("Failed to load classes. Please try logging in again.");
            setLoading(false);
        }
    };

    const handleAddClass = async (e) => {
        e.preventDefault();
        if (!newClass) return;
        try {
            const { data } = await API.post("/classes", { name: newClass });
            setClasses([...classes, data]);
            setNewClass("");
        } catch (error) {
            console.error("Error adding class:", error);
            alert("Failed to add class: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dashboard-header">
                    <h1>Classes Management</h1>
                    <p className="text-gray-500">Manage all school classes here.</p>
                </div>

                <div className="card">
                    {isAdmin && (
                        <div style={{ marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '2rem' }}>
                            <h3 className="card-title" style={{ marginBottom: '1rem' }}>Add New Class</h3>
                            <form onSubmit={handleAddClass} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <input
                                    type="text"
                                    placeholder="Class Name (e.g. Class 10A)"
                                    value={newClass}
                                    onChange={(e) => setNewClass(e.target.value)}
                                    required
                                    className="form-input"
                                    style={{ maxWidth: '300px' }}
                                />
                                <button type="submit" className="btn-primary" style={{ width: 'auto' }}>Add Class</button>
                            </form>
                        </div>
                    )}

                    <div>
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Available Classes</h3>

                        {error && <p className="error-message" style={{ textAlign: 'left', marginBottom: '1rem' }}>{error}</p>}

                        {loading ? (
                            <p>Loading classes...</p>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                                {classes.length > 0 ? (
                                    classes.map((c) => (
                                        <div key={c._id} style={{
                                            padding: '1rem',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '0.5rem',
                                            backgroundColor: '#f9fafb',
                                            textAlign: 'center',
                                            fontWeight: '600',
                                            color: '#374151'
                                        }}>
                                            {c.name}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No classes found.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Classes;
