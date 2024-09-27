import React from 'react';

const Fixture15 = ({ data }) => {
  return (
    <>
      {data && data.length === 0 ? (
       <div class="d-flex justify-content-center" style={{marginTop:"20%"}}>
       <div class="spinner-border" role="status">
         <span class="visually-hidden">Loading...</span>
       </div>
     </div>
      
      ) : (
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
                  <td>{match.team1.team_name}</td>
                  <td>{match.team2.team_name}</td>
                  <td>{match.status ? 'Completed' : 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Fixture15;
