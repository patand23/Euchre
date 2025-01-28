const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());  // For parsing JSON bodies

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'euchre',
  password: 'your_password',
  port: 5432,
});

// Route to get all teams
app.get('/teams', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM teams');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching teams");
  }
});

// Route to add a new team
app.post('/teams', async (req, res) => {
  const { player1_id, player2_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO teams(player1_id, player2_id) VALUES($1, $2) RETURNING *',
      [player1_id, player2_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting team");
  }
});

// Route to get all games
app.get('/games', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM games');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching games");
  }
});

// Route to add a new game
app.post('/games', async (req, res) => {
  const { team1_id, team2_id, team1_score, team2_score } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO games(team1_id, team2_id, team1_score, team2_score) VALUES($1, $2, $3, $4) RETURNING *',
      [team1_id, team2_id, team1_score, team2_score]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting game");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
