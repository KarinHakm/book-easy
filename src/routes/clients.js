const express = require('express');
const db = require('../db');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  const clients = db.prepare('SELECT * FROM clients').all();
  res.json(clients);
});

router.post('/', authenticate, (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'name, email and phone are required' });
  }
  const result = db.prepare('INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)').run(name, email, phone);
  res.status(201).json({ id: result.lastInsertRowid, name, email, phone });
});

module.exports = router;
