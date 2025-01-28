import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [team1Id, setTeam1Id] = useState('');
  const [team2Id, setTeam2Id] = useState('');
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);

  // Fetch all players and teams
  const fetchPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/players');
      setPlayers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:5000/teams');
      setTeams(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle team creation
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/teams', {
        player1_id: player1,
        player2_id: player2,
      });
      fetchTeams();  // Refresh the teams list
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitGame = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/games', {
        team1_id: team1Id,
        team2_id: team2Id,
        team1_score: team1Score,
        team2_score: team2Score,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Euchre Stats</h1>

      <h2>Create a Team</h2>
      <form onSubmit={handleCreateTeam}>
        <select onChange={(e) => setPlayer1(e.target.value)} value={player1}>
          <option value="">Select Player 1</option>
          {players.map((player) => (
            <option key={player.id} value={player.id}>{player.name}</option>
          ))}
        </select>
        <select onChange={(e) => setPlayer2(e.target.value)} value={player2}>
          <option value="">Select Player 2</option>
          {players.map((player) => (
            <option key={player.id} value={player.id}>{player.name}</option>
          ))}
        </select>
        <button type="submit">Create Team</button>
      </form>

      <h2>Game Results</h2>
      <form onSubmit={handleSubmitGame}>
        <select onChange={(e) => setTeam1Id(e.target.value)} value={team1Id}>
          <option value="">Select Team 1</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>

        <select onChange={(e) => setTeam2Id(e.target.value)} value={team2Id}>
          <option value="">Select Team 2</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>

        <input type="number" value={team1Score} onChange={(e) => setTeam1Score(e.target.value)} placeholder="Team 1 Score" />
        <input type="number" value={team2Score} onChange={(e) => setTeam2Score(e.target.value)} placeholder="Team 2 Score" />
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
}

export default App;
