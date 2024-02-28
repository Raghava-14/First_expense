const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const expensesRoutes = require('./routes/expensesRoutes');
const groupsRoutes = require('./routes/groupsRoutes');
const groupInvitationsRoutes = require('./routes/groupInvitationsRoutes');
const groupMembersRoutes = require('./routes/groupMembersRoutes');
const sharedExpensesRoutes = require('./routes/sharedExpensesRoutes');
const groupExpensesRoutes = require('./routes/groupExpensesRoutes');



// Middleware to parse JSON bodies
app.use(express.json());

// Use the userRoutes for any requests to "/api/users"
app.use('/api', userRoutes);

// Use the categoryRoutes for any requests to "/api/categories"
app.use('/api', categoryRoutes);

// Use expensesRoutes for requests prefixed with "/api/expenses"
app.use('/api', expensesRoutes);

// Use groupsRoutes for requests prefixed with "/api/groups"
app.use('/api', groupsRoutes);

// Use groupInvitationsRoutes for requests prefixed with "/api/group-invitations"
app.use('/api', groupInvitationsRoutes);

// Use groupMembersRoutes for requests prefixed with "/api/group-members"
app.use('/api', groupMembersRoutes);

// Use sharedExpensesRoutes for requests prefixed with "/api/shared-expenses"
app.use('/api', sharedExpensesRoutes);

// Use groupExpensesRoutes for requests prefixed with "/api/group-expenses"
app.use('/api', groupExpensesRoutes);

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