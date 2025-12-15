// import React, { useState } from 'react';
// import { storage, ref, uploadBytesResumable, getDownloadURL } from '../services/firebase';
// import API from '../api/api';

// export default function FileUploadFirebase({ onUploaded }){
//   const [file,setFile] = useState(null);
//   const upload = () =>{
//     if(!file) return alert('Choose file');
//     const storageRef = ref(storage, `materials/${Date.now()}_${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);
//     uploadTask.on('state_changed', (snapshot)=>{}, (err)=>alert(err), async ()=>{
//       const url = await getDownloadURL(uploadTask.snapshot.ref);
//       const res = await API.post('/materials', { title: file.name, fileUrl: url });
//       onUploaded && onUploaded(res.data);
//     });
//   };
//   return (
//     <div>
//       <input type='file' onChange={e=>setFile(e.target.files[0])} />
//       <button onClick={upload}>Upload</button>
//     </div>
//   );
// }
