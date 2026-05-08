import React from 'react'
import { FaTrophy, FaCoins, FaClock } from 'react-icons/fa'

const Leaderboard = () => {
  const leaderboardData = [
    { name: 'FocusMaster', hours: 47, coins: 2450 },
    { name: 'StudyKing', hours: 42, coins: 2100 },
    { name: 'PomodoroPro', hours: 38, coins: 1890 },
    { name: 'GrindQueen', hours: 35, coins: 1700 },
    { name: 'You', hours: 12, coins: 100, isUser: true },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <FaTrophy className="text-yellow-500" /> Leaderboard
      </h2>
      <div className="space-y-3">
        {leaderboardData.map((entry, idx) => (
          <div key={idx} className={`flex items-center justify-between p-4 rounded-xl ${
            entry.isUser ? 'bg-purple-50 dark:bg-purple-900 border-2 border-purple-400' : 'bg-gray-50 dark:bg-gray-700'
          }`}>
            <div className="flex items-center gap-4">
              <span className={`text-2xl font-bold ${
                idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-orange-500' : 'text-gray-500'
              }`}>
                #{idx + 1}
              </span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">{entry.name}</p>
                <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><FaClock className="text-green-500" /> {entry.hours} hrs</span>
                  <span className="flex items-center gap-1"><FaCoins className="text-yellow-500" /> {entry.coins}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard