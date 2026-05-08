const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

router.put('/update', auth, async (req, res) => {
  try {
    const { coins, streak, focusHours, tasks } = req.body;
    const user = await User.findById(req.user.id);
    
    if (coins !== undefined) user.coins = coins;
    if (streak !== undefined) user.streak = streak;
    if (focusHours !== undefined) user.focusHours = focusHours;
    if (tasks !== undefined) user.tasks = tasks;
    
    await user.save();
    res.json({ coins: user.coins, streak: user.streak, focusHours: user.focusHours, tasks: user.tasks });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/redeem', auth, async (req, res) => {
  try {
    const { itemId, itemName, itemCost } = req.body;
    const user = await User.findById(req.user.id);
    
    if (user.coins < itemCost) {
      return res.status(400).json({ error: 'Insufficient coins' });
    }
    
    user.coins -= itemCost;
    user.redeemedItems.push({ id: itemId, name: itemName, cost: itemCost });
    await user.save();
    
    res.json({ coins: user.coins, redeemedItems: user.redeemedItems });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;