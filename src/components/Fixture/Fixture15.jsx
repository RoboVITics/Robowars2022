import React from 'react';
import { useNavigate } from 'react-router-dom';

const Fixture15 = ({ data }) => {
  const navigate = useNavigate();

  // Sort data by stage_id in ascending order
  const sortedData = data ? [...data].sort((a, b) => a.stage_id - b.stage_id) : [];

  return (
    <>
      {sortedData && sortedData.length === 0 ? (
        <div className="d-flex justify-content-center" style={{ marginTop: "20%" }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="tournament-container"  style={{overflow:"scroll"}}>
            <h1 className="tournament-title">Fixture</h1>
            <table className="tournament-table">
              <thead>
                <tr>
                  <th>Match No.</th>
                  <th>Team1</th>
                  <th>Team2</th>
                  <th>Status</th>
                  <th>Winner</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((match) => (
                  <tr key={match.stage_id}>
                    <td>{match.stage_id}</td>
                    <td>
                      {match.team1.team_name} {match.bot_1 && <span>- {match.bot_1}</span>}
                    </td>
                    <td>
                      {match.team2.team_name} {match.bot_2 && <span>- {match.bot_2}</span>}
                    </td>
                    <td>{match.status ? 'Completed' : 'Pending'}</td>
                    <td>{(!match.status ? "TBD" : (match.winner === match.team1.team_id ? match.team1.team_name : match.team2.team_name))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="btn-container">
            <button
              className="home-btn"
              onClick={() => {
                navigate("/tournament");
              }}
            >
              Go Table
            </button>
            <button
              className="home-btn"
              onClick={() => {
                navigate("/");
              }}
            >
              Go Home
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Fixture15;
