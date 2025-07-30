// src/components/layout/Footer.jsx - REUSABLE STRATHMORE FOOTER! 🎓✨
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section with Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {/* Tumaini Logo in Footer - Resized to be more proportional */}
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
            </p>
          </div>
          
          {/* Support Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Emergency Support</h4>
            <div className="space-y-2 text-blue-100 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-red-400">🆘</span>
                <span>Crisis Hotline:  (Kenya)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>Campus Counseling:</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️</span>
                <a href="" className="hover:text-white transition-colors">
                  wellness@strathmore.edu
                </a>
              </div>
            </div>
          </div>
          
          {/* Resources Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Resources</h4>
            <div className="space-y-2 text-blue-100 text-sm">
              <div className="flex items-center space-x-2">
                <span>🩺</span>
                <span>Mental Health First Aid</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📚</span>
                <span>Academic Stress Guide</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🤝</span>
                <span>Peer Support Groups</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🧘‍♀️</span>
                <span>Mindfulness Resources</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-200 text-sm text-center md:text-left">
              &copy; 2025 Tumaini Platform. Built with ❤️ for Strathmore University students.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-blue-200 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-blue-200 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-blue-200 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;