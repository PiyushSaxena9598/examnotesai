import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-fe994.firebaseapp.com",
  projectId: "authexamnotes-fe994",
  storageBucket: "authexamnotes-fe994.firebasestorage.app",
  messagingSenderId: "428260026232",
  appId: "1:428260026232:web:c89c74ea6c8a8e49008a8d"
};


const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const provider=new GoogleAuthProvider()
export {auth, provider}