const admin = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');
if (!admin.apps.length) {
  initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }),
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
  });
}
const bucket = admin.storage().bucket();
exports.uploadFileBuffer = async (buffer, filename, mimetype) => {
  const file = bucket.file(filename);
  await file.save(buffer, { metadata: { contentType: mimetype } });
  await file.makePublic();
  return `https://storage.googleapis.com/${bucket.name}/${filename}`;
};
