// src/components/analytics/WellnessAnalytics.jsx - Your data bestie! 📊✨
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const WellnessAnalytics = ({ analyticsData, timeRange = 'weekly' }) => {
  const [activeMetric, setActiveMetric] = useState('overview');
  const [chartType, setChartType] = useState('line');

  // Mock data structure - this will be replaced with real Firebase data
  const generateMockData = () => {
    const days = timeRange === 'daily' ? 7 : timeRange === 'weekly' ? 4 : timeRange === 'monthly' ? 12 : 52;
    const timeLabel = timeRange === 'daily' ? 'Day' : timeRange === 'weekly' ? 'Week' : timeRange === 'monthly' ? 'Month' : 'Week';
    
    return Array.from({ length: days }, (_, i) => ({
      name: `${timeLabel} ${i + 1}`,
      mood: Math.floor(Math.random() * 5) + 5, // 5-10 range
      stress: Math.floor(Math.random() * 6) + 3, // 3-8 range  
      sleep: Math.floor(Math.random() * 4) + 6, // 6-10 range
      energy: Math.floor(Math.random() * 5) + 4, // 4-9 range
      academic: Math.floor(Math.random() * 6) + 4, // 4-10 range
      wellness: Math.floor(Math.random() * 30) + 65, // 65-95 range
      entries: Math.floor(Math.random() * 3) + 1 // 1-4 entries
    }));
  };

  const [chartData, setChartData] = useState(generateMockData());

  useEffect(() => {
    setChartData(generateMockData());
  }, [timeRange]);

  const metrics = [
    { key: 'overview', label: 'Overview', icon: '📊', color: '#8884d8' },
    { key: 'mood', label: 'Mood Tracking', icon: '💖', color: '#ff7c7c' },
    { key: 'stress', label: 'Stress Levels', icon: '🧘‍♀️', color: '#82ca9d' },
    { key: 'sleep', label: 'Sleep Quality', icon: '😴', color: '#8dd1e1' },
    { key: 'energy', label: 'Energy Levels', icon: '⚡', color: '#ffc658' },
    { key: 'academic', label: 'Academic Confidence', icon: '📚', color: '#d084d0' }
  ];

  const chartTypes = [
    { key: 'line', label: 'Line Chart', icon: '📈' },
    { key: 'bar', label: 'Bar Chart', icon: '📊' },
    { key: 'radar', label: 'Wellness Radar', icon: '🎯' }
  ];

  const getMetricColor = (metric) => {
    const colorMap = {
      mood: '#ff7c7c',
      stress: '#82ca9d', 
      sleep: '#8dd1e1',
      energy: '#ffc658',
      academic: '#d084d0',
      wellness: '#8884d8'
    };
    return colorMap[metric] || '#8884d8';
  };

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e0e0e0', 
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        />
        <Legend />
        
        {activeMetric === 'overview' ? (
          <>
            <Line type="monotone" dataKey="mood" stroke="#ff7c7c" strokeWidth={3} name="Mood" />
            <Line type="monotone" dataKey="stress" stroke="#82ca9d" strokeWidth={3} name="Stress" />
            <Line type="monotone" dataKey="sleep" stroke="#8dd1e1" strokeWidth={3} name="Sleep" />
            <Line type="monotone" dataKey="energy" stroke="#ffc658" strokeWidth={3} name="Energy" />
          </>
        ) : (
          <Line 
            type="monotone" 
            dataKey={activeMetric} 
            stroke={getMetricColor(activeMetric)} 
            strokeWidth={4} 
            name={metrics.find(m => m.key === activeMetric)?.label}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e0e0e0', 
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        />
        <Legend />
        
        {activeMetric === 'overview' ? (
          <>
            <Bar dataKey="mood" fill="#ff7c7c" name="Mood" radius={[4, 4, 0, 0]} />
            <Bar dataKey="stress" fill="#82ca9d" name="Stress" radius={[4, 4, 0, 0]} />
            <Bar dataKey="sleep" fill="#8dd1e1" name="Sleep" radius={[4, 4, 0, 0]} />
            <Bar dataKey="energy" fill="#ffc658" name="Energy" radius={[4, 4, 0, 0]} />
          </>
        ) : (
          <Bar 
            dataKey={activeMetric} 
            fill={getMetricColor(activeMetric)} 
            name={metrics.find(m => m.key === activeMetric)?.label}
            radius={[8, 8, 0, 0]}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );

  const renderRadarChart = () => {
    const radarData = chartData.slice(-1).map(item => [
      { subject: 'Mood', A: item.mood, fullMark: 10 },
      { subject: 'Sleep', A: item.sleep, fullMark: 10 },
      { subject: 'Energy', A: item.energy, fullMark: 10 },
      { subject: 'Academic', A: item.academic, fullMark: 10 },
      { subject: 'Low Stress', A: 11 - item.stress, fullMark: 10 }, // Invert stress for radar
    ])[0];

    return (
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={radarData} margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
          <PolarGrid stroke="#e0e0e0" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#666' }} />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 10]} 
            tick={{ fontSize: 10, fill: '#666' }}
          />
          <Radar
            name="Current Wellness"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
            strokeWidth={3}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e0e0e0', 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return renderBarChart();
      case 'radar':
        return renderRadarChart();
      default:
        return renderLineChart();
    }
  };

  const getInsightMessage = () => {
    const latestData = chartData[chartData.length - 1];
    const avgMood = chartData.reduce((sum, d) => sum + d.mood, 0) / chartData.length;
    const avgStress = chartData.reduce((sum, d) => sum + d.stress, 0) / chartData.length;
    
    if (avgMood >= 8 && avgStress <= 4) {
      return {
        type: 'positive',
        icon: '🌟',
        title: 'You\'re absolutely crushing it, bestie!',
        message: 'Your mood is consistently high and stress levels are well-managed. Keep protecting this energy!'
      };
    } else if (avgStress >= 7) {
      return {
        type: 'concern',
        icon: '🫂',
        title: 'We see those stress levels, fam',
        message: 'Your stress has been elevated lately. Remember, it\'s okay to ask for support. You don\'t have to handle everything alone.'
      };
    } else {
      return {
        type: 'neutral',
        icon: '💪',
        title: 'Your wellness journey is valid!',
        message: 'Every day is different, and that\'s completely normal. What matters is that you\'re showing up for yourself.'
      };
    }
  };

  const insight = getInsightMessage();

  return (
    <div className="w-full space-y-6">
      {/* Header with Metric Selection */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your Wellness Analytics 📊✨
            </h2>
            <p className="text-gray-600">
              Track your patterns and celebrate your growth, bestie! 💚
            </p>
          </div>
          
          {/* Chart Type Selector */}
          <div className="flex space-x-2 mt-4 md:mt-0">
            {chartTypes.map((type) => (
              <button
                key={type.key}
                onClick={() => setChartType(type.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  chartType === type.key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.icon} {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setActiveMetric(metric.key)}
              className={`p-4 rounded-2xl text-center transition-all ${
                activeMetric === metric.key
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="text-2xl mb-1">{metric.icon}</div>
              <div className="text-sm font-medium">{metric.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {metrics.find(m => m.key === activeMetric)?.icon} {' '}
            {metrics.find(m => m.key === activeMetric)?.label || 'Overview'}
          </h3>
          <p className="text-gray-600 text-sm">
            {timeRange === 'daily' ? 'Last 7 days' : 
             timeRange === 'weekly' ? 'Last 4 weeks' :
             timeRange === 'monthly' ? 'Last 12 months' : 'This year'} - 
            Your patterns are telling a story, bestie! 📖
          </p>
        </div>
        
        {renderChart()}
      </div>

      {/* Insights Panel */}
      <div className={`rounded-3xl shadow-lg p-6 border ${
        insight.type === 'positive' ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200' :
        insight.type === 'concern' ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200' :
        'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
      }`}>
        <div className="flex items-start space-x-4">
          <span className="text-4xl">{insight.icon}</span>
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              {insight.title}
            </h4>
            <p className="text-gray-700 mb-4">
              {insight.message}
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {(chartData.reduce((sum, d) => sum + d.mood, 0) / chartData.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Avg Mood</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {(chartData.reduce((sum, d) => sum + d.stress, 0) / chartData.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Avg Stress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {(chartData.reduce((sum, d) => sum + d.sleep, 0) / chartData.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Avg Sleep</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {chartData.reduce((sum, d) => sum + d.entries, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Entries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Encouraging Note */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 text-center">
        <h4 className="text-lg font-bold text-gray-800 mb-2">
          You're doing amazing, sweetie! 💅✨
        </h4>
        <p className="text-gray-600">
          Every data point represents your commitment to self-care. That's literally iconic behavior right there! 
          Keep showing up for yourself - we're here for this wellness journey! 🌈💚
        </p>
      </div>
    </div>
  );
};

export default WellnessAnalytics;