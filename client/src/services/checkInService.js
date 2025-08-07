// src/services/checkInService.js - Your Firebase check-in bestie! 🔥✨
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  serverTimestamp,
  doc,
  setDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';

// Collection names based on your schema, bestie! 📊
const COLLECTIONS = {
  USERS: 'users',
  STRESS_TRACKING: 'stressTracking',
  CRISIS_ALERTS: 'crisisAlerts',
  INTERVENTIONS: 'interventions'
};

/**
 * Submit daily check-in data to Firebase - This is where the magic happens! ✨
 * @param {Object} checkInData - All the wellness data from our components
 * @returns {Promise} - Success or error, no lies here bestie!
 */
export const submitDailyCheckIn = async (checkInData) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user logged in - bestie needs to be authenticated!');
    }

    // Prepare the data with proper structure (following your schema!)
    const stressTrackingData = {
      userId: currentUser.uid,
      userEmail: currentUser.email,
      
      // Core wellness metrics
      mood: checkInData.mood || null,
      sleepQuality: checkInData.sleepQuality || null,
      stressLevel: checkInData.stressLevel || null,
      academicConfidence: checkInData.academicConfidence || null,
      energyLevel: checkInData.energyLevel || null,
      
      // Gratitude and reflection
      gratitude: checkInData.gratitude || '',
      
      // Metadata for tracking
      createdAt: serverTimestamp(),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      timestamp: Date.now(),
      
      // Weekly/Monthly tracking helpers
      week: getWeekNumber(new Date()),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      
      // Analytics helpers
      overallWellnessScore: calculateWellnessScore(checkInData),
      tags: generateTags(checkInData),
      
      // Device/platform tracking
      platform: 'web',
      userAgent: navigator.userAgent.substring(0, 100) // Keep it short
    };

    // Store in StressTracking collection
    const docRef = await addDoc(collection(db, COLLECTIONS.STRESS_TRACKING), stressTrackingData);
    console.log('🎉 Check-in saved with ID:', docRef.id);

    // Check if we need to trigger crisis alerts (stress >= 8)
    if (checkInData.stressLevel >= 8) {
      await handleCrisisAlert(currentUser, checkInData, docRef.id);
    }

    // Update user's last check-in timestamp
    await updateUserLastCheckIn(currentUser.uid);

    // Store locally for offline access (PWA vibes!)
    localStorage.setItem(`lastCheckIn_${currentUser.uid}`, new Date().toDateString());

    return {
      success: true,
      docId: docRef.id,
      message: 'Check-in submitted successfully! You\'re crushing this wellness journey! 💚'
    };

  } catch (error) {
    console.error('Error submitting check-in:', error);
    return {
      success: false,
      error: error.message,
      message: 'Oops! Something went wrong. But your feelings are still valid, bestie! 💜'
    };
  }
};

/**
 * Check if user has already checked in today - No double check-ins, bestie!
 * @param {string} userId - User ID to check
 * @returns {Promise<boolean>} - True if already checked in today
 */
export const hasCheckedInToday = async (userId) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const q = query(
      collection(db, COLLECTIONS.STRESS_TRACKING),
      where('userId', '==', userId),
      where('date', '==', today),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
    
  } catch (error) {
    console.error('Error checking daily check-in status:', error);
    // Fallback to localStorage check
    const lastCheckIn = localStorage.getItem(`lastCheckIn_${userId}`);
    return lastCheckIn === new Date().toDateString();
  }
};

/**
 * Get user's recent check-ins for analytics - Data that actually helps! 📊
 * @param {string} userId - User ID
 * @param {number} days - Number of days to look back (default 7)
 * @returns {Promise<Array>} - Array of recent check-ins
 */
export const getRecentCheckIns = async (userId, days = 7) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const q = query(
      collection(db, COLLECTIONS.STRESS_TRACKING),
      where('userId', '==', userId),
      where('timestamp', '>=', startDate.getTime()),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
  } catch (error) {
    console.error('Error fetching recent check-ins:', error);
    return [];
  }
};

/**
 * Handle crisis alert when stress levels are high - We got you, bestie! 🆘
 * @param {Object} user - Current user object
 * @param {Object} checkInData - Check-in data
 * @param {string} checkInId - Reference to the check-in document
 */
const handleCrisisAlert = async (user, checkInData, checkInId) => {
  try {
    const crisisAlertData = {
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName || 'Student',
      
      // Crisis details
      stressLevel: checkInData.stressLevel,
      mood: checkInData.mood,
      triggerReason: 'High stress level detected',
      severity: checkInData.stressLevel >= 9 ? 'critical' : 'high',
      
      // Reference to the check-in
      checkInId: checkInId,
      
      // Status tracking
      status: 'pending', // pending, acknowledged, resolved
      alertTriggeredAt: serverTimestamp(),
      
      // Contact info (if available from user profile)
      emergencyContact: null, // TODO: Get from user profile
      
      // Analytics
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    };

    await addDoc(collection(db, COLLECTIONS.CRISIS_ALERTS), crisisAlertData);
    console.log('🚨 Crisis alert created for high stress level');
    
  } catch (error) {
    console.error('Error creating crisis alert:', error);
  }
};

/**
 * Update user's last check-in timestamp
 * @param {string} userId - User ID
 */
const updateUserLastCheckIn = async (userId) => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    await setDoc(userRef, {
      lastCheckInAt: serverTimestamp(),
      lastCheckInDate: new Date().toISOString().split('T')[0]
    }, { merge: true });
    
  } catch (error) {
    console.error('Error updating user last check-in:', error);
  }
};

/**
 * Calculate overall wellness score - Math but make it wellness! 📊
 * @param {Object} checkInData - Check-in data
 * @returns {number} - Wellness score 0-100
 */
const calculateWellnessScore = (checkInData) => {
  const {
    mood = 5,
    sleepQuality = 5,
    stressLevel = 5,
    academicConfidence = 5,
    energyLevel = 5
  } = checkInData;

  // Higher scores are better for everything except stress (invert stress)
  const invertedStress = 11 - stressLevel;
  
  const totalScore = mood + sleepQuality + invertedStress + academicConfidence + energyLevel;
  const maxPossibleScore = 50; // 10 * 5 metrics
  
  return Math.round((totalScore / maxPossibleScore) * 100);
};

/**
 * Generate tags for better analytics and search - Organization queen! 🏷️
 * @param {Object} checkInData - Check-in data
 * @returns {Array} - Array of tags
 */
const generateTags = (checkInData) => {
  const tags = [];
  
  // Mood tags
  if (checkInData.mood <= 3) tags.push('low-mood');
  else if (checkInData.mood >= 8) tags.push('high-mood');
  
  // Stress tags
  if (checkInData.stressLevel >= 8) tags.push('high-stress', 'crisis-risk');
  else if (checkInData.stressLevel <= 3) tags.push('low-stress');
  
  // Sleep tags
  if (checkInData.sleepQuality <= 4) tags.push('poor-sleep');
  else if (checkInData.sleepQuality >= 8) tags.push('excellent-sleep');
  
  // Academic tags
  if (checkInData.academicConfidence <= 4) tags.push('academic-struggle');
  else if (checkInData.academicConfidence >= 8) tags.push('academic-confidence');
  
  // Energy tags
  if (checkInData.energyLevel <= 4) tags.push('low-energy');
  else if (checkInData.energyLevel >= 8) tags.push('high-energy');
  
  // Gratitude tag
  if (checkInData.gratitude && checkInData.gratitude.length > 10) {
    tags.push('gratitude-practice');
  }
  
  return tags;
};

/**
 * Get week number of the year - For weekly analytics!
 * @param {Date} date - Date to get week number for
 * @returns {number} - Week number (1-52)
 */
const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

/**
 * Get user's wellness statistics - Analytics that actually help! 📈
 * @param {string} userId - User ID
 * @param {number} days - Number of days to analyze (default 30)
 * @returns {Promise<Object>} - Wellness statistics
 */
export const getUserWellnessStats = async (userId, days = 30) => {
  try {
    const checkIns = await getRecentCheckIns(userId, days);
    
    if (checkIns.length === 0) {
      return {
        totalCheckIns: 0,
        averageWellnessScore: 0,
        averageMood: 0,
        averageStress: 0,
        averageSleep: 0,
        message: 'Start checking in to see your wellness patterns, bestie! ✨'
      };
    }
    
    const totals = checkIns.reduce((acc, checkIn) => {
      acc.mood += checkIn.mood || 0;
      acc.stress += checkIn.stressLevel || 0;
      acc.sleep += checkIn.sleepQuality || 0;
      acc.wellness += checkIn.overallWellnessScore || 0;
      return acc;
    }, { mood: 0, stress: 0, sleep: 0, wellness: 0 });
    
    return {
      totalCheckIns: checkIns.length,
      averageWellnessScore: Math.round(totals.wellness / checkIns.length),
      averageMood: Math.round((totals.mood / checkIns.length) * 10) / 10,
      averageStress: Math.round((totals.stress / checkIns.length) * 10) / 10,
      averageSleep: Math.round((totals.sleep / checkIns.length) * 10) / 10,
      checkInStreak: calculateStreak(checkIns),
      message: 'Your wellness data is looking good, bestie! Keep it up! 💚'
    };
    
  } catch (error) {
    console.error('Error getting wellness stats:', error);
    return {
      error: true,
      message: 'Couldn\'t load your stats right now, but you\'re still amazing! ✨'
    };
  }
};

/**
 * Calculate check-in streak - Consistency is key! 🔥
 * @param {Array} checkIns - Array of check-ins (should be sorted by date desc)
 * @returns {number} - Current streak in days
 */
const calculateStreak = (checkIns) => {
  if (checkIns.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  
  // Sort by date to ensure proper order
  const sortedCheckIns = checkIns.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  for (let i = 0; i < sortedCheckIns.length; i++) {
    const checkInDate = new Date(sortedCheckIns[i].date);
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);
    
    // Check if check-in is from expected date
    if (checkInDate.toDateString() === expectedDate.toDateString()) {
      streak++;
    } else {
      break; // Streak broken
    }
  }
  
  return streak;
};

export default {
  submitDailyCheckIn,
  hasCheckedInToday,
  getRecentCheckIns,
  getUserWellnessStats
};