import React, { useState, useEffect } from "react";
import "./Tournament.css";
import { createClient } from "@supabase/supabase-js";
import Tournament8 from "./Tournament8";
import Tournament15 from "./Tournament15";
import Tournament60 from "./Tournament60";
import { useNavigate } from "react-router-dom";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Tournament = () => {
  const [activeButton, setActiveButton] = useState("8KG");
  const [data, setData] = useState({
    match_8: [],
    match_15: [],
    match_60: [],
  });
  const navigate = useNavigate();
  const handleFetch = async () => {
    try {
      const { data: match_8, error: error_8 } = await supabase.from("match_8")
        .select(`
        *,
        team1:teams!team_1(*),
        team2:teams!team_2(*)
      `);
      const { data: match_15, error: error_15 } = await supabase.from(
        "match_15"
      ).select(`
        *,
        team1:teams!team_1(*),
        team2:teams!team_2(*)
      `);
      const { data: match_60, error: error_60 } = await supabase.from(
        "match_60"
      ).select(`
        *,
        team1:teams!team_1(*),
        team2:teams!team_2(*)
      `);

      // Handle errors
      if (error_8 || error_15 || error_60) {
        console.error("Error fetching data:", error_8 || error_15 || error_60);
        return;
      }

      // Update the data state with fetched data
      setData({
        match_8: match_8 || [],
        match_15: match_15 || [],
        match_60: match_60 || [],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <nav className="tournament-navbar">
        <button
          className={activeButton === "8KG" ? "active" : ""}
          onClick={() => setActiveButton("8KG")}
        >
          8KG
        </button>
        <button
          className={activeButton === "15KG" ? "active" : ""}
          onClick={() => setActiveButton("15KG")}
        >
          15KG
        </button>
        <button
          className={activeButton === "60KG" ? "active" : ""}
          onClick={() => setActiveButton("60KG")}
        >
          60KG
        </button>
      </nav>

      {activeButton === "8KG" && <Tournament8 />}
      {activeButton === "15KG" && <Tournament15 data={data.match_15} />}
      {activeButton === "60KG" && <Tournament60 data={data.match_60} />}
      
    </>
  );
};

export default Tournament;
