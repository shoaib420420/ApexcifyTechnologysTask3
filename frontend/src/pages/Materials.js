import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import api from "../api/api";

export default function Materials() {
  const [file, setFile] = useState(null);
  const [materials, setMaterials] = useState([]);

  const fetchMaterials = async () => {
    const res = await api.get("/materials");
    setMaterials(res.data);
  };

  const uploadMaterial = async () => {
    if (!file) return;
    const storageRef = ref(storage, `materials/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    const res = await api.post("/materials", { name: file.name, url });
    setMaterials([...materials, res.data]);
  };

  useEffect(() => { fetchMaterials(); }, []);

  return (
    <div>
      <h2>Course Materials</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={uploadMaterial}>Upload</button>

      <ul>
        {materials.map(m => (
          <li key={m._id}><a href={m.url} target="_blank">{m.name}</a></li>
        ))}
      </ul>
    </div>
  );
}
