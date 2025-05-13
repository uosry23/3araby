import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCLzr68J_gdEtEvPnV55I6kFdigyFMuoIQ",
    authDomain: "araby-aaca3.firebaseapp.com",
    projectId: "araby-aaca3",
    storageBucket: "araby-aaca3.firebasestorage.app",
    messagingSenderId: "985886713357",
    appId: "1:985886713357:web:fecc222725c2a2b46b9744",
    measurementId: "G-TMCWGC9LP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
