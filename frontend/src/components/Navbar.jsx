import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'
import DarkModeToggle from './DarkModeToggle'
import { FaCoins, FaFire, FaClock } from 'react-icons/fa'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Link to="/dashboard" className="flex items-center gap-3">
            <Logo />
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">FONZY</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">focus frenzy</p>
            </div>
          </Link>
          
          {user && (
            <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
              <div className="flex items-center gap-1">
                <FaCoins className="text-yellow-500" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">{user.coins}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaFire className="text-orange-500" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">{user.streak}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaClock className="text-green-500" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">{user.focusHours}</span>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-700 dark:text-gray-300">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="px-4 py-2 text-purple-600 hover:underline">Login</Link>
                <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar