// src/pages/protected/JournalingPage.jsx - Your safe journaling space! 📝💙✨
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SmartJournal from '../../components/journal/SmartJournal';
import { submitJournalEntry, getRecentJournalEntries, getJournalAnalytics } from '../../services/journalService';
import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';

const JournalingPage = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user's journal data on page load
  useEffect(() => {
    const loadJournalData = async () => {
      if (currentUser) {
        try {
          setLoading(true);
          // Any initialization logic can go here
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
        
        console.log('✨ Journal saved successfully with crisis analysis:', result);
      } else {
        alert(result.message || 'Unable to save your journal entry at this time. Please try again.');
      }
      
    } catch (error) {
      console.error('Error saving journal:', error);
      alert('Something went wrong while saving your journal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSuccessMessage = (riskLevel) => {
    switch (riskLevel) {
      case 'critical':
        return '💚 Your journal has been saved. We\'re here for you - support is available right now. You\'re not alone.';
      case 'high':
        return '🫂 Thanks for sharing your thoughts. We can see you\'re struggling and want to connect you with support.';
      case 'moderate':
        return '💜 Your reflection has been saved. We\'re here if you need support - you matter!';
      case 'low':
        return '✨ Journal saved! Thanks for taking time to reflect. Support is always available.';
      default:
        return '🌟 Your journal entry has been saved successfully. Thank you for taking time to reflect.';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-xl text-gray-600">Loading your journal space...</p>
          <p className="text-sm text-gray-500 mt-2">Preparing your safe space for reflection ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Navbar onNavigate={onNavigate} />
      
      {/* Main Content Container with proper navbar spacing */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Digital Wellness Journal 📝✨
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Welcome to your private space for reflection and self-expression. 
                This is a safe, confidential environment where you can process your thoughts and feelings freely.
              </p>
            </div>

            {/* Wellness PSA */}
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-2xl p-6 max-w-4xl mx-auto mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Important Reminders for Your Wellness Journey:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🧠</span>
                  <span className="text-gray-700">Mental health is just as important as physical health</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">💖</span>
                  <span className="text-gray-700">Your feelings and experiences are valid</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🌟</span>
                  <span className="text-gray-700">Taking time for reflection shows self-care</span>
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

            {/* Sidebar - Support Resources */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Support Resources Card */}
              <div className="bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🆘</span>
                  Need Support?
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  You're not alone in this journey. Professional support and resources are available 24/7.
                </p>
                <div className="space-y-3">
                  <a 
                    href="tel:988" 
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-full text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>🆘</span>
                    <span>Crisis Line: 988</span>
                  </a>
                  <a 
                    href="tel:+254703034000" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-full text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>📞</span>
                    <span>Campus Counseling</span>
                  </a>
                  <Link 
                    to="/resources" 
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-full text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>🌟</span>
                    <span>View All Resources</span>
                  </Link>
                </div>
              </div>

              {/* Privacy Assurance */}
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🔒</span>
                  Your Privacy Matters
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>All journal entries are encrypted and secure</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Only you can access your personal reflections</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Crisis detection helps connect you with support when needed</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-0.5">ℹ️</span>
                    <span>Your mental health journey is completely confidential</span>
                  </div>
                </div>
              </div>

              {/* Journaling Tips */}
              <div className="bg-green-50 rounded-3xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">💡</span>
                  Reflection Tips
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Write freely without worrying about grammar or structure</p>
                  <p>• Focus on your feelings and experiences</p>
                  <p>• Be honest with yourself - this is your safe space</p>
                  <p>• Consider what you're grateful for today</p>
                  <p>• Reflect on challenges and how you're handling them</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Encouragement */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-3xl shadow-lg p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                You're Taking an Important Step 💖
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                By taking time to reflect and process your thoughts, you're actively investing in your mental health and personal growth. 
                This practice of self-reflection is a valuable tool for understanding yourself better and building emotional resilience.
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-500 mb-4">
                <span>• Mental wellness is a priority</span>
                <span>• Self-reflection builds resilience</span>
                <span>• You deserve support and care</span>
              </div>
              <p className="text-blue-600 font-medium">
                Remember, seeking support is a sign of strength, not weakness. We're here for you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with proper spacing */}
      <Footer />
    </div>
  );
};

export default JournalingPage;