const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "mysecretkey";

// ================= DB =================
const db = new sqlite3.Database('./database.db');

// ===== TICKETS TABLE =====
db.run(`
CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  regNumber INTEGER,
  date TEXT,
  time TEXT,
  fullName TEXT,
  phone TEXT,
  vehicleNumber TEXT,
  type TEXT,
  operator TEXT,
  description TEXT,
  responsible TEXT,
  resolutionNotes TEXT,
  status TEXT,
  locked INTEGER DEFAULT 0
)
`);

// ===== USERS TABLE =====
db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  password TEXT,
  role TEXT
)
`);

// ================= AUTH MIDDLEWARE =================
const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).send('Token yoxdur');

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send('Token səhvdir');
  }
};

// ================= CREATE USER =================
app.post('/create-user', async (req, res) => {
  const { username, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  db.run(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, hashed, role],
    function () {
      res.send('User yaradıldı');
    }
  );
});

// ================= LOGIN =================
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username=?', [username], async (err, user) => {
    if (!user) return res.status(401).send('User yoxdur');

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).send('Şifrə səhvdir');

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      SECRET,
      { expiresIn: '1h' }
    );

    res.send({ token });
  });
});

// ================= CREATE TICKET =================
app.post('/tickets', auth, (req, res) => {
  db.get('SELECT MAX(regNumber) as max FROM tickets', [], (err, row) => {
    const newReg = row.max ? row.max + 1 : 1;
    const t = req.body;

    db.run(`
      INSERT INTO tickets 
      (regNumber, date, time, fullName, phone, vehicleNumber, type, operator, description, responsible, resolutionNotes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      newReg,
      t.date,
      t.time,
      t.fullName,
      t.phone,
      t.vehicleNumber,
      t.type,
      req.user.username, // operator login-dən gəlir
      t.description,
      t.responsible,
      t.resolutionNotes,
      t.status || 'Açıq'
    ],
    function(err) {
      res.send({ id: this.lastID });
    });
  });
});

// ================= GET TICKETS =================
app.get('/tickets', auth, (req, res) => {
  db.all('SELECT * FROM tickets', [], (err, rows) => {
    res.send(rows);
  });
});

// ================= UPDATE TICKET =================
app.put('/tickets/:id', auth, (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM tickets WHERE id=?', [id], (err, ticket) => {
    if (ticket.locked) {
      return res.status(403).send('Locked! Manager icazəsi lazımdır');
    }

    const t = req.body;
    const locked = t.status === 'Tamamlandı' ? 1 : 0;

    db.run(`
      UPDATE tickets SET 
      fullName=?, phone=?, vehicleNumber=?, type=?, description=?, 
      responsible=?, resolutionNotes=?, status=?, locked=?
      WHERE id=?
    `,
    [
      t.fullName,
      t.phone,
      t.vehicleNumber,
      t.type,
      t.description,
      t.responsible,
      t.resolutionNotes,
      t.status,
      locked,
      id
    ],
    function() {
      res.send('updated');
    });
  });
});

// ================= MANAGER UNLOCK =================
app.put('/tickets/unlock/:id', auth, (req, res) => {
  if (req.user.role !== 'manager') {
    return res.status(403).send('Yalnız manager edə bilər');
  }

  db.run(
    'UPDATE tickets SET locked=0 WHERE id=?',
    [req.params.id],
    function () {
      res.send('unlocked');
    }
  );
});

// ================= START =================
app.listen(5000, () => {
  console.log('Server running on port 5000');
});