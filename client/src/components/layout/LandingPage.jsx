// src/components/LandingPage.jsx - MENTAL HEALTH ADVOCACY QUEEN! 💙✨
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <Header showAuth={true} showNavigation={false} />
      
      {/* Hero Section - Mental Health Awareness */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 to-white">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-blue-200/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-blue-300/40 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Attention-grabbing headline */}
            <div className="space-y-6">
              
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                <span className="block text-gray-900">Your Mental Health</span>
                <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                  Matters More Than Your GPA
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                You're not alone in this struggle. <span className="font-semibold text-blue-800">45.1% of students</span> experience depression 
                that affects their daily life. It's time to prioritize your wellbeing alongside your education.
              </p>
            </div>

            {/* Motivational quote */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-3xl p-8 max-w-4xl mx-auto shadow-xl">
              <blockquote className="text-xl sm:text-2xl italic leading-relaxed">
                "Taking care of your mental health is not selfish. It's self-preservation. 
                You cannot pour from an empty cup."
              </blockquote>
              <cite className="block mt-4 text-lg font-medium text-blue-100">- Mental Health Advocates</cite>
            </div>

            {/* Call to Action */}
            <div className="space-y-6 pt-4">
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Ready to break the stigma and take control of your mental wellbeing? 
                Join the <span className="font-bold text-blue-800">Tumaini</span> community - where healing begins.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/register"
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
                >
                  <span className="text-2xl">💙</span>
                  <span>Start Your Healing Journey</span>
                </Link>
                
                <Link
                  to="/login"
                  className="group bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
                >
                  <span className="text-2xl">→</span>
                  <span>Continue Your Journey</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reality Check Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Let's Talk About What's Really Happening
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The stats don't lie - academic stress is real, and it's affecting students across Kenya and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-red-50 rounded-2xl border-2 border-red-100">
              <div className="text-4xl sm:text-5xl font-bold text-red-600 mb-4">87.4%</div>
              <div className="text-lg font-semibold text-red-800 mb-2">Students Feel Overwhelmed</div>
              <div className="text-gray-600">by academic demands and pressure</div>
            </div>
            
            <div className="text-center p-8 bg-orange-50 rounded-2xl border-2 border-orange-100">
              <div className="text-4xl sm:text-5xl font-bold text-orange-600 mb-4">45.1%</div>
              <div className="text-lg font-semibold text-orange-800 mb-2">Experience Depression</div>
              <div className="text-gray-600">that significantly impacts daily life</div>
            </div>
            
            <div className="text-center p-8 bg-yellow-50 rounded-2xl border-2 border-yellow-100">
              <div className="text-4xl sm:text-5xl font-bold text-yellow-600 mb-4">65.6%</div>
              <div className="text-lg font-semibold text-yellow-800 mb-2">Feel Lonely</div>
              <div className="text-gray-600">struggling with social connections</div>
            </div>
          </div>

          {/* Inspirational Quote */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 text-center max-w-4xl mx-auto">
            <blockquote className="text-2xl sm:text-3xl font-bold text-gray-900 leading-relaxed mb-4">
              "You are braver than you believe, stronger than you seem, 
              and more loved than you'll ever know."
            </blockquote>
            <cite className="text-lg text-gray-600">- A.A. Milne</cite>
          </div>
        </div>
      </section>

      {/* Mental Health Awareness Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Your Mental Health Journey Starts With One Decision
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              The decision to prioritize yourself. To break the silence. To seek support. 
              You've already taken the first step by being here.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Motivational Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <span className="text-2xl mr-3">💪</span>
                    You Are Not Your Struggles
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    Academic stress doesn't define you. Bad grades don't define you. 
                    Mental health challenges don't define you. You are a whole person worthy of support and healing.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <span className="text-2xl mr-3">🌱</span>
                    Healing Is Not Linear
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    Some days will be harder than others. Progress isn't always visible. 
                    But every small step toward caring for your mental health matters.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <span className="text-2xl mr-3">🤝</span>
                    You Don't Have To Do This Alone
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    Asking for help is a sign of strength, not weakness. 
                    Community and support can be the difference between surviving and thriving.
                  </p>
                </div>
              </div>
            </div>

            {/* Inspiring Quote Section */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <blockquote className="text-2xl italic leading-relaxed mb-6">
                  "Mental health is not a destination, but a process. 
                  It's about how you drive, not where you're going."
                </blockquote>
                <cite className="text-blue-200 font-medium">- Noam Shpancer</cite>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <blockquote className="text-2xl italic leading-relaxed mb-6">
                  "Your current situation is not your final destination. 
                  The best is yet to come."
                </blockquote>
                <cite className="text-blue-200 font-medium">- Mental Health Advocates</cite>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <blockquote className="text-2xl italic leading-relaxed mb-6">
                  "You have been assigned this mountain to show others it can be moved."
                </blockquote>
                <cite className="text-blue-200 font-medium">- Mel Robbins</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breaking Stigma Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Let's Break The Stigma Together
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mental health conversations are changing lives across university campuses. 
              Your story could be the one that helps someone else feel less alone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Myth Busting */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">❌</span>
                Myths We're Busting
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-xl border-l-4 border-red-400">
                  <p className="font-semibold text-red-800">"Mental health issues are just weakness"</p>
                  <p className="text-red-600 text-sm mt-1">Mental health conditions are medical conditions, not character flaws.</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border-l-4 border-red-400">
                  <p className="font-semibold text-red-800">"Only 'crazy' people need therapy"</p>
                  <p className="text-red-600 text-sm mt-1">Therapy is self-care and personal growth for everyone.</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border-l-4 border-red-400">
                  <p className="font-semibold text-red-800">"Just think positive thoughts"</p>
                  <p className="text-red-600 text-sm mt-1">Mental health requires real strategies and sometimes professional support.</p>
                </div>
              </div>
            </div>

            {/* Truth Telling */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">✅</span>
                Truths We're Embracing
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
                  <p className="font-semibold text-green-800">Mental health is health, period.</p>
                  <p className="text-green-600 text-sm mt-1">Just like physical health, it requires attention and care.</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
                  <p className="font-semibold text-green-800">Seeking help shows courage and wisdom.</p>
                  <p className="text-green-600 text-sm mt-1">It takes strength to recognize when you need support.</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
                  <p className="font-semibold text-green-800">Your feelings are valid and matter.</p>
                  <p className="text-green-600 text-sm mt-1">Don't minimize your experience - your mental health matters.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Ready To Prioritize Your Mental Health?
            </h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto border border-white/20">
              <blockquote className="text-2xl italic leading-relaxed mb-4">
                "The greatest revolution of our generation is the discovery that human beings, 
                by changing the inner attitudes of their minds, can change the outer aspects of their lives."
              </blockquote>
              <cite className="text-blue-200 font-medium">- William James</cite>
            </div>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your mental health journey matters. Your story matters. You matter. 
              Join thousands of Strathmore students who are choosing healing over hiding.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                to="/register"
                className="group bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
              >
                <span className="text-2xl">🌱</span>
                <span>Begin Your Healing Today</span>
              </Link>
              
              <Link
                to="/login"
                className="group border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
              >
                <span className="text-2xl">💙</span>
                <span>Welcome Back, Warrior</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Using the reusable Footer component */}
      <Footer />
    </div>
  );
};

export default LandingPage;