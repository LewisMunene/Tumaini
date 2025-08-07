// src/components/checkin/CheckInSuccess.jsx - Your celebration bestie! 🎉✨
import React, { useEffect, useState } from 'react';

const CheckInSuccess = ({ onComplete, checkInData = {} }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(0);

  const celebrationQuotes = [
    "You absolutely crushed that check-in, bestie! 🌟",
    "Your commitment to self-care is literally iconic! 💖",
    "Look at you prioritizing your mental health! We love to see it! ✨",
    "You're building such healthy habits - keep this energy! 🚀",
    "Taking care of yourself is the ultimate flex! 💅"
  ];

  const achievements = [
    { icon: '🎯', title: 'Check-in Complete', description: 'You finished your daily wellness check-in!' },
    { icon: '📊', title: 'Data Collected', description: 'Your patterns are being tracked for insights' },
    { icon: '💚', title: 'Self-Care Champion', description: 'You showed up for yourself today' },
    { icon: '🌱', title: 'Consistency Building', description: 'Every check-in builds better habits' }
  ];

  // CSS for confetti animation
  const confettiStyles = `
    @keyframes confetti-fall {
      to {
        transform: translateY(100vh) rotate(360deg);
      }
    }
    
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
      animation: confetti-fall 3s linear infinite;
    }
  `;

  // Generate confetti pieces
  const generateConfetti = () => {
    const pieces = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2
      });
    }
    return pieces;
  };

  const confettiPieces = generateConfetti();

  useEffect(() => {
    // Hide confetti after 4 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    // Cycle through quotes
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % celebrationQuotes.length);
    }, 2000);

    return () => {
      clearTimeout(confettiTimer);
      clearInterval(quoteTimer);
    };
  }, []);

  const getMotivationalInsight = () => {
    const mood = checkInData.mood || 5;
    const stress = checkInData.stressLevel || 5;
    const sleep = checkInData.sleepQuality || 5;

    if (stress >= 8) {
      return {
        title: "We See You, Bestie 💚",
        message: "High stress levels detected. Remember, it's okay to not be okay. Consider reaching out for support - you deserve care.",
        color: "from-red-400 to-pink-400"
      };
    } else if (mood >= 8 && sleep >= 7) {
      return {
        title: "Absolute Wellness Queen! 👑",
        message: "Your mood and sleep are both thriving! This is the energy we love to see. Keep protecting this vibe!",
        color: "from-green-400 to-blue-400"
      };
    } else if (sleep <= 4) {
      return {
        title: "Sleep Glow-Up Needed 😴",
        message: "Your sleep game needs some TLC. Good sleep is literally the foundation of everything else - let's prioritize it!",
        color: "from-purple-400 to-blue-400"
      };
    } else {
      return {
        title: "You're Doing Amazing! ✨",
        message: "Every day is different, and that's totally normal. What matters is that you're showing up for yourself consistently!",
        color: "from-blue-400 to-purple-400"
      };
    }
  };

  const insight = getMotivationalInsight();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Add confetti styles */}
      <style>{confettiStyles}</style>
      
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="confetti"
              style={{
                left: `${piece.left}%`,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`,
                background: `hsl(${Math.random() * 360}, 70%, 60%)`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-2xl mx-auto text-center relative z-20">
        {/* Main Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 border border-gray-100 relative overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm-30 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Success Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <span className="text-4xl">🎉</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-lg">✨</span>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Check-in Complete!
          </h1>
          
          <div className="min-h-[60px] flex items-center justify-center mb-6">
            <p className="text-xl text-gray-600 transition-all duration-500">
              {celebrationQuotes[currentQuote]}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl p-4">
              <div className="text-2xl mb-2">💖</div>
              <div className="text-sm text-gray-600">Mood</div>
              <div className="font-bold text-gray-800">{checkInData.mood || '--'}/10</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4">
              <div className="text-2xl mb-2">😴</div>
              <div className="text-sm text-gray-600">Sleep</div>
              <div className="font-bold text-gray-800">{checkInData.sleepQuality || '--'}/10</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-4">
              <div className="text-2xl mb-2">🧘‍♀️</div>
              <div className="text-sm text-gray-600">Stress</div>
              <div className="font-bold text-gray-800">{checkInData.stressLevel || '--'}/10</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm text-gray-600">Energy</div>
              <div className="font-bold text-gray-800">{checkInData.energyLevel || '--'}/10</div>
            </div>
          </div>

          {/* Personalized Insight */}
          <div className={`bg-gradient-to-r ${insight.color} rounded-2xl p-6 mb-6 text-white`}>
            <h3 className="text-lg font-bold mb-2">{insight.title}</h3>
            <p className="text-white/90">{insight.message}</p>
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-2xl p-4 text-left hover:bg-gray-100 transition-colors"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{achievement.title}</h4>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onComplete}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Back to Dashboard ✨
            </button>
            <button className="flex-1 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:bg-gray-50">
              View My Progress 📊
            </button>
          </div>

          {/* Next Check-in Reminder */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-blue-600">⏰</span>
              <p className="text-blue-800 font-medium text-sm">
                Next check-in available tomorrow morning! See you then, bestie 🌅
              </p>
            </div>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="text-center">
          <p className="text-gray-500 italic text-sm max-w-md mx-auto">
            "Your mental health journey is valid, your feelings matter, and you're absolutely crushing it just by being here." 💚
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckInSuccess;