// src/components/checkin/MoodSelector.jsx - Your mood check-in bestie! 💖✨
import React, { useState } from 'react';

const MoodSelector = ({ onMoodSelect, selectedMood }) => {
  const [hoveredMood, setHoveredMood] = useState(null);

  const moods = [
    { value: 1, emoji: '😢', label: 'Really struggling', description: 'Having a really tough time rn', color: 'border-red-300 bg-red-50 hover:bg-red-100' },
    { value: 2, emoji: '😔', label: 'Pretty down', description: 'Feeling kinda low today', color: 'border-red-200 bg-red-50 hover:bg-red-100' },
    { value: 3, emoji: '😕', label: 'Not great', description: 'Things could be better ngl', color: 'border-orange-300 bg-orange-50 hover:bg-orange-100' },
    { value: 4, emoji: '😐', label: 'Meh vibes', description: 'Just existing, you know?', color: 'border-orange-200 bg-orange-50 hover:bg-orange-100' },
    { value: 5, emoji: '😊', label: 'Okay energy', description: 'Feeling pretty neutral today', color: 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100' },
    { value: 6, emoji: '🙂', label: 'Pretty good', description: 'Having a decent day!', color: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100' },
    { value: 7, emoji: '😄', label: 'Good vibes', description: 'Feeling positive and content', color: 'border-green-300 bg-green-50 hover:bg-green-100' },
    { value: 8, emoji: '😁', label: 'Feeling great', description: 'Really good energy today!', color: 'border-green-200 bg-green-50 hover:bg-green-100' },
    { value: 9, emoji: '🤩', label: 'Amazing vibes', description: 'Absolutely thriving bestie!', color: 'border-blue-300 bg-blue-50 hover:bg-blue-100' },
    { value: 10, emoji: '🥳', label: 'Crushing it', description: 'On top of the world rn!', color: 'border-purple-300 bg-purple-50 hover:bg-purple-100' }
  ];

  const handleMoodClick = (mood) => {
    // Add a small haptic feedback feel
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    onMoodSelect(mood.value);
  };

  const selectedMoodData = moods.find(m => m.value === selectedMood);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          How are you feeling today? 💖
        </h2>
        <p className="text-gray-600">
          No wrong answers here, bestie - just checking in with yourself ✨
        </p>
      </div>

      {/* Selected Mood Display */}
      {selectedMoodData && (
        <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
          <div className="text-6xl mb-3">{selectedMoodData.emoji}</div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedMoodData.label}</h3>
          <p className="text-gray-600 mb-2">{selectedMoodData.description}</p>
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            <span className="mr-1">📊</span>
            {selectedMood}/10
          </div>
        </div>
      )}

      {/* Mood Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodClick(mood)}
            onMouseEnter={() => setHoveredMood(mood.value)}
            onMouseLeave={() => setHoveredMood(null)}
            className={`
              relative p-4 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-left
              ${selectedMood === mood.value 
                ? 'border-blue-500 bg-blue-100 shadow-lg transform scale-102' 
                : mood.color
              }
            `}
          >
            {/* Emoji */}
            <div className="text-4xl mb-2 text-center">{mood.emoji}</div>
            
            {/* Label */}
            <div className="text-center">
              <div className="font-semibold text-gray-800 text-sm mb-1">
                {mood.label}
              </div>
              <div className="text-xs text-gray-600">
                {mood.description}
              </div>
            </div>

            {/* Number Badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-700 text-white rounded-full text-xs font-bold flex items-center justify-center">
              {mood.value}
            </div>

            {/* Selection Indicator */}
            {selectedMood === mood.value && (
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
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
          <div className="text-xs text-gray-500">Struggling</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-700 mb-1">4-6</div>
          <div className="text-xs text-gray-500">Neutral</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-700 mb-1">7-10</div>
          <div className="text-xs text-gray-500">Thriving</div>
        </div>
      </div>

      {/* Validation Message */}
      {selectedMood && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center transition-all duration-300">
          <p className="text-green-800 font-medium">
            Thanks for sharing! Your feelings are valid, bestie 💚
          </p>
        </div>
      )}

      {/* Support Message for Low Moods */}
      {selectedMood && selectedMood <= 3 && (
        <div className="mt-4 bg-pink-50 border border-pink-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🫂</span>
            <div>
              <h4 className="font-semibold text-pink-800 mb-2">Hey bestie, we see you 💗</h4>
              <p className="text-sm text-pink-700 mb-2">
                It's okay to not be okay. Your feelings are completely valid, and you're not alone in this.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <button className="bg-pink-200 hover:bg-pink-300 text-pink-800 px-3 py-1 rounded-full text-xs font-medium transition-colors">
                  🆘 Get Support
                </button>
                <button className="bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-1 rounded-full text-xs font-medium transition-colors">
                  💜 Self-Care Tips
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Encouraging Quote */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 italic">
          "Your mental health journey is valid, your feelings matter, and you're absolutely crushing it just by being here." 
        </p>
      </div>
    </div>
  );
};

export default MoodSelector;