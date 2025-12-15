import React, { useState, useEffect } from "react";
import API, { register } from "../api/api";
import Sidebar from "../components/Sidebar";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form Strings
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [studentId, setStudentId] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [parentName, setParentName] = useState("");
    const [parentContact, setParentContact] = useState("");
    const [selectedClass, setSelectedClass] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "Admin" || user?.role === "admin";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [studentsRes, classesRes] = await Promise.all([
                API.get("/students"),
                API.get("/classes")
            ]);
            setStudents(studentsRes.data);
            setClasses(classesRes.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load data. Please try logging in again.");
            setLoading(false);
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            // 1. Register User
            const authRes = await register({ name, email, password, role: "Student" });
            const userId = authRes.data.user.id || authRes.data.user._id;

            // 2. Create Student Record
            const studentData = {
                user: userId,
                fullName: name,
                studentId,
                rollNumber,
                parentName,
                parentContact,
                class: selectedClass
            };
            const studentRes = await API.post("/students", studentData);

            // Update List
            setStudents([...students, studentRes.data]);

            // Clear Form
            setName("");
            setEmail("");
            setPassword("");
            setStudentId("");
            setRollNumber("");
            setParentName("");
            setParentContact("");
            setSelectedClass("");
            alert("Student added successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to add student: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <div className="dashboard-header">
                    <h1>Students Management</h1>
                    <p className="text-gray-500">Manage all students here.</p>
                </div>

                {isAdmin && (
                    <div className="card" style={{ marginBottom: ('2rem') }}>
                        <h3 className="card-title" style={{ marginBottom: ('1rem') }}>Add New Student</h3>
                        <form onSubmit={handleAddStudent} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />
                            <input type="email" placeholder="Email (Login)" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
                            <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} required className="form-input" />
                            <input type="text" placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required className="form-input" />

                            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required className="form-input">
                                <option value="">Select Class</option>
                                {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                            </select>

                            <input type="text" placeholder="Parent Name" value={parentName} onChange={(e) => setParentName(e.target.value)} required className="form-input" />
                            <input type="text" placeholder="Parent Contact" value={parentContact} onChange={(e) => setParentContact(e.target.value)} required className="form-input" />

                            <button type="submit" className="btn-primary" style={{ gridColumn: '1 / -1', width: 'auto', justifySelf: 'start' }}>Add Student</button>
                        </form>
                    </div>
                )}

                <div className="card">
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Student List</h3>
                    {error && <p className="error-message">{error}</p>}
                    {loading ? <p>Loading...</p> : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                            {students.length > 0 ? students.map(s => {
                                // Find class name
                                const sClass = classes.find(c => c._id === s.class) || {};
                                return (
                                    <div key={s._id} style={{
                                        padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: '#f9fafb'
                                    }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{s.fullName}</h4>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>ID: {s.studentId}</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>Class: {sClass.name || 'N/A'}</p>
                                    </div>
                                );
                            }) : <p className="text-gray-500">No students found.</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Students;
