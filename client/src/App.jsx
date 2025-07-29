// src/App.jsx
import React from 'react';
import Header from './components/layout/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Show the header with auth props since we're testing */}
      <Header showAuth={true} />
      
      {/* Temporary content to see our header in action */}
      <main className="main-content">
        <div className="welcome-section">
          <div className="container">
            <h1 className="welcome-title">
              🌟 Tumaini Platform Preview 🌟
            </h1>
            <p className="welcome-text">
              Welcome to the future of student wellness at Strathmore University! 
              Our header is serving those official university vibes while keeping 
              mental health support front and center. ✨
            </p>
            
            <div className="preview-features">
              <div className="feature-card">
                <h3>🔐 Secure Authentication</h3>
                <p>University email validation with Google sign-in option</p>
              </div>
              
              <div className="feature-card">
                <h3>📊 Stress Tracking</h3>
                <p>Daily wellness check-ins with mood and sleep monitoring</p>
              </div>
              
              <div className="feature-card">
                <h3>📝 Digital Journaling</h3>
                <p>Private journaling with sentiment analysis for crisis detection</p>
              </div>
              
              <div className="feature-card">
                <h3>🆘 Crisis Support</h3>
                <p>Immediate access to crisis resources and counselor alerts</p>
              </div>
            </div>
            
            <div className="coming-soon">
              <h2>Coming Soon: Authentication Pages! 🚀</h2>
              <p>We're about to build the most beautiful login/register experience!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;