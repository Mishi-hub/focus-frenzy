import React, { useState } from 'react'
import { FaStore, FaCoins } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Store = () => {
  const { user, updateUser } = useAuth()
  const [redeemed, setRedeemed] = useState(null)

  const storeItems = [
    { id: '1', name: 'Premium Theme', cost: 500, icon: '🎨', desc: 'Unlock exclusive themes' },
    { id: '2', name: 'Daily Planner', cost: 300, icon: '📝', desc: 'Printable PDF planner' },
    { id: '3', name: 'Focus Certificate', cost: 1000, icon: '🏆', desc: 'Certificate of achievement' },
    { id: '4', name: 'Motivation Pack', cost: 200, icon: '💪', desc: 'Wallpapers & quotes' },
    { id: '5', name: 'Focus Music', cost: 400, icon: '🎵', desc: 'Premium lo-fi playlist' },
  ]

  const handleRedeem = (item) => {
    if (user.coins >= item.cost) {
      updateUser({ coins: user.coins - item.cost })
      setRedeemed(item.name)
      setTimeout(() => setRedeemed(null), 3000)
    } else {
      alert(`❌ Need ${item.cost - user.coins} more coins!`)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <FaStore className="text-purple-500" /> Rewards Store
      </h2>
      
      {redeemed && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-center">
          🎉 Successfully redeemed {redeemed}! 🎉
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {storeItems.map((item) => (
          <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition">
            <div className="text-3xl mb-2">{item.icon}</div>
            <h3 className="font-bold text-gray-800 dark:text-white">{item.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{item.desc}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <FaCoins className="text-yellow-500" />
                <span className="font-bold text-gray-700 dark:text-gray-300">{item.cost}</span>
              </div>
              <button
                onClick={() => handleRedeem(item)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm hover:opacity-90 transition"
              >
                Redeem
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Your Coins:</span>
          <span className="text-2xl font-bold text-yellow-500 flex items-center gap-1">
            <FaCoins /> {user?.coins || 0}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Store