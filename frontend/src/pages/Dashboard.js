import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div style={{ padding: 20 }}>

      <Navbar user={user} />
      <div style={{ padding: "0 2rem" }}>
        {/* Dashboard content will go here */}
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <h2>Dashboard Overview</h2>
          <p>Select an option from the navigation bar to get started.</p>
        </div>
      </div>
    </div>
  );
}






// export default function Dashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     window.location.href = "/login";
//     return null;
//   }

//   // Redirect based on role
//   if (user.role === "admin") window.location.href = "/admin";
//   if (user.role === "teacher") window.location.href = "/teacher";
//   if (user.role === "student") window.location.href = "/student";
//   if (user.role === "parent") window.location.href = "/parent";

//   return <p>Loading...</p>;
// }







