const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const playersRoutes = require('./routes/players.routes');
const matchesRoutes = require('./routes/matches.routes');
const championshipsRoutes = require('./routes/championships.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/championships', championshipsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'TNT Esport API running' });
});

module.exports = app;
const importRoutes = require('./routes/import.routes');

app.use('/api/import', importRoutes);
