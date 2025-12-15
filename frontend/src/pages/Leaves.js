import { useEffect, useState } from "react";
import api from "../api/api"; // Axios instance

export default function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [reason, setReason] = useState("");

  // Fetch all leaves
  const fetchLeaves = async () => {
    try {
      const res = await api.get("/leaves");
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add new leave
  const applyLeave = async () => {
    if (!reason) return;
    try {
      const res = await api.post("/leaves", { reason });
      setLeaves([...leaves, res.data]);
      setReason("");
    } catch (err) {
      console.error(err);
    }
  };

  // Approve / Reject leave (Admin)
  const updateLeaveStatus = async (id, status) => {
    try {
      const res = await api.put(`/leaves/${id}`, { status });
      setLeaves(leaves.map(l => (l._id === id ? res.data : l)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchLeaves(); }, []);

  return (
    <div>
      <h2>Leaves</h2>
      <input 
        value={reason} 
        onChange={e => setReason(e.target.value)} 
        placeholder="Reason for leave" 
      />
      <button onClick={applyLeave}>Apply</button>

      <ul>
        {leaves.map(l => (
          <li key={l._id}>
            {l.reason} - {l.status}
            {l.status === "pending" && (
              <>
                <button onClick={() => updateLeaveStatus(l._id, "approved")}>Approve</button>
                <button onClick={() => updateLeaveStatus(l._id, "rejected")}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
