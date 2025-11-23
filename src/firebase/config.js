import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMZDTdj13OqYSSuRbNxB1BvJI2pYr8bCg",
  authDomain: "kowa-high-school-fee-payment.firebaseapp.com",
  projectId: "kowa-high-school-fee-payment",
  storageBucket: "kowa-high-school-fee-payment.firebasestorage.app",
  messagingSenderId: "938143136016",
  appId: "1:938143136016:web:5c7332b9a272e028b2cd95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

// Set auth persistence to keep users logged in
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Auth persistence error:', error);
});

export default app;