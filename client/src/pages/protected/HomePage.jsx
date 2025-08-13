// src/pages/protected/HomePage.jsx - Your Wellness Dashboard! 🌟
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../../components/layout/Footer';

const HomePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock function - replace with actual Firebase check later
  const checkDailyCheckInStatus = () => {
    // TODO: Check Firebase for today's check-in
    const lastCheckIn = localStorage.getItem(`lastCheckIn_${currentUser?.uid}`);
    const today = new Date().toDateString();
    return lastCheckIn === today;
  };

  useEffect(() => {
    if (currentUser) {
      setHasCheckedInToday(checkDailyCheckInStatus());
    }
  }, [currentUser]);

  const handleCheckInClick = () => {
    setIsLoading(true);
    // Small delay for smooth transition
    setTimeout(() => {
      navigate('/daily-checkin');
      setIsLoading(false);
    }, 500);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNavigateToJournal = () => {
    setIsLoading(true);
    // Small delay for smooth transition
    setTimeout(() => {
    navigate('/journal');  
    }, 500);
  };

  const handleNavigateToAnalytics = () => {
    setIsLoading(true);
    // Small delay for smooth transition
    setTimeout(() => {
      navigate('/analytics');
    }, 500);
  };


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getDisplayName = () => {
    return currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Bestie';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
             
                <img 
                  src="/assets/logos/tumaini-logo.png" 
                  alt="Tumaini Logo" 
                   className="h-16 w-auto object-contain"
                />
                <span className="text-white font-bold text-xl hidden">🧠</span>
              
              <div>
                <h1 className="text-2xl font-bold text-white">
                  TUMAINI
                </h1>
                <p className="text-blue-100 text-sm font-medium">Academic Stress Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium">
                {getGreeting()}, {getDisplayName()}! ✨
              </span>
              <button
                onClick={handleLogout}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors font-medium border border-white/20"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {getGreeting()}, {getDisplayName()}! ☀️
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your wellness journey continues here. How are you feeling today? 💚
          </p>
        </div>

        {/* Daily Check-in Section - The Star of the Show! */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Daily Check-in Card */}
          <div className="lg:col-span-2">
            <div className={`relative overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl ${
              hasCheckedInToday 
                ? 'bg-gradient-to-r from-green-400 to-blue-500' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}>
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
              <div className="relative p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {hasCheckedInToday ? '✅ Daily Check-in Complete!' : '📝 Daily Check-in'}
                    </h3>
                    <p className="text-white/90 text-lg">
                      {hasCheckedInToday 
                        ? "You're absolutely crushing it today, bestie! Come back tomorrow for another check-in." 
                        : "How's your stress today? Quick mood & stress level tracking to understand your patterns"
                      }
                    </p>
                  </div>
                  <div className="text-6xl">
                    {hasCheckedInToday ? '🎉' : '💖'}
                  </div>
                </div>
                
                {!hasCheckedInToday && (
                  <button
                    onClick={handleCheckInClick}
                    disabled={isLoading}
                    className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? '✨ Loading...' : 'Start Check-in ✨'}
                  </button>
                )}

                {hasCheckedInToday && (
                  <div className="bg-white/20 px-6 py-3 rounded-full inline-block">
                    <span className="font-semibold">Next check-in: Tomorrow morning 🌅</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats/Progress Card */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Progress 📊</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                  <span>This Week's Check-ins</span>
                  <span>4/7</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '57%'}}></div>
                </div>
              </div>
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-2xl font-bold text-gray-800">57%</p>
                <p className="text-sm text-gray-600">Weekly Goal Progress</p>
                <p className="text-xs text-gray-500 mt-1">Keep it up, bestie! 💪</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Wellness Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Journal Card */}
          <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                📔
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-800">Journal</h3>
                <p className="text-gray-600">Write it out, bestie</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Your private space to reflect and process your thoughts safely</p>
            <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              onClick={handleNavigateToJournal}>
              Open Journal →
            </button>
          </div>

          {/* Insights Card */}
          <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                📈
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-800">Your Insights</h3>
                <p className="text-gray-600">See your progress</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Personalized analytics showing your wellness patterns and growth</p>
            <button className="text-green-600 font-semibold hover:text-green-700 transition-colors"
            onClick={handleNavigateToAnalytics} disabled={isLoading}
            >
              View Analytics →
            </button>
          </div>

          {/* Crisis Support Card */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-3xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                🆘
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-800">Need Help Now?</h3>
                <p className="text-gray-600">Crisis support available 24/7</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4 font-medium">You're not alone. We're here for you. 💚</p>
            <div className="space-y-2">
              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-semibold transition-colors">
                Call Crisis Line
              </button>
              <button className="w-full bg-white text-red-500 border border-red-200 py-2 rounded-full font-semibold hover:bg-red-50 transition-colors">
                Get Resources
              </button>
            </div>
          </div>
        </div>

        {/* Motivational Quote Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-3xl shadow-lg p-8 max-w-3xl mx-auto">
            <p className="text-2xl font-medium text-gray-800 mb-4 italic">
              "Your mental health journey is valid, your feelings matter, and you're absolutely crushing it just by being here."
            </p>
            <p className="text-gray-600">— The Tumaini Community 💚</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Tumaini provides wellness support and is not a substitute for professional medical care.
          </p>
          <p className="text-sm text-gray-500">
            If you're experiencing a mental health emergency, please contact campus security or emergency services immediately.
          </p>
        </div>
     

      </main>
      <Footer />
    </div>
    
  );
};

export default HomePage;