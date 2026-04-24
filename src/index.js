require('dotenv').config();
const express = require('express');

const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clients');
const appointmentRoutes = require('./routes/appointments');
const calendarRoutes = require('./routes/calendar');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/clients', clientRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/calendar', calendarRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Book-Easy server running on http://localhost:${PORT}`);
});
