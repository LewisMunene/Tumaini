// src/pages/protected/ResourcePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ResourcePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Mental Health Resources</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Your comprehensive guide to mental health support, wellness resources, and crisis assistance. 
              You're not alone in this journey.
            </p>
          </div>
        </div>
      </div>

      {/* Crisis Support Banner */}
      <div className="bg-red-600 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🚨</span>
              <span className="font-semibold">Crisis Support Available 24/7</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <a href="tel:988" className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                Call 988 - Suicide & Crisis Lifeline
              </a>
              <a href="sms:741741" className="bg-red-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-800 transition-colors">
                Text HOME to 741741
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Crisis Support Section */}
        <section className="mb-16">
          <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">💝</span>
              <h2 className="text-3xl font-bold text-red-800">Immediate Crisis Support</h2>
            </div>
            <p className="text-red-700 mb-6 text-lg leading-relaxed">
              If you're experiencing thoughts of self-harm or suicide, please reach out immediately. 
              Help is available, and you deserve support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-red-200">
                <h3 className="text-xl font-semibold text-red-800 mb-3">National Suicide Prevention Lifeline</h3>
                <p className="text-gray-700 mb-4">Free, confidential support 24/7 for people in distress and prevention resources.</p>
                <div className="space-y-2">
                  <p className="font-semibold text-red-600">📞 Call: 988</p>
                  <p className="font-semibold text-red-600">💬 Text: 988</p>
                  <p className="font-semibold text-red-600">🌐 Chat: suicidepreventionlifeline.org</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-red-200">
                <h3 className="text-xl font-semibold text-red-800 mb-3">Crisis Text Line</h3>
                <p className="text-gray-700 mb-4">24/7 support via text message. Trained crisis counselors available immediately.</p>
                <div className="space-y-2">
                  <p className="font-semibold text-red-600">💬 Text HOME to 741741</p>
                  <p className="font-semibold text-red-600">🌐 crisistextline.org</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Managing Stress & Anxiety */}
        <section className="mb-16">
          <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">🌊</span>
              <h2 className="text-3xl font-bold text-blue-800">Managing Stress & Anxiety</h2>
            </div>
            <p className="text-blue-700 mb-6 text-lg leading-relaxed">
              Learn practical strategies to manage academic stress and everyday anxiety with these trusted resources.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Anxiety and Depression Association of America</h3>
                <p className="text-gray-700 mb-4">Evidence-based resources on anxiety disorders, including college-specific guidance.</p>
                <a href="https://adaa.org/understanding-anxiety/related-illnesses/other-related-conditions/stress/college-students" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                  Read Article <span className="ml-2">→</span>
                </a>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Mindfulness for Students</h3>
                <p className="text-gray-700 mb-4">Free guided meditations and mindfulness exercises specifically designed for academic stress.</p>
                <a href="https://www.headspace.com/students" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                  Explore Resources <span className="ml-2">→</span>
                </a>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Stress Management Techniques</h3>
                <p className="text-gray-700 mb-4">Practical, science-backed stress reduction techniques you can use anywhere.</p>
                <a href="https://www.apa.org/topics/stress/manage" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                  Learn Techniques <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Depression Support */}
        <section className="mb-16">
          <div className="bg-purple-50 rounded-2xl p-8 border-2 border-purple-200">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">🌸</span>
              <h2 className="text-3xl font-bold text-purple-800">Depression Support</h2>
            </div>
            <p className="text-purple-700 mb-6 text-lg leading-relaxed">
              Understanding and managing depression with compassionate, professional resources and support networks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-purple-200">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">National Alliance on Mental Illness (NAMI)</h3>
                <p className="text-gray-700 mb-4">Comprehensive depression resources, support groups, and educational materials for students.</p>
                <a href="https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Depression" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-800">
                  Get Support <span className="ml-2">→</span>
                </a>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-purple-200">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">Depression in College Students</h3>
                <p className="text-gray-700 mb-4">Mayo Clinic's comprehensive guide to recognizing and addressing depression in academic settings.</p>
                <a href="https://www.mayoclinic.org/diseases-conditions/depression/in-depth/depression/art-20047725" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-800">
                  Learn More <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Pressure */}
        <section className="mb-16">
          <div className="bg-orange-50 rounded-2xl p-8 border-2 border-orange-200">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">📚</span>
              <h2 className="text-3xl font-bold text-orange-800">Managing Academic Pressure</h2>
            </div>
            <p className="text-orange-700 mb-6 text-lg leading-relaxed">
              Strategies and resources specifically designed to help students navigate academic challenges and pressure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-orange-200">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Time Management for Students</h3>
                <p className="text-gray-700 mb-4">Evidence-based strategies for managing coursework and reducing academic overwhelm.</p>
                <a href="https://www.khanacademy.org/college-careers-more/college-admissions/applying-to-college/a/time-management-strategies" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-800">
                  Learn Strategies <span className="ml-2">→</span>
                </a>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-orange-200">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Test Anxiety Resources</h3>
                <p className="text-gray-700 mb-4">Techniques to manage exam stress and improve academic performance through anxiety reduction.</p>
                <a href="https://www.apa.org/ed/precollege/psn/2013/09/test-anxiety" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-800">
                  Reduce Test Anxiety <span className="ml-2">→</span>
                </a>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-orange-200">
                <h3 className="text-xl font-semibold text-orange-800 mb-3">Perfectionism & Mental Health</h3>
                <p className="text-gray-700 mb-4">Understanding how perfectionism affects student mental health and practical coping strategies.</p>
                <a href="https://www.psychologytoday.com/us/blog/the-joy-in-between/202008/perfectionism-and-college-students" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-800">
                  Explore Topic <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Self-Care & Wellness */}
        <section className="mb-16">
          <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">🌱</span>
              <h2 className="text-3xl font-bold text-green-800">Self-Care & Wellness</h2>
            </div>
            <p className="text-green-700 mb-6 text-lg leading-relaxed">
              Practical self-care strategies and wellness resources to support your overall mental health journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Building Healthy Habits</h3>
                <p className="text-gray-700 mb-4">Science-backed approaches to developing sustainable wellness routines that fit student life.</p>
                <a href="https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-green-600 font-semibold hover:text-green-800">
                  Start Building <span className="ml-2">→</span>
                </a>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Sleep & Mental Health</h3>
                <p className="text-gray-700 mb-4">Understanding the critical connection between sleep quality and mental wellness for students.</p>
                <a href="https://www.sleepfoundation.org/how-sleep-works/why-do-we-need-sleep/sleep-and-mental-health" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-green-600 font-semibold hover:text-green-800">
                  Improve Sleep <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Building Healthy Relationships */}
        <section className="mb-16">
          <div className="bg-pink-50 rounded-2xl p-8 border-2 border-pink-200">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">🤝</span>
              <h2 className="text-3xl font-bold text-pink-800">Building Healthy Relationships</h2>
            </div>
            <p className="text-pink-700 mb-6 text-lg leading-relaxed">
              Resources for developing and maintaining supportive relationships that contribute to mental wellness.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-pink-200">
                <h3 className="text-xl font-semibold text-pink-800 mb-3">Healthy Communication Skills</h3>
                <p className="text-gray-700 mb-4">Learn effective communication strategies for building stronger, more supportive relationships.</p>
                <a href="https://www.psychologytoday.com/us/basics/communication" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-pink-600 font-semibold hover:text-pink-800">
                  Improve Communication <span className="ml-2">→</span>
                </a>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-pink-200">
                <h3 className="text-xl font-semibold text-pink-800 mb-3">Setting Healthy Boundaries</h3>
                <p className="text-gray-700 mb-4">Understanding and practicing healthy boundary-setting for better mental health and relationships.</p>
                <a href="https://www.verywellmind.com/what-are-personal-boundaries-how-do-i-get-some-3145055" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center text-pink-600 font-semibold hover:text-pink-800">
                  Learn About Boundaries <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Campus Resources */}
        <section className="mb-16">
          <div className="bg-indigo-50 rounded-2xl p-8 border-2 border-indigo-200">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">🏫</span>
              <h2 className="text-3xl font-bold text-indigo-800">Campus & Local Resources</h2>
            </div>
            <p className="text-indigo-700 mb-6 text-lg leading-relaxed">
              Connect with professional mental health services at Strathmore University and in the local community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-200">
                <h3 className="text-xl font-semibold text-indigo-800 mb-3">Strathmore University Counseling Services</h3>
                <p className="text-gray-700 mb-4">Professional counseling and mental health support available to all Strathmore students.</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📧 Email: counseling@strathmore.edu</p>
                  <p>📞 Phone: +254 703 034 000</p>
                  <p>📍 Location: Student Centre, Ground Floor</p>
                  <p>🕐 Hours: Monday-Friday, 8:00 AM - 5:00 PM</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-200">
                <h3 className="text-xl font-semibold text-indigo-800 mb-3">Kenya Mental Health Helpline</h3>
                <p className="text-gray-700 mb-4">Free, confidential mental health support available 24/7 for all Kenyan residents.</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📞 Toll-Free: 0800 720 606</p>
                  <p>📱 WhatsApp: 0711 693 990</p>
                  <p>📧 Email: info@ke.emergency.org</p>
                  <p>🌐 Available in English and Kiswahili</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Back to Dashboard */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Continue Your Wellness Journey?</h2>
            <p className="text-blue-100 mb-6 text-lg">
              Return to your dashboard to track your progress, journal your thoughts, or check in with how you're feeling.
            </p>
            <Link 
              to="/home" 
              className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Back to Dashboard <span className="ml-2">→</span>
            </Link>
          </div>
        </section>

      </div>

      {/* Encouraging Footer Message */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700 italic leading-relaxed">
            "Your mental health journey is valid, your feelings matter, and you're making a positive difference just by seeking support. 
            Keep going - you've got this!" 💙
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;