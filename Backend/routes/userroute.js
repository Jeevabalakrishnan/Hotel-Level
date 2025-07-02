const express = require('express');
const User = require('../models/user'); // ✅ Ensure the correct model is imported

const router = express.Router();

// ✅ Register User Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // ✅ Save new user
    const newUser = new User({ name, email, password, phone });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Login User Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Check if Email Exists Route
router.get('/check-email', async (req, res) => {
  try {
    const { email } = req.query;
    const existingUser = await User.findOne({ email });

    res.json({ exists: existingUser ? true : false }); // ✅ Only return true if user exists
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // ✅ Fetch all users
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;