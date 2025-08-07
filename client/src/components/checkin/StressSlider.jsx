// src/components/checkin/StressSlider.jsx - Your stress check-in bestie! 🧘‍♀️✨
import React, { useState } from 'react';

const StressSlider = ({ onStressSelect, selectedStress }) => {
  const [hoveredStress, setHoveredStress] = useState(null);

  const stressLevels = [
    { value: 1, emoji: '🧘‍♀️', label: 'Zen vibes only', description: 'Completely calm and centered', color: 'border-green-300 bg-green-50 hover:bg-green-100' },
    { value: 2, emoji: '😌', label: 'Pretty chill', description: 'Relaxed and peaceful energy', color: 'border-green-200 bg-green-50 hover:bg-green-100' },
    { value: 3, emoji: '🙂', label: 'Calm bestie', description: 'Generally feeling stable', color: 'border-blue-300 bg-blue-50 hover:bg-blue-100' },
    { value: 4, emoji: '😊', label: 'Mostly good', description: 'Little tension but manageable', color: 'border-blue-200 bg-blue-50 hover:bg-blue-100' },
    { value: 5, emoji: '😐', label: 'Neutral vibes', description: 'Not stressed, not super calm', color: 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100' },
    { value: 6, emoji: '😕', label: 'Bit overwhelmed', description: 'Starting to feel pressure', color: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100' },
    { value: 7, emoji: '😰', label: 'Pretty stressed', description: 'Feeling the weight of things', color: 'border-orange-300 bg-orange-50 hover:bg-orange-100' },
    { value: 8, emoji: '😣', label: 'Really struggling', description: 'High stress, overwhelmed', color: 'border-orange-200 bg-orange-50 hover:bg-orange-100' },
    { value: 9, emoji: '😖', label: 'Barely hanging on', description: 'Extremely stressed rn', color: 'border-red-300 bg-red-50 hover:bg-red-100' },
    { value: 10, emoji: '😵‍💫', label: 'Crisis mode', description: 'Need help immediately', color: 'border-red-400 bg-red-50 hover:bg-red-100' }
  ];

  const handleStressClick = (stress) => {
    if (navigator.vibrate) {
      navigator.vibrate(stress.value >= 7 ? 80 : 40);
    }
    onStressSelect(stress.value);
  };

  const selectedStressData = stressLevels.find(s => s.value === selectedStress);

  const getStressCategory = (value) => {
    if (value <= 3) return { label: 'Low Stress', color: 'text-green-600', bgColor: 'bg-green-100', icon: '🌱' };
    if (value <= 5) return { label: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: '⚡' };
    if (value <= 7) return { label: 'High Stress', color: 'text-orange-600', bgColor: 'bg-orange-100', icon: '🔥' };
    return { label: 'Crisis Level', color: 'text-red-600', bgColor: 'bg-red-100', icon: '🚨' };
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          What's your stress level right now? 🧘‍♀️
        </h2>
        <p className="text-gray-600">
          No judgment zone - just checking in with your energy, bestie! Your feelings are so valid ✨
        </p>
      </div>

      {/* Selected Stress Display */}
      {selectedStressData && (
        <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
          <div className="text-6xl mb-3">{selectedStressData.emoji}</div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedStressData.label}</h3>
          <p className="text-gray-600 mb-3">{selectedStressData.description}</p>
          <div className="flex items-center justify-center space-x-3">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              <span className="mr-1">📊</span>
              {selectedStress}/10
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStressCategory(selectedStress).color} ${getStressCategory(selectedStress).bgColor}`}>
              <span className="mr-1">{getStressCategory(selectedStress).icon}</span>
              {getStressCategory(selectedStress).label}
            </div>
          </div>
        </div>
      )}

      {/* Stress Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {stressLevels.map((stress) => (
          <button
            key={stress.value}
            onClick={() => handleStressClick(stress)}
            onMouseEnter={() => setHoveredStress(stress.value)}
            onMouseLeave={() => setHoveredStress(null)}
            className={`
              relative p-4 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-left
              ${selectedStress === stress.value 
                ? 'border-blue-500 bg-blue-100 shadow-lg transform scale-102' 
                : stress.color
              }
            `}
          >
            {/* Emoji */}
            <div className="text-4xl mb-2 text-center">{stress.emoji}</div>
            
            {/* Label */}
            <div className="text-center">
              <div className="font-semibold text-gray-800 text-sm mb-1">
                {stress.label}
              </div>
              <div className="text-xs text-gray-600">
                {stress.description}
              </div>
            </div>

            {/* Number Badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-700 text-white rounded-full text-xs font-bold flex items-center justify-center">
              {stress.value}
            </div>

            {/* Selection Indicator */}
            {selectedStress === stress.value && (
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
          <div className="text-xs text-gray-500">Zen Mode</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-700 mb-1">4-6</div>
          <div className="text-xs text-gray-500">Moderate</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-700 mb-1">7-10</div>
          <div className="text-xs text-gray-500">Crisis Mode</div>
        </div>
      </div>

      {/* Crisis Support for High Stress */}
      {selectedStress && selectedStress >= 8 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🆘</span>
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Bestie, you're in crisis mode - let's get you support!</h4>
              <p className="text-sm text-red-700 mb-3">
                This level of stress isn't sustainable and you don't have to handle this alone. You're so brave for being honest about this.
              </p>
              <ul className="text-sm text-red-700 space-y-2 mb-4">
                <li>• <strong>Breathe:</strong> Try 4-7-8 breathing (inhale 4, hold 7, exhale 8) ✨</li>
                <li>• <strong>Ground yourself:</strong> Name 5 things you can see, 4 you can touch</li>
                <li>• <strong>Reach out:</strong> Call a friend, counselor, or crisis line right now</li>
                <li>• <strong>You're not alone:</strong> This feeling will pass, we promise 💚</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  🆘 Get Crisis Support
                </button>
                <button className="bg-white border border-red-300 hover:bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  💜 Call Counseling
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coping Tips for Moderate Stress */}
      {selectedStress && selectedStress >= 4 && selectedStress <= 7 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🌼</span>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Quick stress-busting vibes for you!</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Take 5 deep breaths and feel your shoulders drop ✨</li>
                <li>• Maybe step outside for some fresh air?</li>
                <li>• Listen to your favorite chill playlist 🎵</li>
                <li>• Text someone who makes you smile 💛</li>
                <li>• Remember: this stress is temporary, you've got this!</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Validation Message */}
      {selectedStress && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center transition-all duration-300">
          <p className="text-purple-800 font-medium">
            {selectedStress <= 3 
              ? "Love this zen energy for you! Keep protecting that peace, bestie 🧘‍♀️💚" 
              : selectedStress <= 6
              ? "Thanks for checking in with yourself - acknowledging stress is the first step! 💛"
              : "We see you, we hear you, and you're so brave for being honest about this. You're not alone 💚"
            }
          </p>
        </div>
      )}

      {/* Encouraging Quote */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 italic">
          "It's okay to not be okay. Stress is valid, your feelings matter, and asking for help is actually iconic. 🌟"
        </p>
      </div>
    </div>
  );
};

export default StressSlider;