const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// ✅ Create Booking
router.post('/', async (req, res) => {
  try {
    console.log('Booking data received:', req.body); // ✅ Log before saving

    const booking = new Booking(req.body);
    await booking.save();

    res.json({ message: 'Booking saved successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message });
  }
});


// ✅ Get All Bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error });
  }
});

module.exports = router;