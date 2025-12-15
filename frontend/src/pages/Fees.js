import { useState, useEffect } from "react";
import api from "../api/api";

export default function Fees() {
  const [fees, setFees] = useState([]);
  const [student, setStudent] = useState("");
  const [amount, setAmount] = useState("");

  const fetchFees = async () => {
    const res = await api.get("/fees");
    setFees(res.data);
  };

  const addFee = async () => {
    const res = await api.post("/fees", { student, amount });
    setFees([...fees, res.data]);
    setStudent("");
    setAmount("");
  };

  useEffect(() => { fetchFees(); }, []);

  return (
    <div>
      <h2>Fees & Invoices</h2>
      <input value={student} onChange={e => setStudent(e.target.value)} placeholder="Student Name" />
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      <button onClick={addFee}>Add Fee</button>

      <ul>
        {fees.map(f => (
          <li key={f._id}>{f.student} - ${f.amount}</li>
        ))}
      </ul>
    </div>
  );
}
