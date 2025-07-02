const express = require('express');
const router = express.Router();

// ✅ Hardcoded Admin Credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@gmail.com',
  password: 'admin@2025'
};

// ✅ Admin Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    return res.json({ token: 'admin-secret-token' });
  }

  res.status(401).json({ message: 'Invalid admin credentials' });
});

module.exports = router;