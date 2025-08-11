// src/components/journal/SmartJournal.jsx - Your safe journaling bestie! 📔✨
import React, { useState, useEffect } from 'react';

const SmartJournal = ({ onJournalSave, isSubmitting }) => {
  const [journalEntry, setJournalEntry] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [showPrompts, setShowPrompts] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [lastSavedEntry, setLastSavedEntry] = useState('');

  const journalPrompts = [
    "How are you feeling right now, and what's contributing to that mood? 💭",
    "What's one thing that challenged you today, and how did you handle it? 🌱",
    "Describe a moment from today that made you smile or feel grateful 😊",
    "What thoughts have been on repeat in your mind lately? 🔄",
    "If you could tell your past self something, what would it be? 💌",
    "What's taking up the most mental space for you right now? 🧠",
    "How has your energy level been, and what might be affecting it? ⚡",
    "What's one thing you're looking forward to? ✨",
    "Describe how you're feeling about your academic journey lately 📚",
    "What would make tomorrow feel a little easier for you? 🌅"
  ];

  const [currentPrompt, setCurrentPrompt] = useState(journalPrompts[0]);

  // Simple crisis detection for now - we'll integrate the full system later
  const detectCrisisLevel = (text) => {
    const criticalPhrases = [
      "can't do this anymore", "want to die", "end it all", "kill myself", 
      "everyone would be better without me", "want to hurt myself", "planning to"
    ];
    
    const highRiskPhrases = [
      "feel like giving up", "can't see a way out", "completely broken",
      "can't handle this", "lost all hope", "drowning in sadness"
    ];
    
    const moderateRiskPhrases = [
      "feeling stressed", "overwhelmed", "struggling", "exhausted",
      "can't cope", "falling behind", "anxious", "worried"
    ];

    const lowText = text.toLowerCase();
    
    if (criticalPhrases.some(phrase => lowText.includes(phrase))) {
      return { level: 'critical', severity: 10, message: "We're really concerned about you, bestie. Please reach out for immediate support - you're not alone in this. 💚" };
    }
    
    if (highRiskPhrases.some(phrase => lowText.includes(phrase))) {
      return { level: 'high', severity: 8, message: "We can see you're going through a really tough time. Let's get you some support soon. Your wellbeing matters. 🫂" };
    }
    
    if (moderateRiskPhrases.some(phrase => lowText.includes(phrase))) {
      return { level: 'moderate', severity: 6, message: "It sounds like you're dealing with some challenges. We're here for you and want to check in. 💜" };
    }
    
    return { level: 'none', severity: 0, message: "Thanks for journaling! This is such a healthy practice for your wellbeing. 🌟" };
  };

  useEffect(() => {
    const words = journalEntry.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);

    // Analyze for crisis indicators as user types (but only if substantial content)
    if (journalEntry.length > 50) {
      const riskAnalysis = detectCrisisLevel(journalEntry);
      setAnalysis(riskAnalysis);
    } else {
      setAnalysis(null);
    }
  }, [journalEntry]);

  const handleSave = () => {
    const finalAnalysis = detectCrisisLevel(journalEntry);
    
    const journalData = {
      entry: journalEntry,
      wordCount,
      crisisAnalysis: finalAnalysis,
      timestamp: new Date(),
      prompt: showPrompts ? currentPrompt : null
    };

    // Store the entry we're about to save for success message
    setLastSavedEntry(journalEntry.substring(0, 80) + (journalEntry.length > 80 ? '...' : ''));
    
    // Call the parent save function
    onJournalSave(journalData);
    
    // Show success feedback immediately
    setShowSuccessMessage(true);
    
    // Clear the journal after a brief moment
    setTimeout(() => {
      setJournalEntry('');
      setAnalysis(null);
      setShowAnalysis(false);
      setWordCount(0);
    }, 1500);
    
    // Hide success message after showing it
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 4000);
  };

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * journalPrompts.length);
    setCurrentPrompt(journalPrompts[randomIndex]);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return 'border-red-400 bg-red-50';
      case 'high': return 'border-orange-400 bg-orange-50';
      case 'moderate': return 'border-yellow-400 bg-yellow-50';
      case 'low': return 'border-blue-400 bg-blue-50';
      default: return 'border-gray-200 bg-white';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'moderate': return '🟡';
      case 'low': return '🟢';
      default: return '💜';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Your Safe Space Journal 📔✨
        </h2>
        <p className="text-gray-600 mb-4">
          This is your completely private space to process thoughts and feelings. We're here to support you, bestie! 💜
        </p>
        
        {/* Toggle for prompts */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showPrompts}
              onChange={(e) => setShowPrompts(e.target.checked)}
              className="mr-2 rounded"
            />
            <span className="text-sm text-gray-700">Show writing prompts</span>
          </label>
          {showPrompts && (
            <button
              onClick={getRandomPrompt}
              className="text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded-full transition-colors"
            >
              New prompt ✨
            </button>
          )}
        </div>
      </div>

      {/* Success Message - The dopamine hit we ALL need! */}
      {showSuccessMessage && (
        <div className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-2xl p-6 animate-pulse">
          <div className="flex items-start space-x-3">
            <span className="text-3xl">🎉</span>
            <div>
              <h4 className="font-bold text-green-800 text-lg mb-2">Your thoughts have been saved, bestie! ✨</h4>
              <p className="text-green-700 mb-3">
                "{lastSavedEntry}" has been safely stored. Your reflection journey continues! 💚
              </p>
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <span>📔 Saved to your private journal</span>
                <span>•</span>
                <span>🛡️ Privacy protected</span>
                <span>•</span>
                <span>💪 You're crushing this wellness thing!</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Writing Prompt */}
      {showPrompts && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">💭</span>
            <div>
              <h4 className="font-semibold text-purple-800 mb-1">Writing Prompt</h4>
              <p className="text-purple-700">{currentPrompt}</p>
              <p className="text-xs text-purple-600 mt-2">Feel free to ignore this and write about whatever's on your mind! 💫</p>
            </div>
          </div>
        </div>
      )}

      {/* Journal Writing Area */}
      <div className="mb-6">
        <div className={`border-2 rounded-2xl transition-all duration-300 ${
          analysis ? getRiskColor(analysis.level) : 'border-gray-200'
        }`}>
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Start writing... Your thoughts and feelings are safe here. There's no wrong way to journal, bestie! ✨"
            className="w-full p-6 rounded-2xl resize-none focus:outline-none bg-transparent"
            rows="12"
            style={{ minHeight: '300px' }}
          />
        </div>
        
        {/* Word count and analysis indicator */}
        <div className="flex justify-between items-center mt-3 px-2">
          <div className="text-sm text-gray-500">
            {wordCount} {wordCount === 1 ? 'word' : 'words'} • Keep going, you're doing amazing! 💪
          </div>
          {analysis && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {getRiskIcon(analysis.level)} Support level detected
              </span>
              <button
                onClick={() => setShowAnalysis(!showAnalysis)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
              >
                {showAnalysis ? 'Hide' : 'Show'} details
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Crisis Analysis Display */}
      {analysis && showAnalysis && analysis.level !== 'none' && (
        <div className={`border-2 rounded-2xl p-6 mb-6 ${getRiskColor(analysis.level)}`}>
          <div className="flex items-start space-x-3 mb-4">
            <span className="text-3xl">{getRiskIcon(analysis.level)}</span>
            <div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">
                We hear you, bestie 💚
              </h4>
              <p className="text-gray-700 mb-4">{analysis.message}</p>
              
              {analysis.level === 'critical' && (
                <div className="bg-red-100 border border-red-300 rounded-xl p-4 mb-4">
                  <h5 className="font-bold text-red-800 mb-2">🆘 Immediate Support Available</h5>
                  <p className="text-red-700 text-sm mb-3">
                    Your safety matters most. Please reach out for support right now - you don't have to face this alone.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                      🆘 Call Crisis Line: 1199
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                      📞 Call Emergency: 999
                    </button>
                  </div>
                </div>
              )}

              {analysis.level === 'high' && (
                <div className="bg-orange-100 border border-orange-300 rounded-xl p-4 mb-4">
                  <h5 className="font-bold text-orange-800 mb-2">🫂 Support Resources</h5>
                  <p className="text-orange-700 text-sm mb-3">
                    We can see you're struggling. Let's get you connected with support within 24 hours.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                      📞 Call Counseling Center
                    </button>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                      💜 Contact Mentor
                    </button>
                  </div>
                </div>
              )}

              {analysis.level === 'moderate' && (
                <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 mb-4">
                  <h5 className="font-bold text-yellow-800 mb-2">💛 Check-in Support</h5>
                  <p className="text-yellow-700 text-sm mb-3">
                    It sounds like you're dealing with some challenges. We'd love to check in with you soon.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                      📅 Schedule Check-in
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                      🌟 Self-Care Resources
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Encouragement for healthy entries */}
      {analysis && analysis.level === 'none' && journalEntry.length > 100 && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🌟</span>
            <div>
              <h4 className="font-semibold text-green-800 mb-1">Beautiful reflection, bestie!</h4>
              <p className="text-green-700 text-sm">
                Journaling is such a powerful practice for mental wellness. Keep nurturing this healthy habit! 💚
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Your journal entries are private and secure 🔒
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setJournalEntry('');
              setAnalysis(null);
              setShowAnalysis(false);
              setWordCount(0);
              setShowSuccessMessage(false);
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors font-medium"
            disabled={!journalEntry.trim()}
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            disabled={!journalEntry.trim() || isSubmitting}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              journalEntry.trim() && !isSubmitting
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Saving your thoughts... ✨' : 'Save Journal Entry 💜'}
          </button>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <span className="text-blue-600 text-lg">🛡️</span>
          <div>
            <h5 className="font-semibold text-blue-800 mb-1">Your Privacy & Safety</h5>
            <p className="text-blue-700 text-sm">
              Your journal entries are private. If our system detects concerning language, we may reach out to provide support or connect you with your chosen mentor/guardian. This is because we care about your wellbeing, bestie! 💙
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartJournal;