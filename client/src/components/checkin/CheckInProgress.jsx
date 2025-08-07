// src/components/checkin/CheckInProgress.jsx - Your progress bestie! 📊✨
import React from 'react';

const CheckInProgress = ({ currentStep, totalSteps, completedSteps = [] }) => {
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);
  
  const steps = [
    { id: 1, title: 'Mood Check', icon: '💖', color: 'from-pink-400 to-red-400' },
    { id: 2, title: 'Sleep Vibes', icon: '😴', color: 'from-purple-400 to-blue-400' },
    { id: 3, title: 'Stress Level', icon: '🧘‍♀️', color: 'from-green-400 to-teal-400' },
    { id: 4, title: 'Academic Energy', icon: '📚', color: 'from-yellow-400 to-orange-400' },
    { id: 5, title: 'Energy Check', icon: '⚡', color: 'from-orange-400 to-red-400' },
    { id: 6, title: 'Gratitude', icon: '🙏', color: 'from-blue-400 to-purple-400' },
  ];

  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    if (stepId < currentStep) return 'completed';
    return 'upcoming';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Daily Check-in Progress
            </h3>
            <p className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps} - You're crushing this! ✨
            </p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
              progressPercentage === 100 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              <span className="mr-1">{progressPercentage === 100 ? '🎉' : '🎯'}</span>
              {progressPercentage}% complete
            </div>
          </div>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="relative w-full h-6 bg-gray-200 rounded-full shadow-inner overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              progressPercentage === 100 
                ? 'bg-gradient-to-r from-green-400 via-blue-400 to-purple-400' 
                : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="h-full bg-white bg-opacity-20 animate-pulse"></div>
          </div>
          
          {/* Progress Text Inside Bar */}
          {progressPercentage > 15 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {progressPercentage === 100 ? 'Complete! 🎉' : `${progressPercentage}%`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {steps.map((step) => {
          const status = getStepStatus(step.id);
          return (
            <div key={step.id} className="text-center">
              <div 
                className={`
                  relative w-16 h-16 mx-auto rounded-2xl transition-all duration-300 shadow-sm
                  ${status === 'completed' 
                    ? `bg-gradient-to-r ${step.color} scale-105 shadow-lg` 
                    : status === 'current'
                    ? `bg-gradient-to-r ${step.color} scale-110 shadow-xl animate-pulse ring-4 ring-blue-200`
                    : 'bg-gray-200'
                  }
                `}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">
                    {status === 'completed' ? '✅' : step.icon}
                  </span>
                </div>
                
                {/* Step Number Badge */}
                <div className={`
                  absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center
                  ${status === 'completed' 
                    ? 'bg-green-500 text-white' 
                    : status === 'current'
                    ? 'bg-blue-500 text-white animate-bounce'
                    : 'bg-gray-400 text-white'
                  }
                `}>
                  {step.id}
                </div>
              </div>
              
              <div className="mt-3">
                <p className={`text-sm font-medium ${
                  status === 'completed' 
                    ? 'text-gray-800' 
                    : status === 'current'
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
                
                <p className={`text-xs mt-1 ${
                  status === 'completed' 
                    ? 'text-green-600 font-medium' 
                    : status === 'current'
                    ? 'text-blue-500 font-medium'
                    : 'text-gray-400'
                }`}>
                  {status === 'completed' 
                    ? 'Done! ✨' 
                    : status === 'current'
                    ? 'In progress...'
                    : 'Coming up'
                  }
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivational Message */}
      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">
              {progressPercentage === 100 ? '🎉' : progressPercentage >= 75 ? '🌟' : progressPercentage >= 50 ? '💪' : '🌱'}
            </span>
            <div className="text-left">
              <h4 className="text-lg font-bold text-gray-800">
                {progressPercentage === 100 
                  ? 'Absolute legend! You completed your check-in!' 
                  : progressPercentage >= 75 
                  ? 'Almost there, bestie! You`re crushing this!' 
                  : progressPercentage >= 50 
                  ? 'Halfway done! Look at you being consistent!' 
                  : 'Great start! Every step matters in your wellness journey!'
                }
              </h4>
              <p className="text-gray-600 text-sm">
                {progressPercentage === 100 
                  ? 'Your commitment to mental health is absolutely iconic 💚' 
                  : `Just ${totalSteps - currentStep + 1} more steps to complete your daily check-in ✨`
                }
              </p>
            </div>
          </div>
          
          {/* Achievement Badges */}
          <div className="flex justify-center space-x-2 mt-4">
            {progressPercentage >= 25 && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                🌱 Started Strong
              </span>
            )}
            {progressPercentage >= 50 && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                💪 Halfway Hero
              </span>
            )}
            {progressPercentage >= 75 && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                🌟 Almost There
              </span>
            )}
            {progressPercentage === 100 && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium animate-bounce">
                🎉 Check-in Champion
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mini Tips Based on Progress */}
      {progressPercentage < 100 && (
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">💡</span>
            <div>
              <h5 className="font-semibold text-gray-800 text-sm">Quick tip while you're here!</h5>
              <p className="text-gray-600 text-sm">
                {currentStep === 1 && "There's no wrong way to feel - be honest with yourself, bestie! 💖"}
                {currentStep === 2 && "Sleep affects everything - your mood, stress, and energy levels! 😴"}
                {currentStep === 3 && "Acknowledging stress is the first step to managing it. You've got this! 🧘‍♀️"}
                {currentStep === 4 && "Academic confidence naturally fluctuates - that's totally normal! 📚"}
                {currentStep === 5 && "Energy levels help us understand what our bodies need. Listen to yours! ⚡"}
                {currentStep === 6 && "Gratitude can literally rewire your brain for positivity. Science is iconic! 🙏"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckInProgress;