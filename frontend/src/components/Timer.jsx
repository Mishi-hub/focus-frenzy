import React, { useState, useEffect } from 'react'
import { FaPlay, FaPause, FaRedoAlt, FaCheck } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Timer = () => {
  const { user, updateUser } = useAuth()
  const [timer, setTimer] = useState(1500)
  const [isActive, setIsActive] = useState(false)
  const [sessionType, setSessionType] = useState('focus')
  const [selectedTask, setSelectedTask] = useState('')
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('fonzyTasks')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    let interval = null
    if (isActive && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000)
    } else if (timer === 0 && isActive) {
      setIsActive(false)
      if (sessionType === 'focus') {
        const earnedCoins = 50
        updateUser({ coins: user.coins + earnedCoins, focusHours: user.focusHours + 0.5, streak: user.streak + 1 })
        alert(`🎉 Focus complete! +${earnedCoins} coins!`)
        setSessionType('break')
        setTimer(300)
        setIsActive(true)
      } else {
        setSessionType('focus')
        setTimer(1500)
        alert('☕ Break over! Ready to focus?')
      }
    }
    return () => clearInterval(interval)
  }, [isActive, timer, sessionType])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = () => {
    if (sessionType === 'focus' && !selectedTask) {
      alert('Please select a task first!')
      return
    }
    setIsActive(true)
  }

  const addTask = () => {
    const taskName = prompt('Enter your task:')
    if (taskName) {
      const newTask = { id: Date.now().toString(), name: taskName, completed: false }
      const updatedTasks = [...tasks, newTask]
      setTasks(updatedTasks)
      localStorage.setItem('fonzyTasks', JSON.stringify(updatedTasks))
    }
  }

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    )
    setTasks(updatedTasks)
    localStorage.setItem('fonzyTasks', JSON.stringify(updatedTasks))
    updateUser({ coins: user.coins + 30 })
    alert('✅ Task completed! +30 coins')
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <span className={`px-4 py-1 rounded-full text-sm font-medium ${
          sessionType === 'focus' 
            ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' 
            : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
        }`}>
          {sessionType === 'focus' ? '🎯 Focus Mode' : '☕ Break Time'}
        </span>
      </div>

      <div className="text-center">
        <div className="text-7xl font-bold text-gray-800 dark:text-white font-mono mb-8">
          {formatTime(timer)}
        </div>

        {sessionType === 'focus' && (
          <div className="mb-6">
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select a task...</option>
              {tasks.filter(t => !t.completed).map(task => (
                <option key={task.id} value={task.name}>{task.name}</option>
              ))}
            </select>
            <button onClick={addTask} className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:underline">
              + Add New Task
            </button>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          {!isActive ? (
            <button onClick={startTimer} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2">
              <FaPlay /> Start
            </button>
          ) : (
            <button onClick={() => setIsActive(false)} className="px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition flex items-center gap-2">
              <FaPause /> Pause
            </button>
          )}
          <button onClick={() => {
            setIsActive(false)
            setTimer(sessionType === 'focus' ? 1500 : 300)
          }} className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 transition flex items-center gap-2">
            <FaRedoAlt /> Reset
          </button>
        </div>
      </div>

      {tasks.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Your Tasks</h3>
          <div className="space-y-2">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className={`text-gray-700 dark:text-gray-300 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.name}
                </span>
                {!task.completed && (
                  <button onClick={() => completeTask(task.id)} className="text-green-500 hover:text-green-600">
                    <FaCheck />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Timer