import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  doc,
  onSnapshot,
  setDoc
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { db, auth } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load users and payments from Firebase
  useEffect(() => {
    // Listen to Firebase Auth state
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, get their data from Firestore
        const userDoc = await getDocs(query(collection(db, 'users'), where('email', '==', firebaseUser.email)));
        if (!userDoc.empty) {
          const userData = userDoc.docs[0].data();
          setUser({
            id: userDoc.docs[0].id,
            uid: firebaseUser.uid,
            ...userData
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Real-time listener for payments
    const unsubscribePayments = onSnapshot(collection(db, 'payments'), (snapshot) => {
      const paymentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPayments(paymentsData);
    });

    // Real-time listener for users
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribePayments();
      unsubscribeUsers();
    };
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const register = async (userData) => {
    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      
      // Store additional user data in Firestore (without password)
      const newUser = {
        email: userData.email,
        name: userData.name,
        studentId: userData.studentId,
        program: userData.program,
        year: userData.year,
        role: 'student',
        registrationDate: new Date().toISOString(),
        uid: userCredential.user.uid
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        return { success: false, error: 'User already exists' };
      }
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const makePayment = async (paymentData) => {
    try {
      const newPayment = {
        studentId: user.id,
        studentName: user.name,
        ...paymentData,
        status: 'pending',
        date: new Date().toISOString(),
        receiptNumber: `RCP-${Date.now()}`
      };

      const docRef = await addDoc(collection(db, 'payments'), newPayment);
      
      return { 
        success: true, 
        payment: { id: docRef.id, ...newPayment } 
      };
    } catch (error) {
      console.error('Payment error:', error);
      return { success: false, error: 'Payment failed. Please try again.' };
    }
  };

  const confirmPayment = async (paymentId) => {
    try {
      const paymentRef = doc(db, 'payments', paymentId);
      await updateDoc(paymentRef, {
        status: 'confirmed',
        confirmedDate: new Date().toISOString()
      });
      return { success: true };
    } catch (error) {
      console.error('Confirm payment error:', error);
      return { success: false, error: 'Failed to confirm payment.' };
    }
  };

  const value = {
    user,
    payments,
    users,
    login,
    register,
    logout,
    makePayment,
    confirmPayment,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}