// src/services/authService.js
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';

// Strathmore email validation function
export const isStrathmorateEmail = (email) => {
  return email && email.endsWith('@strathmore.edu');
};

// Create user profile in Firestore
const createUserProfile = async (user, additionalData = {}) => {
  if (!user) return;
  
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    const { email, displayName, photoURL } = user;
    const createdAt = serverTimestamp();
    
    try {
      await setDoc(userRef, {
        displayName: displayName || additionalData.displayName || '',
        email,
        photoURL: photoURL || '',
        createdAt,
        isActive: true,
        userType: 'student', // Default to student
        privacy: {
          shareData: false,
          allowNotifications: true
        },
        emergencyContact: additionalData.emergencyContact || {},
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }
  
  return userRef;
};

// Register with email and password
export const registerWithEmail = async (userData) => {
  const { email, password, firstName, lastName, studentId, emergencyContact } = userData;
  
  // Validate Strathmore email
  if (!isStrathmorateEmail(email)) {
    throw new Error('Please use your official @strathmore.edu email address');
  }
  
  try {
    // Create Firebase auth user
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update display name
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });
    
    // Create user profile in Firestore
    await createUserProfile(user, {
      firstName,
      lastName,
      studentId,
      displayName: `${firstName} ${lastName}`,
      emergencyContact
    });
    
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific Firebase errors with friendly messages
    switch (error.code) {
      case 'auth/email-already-in-use':
        throw new Error('This email is already registered! Try signing in instead.');
      case 'auth/weak-password':
        throw new Error('Password should be at least 6 characters long.');
      case 'auth/invalid-email':
        throw new Error('Please enter a valid email address.');
      default:
        throw new Error('Registration failed. Please try again.');
    }
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  // Validate Strathmore email
  if (!isStrathmorateEmail(email)) {
    throw new Error('Please use your official @strathmore.edu email address');
  }
  
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.error('Sign in error:', error);
    
    switch (error.code) {
      case 'auth/user-not-found':
        throw new Error('No account found with this email. Please register first!');
      case 'auth/wrong-password':
        throw new Error('Incorrect password. Please try again.');
      case 'auth/invalid-email':
        throw new Error('Please enter a valid email address.');
      case 'auth/too-many-requests':
        throw new Error('Too many failed attempts. Please try again later.');
      default:
        throw new Error('Sign in failed. Please check your credentials.');
    }
  }
};

// Sign in with Google (restricted to Strathmore domain)
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Double-check the email domain (extra security)
    if (!isStrathmorateEmail(user.email)) {
      await signOut(auth); // Sign out immediately
      throw new Error('Please use your @strathmore.edu Google account');
    }
    
    // Create user profile if it doesn't exist
    await createUserProfile(user);
    
    return user;
  } catch (error) {
    console.error('Google sign in error:', error);
    
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign in was cancelled. Please try again.');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Pop-up blocked. Please allow pop-ups and try again.');
    } else {
      throw new Error(error.message || 'Google sign in failed. Please try again.');
    }
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw new Error('Sign out failed. Please try again.');
  }
};

// Send password reset email
export const resetPassword = async (email) => {
  if (!isStrathmorateEmail(email)) {
    throw new Error('Please use your official @strathmore.edu email address');
  }
  
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Password reset error:', error);
    
    switch (error.code) {
      case 'auth/user-not-found':
        throw new Error('No account found with this email address.');
      case 'auth/invalid-email':
        throw new Error('Please enter a valid email address.');
      default:
        throw new Error('Failed to send reset email. Please try again.');
    }
  }
};

// Auth state observer
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!auth.currentUser;
};