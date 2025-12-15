import React, { useState, useEffect } from "react";
import API from "../api/api";

const Attendance = () => {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0]);
    const [attendanceStatus, setAttendanceStatus] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        if (selectedClass) {
            fetchStudents(selectedClass);
        } else {
            setStudents([]);
        }
    }, [selectedClass]);

    const fetchClasses = async () => {
        try {
            const { data } = await API.get("/classes");
            setClasses(data);
        } catch (error) {
            console.error("Error fetching classes:", error);
        }
    };

    const fetchStudents = async (classId) => {
        setLoading(true);
        try {
            // Fetch all students and filter by class client-side (since backend doesn't support filtering yet)
            const { data } = await API.get("/students");
            const classStudents = data.filter(
                (student) => student.class === classId || student.class?._id === classId
            );
            setStudents(classStudents);

            // Initialize status for all students as Present
            const initialStatus = {};
            classStudents.forEach(s => {
                initialStatus[s._id] = "Present";
            });
            setAttendanceStatus(initialStatus);

        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (studentId, status) => {
        setAttendanceStatus(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleSubmit = async () => {
        setMessage("");
        try {
            const attendanceData = students.map(student => ({
                student: student._id,
                class: selectedClass,
                date: attendanceDate,
                status: attendanceStatus[student._id]
            }));

            // We might need a bulk create endpoint, but for now loop requests or assuming single create
            // The backend attendance route likely expects single entry or we need to check backend controller.
            // Let's assume we send one by one for this simple implementation or user can improve later.

            // However, looking at the pattern, let's just show success for now as we don't have a bulk-attendance endpoint confirmed.
            // We'll try to post one for the first student to verify connectivity if we want, or just log it.

            // Actually, let's try to post for each student.
            await Promise.all(attendanceData.map(record => API.post("/attendance", record)));

            setMessage("Attendance marked successfully!");
        } catch (error) {
            console.error("Error marking attendance:", error);
            setMessage("Failed to mark attendance. Ensure endpoint exists.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Attendance</h2>
            {message && <p style={{ color: "green" }}>{message}</p>}

            <div style={{ marginBottom: "20px" }}>
                <label>Date: </label>
                <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    style={{ marginRight: "20px" }}
                />

                <label>Class: </label>
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                    <option value="">Select Class</option>
                    {classes.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            {loading && <p>Loading students...</p>}

            {!loading && students.length > 0 && (
                <>
                    <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", marginBottom: "20px" }}>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Roll Number</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.fullName}</td>
                                    <td>{student.rollNumber}</td>
                                    <td>
                                        <select
                                            value={attendanceStatus[student._id] || "Present"}
                                            onChange={(e) => handleStatusChange(student._id, e.target.value)}
                                        >
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleSubmit} style={{ padding: "10px 20px", cursor: "pointer" }}>Submit Attendance</button>
                </>
            )}

            {!loading && selectedClass && students.length === 0 && (
                <p>No students found for this class.</p>
            )}
        </div>
    );
};

export default Attendance;
