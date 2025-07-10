import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🌟 Tumaini Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Academic Stress Management for Strathmore University Students
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Welcome to Your Wellness Journey
            </h2>
            <p className="text-gray-700 mb-6">
              Track your stress, journal your thoughts, and connect with peer support.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
