const data = require('./serviceAccountKey.json')
import admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert(data),
    storageBucket: "gs://upload-7195b.appspot.com"
  });
let bucket = admin.storage().bucket();
export default bucket;