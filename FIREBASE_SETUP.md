# 🔥 Firebase Setup Guide

## Step 1: Create Firebase Project

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Click "Add project"

2. **Project Details**
   - Project name: `kowa-high-school-fee-payment`
   - Accept terms and click "Continue"
   - Disable Google Analytics (optional)
   - Click "Create project"

## Step 2: Set Up Firestore Database

1. **In Firebase Console, click "Firestore Database"**
2. **Click "Create database"**
3. **Choose "Start in production mode"**
4. **Select location:** Choose closest to Nigeria (e.g., europe-west)
5. **Click "Enable"**

## Step 3: Configure Security Rules

1. **In Firestore, click "Rules" tab**
2. **Replace with these rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if true;
      allow create: if true;
      allow update: if request.auth != null;
    }
    
    // Payments collection
    match /payments/{paymentId} {
      allow read: if true;
      allow create: if true;
      allow update: if true;
    }
  }
}
```

3. **Click "Publish"**

## Step 4: Get Firebase Configuration

1. **In Firebase Console, click the gear icon ⚙️ → Project settings**
2. **Scroll down to "Your apps"**
3. **Click the web icon `</>`**
4. **App nickname:** `Kowa HS Fee Payment Web`
5. **Click "Register app"**
6. **Copy the firebaseConfig object**

## Step 5: Update Your Code

1. **Open `src/firebase/config.js`**
2. **Replace the placeholder values with your Firebase config:**

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 6: Add Admin User to Firebase

1. **In Firestore Console, click "Start collection"**
2. **Collection ID:** `users`
3. **Add first document:**
   - Document ID: Auto-ID
   - Fields:
     ```
     name: "Admin User"
     email: "admin@kowahs.edu.ng"
     password: "KowaHS@2024!Admin"
     role: "admin"
     ```
4. **Click "Save"**

## Step 7: Deploy to Vercel

1. **Update these files on GitHub:**
   - `package.json` (with Firebase dependency)
   - `src/firebase/config.js` (with your Firebase config)
   - `src/context/AuthContext.js` (updated version)
   - `src/pages/AdminDashboard.js` (updated version)

2. **Push to GitHub** - Vercel will auto-deploy

3. **Test your live site:**
   - Students can register
   - Admin can see all students
   - Payments sync across all devices

## ✅ What You Get:

- **Real-time sync** across all devices
- **Persistent data** (never lost)
- **Admin sees all students** immediately
- **Payment confirmations** work properly
- **Free tier** (up to 50,000 reads/day)

## 🎯 Expected Behavior:

### Student Registration:
1. Student registers on their phone
2. Data saves to Firebase
3. Admin immediately sees new student
4. Works from any device

### Payment Flow:
1. Student makes payment
2. Payment appears in Firebase
3. Admin sees pending payment
4. Admin confirms payment
5. Student sees confirmed status

**Your school system will now work properly across all devices!** 🚀