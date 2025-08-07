// src/components/checkin/SleepQualitySlider.jsx - Your sleep vibes check-in! 😴✨
import React, { useState } from 'react';

const SleepQualitySlider = ({ onSleepSelect, selectedSleep }) => {
  const [hoveredSleep, setHoveredSleep] = useState(null);

  const sleepLevels = [
    { value: 1, emoji: '😵', label: 'No sleep energy', description: 'Barely slept, absolutely drained', color: 'border-red-400 bg-red-50 hover:bg-red-100' },
    { value: 2, emoji: '😪', label: 'Rough night vibes', description: 'Tossed and turned all night', color: 'border-red-300 bg-red-50 hover:bg-red-100' },
    { value: 3, emoji: '🥱', label: 'Meh sleep', description: 'Got some sleep but not quality', color: 'border-orange-400 bg-orange-50 hover:bg-orange-100' },
    { value: 4, emoji: '😴', label: 'Could be better', description: 'Okay-ish sleep, still tired', color: 'border-orange-300 bg-orange-50 hover:bg-orange-100' },
    { value: 5, emoji: '😌', label: 'Decent rest', description: 'Average sleep, feeling neutral', color: 'border-yellow-400 bg-yellow-50 hover:bg-yellow-100' },
    { value: 6, emoji: '😊', label: 'Pretty good sleep', description: 'Slept well, feeling refreshed', color: 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100' },
    { value: 7, emoji: '😄', label: 'Great sleep vibes', description: 'Solid night, energized!', color: 'border-green-400 bg-green-50 hover:bg-green-100' },
    { value: 8, emoji: '🤗', label: 'Amazing rest', description: 'Woke up feeling fantastic', color: 'border-green-300 bg-green-50 hover:bg-green-100' },
    { value: 9, emoji: '🌟', label: 'Perfect sleep energy', description: 'Best sleep ever, ready to slay!', color: 'border-blue-400 bg-blue-50 hover:bg-blue-100' },
    { value: 10, emoji: '✨', label: 'Cloud 9 sleep', description: 'Absolutely perfect rest, queen!', color: 'border-purple-400 bg-purple-50 hover:bg-purple-100' }
  ];

  const handleSleepClick = (sleep) => {
    if (navigator.vibrate) {
      navigator.vibrate(40);
    }
    onSleepSelect(sleep.value);
  };

  const selectedSleepData = sleepLevels.find(s => s.value === selectedSleep);

  const getSleepCategory = (value) => {
    if (value <= 3) return { label: 'Poor Sleep', color: 'text-red-600', bgColor: 'bg-red-100', icon: '💤' };
    if (value <= 5) return { label: 'Fair Sleep', color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: '😴' };
    if (value <= 7) return { label: 'Good Sleep', color: 'text-green-600', bgColor: 'bg-green-100', icon: '🌙' };
    return { label: 'Excellent Sleep', color: 'text-blue-600', bgColor: 'bg-blue-100', icon: '✨' };
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          How was your sleep last night? 😴
        </h2>
        <p className="text-gray-600">
          Sleep is literally the foundation of everything, bestie! No judgment here, just checking your rest vibes ✨
        </p>
      </div>

      {/* Selected Sleep Display */}
      {selectedSleepData && (
        <div className="text-center mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200">
          <div className="text-6xl mb-3">{selectedSleepData.emoji}</div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedSleepData.label}</h3>
          <p className="text-gray-600 mb-3">{selectedSleepData.description}</p>
          <div className="flex items-center justify-center space-x-3">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              <span className="mr-1">📊</span>
              {selectedSleep}/10
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSleepCategory(selectedSleep).color} ${getSleepCategory(selectedSleep).bgColor}`}>
              <span className="mr-1">{getSleepCategory(selectedSleep).icon}</span>
              {getSleepCategory(selectedSleep).label}
            </div>
          </div>
        </div>
      )}

      {/* Sleep Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {sleepLevels.map((sleep) => (
          <button
            key={sleep.value}
            onClick={() => handleSleepClick(sleep)}
            onMouseEnter={() => setHoveredSleep(sleep.value)}
            onMouseLeave={() => setHoveredSleep(null)}
            className={`
              relative p-4 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-left
              ${selectedSleep === sleep.value 
                ? 'border-purple-500 bg-purple-100 shadow-lg transform scale-102' 
                : sleep.color
              }
            `}
          >
            {/* Emoji */}
            <div className="text-4xl mb-2 text-center">{sleep.emoji}</div>
            
            {/* Label */}
            <div className="text-center">
              <div className="font-semibold text-gray-800 text-sm mb-1">
                {sleep.label}
              </div>
              <div className="text-xs text-gray-600">
                {sleep.description}
              </div>
            </div>

            {/* Number Badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-700 text-white rounded-full text-xs font-bold flex items-center justify-center">
              {sleep.value}
            </div>

            {/* Selection Indicator */}
            {selectedSleep === sleep.value && (
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Scale Reference */}
      <div className="flex justify-between items-center mb-8 px-4">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-700 mb-1">1-3</div>
          <div className="text-xs text-gray-500">Exhausted</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-700 mb-1">4-6</div>
          <div className="text-xs text-gray-500">Fair Sleep</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-700 mb-1">7-10</div>
          <div className="text-xs text-gray-500">Well Rested</div>
        </div>
      </div>

      {/* Sleep Tips for Poor Sleep */}
      {selectedSleep && selectedSleep <= 4 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Sleep glow-up tips incoming, bestie!</h4>
              <p className="text-sm text-blue-700 mb-3">
                Poor sleep affects literally everything - your mood, stress, and energy levels. Let's get you some better rest vibes!
              </p>
              <ul className="text-sm text-blue-700 space-y-1 mb-3">
                <li>• Try a consistent bedtime routine (your body loves patterns!) ✨</li>
                <li>• Consider limiting screen time 1 hour before bed 📱</li>
                <li>• Maybe some calming tea or meditation vibes? 🍵</li>
                <li>• Keep your room cool, dark, and quiet 🌙</li>
                <li>• No caffeine after 2pm if possible!</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <button className="bg-blue-200 hover:bg-blue-300 text-blue-800 px-3 py-1 rounded-full text-xs font-medium transition-colors">
                  😴 Sleep Resources
                </button>
                <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-xs font-medium transition-colors">
                  🧘‍♀️ Bedtime Meditation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Celebration for Good Sleep */}
      {selectedSleep && selectedSleep >= 8 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🎉</span>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Sleep queen energy! We love to see it!</h4>
              <p className="text-sm text-green-700">
                Amazing sleep is literally everything! You're setting yourself up for success today. Keep protecting those sleep vibes, bestie! 💚✨
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Validation Message */}
      {selectedSleep && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center transition-all duration-300">
          <p className="text-purple-800 font-medium">
            {selectedSleep >= 7 
              ? "Love that quality sleep energy for you! Rest is everything 💜" 
              : "Thanks for being real about your sleep - struggles are totally valid, bestie 💜"
            }
          </p>
        </div>
      )}

      {/* Encouraging Quote */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 italic">
          "Rest is not a luxury, it's a necessity. You deserve good sleep, bestie! Quality rest = quality life 😴💜"
        </p>
      </div>
    </div>
  );
};

export default SleepQualitySlider;