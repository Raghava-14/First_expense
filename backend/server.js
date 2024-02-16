const express = require('express');
const app = express();
const PORT = 3001;

// PSQL
const pool = require('./dbserver'); // Adjust the path as necessary

app.get('/test-db', async (req, res) => { //TestCode
  try {
    const { rows } = await pool.query('SELECT NOW()');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


app.get('/', (req, res) => {
  res.send('Hello World from Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});