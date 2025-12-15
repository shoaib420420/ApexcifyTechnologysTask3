import { Navigate } from "react-router-dom";

// export default function PrivateRoute({ children }) {
//   const token = localStorage.getItem("token");
//   if (!token) return <Navigate to="/login" replace />;
//   return children;
// }

export default function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;
  return children;
}

