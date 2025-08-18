// src/components/layout/Footer.jsx - ENHANCED MENTAL HEALTH ADVOCACY FOOTER! 🎓💙✨
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section with Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {/* Tumaini Logo in Footer - Keeping it exactly as requested! */}
              <img 
                src="/assets/logos/tumaini-logo.png" 
                alt="Tumaini Logo" 
                className="h-16 w-auto object-contain"
              />
              {/* Fallback text logo if image fails */}
              <div className="flex items-center space-x-2">
                <div>
                  <h3 className="text-xl font-bold">Tumaini</h3>
                  <p className="text-blue-200 text-sm">Student Wellness Platform</p>
                </div>
              </div>
            </div>
            <p className="text-blue-100 leading-relaxed text-sm max-w-md">
              Empowering Strathmore University students with accessible, 
              comprehensive mental health support and wellness tools. 
              Because your mental health matters, bestie! 💙
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Platform Links</h4>
            <div className="space-y-2 text-blue-100 text-sm">
              <Link to="/home" className="flex items-center space-x-2 hover:text-white transition-colors group">
                <span>🏠</span>
                <span className="group-hover:underline">Dashboard</span>
              </Link>
              <Link to="/daily-checkin" className="flex items-center space-x-2 hover:text-white transition-colors group">
                <span>✨</span>
                <span className="group-hover:underline">Daily Check-in</span>
              </Link>
              <Link to="/journal" className="flex items-center space-x-2 hover:text-white transition-colors group">
                <span>📖</span>
                <span className="group-hover:underline">Journal</span>
              </Link>
              <Link to="/analytics" className="flex items-center space-x-2 hover:text-white transition-colors group">
                <span>📊</span>
                <span className="group-hover:underline">Progress Analytics</span>
              </Link>
              <Link to="/resources" className="flex items-center space-x-2 hover:text-white transition-colors group">
                <span>🌟</span>
                <span className="group-hover:underline">Mental Health Resources</span>
              </Link>
            </div>
          </div>
          
          {/* Emergency Support Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Emergency Support</h4>
            <div className="space-y-2 text-blue-100 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-red-400">🆘</span>
                <a href="tel:+254722178177" className="hover:text-white transition-colors hover:underline">
                  Crisis Hotline: 722-178-177
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <a href="tel:+254703034000" className="hover:text-white transition-colors hover:underline">
                  Campus Counseling: 0703-034-000
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️</span>
                <a href="mailto:wellness@strathmore.edu" className="hover:text-white transition-colors hover:underline">
                  wellness@strathmore.edu
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>🏥</span>
                <span>24/7 Crisis Text: Text "HELLO" to 741741</span>
              </div>
            </div>
          </div>
          
          {/* Mental Health Resources Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Wellness Resources</h4>
            <div className="space-y-2 text-blue-100 text-sm">
              <a href="https://www.who.int/news-room/fact-sheets/detail/mental-disorders" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-white transition-colors group">
                <span>🩺</span>
                <span className="group-hover:underline">Mental Health First Aid</span>
              </a>
              <a href="https://www.mindgarden.com/maslach-burnout-toolkit" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-white transition-colors group">
                <span>📚</span>
                <span className="group-hover:underline">Academic Stress Guide</span>
              </a>
              <a href="https://www.nami.org/Support-Education/Support-Groups" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-white transition-colors group">
                <span>🤝</span>
                <span className="group-hover:underline">Peer Support Groups</span>
              </a>
              <a href="https://www.headspace.com/students" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-white transition-colors group">
                <span>🧘‍♀️</span>
                <span className="group-hover:underline">Mindfulness Resources</span>
              </a>
              <a href="https://suicidepreventionlifeline.org/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-white transition-colors group text-yellow-300">
                <span>💛</span>
                <span className="group-hover:underline font-medium">Suicide Prevention Resources</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-200 text-sm text-center md:text-left">
              &copy; 2025 Tumaini Platform. Built with 💙 for Strathmore University students. Your mental health matters!
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-blue-200 hover:text-white transition-colors hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-blue-200 hover:text-white transition-colors hover:underline">
                Terms of Service
              </Link>
              <Link to="/about" className="text-blue-200 hover:text-white transition-colors hover:underline">
                About Us
              </Link>
              <Link to="/contact" className="text-blue-200 hover:text-white transition-colors hover:underline">
                Contact Support
              </Link>
            </div>
          </div>
          
          {/* Mental Health Disclaimer */}
          <div className="mt-6 p-4 bg-blue-800/50 rounded-xl border border-blue-700">
            <p className="text-blue-100 text-xs text-center leading-relaxed">
              <span className="font-medium">Important:</span> Tumaini provides mental health support and resources but is not a substitute for professional medical care. 
              If you're experiencing a mental health emergency, please contact emergency services or visit your nearest hospital immediately. 
              You matter, and help is always available. 💙
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;