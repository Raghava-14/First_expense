const { Pool } = require('pg');

const pool = new Pool({
  user: 'raghav', // your PostgreSQL username
  host: 'localhost',
  database: 'my_expense_tracker', // your database name
  password: '', // your PostgreSQL password
  port: 5432, // default PostgreSQL port
});

module.exports = pool;
