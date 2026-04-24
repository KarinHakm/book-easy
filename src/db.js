const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'database.sqlite'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clientId INTEGER NOT NULL,
    service TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (clientId) REFERENCES clients(id)
  );
`);

const existingAdmin = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@bookeasy.com');
if (!existingAdmin) {
  const hash = bcrypt.hashSync('secret123', 10);
  db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run('admin@bookeasy.com', hash);
}

module.exports = db;
