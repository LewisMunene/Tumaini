// src/pages/protected/AnalyticsPage.jsx - Your wellness insights dashboard! 📈💙✨
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import WellnessAnalytics from '../../components/analytics/WellnessAnalytics';
// import { getUserWellnessStats, getRecentCheckIns } from '../../services/checkInService';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

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
          message: 'Your wellness data shows positive trends. Keep up the great work!'
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
    if (score >= 80) return { label: 'Excellent', color: 'text-green-600', emoji: '🌟' };
    if (score >= 60) return { label: 'Good', color: 'text-blue-600', emoji: '😊' };
    if (score >= 40) return { label: 'Fair', color: 'text-yellow-600', emoji: '💪' };
    return { label: 'Needs Attention', color: 'text-red-600', emoji: '🫂' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">📊</div>
          <p className="text-xl text-gray-600">Loading your wellness insights...</p>
          <p className="text-sm text-gray-500 mt-2">Preparing your personalized analytics dashboard ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar onNavigate={handleNavigateHome} />
      
      {/* Main Content with proper navbar spacing */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Wellness Analytics Dashboard 📈✨
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Track your mental health journey with personalized insights and data-driven feedback. 
                Understanding your wellness patterns helps you make informed decisions about your self-care routine.
              </p>
            </div>

            {/* Analytics PSA */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-2xl p-6 max-w-4xl mx-auto mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Understanding Your Wellness Data:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📊</span>
                  <span className="text-gray-700">Your data tells your unique wellness story</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📈</span>
                  <span className="text-gray-700">Progress isn't always linear - that's normal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">💖</span>
                  <span className="text-gray-700">Every step forward is meaningful progress</span>
                </div>
              </div>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Select Your Timeline ⏰
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {timeRanges.map((range) => (
                <button
                  key={range.key}
                  onClick={() => setTimeRange(range.key)}
                  className={`p-4 rounded-2xl text-center transition-all duration-200 ${
                    timeRange === range.key
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:scale-102'
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
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 text-center hover:shadow-xl transition-shadow duration-200">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-gray-800">{wellnessStats.totalCheckIns}</div>
                <div className="text-sm text-gray-600">Total Check-ins</div>
                <div className="text-xs text-gray-500 mt-1">Consistency builds progress</div>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 text-center hover:shadow-xl transition-shadow duration-200">
                <div className="text-3xl mb-2">{getWellnessLevel(wellnessStats.averageWellnessScore).emoji}</div>
                <div className="text-2xl font-bold text-gray-800">{wellnessStats.averageWellnessScore}%</div>
                <div className="text-sm text-gray-600">Wellness Score</div>
                <div className={`text-xs font-medium mt-1 ${getWellnessLevel(wellnessStats.averageWellnessScore).color}`}>
                  {getWellnessLevel(wellnessStats.averageWellnessScore).label}
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 text-center hover:shadow-xl transition-shadow duration-200">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-gray-800">{wellnessStats.checkInStreak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
                <div className="text-xs text-gray-500 mt-1">Building healthy habits</div>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 text-center hover:shadow-xl transition-shadow duration-200">
                <div className="text-3xl mb-2">💖</div>
                <div className="text-2xl font-bold text-gray-800">{wellnessStats.averageMood}/10</div>
                <div className="text-sm text-gray-600">Average Mood</div>
                <div className="text-xs text-gray-500 mt-1">Your emotional wellness</div>
              </div>
            </div>
          )}

          {/* Additional Metrics Row */}
          {wellnessStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📋</span>
                  Quick Stats Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Stress Level</span>
                    <span className="font-semibold text-gray-800">{wellnessStats.averageStress}/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Sleep Quality</span>
                    <span className="font-semibold text-gray-800">{wellnessStats.averageSleep}/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Data Collection Period</span>
                    <span className="font-semibold text-gray-800">{timeRanges.find(r => r.key === timeRange)?.label}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">💡</span>
                  Wellness Insights
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  {wellnessStats.message}
                </p>
                <div className="text-xs text-gray-600">
                  <p>• Track patterns to identify what supports your wellbeing</p>
                  <p>• Regular check-ins provide valuable self-awareness</p>
                  <p>• Your data helps us provide personalized support</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Analytics Component */}
          <WellnessAnalytics 
            analyticsData={analyticsData}
            timeRange={timeRange}
          />

          {/* Encouraging Bottom Section */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-3xl shadow-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Your Wellness Journey Matters 💙✨
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Every data point in your wellness dashboard represents a moment of self-awareness and care. 
                By tracking your mental health patterns, you're taking an active role in understanding and improving your wellbeing. 
                This consistent effort to monitor and reflect on your wellness is a powerful tool for personal growth.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">📈</span>
                  <span className="text-gray-700 font-medium">Every check-in builds awareness</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">🌱</span>
                  <span className="text-gray-700 font-medium">Your growth journey is unique</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">🎯</span>
                  <span className="text-gray-700 font-medium">Data-driven self-care works</span>
                </div>
              </div>
              <p className="text-blue-600 font-medium">
                Continue building this healthy habit of self-reflection. You're investing in your long-term wellbeing!
              </p>
            </div>
          </div>

          {/* Privacy & Data Information */}
          <div className="mt-8 text-center">
            <div className="bg-gray-50 rounded-2xl p-6 max-w-4xl mx-auto">
              <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center justify-center">
                <span className="mr-2">🔒</span>
                Your Privacy & Data Security
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                All your wellness data is encrypted and stored securely. Your analytics are private and only visible to you. 
                If concerning patterns are detected, our system can help connect you with appropriate support resources. 
                Your mental health data is never shared without your explicit consent.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AnalyticsPage;