const express = require('express');
const Booking = require('../models/booking');
const User = require('../models/user');

const router = express.Router();

// Fetch dashboard statistics
router.get('/', async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalGuests = await User.countDocuments();
    const checkedInGuests = await Booking.countDocuments({ status: 'checked-in' });
    const checkedOutGuests = await Booking.countDocuments({ status: 'checked-out' });

    res.json({ totalBookings, totalGuests, checkedInGuests, checkedOutGuests });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dashboard data' });
  }
});

module.exports = router;