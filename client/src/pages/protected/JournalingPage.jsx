// src/pages/protected/JournalingPage.jsx - Your safe space bestie! 📔💚✨
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SmartJournal from '../../components/journal/SmartJournal';
import { submitJournalEntry, getRecentJournalEntries, getJournalAnalytics } from '../../services/journalService';

const JournalingPage = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentEntries, setRecentEntries] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [showRecent, setShowRecent] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user's journal data on page load
  useEffect(() => {
    const loadJournalData = async () => {
      if (currentUser) {
        try {
          setLoading(true);
          
          // Load recent entries and analytics
          const [entries, stats] = await Promise.all([
            getRecentJournalEntries(currentUser.uid, 5),
            getJournalAnalytics(currentUser.uid, 30)
          ]);
          
          setRecentEntries(entries);
          setAnalytics(stats);
        } catch (error) {
          console.error('Error loading journal data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadJournalData();
  }, [currentUser]);
  
  const handleNavigateHome = () => {
    // For now, just go back in history or reload to home
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/home';
    }
  };

  const handleJournalSave = async (journalData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Saving journal entry with crisis detection:', journalData);
      
      const result = await submitJournalEntry(journalData);
      
      if (result.success) {
        // Show success message based on crisis level
        const successMessage = getSuccessMessage(result.crisisAnalysis?.riskLevel);
        alert(successMessage);
        
        // Reload recent entries to show the new one
        const updatedEntries = await getRecentJournalEntries(currentUser.uid, 5);
        setRecentEntries(updatedEntries);
        
        // Update analytics
        const updatedAnalytics = await getJournalAnalytics(currentUser.uid, 30);
        setAnalytics(updatedAnalytics);
        
        console.log('✨ Journal saved successfully with crisis analysis:', result);
      } else {
        alert(result.message || 'Couldn\'t save your journal right now, but your thoughts are still valid, bestie! 💜');
      }
      
    } catch (error) {
      console.error('Error saving journal:', error);
      alert('Something went wrong, but your feelings are still completely valid! Try again? ✨');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSuccessMessage = (riskLevel) => {
    switch (riskLevel) {
      case 'critical':
        return '💚 Your journal has been saved. We\'re here for you - support is available right now. You\'re not alone, bestie!';
      case 'high':
        return '🫂 Thanks for sharing your thoughts. We can see you\'re struggling and want to connect you with support soon.';
      case 'moderate':
        return '💜 Your reflection has been saved. We\'re here if you need support - you matter!';
      case 'low':
        return '✨ Journal saved! Thanks for taking time to reflect. Support is always available.';
      default:
        return '🌟 Beautiful journaling, bestie! This reflection practice is so good for your wellbeing.';
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'moderate': return '🟡';
      case 'low': return '🟢';
      default: return '💚';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📔</div>
          <p className="text-xl text-gray-600">Loading your journal space...</p>
          <p className="text-sm text-gray-500 mt-2">Getting your safe space ready, bestie! ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => onNavigate && onNavigate('/home')}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors group"
            >
              <span className="text-2xl mr-2 group-hover:translate-x-[-2px] transition-transform">←</span>
              <span>Back to home</span>
            </button>
            
            <div className="text-right">
              <p className="text-sm text-gray-500">Digital Wellness</p>
              <p className="text-lg font-semibold text-gray-800">Your Safe Space</p>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Hey fam! 👋✨ Ready to reflect?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This is your completely private space to process thoughts, feelings, and experiences. 
              We're all about that intersectional, supportive vibe here! 🌈 No judgment, just pure solidarity.
            </p>
          </div>

          {/* Quick PSA */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-2xl p-6 max-w-4xl mx-auto mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Quick PSA that's low-key important: 💅</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🧠</span>
                <span className="text-gray-700">Mental health is REAL health</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">💖</span>
                <span className="text-gray-700">Your feelings matter, periodt</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">🤘</span>
                <span className="text-gray-700">You're crushing it by being here</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Journal Writing Area - Main Content */}
          <div className="lg:col-span-3">
            <SmartJournal 
              onJournalSave={handleJournalSave}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Sidebar - Analytics & Recent Entries */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Journal Stats */}
            {analytics && (
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Your Reflection Journey
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Entries this month</span>
                      <span className="font-bold text-gray-800">{analytics.totalEntries}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full"
                        style={{width: `${Math.min((analytics.totalEntries / 30) * 100, 100)}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Journaling streak</span>
                    <span className="font-bold text-gray-800">{analytics.journalingStreak || 0} days 🔥</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg words per entry</span>
                    <span className="font-bold text-gray-800">{analytics.averageWordsPerEntry || 0}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Overall vibe</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      analytics.sentimentTrend === 'positive' ? 'bg-green-100 text-green-800' :
                      analytics.sentimentTrend === 'negative' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {analytics.sentimentTrend === 'positive' ? '😊 Positive' :
                       analytics.sentimentTrend === 'negative' ? '😔 Reflective' :
                       '😌 Balanced'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-purple-50 rounded-xl">
                  <p className="text-xs text-purple-700 text-center">
                    {analytics.message}
                  </p>
                </div>
              </div>
            )}

            {/* Recent Entries Toggle */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="mr-2">📝</span>
                  Recent Reflections
                </h3>
                <button
                  onClick={() => setShowRecent(!showRecent)}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  {showRecent ? 'Hide' : 'Show'}
                </button>
              </div>

              {showRecent && (
                <div className="space-y-3">
                  {recentEntries.length === 0 ? (
                    <div className="text-center py-6">
                      <div className="text-4xl mb-2">🌱</div>
                      <p className="text-gray-600 text-sm">Your journaling journey starts here!</p>
                      <p className="text-gray-500 text-xs mt-1">Write your first entry to see it appear here ✨</p>
                    </div>
                  ) : (
                    recentEntries.map((entry, index) => (
                      <div key={entry.id} className="border border-gray-200 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">{formatDate(entry.timestamp)}</span>
                          {entry.crisisAnalysis?.riskLevel !== 'none' && (
                            <span className={`text-xs px-2 py-1 rounded-full ${getRiskLevelColor(entry.crisisAnalysis.riskLevel)}`}>
                              {getRiskIcon(entry.crisisAnalysis.riskLevel)} {entry.crisisAnalysis.riskLevel}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {entry.entry.substring(0, 80)}
                          {entry.entry.length > 80 ? '...' : ''}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{entry.wordCount} words</span>
                          {entry.sentiment?.sentiment && (
                            <span className="text-xs text-gray-500">
                              {entry.sentiment.sentiment === 'positive' ? '😊' : 
                               entry.sentiment.sentiment === 'negative' ? '😔' : '😌'}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Support Resources */}
            <div className="bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">🆘</span>
                Need Support?
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                You're not alone. We're here for you, bestie! 💚
              </p>
              <div className="space-y-2">
                <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors">
                  🆘 Crisis Line: 1199
                </button>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors">
                  📞 Campus Counseling
                </button>
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors">
                  💬 Chat Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Encouragement */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-3xl shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Seriously though, you're doing amazing sweetie 💖
            </h3>
            <p className="text-gray-600 mb-4">
              The way you show up for yourself through reflection? Absolute goals. We stan an icon! 
              Your identity is valid, your feelings matter, and you're absolutely crushing it just by being you. Periodt. 💅
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>• Mental health is REAL health</span>
              <span>• Kindness costs zero dollars</span>
              <span>• We're all just trying our best</span>
            </div>
            <p className="text-purple-600 font-medium mt-4">
              Stay awesome, stay true, stay you! We're all in this together. No cap. 🤘
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalingPage;