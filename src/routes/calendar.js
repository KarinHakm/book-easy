const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const appointments = db.prepare(`
    SELECT a.id, a.service, a.date, a.time, a.status,
           c.name AS clientName, c.email AS clientEmail, c.phone AS clientPhone
    FROM appointments a
    JOIN clients c ON a.clientId = c.id
    ORDER BY a.date, a.time
  `).all();

  const calendar = {};
  for (const appt of appointments) {
    if (!calendar[appt.date]) calendar[appt.date] = [];
    calendar[appt.date].push(appt);
  }

  res.json(calendar);
});

module.exports = router;
