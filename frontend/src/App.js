import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Classes from "./pages/Classes";
import Attendance from "./pages/Attendance";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Notices from "./pages/Notices";
import Subjects from "./pages/Subjects";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const getDashboardRoute = () => {
    switch (user?.role) {
      case "Admin": return "/admin"; // Check case sensitivity from Login.js (it was "Admin" or "admin")
      case "admin": return "/admin";
      case "Teacher": return "/teacher";
      case "teacher": return "/teacher";
      case "Student": return "/student";
      case "student": return "/student";
      case "Parent": return "/parent";
      case "parent": return "/parent";
      default: return "/dashboard";
    }
  };

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Navigate to={getDashboardRoute()} replace />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />


        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/students" element={<ProtectedRoute roles={["Admin"]}><Students /></ProtectedRoute>} />
        <Route path="/teachers" element={<ProtectedRoute roles={["Admin"]}><Teachers /></ProtectedRoute>} />
        <Route path="/notices" element={<ProtectedRoute roles={["Admin"]}><Notices /></ProtectedRoute>} />
        <Route path="/subjects" element={<ProtectedRoute roles={["Admin"]}><Subjects /></ProtectedRoute>} />
        <Route path="/classes" element={<ProtectedRoute roles={["Admin", "Teacher"]}><Classes /></ProtectedRoute>} />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute roles={["Teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute roles={["Student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/parent"
          element={
            <ProtectedRoute roles={["Parent"]}>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

    </>
  );
}

export default App;
