const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  checkin: { type: String, required: true },
  checkout: { type: String, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, required: true },
  room: { type: String, required: true },
  price:{type:String,required:true}
});

module.exports = mongoose.model('Booking', bookingSchema);