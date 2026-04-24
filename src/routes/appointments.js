const express = require('express');
const db = require('../db');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  const appointments = db.prepare('SELECT * FROM appointments').all();
  res.json(appointments);
});

router.post('/', authenticate, (req, res) => {
  const { clientId, service, date, time, status } = req.body;
  if (!clientId || !service || !date || !time || !status) {
    return res.status(400).json({ message: 'clientId, service, date, time and status are required' });
  }
  const client = db.prepare('SELECT id FROM clients WHERE id = ?').get(clientId);
  if (!client) {
    return res.status(404).json({ message: 'Client not found' });
  }
  const result = db.prepare(
    'INSERT INTO appointments (clientId, service, date, time, status) VALUES (?, ?, ?, ?, ?)'
  ).run(clientId, service, date, time, status);
  res.status(201).json({ id: result.lastInsertRowid, clientId, service, date, time, status });
});

router.get('/:id', (req, res) => {
  const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }
  res.json(appointment);
});

router.put('/:id', authenticate, (req, res) => {
  const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }
  const { clientId, service, date, time, status } = req.body;
  if (!clientId || !service || !date || !time || !status) {
    return res.status(400).json({ message: 'clientId, service, date, time and status are required' });
  }
  db.prepare(
    'UPDATE appointments SET clientId=?, service=?, date=?, time=?, status=? WHERE id=?'
  ).run(clientId, service, date, time, status, req.params.id);
  res.json({ id: Number(req.params.id), clientId, service, date, time, status });
});

router.delete('/:id', authenticate, (req, res) => {
  const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }
  db.prepare('DELETE FROM appointments WHERE id = ?').run(req.params.id);
  res.json({ message: 'Appointment deleted successfully' });
});

module.exports = router;
