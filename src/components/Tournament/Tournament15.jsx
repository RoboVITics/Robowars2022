import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase'; 
import './TournamentDet.css'; 
import { useNavigate } from 'react-router-dom';

const Tournament15 = () => {
  const [teams, setTeams] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [sortOrder, setSortOrder] = useState({ column: 'losses', order: 'asc' }); 
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const { data: matchData, error: matchError } = await supabase.from('match_15').select('*');
        const { data: teamData, error: teamError } = await supabase.from('teams').select('*');

        if (matchError || teamError) {
          console.error('Error fetching data:', matchError || teamError);
          return;
        }

        const teamStats = matchData.reduce((acc, match) => {
          if (match.winner === match.team_1) {
            acc[match.team_1] = acc[match.team_1] || { wins: 0, losses: 0 };
            acc[match.team_1].wins += 1;
        
            acc[match.team_2] = acc[match.team_2] || { wins: 0, losses: 0 };
            acc[match.team_2].losses += 1;
          } else if (match.winner === match.team_2) {
            acc[match.team_2] = acc[match.team_2] || { wins: 0, losses: 0 };
            acc[match.team_2].wins += 1;
        
            acc[match.team_1] = acc[match.team_1] || { wins: 0, losses: 0 };
            acc[match.team_1].losses += 1;
          }
          return acc;
        }, {});
        

        const teamsWithStatus = teamData.map(team => ({
          ...team,
          wins: teamStats[team.team_id]?.wins || 0,
          losses: teamStats[team.team_id]?.losses || 0,
          status: (teamStats[team.team_id]?.losses || 0) > 2 ? 'Eliminated' : 'Active',
        }));

        setTeams(teamsWithStatus);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }

      try {
        const { data: matches, error } = await supabase
            .from('match_15')
            .select('*')
            .eq('status', false)
            .order('stage_id', { ascending: true })
            .limit(5);
    
        if (error) {
            console.error('Error fetching upcoming matches:', error);
            return;
        }
    
        const { data: teamsData, error: teamError } = await supabase.from('teams').select('team_id, team_name');
        if (teamError) {
            console.error('Error fetching team icons:', teamError);
            return;
        }
    
        const teamIconsMap = teamsData.reduce((acc, team) => {
            acc[team.team_id] = team.team_name;
            return acc;
        }, {});
    
        const matchesWithIcons = matches.map(match => ({
            ...match,
            team_1_icon: teamIconsMap[match.team_1],
            team_2_icon: teamIconsMap[match.team_2],
            caption: match.winner_bracket ? 'Winner Bracket' : 'Elimination',
        }));
    
        setUpcomingMatches(matchesWithIcons);
      } catch (error) {
        console.error('Error fetching upcoming matches:', error);
      }

      setLoading(false);
    };

    fetchTeams();
  }, []);

  const handleSort = (column) => {
    const sortedTeams = [...teams].sort((a, b) => {
      if (sortOrder.column === column) {
        return sortOrder.order === 'asc' ? a[column] - b[column] : b[column] - a[column];
      }
      return 0;
    });
    
    const newOrder = sortOrder.order === 'asc' ? 'desc' : 'asc';
    setTeams(sortedTeams);
    setSortOrder({ column, order: newOrder });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTeams = teams.filter(team =>
    team.team_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStatusChip = (status) => {
    return (
      <span className={`status-chip ${status.toLowerCase()}`}>
        {status}
      </span>
    );
  };

  const renderUpcomingMatches = () => {
    if (upcomingMatches.length === 0) {
      return <p className="no-matches">No upcoming matches</p>;
    }

    return (
      <div className="upcoming-matches-container">
        {upcomingMatches.map((match) => (
          <div key={match.stage_id} className="match-card">
            <div className="match-header">
              <span>Match {match.stage_id}</span>
              <span>{match.caption}</span>
              <span>{new Date(match.time).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}, {new Date(match.time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <hr />
            <div className="match-content">
              <p className='team_name' style={{color:'#f44336'}}>{match.team_1_icon}</p>
              <span className="vs-text">V/S</span>
              <p className='team_name' style={{color:'#f44336'}}>{match.team_2_icon}</p>
            </div>
            {/* <div className="score-section">
              <span className="large-score">{match.score_1 || "TBD"}</span>
              <span className="large-score">{match.score_2 || "TBD"}</span>
            </div> */}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center" style={{ marginTop: "20%" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="tournament-container"  style={{overflow:"scroll"}}>
      <h1 className="tournament-title">Team Details</h1>

      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by Team Name" 
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <table className="tournament-table"  style={{overflow:"scroll"}}>
        <thead>
          <tr>
            <th>Team Name</th>
            <th onClick={() => handleSort('wins')} style={{ cursor: 'pointer' }}>
              Wins {sortOrder.column === 'wins' ? (sortOrder.order === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('losses')} style={{ cursor: 'pointer' }}>
              Losses {sortOrder.column === 'losses' ? (sortOrder.order === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th>Status</th>
            {/* <th>Bracket</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredTeams.map((team) => (
            <tr key={team.team_id}>
              <td>
                <div className="team-info">
                  {team.team_name}
                </div>
              </td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{renderStatusChip(team.status)}</td>
              {/* <td>{team.status === 'Active' ? 'Winner Bracket' : 'Elimination'}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="upcoming-title">Upcoming Matches</h2>
      {renderUpcomingMatches()}
    </div>
    <button
    className="home-btn"
    style={{marginLeft:"50%"}}
    onClick={() => {
      navigate("/");
    }}
  >
    Go Home
  </button>
  </>
  );
};

export default Tournament15;
