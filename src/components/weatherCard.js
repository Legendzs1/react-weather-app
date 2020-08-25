import React, { useState, useEffect } from "react";
import WeatherIcon from "./weatherIcon.js";

const WeatherCard = (props) => {
  const [weather, setWeatherState] = useState(props);

  useEffect(() => {
    setWeatherState(props);
  }, [props]);

  const cardAlignment = {
    position: "absolute",
    left: "43%",
    top: "5%",
  };
  const cardStyle = {
    borderRadius: "5px",
    margin: "20px",
    padding: "10px",
    width: "300px",
    height: "400px",
    minHeight: "300px",
    boxShadow: `9px 7px 40px -6px rgba(0,0,0,0.25)`,
    position: "relative",
  };

  const weatherDetails = {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    padding: "16px 20px",
    color: "#888",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    transition: "color 2s ease",
  };

  const weatherDesc = {
    fontWeight: "600",
    fontSize: "22px",
  };

  const weatherStyle = {
    fontSize: "60px",
    lineHeight: "60px",
  };

  const fStyle = {
    fontSize: "18px",
    lineHeight: "30px",
    verticalAlign: "top",
    marginLeft: "5px",
  };

  return (
    <div style={Object.assign({}, cardAlignment, cardStyle)}>
      <WeatherIcon icon={weather.icon} />
      <div style={weatherDetails}>
        <div style={weatherStyle}>
          {weather.temp}
          <span style={fStyle}>F</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <h3 style={{ margin: "4px 0" }}>{weather.name}</h3>
          <p style={weatherDesc}>{weather.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
