import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDS35-SP0fzu47GnDofrrACFNihx4ORGNg",
  authDomain: "manna-pray-project.firebaseapp.com",
  projectId: "manna-pray-project",
  storageBucket: "manna-pray-project.firebasestorage.app",
  messagingSenderId: "938002569418",
  appId: "1:938002569418:web:2481e162c38f7633857c33",
  measurementId: "G-KJ36YJTMB2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); 