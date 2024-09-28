import React from "react";
import placeholder from "../../assets/placeholder.png";
import { useNavigate } from "react-router-dom";

const Card = ({ number, data }) => {
  const navigate = useNavigate();

  const placeholderData = {
    time: "TBD",
    team1: {
      score_1: "TBD",
      team_icon: `${placeholder}`,
    },
    team2: {
      score_2: "TBD",
      team_icon: `${placeholder}`,
    },
  };

  const matchData = {
    ...placeholderData,
    ...data,
    team1: { ...placeholderData.team1, ...data?.team1 },
    team2: { ...placeholderData.team2, ...data?.team2 },
  };

  const renderTimeOrLive = (timestamp) => {
    if (!timestamp || isNaN(Date.parse(timestamp))) {
      return "TBD";
    }

    const matchDate = new Date(timestamp);
    const currentDate = new Date();

    const timeDifference = matchDate - currentDate;
    const tenMinutesInMillis = 10 * 60 * 1000; // 10 minutes in milliseconds

    // If the match is live (within 10 minutes)
    if (
      timeDifference <= tenMinutesInMillis &&
      timeDifference >= -tenMinutesInMillis
    ) {
      return (
        <button
          onClick={() => navigate("/watchlive")}
          style={{ color: "red", fontWeight: "bold" }}
        >
          ● Live
        </button>
      );
    }

    // Format date and time in 24-hour format without the year
    return matchDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    });
  };

  return (
    <li className="tournament-bracket__item">
      <div className="tournament-bracket__match" tabIndex="0">
        <table className="tournament-bracket__table">
          <div className="header">
            <p>Match {number}</p>
            <time dateTime={matchData.time || "1998-02-18"}>
              {renderTimeOrLive(matchData.time)}
            </time>
            <div className="line"></div>
          </div>
          <br />
          <caption className="tournament-bracket__caption"></caption>

          <tbody className="tournament-bracket__content">
            <tr className="tournament-bracket__team tournament-bracket__team--winner">
              {/* <td className="tournament-bracket__country">
                <abbr className="tournament-bracket__code" title="Team 1">
                  {matchData.score_1 ? matchData.score_1 : "TBD"}
                </abbr>
                <span
                  className="tournament-bracket__flag flag-icon flag-icon-ca"
                  aria-label="Flag"
                ></span>
              </td> */}
              <td className="tournament-bracket__score">
                <span className="tournament-bracket__number">
                  <img src={matchData.team1.team_icon} alt="Team 1" />
                </span>
              </td>
            </tr>
            {window.innerWidth > 900 ? (
              <p style={{ color: "black", marginTop: "6%", marginLeft: "4%" }}>
                V/S
              </p>
            ) : null}
            <tr className="tournament-bracket__team">
              {/* <td className="tournament-bracket__country">
                <abbr className="tournament-bracket__code" title="Team 2">
                  {matchData.score_2 ? matchData.score_2 : "TBD"}
                </abbr>
                <span
                  className="tournament-bracket__flag flag-icon flag-icon-kz"
                  aria-label="Flag"
                ></span>
              </td> */}
              <td className="tournament-bracket__score">
                <span className="tournament-bracket__number">
                  <img src={matchData.team2.team_icon} alt="Team 2" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </li>
  );
};

export default Card;
