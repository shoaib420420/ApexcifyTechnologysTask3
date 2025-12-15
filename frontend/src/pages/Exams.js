import { useState, useEffect } from "react";
import api from "../api/api";

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const fetchExams = async () => {
    const res = await api.get("/exams");
    setExams(res.data);
  };

  const addExam = async () => {
    const res = await api.post("/exams", { title, date });
    setExams([...exams, res.data]);
    setTitle("");
    setDate("");
  };

  useEffect(() => { fetchExams(); }, []);

  return (
    <div>
      <h2>Exams</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Exam Title" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button onClick={addExam}>Add Exam</button>

      <ul>
        {exams.map(e => (
          <li key={e._id}>{e.title} - {new Date(e.date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
}
