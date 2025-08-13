// src/pages/protected/AnalyticsPage.jsx - Your data glow-up bestie! 📈✨
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import WellnessAnalytics from '../../components/analytics/WellnessAnalytics';
// import { getUserWellnessStats, getRecentCheckIns } from '../../services/checkInService';

const AnalyticsPage = () => {
  const { currentUser } = useAuth();
  const [timeRange, setTimeRange] = useState('weekly');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wellnessStats, setWellnessStats] = useState(null);

  // Mock navigation function for now
  const handleNavigateHome = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/home';
    }
  };

  // Load analytics data based on time range
  useEffect(() => {
    const loadAnalyticsData = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      try {
        // TODO: When services are connected, this will fetch real data
        // const days = timeRange === 'daily' ? 7 : timeRange === 'weekly' ? 30 : timeRange === 'monthly' ? 365 : 365;
        // const [checkIns, stats] = await Promise.all([
        //   getRecentCheckIns(currentUser.uid, days),
        //   getUserWellnessStats(currentUser.uid, days)
        // ]);
        // setAnalyticsData(checkIns);
        // setWellnessStats(stats);

        // For now, simulate loading with mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setWellnessStats({
          totalCheckIns: 23,
          averageWellnessScore: 78,
          averageMood: 7.2,
          averageStress: 4.8,
          averageSleep: 6.9,
          checkInStreak: 5,
          message: 'Your wellness data is looking good, bestie! Keep it up! 💚'
        });
        
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalyticsData();
  }, [currentUser, timeRange]);

  const timeRanges = [
    { key: 'daily', label: 'Last 7 Days', icon: '📅' },
    { key: 'weekly', label: 'Last 4 Weeks', icon: '📆' },
    { key: 'monthly', label: 'Last 12 Months', icon: '🗓️' },
    { key: 'yearly', label: 'This Year', icon: '📊' }
  ];

  const getWellnessLevel = (score) => {
    if (score >= 80) return { label: 'Thriving', color: 'text-green-600', emoji: '🌟' };
    if (score >= 60) return { label: 'Good Vibes', color: 'text-blue-600', emoji: '😊' };
    if (score >= 40) return { label: 'Managing', color: 'text-yellow-600', emoji: '💪' };
    return { label: 'Needs Support', color: 'text-red-600', emoji: '🫂' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">📊</div>
          <p className="text-xl text-gray-600">Loading your wellness insights...</p>
          <p className="text-sm text-gray-500 mt-2">Getting all that beautiful data ready for you, bestie! ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={handleNavigateHome}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors group"
            >
              <span className="text-2xl mr-2 group-hover:translate-x-[-2px] transition-transform">←</span>
              <span>Back to home</span>
            </button>
            
            <div className="text-right">
              <p className="text-sm text-gray-500">Wellness Intelligence</p>
              <p className="text-lg font-semibold text-gray-800">Your Analytics</p>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Hey bestie! 📈✨ Ready to see your glow-up?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your wellness journey is literally a work of art, and these charts are about to show you just how iconic your progress is! 
              No cap, every data point represents your commitment to self-care! 🌈💚
            </p>
          </div>

          {/* Quick PSA */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-2xl p-6 max-w-4xl mx-auto mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Real talk that's low-key important: 💅</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-xl">📊</span>
                <span className="text-gray-700">Data tells YOUR story</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">📈</span>
                <span className="text-gray-700">Progress isn't always linear</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">💖</span>
                <span className="text-gray-700">You're doing amazing sweetie</span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Choose Your Timeline, Bestie! ⏰
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {timeRanges.map((range) => (
              <button
                key={range.key}
                onClick={() => setTimeRange(range.key)}
                className={`p-4 rounded-2xl text-center transition-all ${
                  timeRange === range.key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="text-2xl mb-2">{range.icon}</div>
                <div className="font-semibold text-sm">{range.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Wellness Overview Cards */}
        {wellnessStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-gray-800">{wellnessStats.totalCheckIns}</div>
              <div className="text-sm text-gray-600">Total Check-ins</div>
              <div className="text-xs text-gray-500 mt-1">You're consistent, icon! 💪</div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 text-center">
              <div className="text-3xl mb-2">{getWellnessLevel(wellnessStats.averageWellnessScore).emoji}</div>
              <div className="text-2xl font-bold text-gray-800">{wellnessStats.averageWellnessScore}%</div>
              <div className="text-sm text-gray-600">Wellness Score</div>
              <div className={`text-xs font-medium mt-1 ${getWellnessLevel(wellnessStats.averageWellnessScore).color}`}>
                {getWellnessLevel(wellnessStats.averageWellnessScore).label}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-gray-800">{wellnessStats.checkInStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
              <div className="text-xs text-gray-500 mt-1">Consistency is everything! ✨</div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 text-center">
              <div className="text-3xl mb-2">💖</div>
              <div className="text-2xl font-bold text-gray-800">{wellnessStats.averageMood}</div>
              <div className="text-sm text-gray-600">Avg Mood</div>
              <div className="text-xs text-gray-500 mt-1">Your vibes matter! 🌈</div>
            </div>
          </div>
        )}

        {/* Main Analytics Component */}
        <WellnessAnalytics 
          analyticsData={analyticsData}
          timeRange={timeRange}
        />

        {/* Encouraging Bottom Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-3xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Literally obsessed with your wellness journey! 😍✨
            </h3>
            <p className="text-gray-600 mb-6">
              The way you show up for yourself through data? That's big brain energy right there! 
              Your patterns are telling such a beautiful story of growth, self-awareness, and resilience. 
              We absolutely love to see it! Keep protecting your peace and celebrating these wins! 💚
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl">📈</span>
                <span className="text-gray-700 font-medium">Every check-in is growth</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl">🌱</span>
                <span className="text-gray-700 font-medium">Your journey is valid</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl">🤘</span>
                <span className="text-gray-700 font-medium">You're absolutely crushing it</span>
              </div>
            </div>
            <p className="text-purple-600 font-medium mt-6">
              Stay curious, stay consistent, stay absolutely iconic! We're here for this wellness glow-up! No cap! 💅
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Your data helps us understand patterns so we can provide better support. All analytics are private and secure. 
            If any concerning patterns are detected, we're here to connect you with resources, bestie! 🛡️💚
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;