import React from 'react';
import { useNavigate } from 'react-router-dom';

const Fixture15 = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>
      {data && data.length === 0 ? (
        <div class="d-flex justify-content-center" style={{marginTop:"20%"}}>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      ) : (
        <>
        <div className="tournament-container">
          <h1 className="tournament-title">Fixture</h1>
          <table className="tournament-table">
            <thead>
              <tr>
                <th>Match No.</th>
                <th>Team1</th>
                <th>Team2</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((match) => (
                <tr key={match.stage_id}>
                  <td>{match.stage_id}</td>
                  <td>
  {match.team1.team_name} {match.bot_1 && <span>- {match.bot_1}</span>}
</td>
<td>
  {match.team2.team_name} {match.bot_2 && <span>- {match.bot_2}</span>}
</td>

                  <td>{match.status ? 'Completed' : 'Pending'}</td>
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
