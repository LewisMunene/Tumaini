// src/pages/protected/DailyCheckInPage.jsx - Your wellness journey bestie! 🌟✨
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { submitDailyCheckIn, hasCheckedInToday } from "../../services/checkInService";
import MoodSelector from '../../components/checkin/MoodSelector';
import SleepQualitySlider from '../../components/checkin/SleepQualitySlider';
import StressSlider from '../../components/checkin/StressSlider';
import CheckInProgress from '../../components/checkin/CheckInProgress';
import CheckInSuccess from '../../components/checkin/CheckInSuccess';

const DailyCheckInPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkInData, setCheckInData] = useState({
    mood: null,
    sleepQuality: null,
    stressLevel: null,
    academicConfidence: null,
    gratitude: '',
    energyLevel: null,
  });

  // Check if user already checked in today
  useEffect(() => {
    const checkTodayStatus = async () => {
      if (currentUser) {
        const alreadyCheckedIn = await hasCheckedInToday(currentUser.uid);
        if (alreadyCheckedIn) {
          // Redirect back home with a message
          alert('You\'ve already checked in today, bestie! Come back tomorrow for another check-in ✨');
          navigate('/home');
        }
      }
    };
    
    checkTodayStatus();
  }, [currentUser, navigate]);

  const steps = [
    { id: 1, title: 'How are you feeling?', component: 'mood', icon: '💖' },
    { id: 2, title: 'Sleep check-in', component: 'sleep', icon: '😴' },
    { id: 3, title: 'Stress levels', component: 'stress', icon: '🧘‍♀️' },
    { id: 4, title: 'Academic confidence', component: 'academic', icon: '📚' },
    { id: 5, title: 'Energy vibes', component: 'energy', icon: '⚡' },
    { id: 6, title: 'Quick gratitude', component: 'gratitude', icon: '🙏' },
  ];

  const totalSteps = steps.length;

  const handleNext = () => {
    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit to database and show success
      submitCheckInData();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitCheckInData = async () => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting check-in data to Firebase:', checkInData);
      
      // Submit to Firebase - this is where the magic happens! ✨
      const result = await submitDailyCheckIn(checkInData);
      
      if (result.success) {
        // Mark final step as completed
        setCompletedSteps(prev => [...prev, currentStep]);
        
        // Show success page with the data for personalized insights
        setCurrentStep('success');
        
        console.log('🎉 Check-in submitted successfully!', result);
      } else {
        // Handle error gracefully - we don't want to stress our users!
        console.error('Failed to submit check-in:', result.error);
        alert('Oops! Something went wrong saving your check-in. But your feelings are still valid, bestie! Try again? 💜');
      }
      
    } catch (error) {
      console.error('Error submitting check-in:', error);
      alert('Something went wrong, but it\'s not your fault! Your wellness journey is still amazing! ✨');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateCheckInData = (key, value) => {
    setCheckInData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getCurrentStepData = () => {
    const step = steps.find(s => s.id === currentStep);
    return step;
  };

  const isStepComplete = () => {
    const step = getCurrentStepData();
    if (!step) return false;
    
    switch (step.component) {
      case 'mood':
        return checkInData.mood !== null;
      case 'sleep':
        return checkInData.sleepQuality !== null;
      case 'stress':
        return checkInData.stressLevel !== null;
      case 'academic':
        return checkInData.academicConfidence !== null;
      case 'energy':
        return checkInData.energyLevel !== null;
      case 'gratitude':
        return checkInData.gratitude.trim() !== '';
      default:
        return false;
    }
  };

  // Show success page
  if (currentStep === 'success') {
    return (
      <CheckInSuccess 
        onComplete={() => navigate('/home')}
        checkInData={checkInData}
      />
    );
  }

  const currentStepData = getCurrentStepData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Component - This is so satisfying to watch! */}
        <div className="mb-8">
          <CheckInProgress 
            currentStep={currentStep}
            totalSteps={totalSteps}
            completedSteps={completedSteps}
          />
        </div>

        {/* Back Button - Clean and simple */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/home')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors group"
          >
            <span className="text-2xl mr-2 group-hover:translate-x-[-2px] transition-transform">←</span>
            <span>Back to home</span>
          </button>
        </div>

        {/* Current Step Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">{currentStepData?.icon}</span>
            <h1 className="text-3xl font-bold text-gray-800">
              {currentStepData?.title}
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            You're doing amazing, bestie! Keep being real with yourself ✨
          </p>
        </div>

        {/* Component Rendering - Where the magic happens! */}
        <div className="mb-8">
          {currentStep === 1 && (
            <MoodSelector
              selectedMood={checkInData.mood}
              onMoodSelect={(mood) => updateCheckInData('mood', mood)}
            />
          )}
          
          {currentStep === 2 && (
            <SleepQualitySlider
              selectedSleep={checkInData.sleepQuality}
              onSleepSelect={(sleep) => updateCheckInData('sleepQuality', sleep)}
            />
          )}

          {currentStep === 3 && (
            <StressSlider
              selectedStress={checkInData.stressLevel}
              onStressSelect={(stress) => updateCheckInData('stressLevel', stress)}
            />
          )}

          {currentStep === 4 && (
            <AcademicConfidenceComponent
              selectedConfidence={checkInData.academicConfidence}
              onConfidenceSelect={(confidence) => updateCheckInData('academicConfidence', confidence)}
            />
          )}

          {currentStep === 5 && (
            <EnergyLevelComponent
              selectedEnergy={checkInData.energyLevel}
              onEnergySelect={(energy) => updateCheckInData('energyLevel', energy)}
            />
          )}

          {currentStep === 6 && (
            <GratitudeComponent
              gratitude={checkInData.gratitude}
              onGratitudeChange={(gratitude) => updateCheckInData('gratitude', gratitude)}
            />
          )}
        </div>

        {/* Navigation Buttons - Clean and accessible */}
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 shadow-sm'
            }`}
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepComplete() || isSubmitting}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              isStepComplete() && !isSubmitting
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting 
              ? 'Saving your vibes... ✨' 
              : currentStep === totalSteps 
              ? 'Complete Check-in! 🎉' 
              : 'Next →'
            }
          </button>
        </div>

        {/* Encouraging Message - Because you deserve it! */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm italic max-w-md mx-auto">
            "Your mental health journey is valid, your feelings matter, and you're absolutely crushing it just by being here." 💚
          </p>
        </div>
      </div>
    </div>
  );
};

// Quick inline components for steps we haven't built separate files for yet
const AcademicConfidenceComponent = ({ selectedConfidence, onConfidenceSelect }) => (
  <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        How confident do you feel about your academics right now? 📚
      </h2>
      <p className="text-gray-600">
        Academic confidence naturally fluctuates - that's totally normal, bestie! ✨
      </p>
    </div>

    {selectedConfidence && (
      <div className="text-center mb-8">
        <div className="inline-block p-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-300 shadow-md">
          <span className="text-4xl">📚</span>
        </div>
        <p className="mt-3 text-lg font-medium text-gray-800">
          {selectedConfidence}/10 - {
            selectedConfidence >= 8 ? 'Academic queen energy!' :
            selectedConfidence >= 6 ? 'Solid confidence vibes!' :
            selectedConfidence >= 4 ? 'It\'s okay to have doubts!' :
            'Struggling is valid, bestie!'
          }
        </p>
      </div>
    )}

    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500 font-medium">Not Confident</span>
        <span className="text-sm text-gray-500 font-medium">Super Confident</span>
      </div>
      
      <div className="relative mb-6">
        <div className="w-full h-4 bg-gray-200 rounded-full shadow-inner">
          <div 
            className="h-4 bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 rounded-full transition-all duration-300"
            style={{ width: selectedConfidence ? `${(selectedConfidence / 10) * 100}%` : '0%' }}
          ></div>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={selectedConfidence || 5}
          onChange={(e) => onConfidenceSelect(parseInt(e.target.value))}
          className="absolute top-0 left-0 w-full h-4 opacity-0 cursor-pointer"
        />
      </div>
    </div>

    {selectedConfidence && selectedConfidence <= 4 && (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Quick academic confidence boost!</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Remember: grades don't define your worth, periodt! 💅</li>
              <li>• Focus on progress, not perfection ✨</li>
              <li>• Consider reaching out to professors or tutors</li>
              <li>• You're more capable than you think, bestie! 🌟</li>
            </ul>
          </div>
        </div>
      </div>
    )}

    {selectedConfidence && (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
        <p className="text-yellow-800 font-medium">
          Academic confidence is a journey, not a destination. You're exactly where you need to be! 📚💛
        </p>
      </div>
    )}
  </div>
);

const EnergyLevelComponent = ({ selectedEnergy, onEnergySelect }) => (
  <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        What's your energy level today? ⚡
      </h2>
      <p className="text-gray-600">
        Your energy is valid whether you're battery at 10% or 100%! No judgment here ✨
      </p>
    </div>

    {selectedEnergy && (
      <div className="text-center mb-8">
        <div className="inline-block p-6 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 transition-all duration-300 shadow-md">
          <span className="text-4xl">
            {selectedEnergy <= 3 ? '🔋' : selectedEnergy <= 6 ? '⚡' : selectedEnergy <= 8 ? '🔥' : '✨'}
          </span>
        </div>
        <p className="mt-3 text-lg font-medium text-gray-800">
          {selectedEnergy}/10 - {
            selectedEnergy >= 8 ? 'High energy bestie!' :
            selectedEnergy >= 6 ? 'Good energy vibes!' :
            selectedEnergy >= 4 ? 'Moderate energy!' :
            'Low battery mode, and that\'s okay!'
          }
        </p>
      </div>
    )}

    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500 font-medium">Drained</span>
        <span className="text-sm text-gray-500 font-medium">Energized</span>
      </div>
      
      <div className="relative mb-6">
        <div className="w-full h-4 bg-gray-200 rounded-full shadow-inner">
          <div 
            className="h-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 rounded-full transition-all duration-300"
            style={{ width: selectedEnergy ? `${(selectedEnergy / 10) * 100}%` : '0%' }}
          ></div>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={selectedEnergy || 5}
          onChange={(e) => onEnergySelect(parseInt(e.target.value))}
          className="absolute top-0 left-0 w-full h-4 opacity-0 cursor-pointer"
        />
      </div>
    </div>

    {selectedEnergy && (
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
        <p className="text-orange-800 font-medium">
          {selectedEnergy <= 4 
            ? "Low energy is your body asking for care. Listen to it, bestie! 🧡" 
            : "That energy is everything! Keep protecting those good vibes! ⚡"
          }
        </p>
      </div>
    )}
  </div>
);

const GratitudeComponent = ({ gratitude, onGratitudeChange }) => (
  <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        What's one thing you're grateful for today? 🙏
      </h2>
      <p className="text-gray-600">
        Gratitude can literally rewire your brain for positivity. Science is iconic! Even the smallest things count ✨
      </p>
    </div>

    <div className="mb-6">
      <textarea
        value={gratitude}
        onChange={(e) => onGratitudeChange(e.target.value)}
        placeholder="Even the smallest things count, bestie... like that perfect cup of coffee, a text from a friend, or just making it through Monday! ✨"
        className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
        rows="4"
      />
    </div>

    {gratitude.trim() && (
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center mb-6">
        <p className="text-purple-800 font-medium">
          Beautiful! Gratitude is such a powerful practice - you're literally training your brain to notice the good! 💜
        </p>
      </div>
    )}

    <div className="text-center">
      <p className="text-sm text-gray-500 italic">
        "Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow." ✨
      </p>
    </div>
  </div>
);

export default DailyCheckInPage;