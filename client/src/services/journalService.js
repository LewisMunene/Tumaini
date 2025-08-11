// src/services/journalService.js - Your journaling & crisis detection bestie! 📔🛡️✨
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
  setDoc,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';

import { analyzeCrisisRisk, getCrisisResources } from '../components/journal/CrisisDetection';

// Collection names based on your schema, bestie! 📊
const COLLECTIONS = {
  JOURNAL_ENTRIES: 'journalEntries',
  CRISIS_ALERTS: 'crisisAlerts',
  USERS: 'users',
  MENTOR_NOTIFICATIONS: 'mentorNotifications'
};

/**
 * Submit journal entry with crisis detection - This saves lives, bestie! 💚
 * @param {Object} journalData - Journal entry data from the component
 * @returns {Promise} - Success or error response
 */
export const submitJournalEntry = async (journalData) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user logged in - authentication required for journaling!');
    }

    // Get user's mentor/guardian info from registration
    const userProfile = await getUserProfile(currentUser.uid);
    
    // Analyze the journal entry for crisis indicators
    const crisisAnalysis = analyzeCrisisRisk(journalData.entry);
    
    // Prepare journal entry data
    const journalEntryData = {
      userId: currentUser.uid,
      userEmail: currentUser.email,
      userName: currentUser.displayName || 'Student',
      
      // Journal content
      entry: journalData.entry,
      wordCount: journalData.wordCount,
      prompt: journalData.prompt || null,
      
      // Crisis analysis results
      crisisAnalysis: {
        riskLevel: crisisAnalysis.riskLevel,
        severity: crisisAnalysis.severity,
        matchedPhrases: crisisAnalysis.matchedPhrases.map(match => ({
          phrase: match.phrase,
          category: match.category
        })), // Remove full phrase text for privacy
        alertType: crisisAnalysis.alertType,
        notifyMentors: crisisAnalysis.notifyMentors,
        totalMatches: crisisAnalysis.totalMatches
      },
      
      // Sentiment analysis (basic)
      sentiment: analyzeBasicSentiment(journalData.entry),
      
      // Metadata
      createdAt: serverTimestamp(),
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      week: getWeekNumber(new Date()),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      
      // Privacy settings
      isPrivate: true, // Always private by default
      platform: 'web'
    };

    // Save journal entry to database
    const docRef = await addDoc(collection(db, COLLECTIONS.JOURNAL_ENTRIES), journalEntryData);
    console.log('📔 Journal entry saved with ID:', docRef.id);

    // Handle crisis alerts if needed
    if (crisisAnalysis.riskLevel !== 'none' && crisisAnalysis.notifyMentors) {
      await handleJournalCrisisAlert(currentUser, journalData, crisisAnalysis, docRef.id, userProfile);
    }

    // Update user's last journal timestamp
    await updateUserLastJournal(currentUser.uid);

    return {
      success: true,
      docId: docRef.id,
      crisisAnalysis,
      message: getCrisisResponse(crisisAnalysis.riskLevel)
    };

  } catch (error) {
    console.error('Error submitting journal entry:', error);
    return {
      success: false,
      error: error.message,
      message: 'Couldn\'t save your journal right now, but your thoughts are still valid, bestie! 💜'
    };
  }
};

/**
 * Handle crisis alert for journal entries - Critical safety feature! 🚨
 * @param {Object} user - Current user object
 * @param {Object} journalData - Journal entry data
 * @param {Object} crisisAnalysis - Crisis analysis results
 * @param {string} journalId - Reference to journal entry
 * @param {Object} userProfile - User profile with mentor info
 */
const handleJournalCrisisAlert = async (user, journalData, crisisAnalysis, journalId, userProfile) => {
  try {
    const crisisAlertData = {
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName || 'Student',
      
      // Crisis details
      source: 'journal',
      riskLevel: crisisAnalysis.riskLevel,
      severity: crisisAnalysis.severity,
      alertType: crisisAnalysis.alertType,
      triggerReason: `Journal entry detected ${crisisAnalysis.riskLevel} risk language`,
      
      // Entry preview (first 100 chars for context, no sensitive phrases)
      entryPreview: journalData.entry.substring(0, 100) + (journalData.entry.length > 100 ? '...' : ''),
      matchedPhrasesCount: crisisAnalysis.totalMatches,
      
      // References
      journalEntryId: journalId,
      
      // Status tracking
      status: 'pending', // pending, acknowledged, contacted, resolved
      alertTriggeredAt: serverTimestamp(),
      
      // Mentor/Guardian information from registration
      mentorInfo: userProfile?.emergencyContact || null,
      notifyMentor: crisisAnalysis.notifyMentors,
      
      // Response timeline based on risk level
      responseRequired: getResponseTimeline(crisisAnalysis.riskLevel),
      
      // Analytics
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    };

    const alertRef = await addDoc(collection(db, COLLECTIONS.CRISIS_ALERTS), crisisAlertData);
    console.log('🚨 Crisis alert created for journal entry:', alertRef.id);

    // Notify mentors/guardians if needed and available
    if (crisisAnalysis.notifyMentors && userProfile?.emergencyContact) {
      await notifyMentorOfCrisis(user, crisisAnalysis, alertRef.id, userProfile.emergencyContact);
    }
    
  } catch (error) {
    console.error('Error creating crisis alert:', error);
    // Still log the attempt for admin review
    console.log('Crisis alert creation failed, but journal entry was saved');
  }
};

/**
 * Notify mentor/guardian of crisis - Connecting support networks! 🫂
 * @param {Object} user - Current user
 * @param {Object} crisisAnalysis - Crisis analysis
 * @param {string} alertId - Crisis alert ID
 * @param {Object} emergencyContact - Mentor/guardian info
 */
const notifyMentorOfCrisis = async (user, crisisAnalysis, alertId, emergencyContact) => {
  try {
    const notificationData = {
      studentId: user.uid,
      studentName: user.displayName || 'Student',
      studentEmail: user.email,
      
      // Mentor details
      mentorName: emergencyContact.name,
      mentorPhone: emergencyContact.phone,
      mentorRelationship: emergencyContact.relationship,
      
      // Crisis details
      riskLevel: crisisAnalysis.riskLevel,
      severity: crisisAnalysis.severity,
      alertType: crisisAnalysis.alertType,
      source: 'journal',
      
      // Notification details
      notificationSent: false, // Will be updated by notification service
      notificationMethod: 'system', // system, email, sms
      alertId: alertId,
      
      // Timestamps
      createdAt: serverTimestamp(),
      urgency: getNotificationUrgency(crisisAnalysis.riskLevel),
      
      // Response tracking
      mentorContacted: false,
      mentorResponseAt: null,
      status: 'pending'
    };

    await addDoc(collection(db, COLLECTIONS.MENTOR_NOTIFICATIONS), notificationData);
    console.log('📢 Mentor notification created for:', emergencyContact.name);
    
    // TODO: Integrate with actual notification service (email/SMS)
    // For now, this creates a record that admin dashboard can process
    
  } catch (error) {
    console.error('Error notifying mentor:', error);
  }
};

/**
 * Get user profile with mentor information
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - User profile data
 */
const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

/**
 * Basic sentiment analysis - Simple but effective! 💭
 * @param {string} text - Journal entry text
 * @returns {Object} - Sentiment analysis results
 */
const analyzeBasicSentiment = (text) => {
  const positiveWords = [
    'happy', 'joy', 'excited', 'grateful', 'blessed', 'amazing', 'wonderful', 
    'fantastic', 'great', 'good', 'love', 'peaceful', 'calm', 'confident',
    'hopeful', 'optimistic', 'proud', 'accomplished', 'success', 'achievement'
  ];
  
  const negativeWords = [
    'sad', 'angry', 'frustrated', 'disappointed', 'worried', 'anxious', 
    'stressed', 'overwhelmed', 'tired', 'exhausted', 'lonely', 'isolated',
    'hopeless', 'worthless', 'failure', 'difficult', 'struggle', 'pain'
  ];

  const words = text.toLowerCase().split(/\W+/);
  const positiveCount = words.filter(word => positiveWords.includes(word)).length;
  const negativeCount = words.filter(word => negativeWords.includes(word)).length;
  
  let sentiment = 'neutral';
  if (positiveCount > negativeCount + 1) sentiment = 'positive';
  else if (negativeCount > positiveCount + 1) sentiment = 'negative';
  
  return {
    sentiment,
    positiveWords: positiveCount,
    negativeWords: negativeCount,
    confidence: Math.abs(positiveCount - negativeCount) / Math.max(words.length, 1)
  };
};

/**
 * Get response timeline based on risk level
 * @param {string} riskLevel - Crisis risk level
 * @returns {Object} - Response timeline information
 */
const getResponseTimeline = (riskLevel) => {
  switch (riskLevel) {
    case 'critical':
      return {
        timeframe: 'immediate',
        hours: 0,
        description: 'Immediate intervention required'
      };
    case 'high':
      return {
        timeframe: '24_hours',
        hours: 24,
        description: 'Contact within 24 hours'
      };
    case 'moderate':
      return {
        timeframe: '72_hours',
        hours: 72,
        description: 'Follow up within 72 hours'
      };
    case 'low':
      return {
        timeframe: '1_week',
        hours: 168,
        description: 'Monitor and check in within a week'
      };
    default:
      return {
        timeframe: 'none',
        hours: 0,
        description: 'No immediate action required'
      };
  }
};

/**
 * Get notification urgency level
 * @param {string} riskLevel - Crisis risk level  
 * @returns {string} - Urgency level
 */
const getNotificationUrgency = (riskLevel) => {
  switch (riskLevel) {
    case 'critical': return 'immediate';
    case 'high': return 'urgent';
    case 'moderate': return 'normal';
    case 'low': return 'low';
    default: return 'none';
  }
};

/**
 * Generate response message based on crisis level
 * @param {string} riskLevel - Crisis risk level
 * @returns {string} - Appropriate response message
 */
const getCrisisResponse = (riskLevel) => {
  switch (riskLevel) {
    case 'critical':
      return 'Your journal has been saved. We\'re concerned about you and support is available immediately. You\'re not alone, bestie! 💚';
    case 'high':
      return 'Thanks for sharing your thoughts. We can see you\'re struggling and want to connect you with support soon. 🫂';
    case 'moderate':
      return 'Your journal entry has been saved. We\'re here if you need support - you matter! 💜';
    case 'low':
      return 'Journal saved! Thanks for taking time to reflect. Remember that support is always available. ✨';
    default:
      return 'Beautiful journaling, bestie! This reflection practice is so good for your wellbeing. 🌟';
  }
};

/**
 * Update user's last journal timestamp
 * @param {string} userId - User ID
 */
const updateUserLastJournal = async (userId) => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    await setDoc(userRef, {
      lastJournalAt: serverTimestamp(),
      lastJournalDate: new Date().toISOString().split('T')[0]
    }, { merge: true });
  } catch (error) {
    console.error('Error updating user last journal:', error);
  }
};

/**
 * Get week number helper function
 * @param {Date} date - Date to get week number for
 * @returns {number} - Week number
 */
const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

/**
 * Get user's recent journal entries
 * @param {string} userId - User ID
 * @param {number} limit - Number of entries to fetch
 * @returns {Promise<Array>} - Recent journal entries
 */
export const getRecentJournalEntries = async (userId, entryLimit = 10) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.JOURNAL_ENTRIES),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(entryLimit)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    return [];
  }
};

/**
 * Get journal analytics for user
 * @param {string} userId - User ID
 * @param {number} days - Days to analyze
 * @returns {Promise<Object>} - Journal analytics
 */
export const getJournalAnalytics = async (userId, days = 30) => {
  try {
    const entries = await getRecentJournalEntries(userId, 100); // Get more for analysis
    
    if (entries.length === 0) {
      return {
        totalEntries: 0,
        averageWordsPerEntry: 0,
        sentimentTrend: 'neutral',
        crisisAlertsTriggered: 0,
        message: 'Start journaling to see your reflection patterns! 📔'
      };
    }

    const recentEntries = entries.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      return entryDate >= cutoffDate;
    });

    const totalWords = recentEntries.reduce((sum, entry) => sum + (entry.wordCount || 0), 0);
    const crisisAlerts = recentEntries.filter(entry => 
      entry.crisisAnalysis && entry.crisisAnalysis.riskLevel !== 'none'
    ).length;

    const sentiments = recentEntries.map(entry => entry.sentiment?.sentiment || 'neutral');
    const positiveCount = sentiments.filter(s => s === 'positive').length;
    const negativeCount = sentiments.filter(s => s === 'negative').length;
    
    let overallSentiment = 'neutral';
    if (positiveCount > negativeCount + 1) overallSentiment = 'positive';
    else if (negativeCount > positiveCount + 1) overallSentiment = 'negative';

    return {
      totalEntries: recentEntries.length,
      averageWordsPerEntry: Math.round(totalWords / recentEntries.length),
      sentimentTrend: overallSentiment,
      crisisAlertsTriggered: crisisAlerts,
      journalingStreak: calculateJournalingStreak(entries),
      message: 'Your reflection journey is building beautiful insights! 🌟'
    };
    
  } catch (error) {
    console.error('Error getting journal analytics:', error);
    return {
      error: true,
      message: 'Couldn\'t load your journaling insights right now, but keep writing! ✨'
    };
  }
};

/**
 * Calculate journaling streak
 * @param {Array} entries - Journal entries sorted by date desc
 * @returns {number} - Current streak in days
 */
const calculateJournalingStreak = (entries) => {
  if (entries.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  
  const entriesByDate = entries.reduce((acc, entry) => {
    const date = entry.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  for (let i = 0; i < 30; i++) { // Check last 30 days max
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const dateString = checkDate.toISOString().split('T')[0];
    
    if (entriesByDate[dateString]) {
      streak++;
    } else {
      break; // Streak broken
    }
  }
  
  return streak;
};

export default {
  submitJournalEntry,
  getRecentJournalEntries,
  getJournalAnalytics
};