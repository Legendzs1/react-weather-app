import React, { useState, useEffect } from "react";
import { findAllByDisplayValue } from "@testing-library/react";

const WeatherIcon = (props) => {
  const [weatherDesc, setWeatherDescState] = useState(props);
  const weatherIconURL = `http://openweathermap.org/img/w/${weatherDesc.icon}.png`;
  useEffect(() => {
    setWeatherDescState(props);
  }, [props]);

  const iconStyles = {
    postion: "absolute",
    top: "50%",
    bottom: "8px",
    right: "16px",
    width: "100%",
    height: "auto",
  };
  const containerStyles = {
    position: "relative",
  }

  return (
    <div style={containerStyles}>
      <img src={weatherIconURL} style={iconStyles} alt="weather icon"></img>
    </div>
  );
};

export default WeatherIcon;
