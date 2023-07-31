import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc, collection } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, updateProfile } from 'firebase/auth'
import { updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC_blvvt8jnNr5HN969W0L8ep0nnsloSBk",
  authDomain: "planteria-67b79.firebaseapp.com",
  databaseURL: "https://planteria-67b79-default-rtdb.firebaseio.com",
  projectId: "planteria-67b79",
  storageBucket: "planteria-67b79.appspot.com",
  messagingSenderId: "172369811242",
  appId: "1:172369811242:web:81b51a819ae636bb75b053"
};


let app;
export const getFirebaseApp = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
};

export const getFirebaseAppInstance = () => getFirebaseApp();
// Export the Firebase app instance and other Firebase services
export const db = getFirestore(getFirebaseApp());
export const auth = getAuth(getFirebaseApp());
export { updateProfile, getDoc, doc, updateDoc, collection};
export const provider = new GoogleAuthProvider();