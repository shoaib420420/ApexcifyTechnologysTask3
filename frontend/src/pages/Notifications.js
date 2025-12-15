import { useState, useEffect } from "react";
import api from "../api/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");

  const fetchNotifications = async () => {
    const res = await api.get("/notifications");
    setNotifications(res.data);
  };

  const sendNotification = async () => {
    if (!message) return;
    const res = await api.post("/notifications", { message });
    setNotifications([...notifications, res.data]);
    setMessage("");
  };

  useEffect(() => { fetchNotifications(); }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" />
      <button onClick={sendNotification}>Send</button>

      <ul>
        {notifications.map(n => <li key={n._id}>{n.message}</li>)}
      </ul>
    </div>
  );
}
