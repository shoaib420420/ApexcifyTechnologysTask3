import React, { useState, useEffect } from "react";
import API, { register } from "../api/api";
import Sidebar from "../components/Sidebar";

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [subjects, setSubjects] = useState(""); // Comma separated

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "Admin" || user?.role === "admin";

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const { data } = await API.get("/teachers");
            setTeachers(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to load teachers.");
            setLoading(false);
        }
    };

    const handleAddTeacher = async (e) => {
        e.preventDefault();
        try {
            // 1. Register User (Role: Teacher)
            await register({ name, email, password, role: "Teacher" });

            // 2. Add Teacher Record
            const subjectList = subjects.split(",").map(s => s.trim());
            const teacherRes = await API.post("/teachers", { name, email, subjects: subjectList });

            setTeachers([...teachers, teacherRes.data]);

            setName("");
            setEmail("");
            setPassword("");
            setSubjects("");
            alert("Teacher added successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to add teacher: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dashboard-header">
                    <h1>Teachers Management</h1>
                    <p className="text-gray-500">Manage all teachers here.</p>
                </div>

                {isAdmin && (
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Add New Teacher</h3>
                        <form onSubmit={handleAddTeacher} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
                            <input type="text" placeholder="Subjects (comma separated)" value={subjects} onChange={(e) => setSubjects(e.target.value)} className="form-input" />

                            <button type="submit" className="btn-primary" style={{ gridColumn: '1 / -1', width: 'auto', justifySelf: 'start' }}>Add Teacher</button>
                        </form>
                    </div>
                )}

                <div className="card">
                    <h3 className="card-title" style={{ marginBottom: ('1rem') }}>Teacher List</h3>
                    {error && <p className="error-message">{error}</p>}
                    {loading ? <p>Loading...</p> : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                            {teachers.length > 0 ? teachers.map(t => (
                                <div key={t._id} style={{
                                    padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: '#f9fafb'
                                }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{t.name}</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>{t.email}</p>
                                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#4b5563' }}>
                                        Subjects: {t.subjects && t.subjects.join(", ")}
                                    </p>
                                </div>
                            )) : <p className="text-gray-500">No teachers found.</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Teachers;
