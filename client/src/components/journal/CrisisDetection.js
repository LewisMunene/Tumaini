// src/components/journal/CrisisDetection.js - Your safety net bestie! 🛡️✨

/**
 * Crisis Detection Phrases Database
 * This is literally life-saving technology disguised as a simple JS object, no cap! 💚
 */

export const CRISIS_PHRASES = {
  // 🚨 CRITICAL RISK - Immediate intervention needed
  CRITICAL: {
    level: 'critical',
    severity: 10,
    alertType: 'immediate',
    notifyMentors: true,
    phrases: [
      // Suicidal ideation - these need IMMEDIATE attention bestie!
      "i can't do this anymore",
      "i want to end it all",
      "i want to kill myself",
      "i want to die",
      "everyone would be better without me",
      "i'm going to hurt myself",
      "i have a plan to",
      "nobody would miss me",
      "i'm done with life",
      "life isn't worth living",
      "i'm planning to",
      "i'm going to end this",
      "better off dead",
      "no point in living",
      "ready to give up",
      "can't take it anymore",
      "want to disappear forever",
      "thinking about suicide",
      "ending my life",
      "harm myself",
      
      // Self-harm indicators
      "cutting myself",
      "hurting myself",
      "self harm",
      "want to cut",
      "razor blade",
      "bleeding out",
      "punching myself",
      
      // Crisis escalation phrases
      "final goodbye",
      "last time writing",
      "won't be here tomorrow",
      "saying goodbye",
      "this is the end"
    ]
  },

  // ⚠️ HIGH RISK - Urgent support needed within 24 hours
  HIGH: {
    level: 'high',
    severity: 8,
    alertType: 'urgent',
    notifyMentors: true,
    phrases: [
      // Severe depression indicators
      "feel like giving up",
      "can't see a way out",
      "everything is hopeless",
      "no reason to continue",
      "completely broken",
      "can't handle this",
      "drowning in sadness",
      "empty inside",
      "numb to everything",
      "lost all hope",
      "can't breathe",
      "suffocating",
      "trapped with no escape",
      "pointless existence",
      "completely alone",
      "nobody cares about me",
      "worthless piece of",
      "hate myself so much",
      "disgusted with myself",
      "failure at everything",
      
      // Severe anxiety/panic
      "having panic attacks",
      "can't stop shaking",
      "heart won't stop racing",
      "can't catch my breath",
      "feeling like i'm dying",
      "losing my mind",
      "going crazy",
      "losing control",
      
      // Academic crisis
      "going to fail everything",
      "disappointed everyone",
      "ruined my future",
      "can't face my parents",
      "academic failure",
      "dropping out",
      "giving up on school"
    ]
  },

  // 🟡 MODERATE RISK - Check in within 48-72 hours
  MODERATE: {
    level: 'moderate',
    severity: 6,
    alertType: 'followup',
    notifyMentors: true,
    phrases: [
      // Stress and overwhelm
      "feeling stressed",
      "overwhelmed with everything",
      "too much pressure",
      "can't cope",
      "struggling so much",
      "barely hanging on",
      "exhausted mentally",
      "emotionally drained",
      "burnt out",
      "can't keep up",
      "falling behind",
      "losing motivation",
      "don't know what to do",
      "confused about everything",
      "questioning everything",
      
      // Depression symptoms
      "feeling really low",
      "sad all the time",
      "crying every day",
      "no energy for anything",
      "sleeping all day",
      "can't get out of bed",
      "avoiding everyone",
      "isolating myself",
      "don't want to see anyone",
      "pushing people away",
      "feeling disconnected",
      "nothing makes me happy",
      "lost interest in",
      
      // Anxiety symptoms
      "anxiety is bad",
      "constantly worried",
      "can't stop overthinking",
      "nervous about everything",
      "scared of failing",
      "imposter syndrome",
      "not good enough",
      "everyone is judging me",
      "afraid to speak up",
      
      // Academic stress
      "hate this course",
      "wrong career choice",
      "can't understand anything",
      "failing my classes",
      "disappointed my family",
      "wasting my time",
      "not smart enough",
      "everyone is better than me"
    ]
  },

  // 🟢 LOW RISK - Monitor and provide resources
  LOW: {
    level: 'low',
    severity: 3,
    alertType: 'monitor',
    notifyMentors: false,
    phrases: [
      // General sadness
      "feeling a bit sad",
      "having a rough day",
      "not in a good mood",
      "feeling down today",
      "bit emotional",
      "having a hard time",
      "feeling blue",
      "under the weather",
      "not feeling great",
      
      // Mild stress
      "bit stressed about",
      "worried about exams",
      "nervous about presentation",
      "anxious about assignment",
      "concerned about grades",
      "pressure from family",
      "tight deadline",
      "busy schedule",
      
      // Relationship issues
      "friend drama",
      "relationship problems",
      "feeling lonely",
      "missing home",
      "homesick",
      "relationship stress",
      "friendship issues",
      "family problems",
      
      // General life stress
      "challenging week",
      "difficult time",
      "going through a lot",
      "need some support",
      "could use a friend",
      "feeling uncertain",
      "confused about life",
      "questioning my choices"
    ]
  }
};

/**
 * Analyze journal entry for crisis indicators
 * This function is literally a life-saver, bestie! 💚
 * @param {string} journalText - The journal entry to analyze
 * @returns {Object} - Crisis analysis results
 */
export const analyzeCrisisRisk = (journalText) => {
  if (!journalText || typeof journalText !== 'string') {
    return {
      riskLevel: 'none',
      severity: 0,
      matchedPhrases: [],
      alertType: 'none',
      notifyMentors: false,
      message: 'No content to analyze'
    };
  }

  const text = journalText.toLowerCase().trim();
  const results = {
    critical: [],
    high: [],
    moderate: [],
    low: []
  };

  // Check for phrases in each risk category
  Object.entries(CRISIS_PHRASES).forEach(([category, data]) => {
    data.phrases.forEach(phrase => {
      if (text.includes(phrase.toLowerCase())) {
        results[data.level].push({
          phrase,
          category: data.level,
          severity: data.severity
        });
      }
    });
  });

  // Determine highest risk level found
  let highestRisk = null;
  if (results.critical.length > 0) {
    highestRisk = CRISIS_PHRASES.CRITICAL;
  } else if (results.high.length > 0) {
    highestRisk = CRISIS_PHRASES.HIGH;
  } else if (results.moderate.length > 0) {
    highestRisk = CRISIS_PHRASES.MODERATE;
  } else if (results.low.length > 0) {
    highestRisk = CRISIS_PHRASES.LOW;
  }

  // Compile all matched phrases
  const allMatches = [
    ...results.critical,
    ...results.high,
    ...results.moderate,
    ...results.low
  ];

  return {
    riskLevel: highestRisk?.level || 'none',
    severity: highestRisk?.severity || 0,
    matchedPhrases: allMatches,
    alertType: highestRisk?.alertType || 'none',
    notifyMentors: highestRisk?.notifyMentors || false,
    criticalPhrases: results.critical.length,
    highPhrases: results.high.length,
    moderatePhrases: results.moderate.length,
    lowPhrases: results.low.length,
    totalMatches: allMatches.length,
    message: generateRiskMessage(highestRisk?.level, allMatches.length)
  };
};

/**
 * Generate appropriate message based on risk level
 * @param {string} riskLevel - The detected risk level
 * @param {number} matchCount - Number of matched phrases
 * @returns {string} - Appropriate message for the user
 */
const generateRiskMessage = (riskLevel, matchCount) => {
  switch (riskLevel) {
    case 'critical':
      return 'We\'re really concerned about you, bestie. Please reach out for immediate support - you\'re not alone in this. 💚';
    case 'high':
      return 'We can see you\'re going through a really tough time. Let\'s get you some support soon. Your wellbeing matters. 🫂';
    case 'moderate':
      return 'It sounds like you\'re dealing with some challenges. We\'re here for you and want to check in. 💜';
    case 'low':
      return 'Thanks for sharing what\'s on your mind. Remember that support is always available if you need it. ✨';
    default:
      return 'Thanks for journaling! This is such a healthy practice for your wellbeing. 🌟';
  }
};

/**
 * Get crisis intervention resources based on risk level
 * @param {string} riskLevel - The detected risk level
 * @returns {Object} - Relevant resources and next steps
 */
export const getCrisisResources = (riskLevel) => {
  const baseResources = {
    university: {
      name: 'Strathmore University Counseling Center',
      phone: '+254-703-034000',
      email: 'counseling@strathmore.edu',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    national: {
      name: 'Kenya Mental Health Crisis Line',
      phone: '1199',
      description: '24/7 Crisis support line - free from any network'
    }
  };

  switch (riskLevel) {
    case 'critical':
      return {
        urgency: 'immediate',
        timeline: 'Contact support right now',
        resources: [
          {
            type: 'emergency',
            name: 'Emergency Services',
            phone: '999',
            description: 'For immediate life-threatening situations',
            priority: 1
          },
          baseResources.national,
          baseResources.university,
          {
            type: 'text',
            name: 'Crisis Text Line Kenya',
            contact: 'Text HELLO to 741741',
            description: '24/7 text support'
          }
        ],
        actions: [
          'Contact emergency services if in immediate danger',
          'Reach out to a trusted friend or family member',
          'Go to the nearest hospital emergency room',
          'Call university counseling center immediately'
        ]
      };

    case 'high':
      return {
        urgency: 'within 24 hours',
        timeline: 'Please reach out for support today',
        resources: [
          baseResources.university,
          baseResources.national,
          {
            type: 'peer',
            name: 'Student Peer Support',
            contact: 'Available through Student Affairs',
            description: 'Talk to trained student peers'
          }
        ],
        actions: [
          'Schedule appointment with university counselor',
          'Talk to a trusted friend, family member, or mentor',
          'Contact your emergency contact person',
          'Consider joining a support group'
        ]
      };

    case 'moderate':
      return {
        urgency: 'within 48-72 hours',
        timeline: 'Let\'s check in with you soon',
        resources: [
          baseResources.university,
          {
            type: 'self-help',
            name: 'Self-Care Resources',
            description: 'Guided meditation, breathing exercises, wellness tips'
          },
          {
            type: 'academic',
            name: 'Academic Support Services',
            description: 'Study skills, time management, academic planning'
          }
        ],
        actions: [
          'Consider talking to a counselor or trusted adult',
          'Practice stress management techniques',
          'Reach out to friends for social support',
          'Explore campus wellness resources'
        ]
      };

    case 'low':
      return {
        urgency: 'ongoing monitoring',
        timeline: 'Continue healthy practices',
        resources: [
          {
            type: 'wellness',
            name: 'Campus Wellness Programs',
            description: 'Fitness classes, mindfulness sessions, workshops'
          },
          {
            type: 'academic',
            name: 'Study Groups & Tutoring',
            description: 'Peer learning and academic support'
          }
        ],
        actions: [
          'Continue journaling and self-reflection',
          'Maintain social connections',
          'Practice self-care routines',
          'Stay aware of available support resources'
        ]
      };

    default:
      return {
        urgency: 'none',
        timeline: 'Keep up the great work!',
        resources: [
          {
            type: 'preventive',
            name: 'Wellness Maintenance',
            description: 'Keep building healthy habits and resilience'
          }
        ],
        actions: [
          'Continue regular self-reflection',
          'Maintain healthy relationships',
          'Keep practicing stress management',
          'Stay connected with support systems'
        ]
      };
  }
};

export default {
  CRISIS_PHRASES,
  analyzeCrisisRisk,
  getCrisisResources
};