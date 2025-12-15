import { useEffect, useState } from "react";
import api from "../api/api";

export default function Timetables() {
  const [timetables, setTimetables] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const fetchTimetables = async () => {
    const res = await api.get("/timetables");
    setTimetables(res.data);
  };

  const addTimetable = async () => {
    const res = await api.post("/timetables", { title, link });
    setTimetables([...timetables, res.data]);
    setTitle("");
    setLink("");
  };

  useEffect(() => { fetchTimetables(); }, []);

  return (
    <div>
      <h2>Timetables</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={link} onChange={e => setLink(e.target.value)} placeholder="Link" />
      <button onClick={addTimetable}>Add</button>

      <ul>
        {timetables.map(t => <li key={t._id}><a href={t.link}>{t.title}</a></li>)}
      </ul>
    </div>
  );
}
