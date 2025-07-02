const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bookingRoutes = require('./routes/bookingroute');
const contactRoutes = require('./routes/contactroute');
const userRoutes = require('./routes/userroute');
const adminRoutes = require('./routes/adminroute');
const dashboardRoutes=require('./routes/dashboardroute')

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Hotel-Level', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ✅ Use Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/contacts',contactRoutes);
app.use('/api/user',userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});