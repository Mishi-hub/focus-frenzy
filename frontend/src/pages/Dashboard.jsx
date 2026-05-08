import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Timer from '../components/Timer'
import Leaderboard from '../components/Leaderboard'
import Store from '../components/Store'
import { FaClock, FaTrophy, FaStore } from 'react-icons/fa'

const Dashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('timer')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold">Welcome back, {user?.name}! 👋</h2>
          <p>Stay focused, earn coins, and climb the leaderboard!</p>
        </div>
        
        {/* Navigation */}
        <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-xl max-w-md mx-auto mb-8">
          {[
            { id: 'timer', label: 'Timer', icon: <FaClock /> },
            { id: 'leaderboard', label: 'Leaderboard', icon: <FaTrophy /> },
            { id: 'store', label: 'Store', icon: <FaStore /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        
        {/* Content */}
        {activeTab === 'timer' && <Timer />}
        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'store' && <Store />}
      </div>
    </div>
  )
}

export default Dashboard