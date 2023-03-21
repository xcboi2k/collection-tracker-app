import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDGj4q1X-VnVBjcb0g2X30wIltqqxsrOVw",
    authDomain: "collection-tracker-app.firebaseapp.com",
    projectId: "collection-tracker-app",
    storageBucket: "collection-tracker-app.appspot.com",
    messagingSenderId: "267663090688",
    appId: "1:267663090688:web:94d7d3fc2defcab622a4e5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);