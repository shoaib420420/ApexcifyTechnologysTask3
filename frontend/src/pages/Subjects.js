import React, { useState, useEffect } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]); // Will store users (teachers)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [name, setName] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedTeacher, setSelectedTeacher] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "Admin" || user?.role === "admin";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Need users for teacher dropdown
            const [subRes, classRes, usersRes] = await Promise.all([
                API.get("/subjects"),
                API.get("/classes"),
                API.get("/users") // Admin only endpoint usually
            ]);
            setSubjects(subRes.data);
            setClasses(classRes.data);

            // Filter users who are teachers
            const teacherList = usersRes.data.filter(u => u.role === "Teacher" || u.role === "teacher");
            setTeachers(teacherList);

            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to load data.");
            setLoading(false);
        }
    };

    const handleAddSubject = async (e) => {
        e.preventDefault();
        try {
            const newSub = {
                name,
                class: selectedClass,
                teacher: selectedTeacher
            };
            const res = await API.post("/subjects", newSub);
            setSubjects([...subjects, res.data]);
            setName("");
            setSelectedClass("");
            setSelectedTeacher("");
        } catch (err) {
            console.error(err);
            alert("Failed to add subject: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dashboard-header">
                    <h1>Subjects Management</h1>
                    <p className="text-gray-500">Manage subjects and assign teachers.</p>
                </div>

                {isAdmin && (
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Add New Subject</h3>
                        <form onSubmit={handleAddSubject} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <input type="text" placeholder="Subject Name" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />

                            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required className="form-input">
                                <option value="">Select Class</option>
                                {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>

                            <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)} required className="form-input">
                                <option value="">Select Teacher</option>
                                {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                            </select>

                            <button type="submit" className="btn-primary" style={{ gridColumn: '1 / -1', width: 'auto', justifySelf: 'start' }}>Add Subject</button>
                        </form>
                    </div>
                )}

                <div className="card">
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Subject List</h3>
                    {loading ? <p>Loading...</p> : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                            {subjects.length > 0 ? subjects.map(s => {
                                const sClass = classes.find(c => c._id === s.class) || {};
                                const sTeacher = teachers.find(t => t._id === s.teacher) || {};
                                return (
                                    <div key={s._id} style={{
                                        padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: '#f9fafb'
                                    }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{s.name}</h4>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>Class: {sClass.name || 'N/A'}</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>Teacher: {sTeacher.name || 'N/A'}</p>
                                    </div>
                                );
                            }) : <p className="text-gray-500">No subjects found.</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Subjects;
