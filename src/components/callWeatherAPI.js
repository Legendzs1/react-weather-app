import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import APICONFIG from "./apiKeys.js";
import WeatherCard from "./weatherCard";

const useDataApi = (initialUrl, initialData) => {
  const [dataTemp, setDataTemp] = useState(initialData);
  const [dataDesc, setDataDesc] = useState(initialData);
  const [dataName, setDataName] = useState(initialData);
  const [dataIcon, setDataIcon] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        console.log(result.data);
        console.log(result.data);
        setDataTemp(Math.trunc(result.data.main.temp));
        setDataDesc(result.data.weather[0].description);
        setDataName(result.data.name);
        setDataIcon(result.data.weather[0].icon);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [
    { dataTemp, dataDesc, dataName, dataIcon, isLoading, isError },
    setUrl,
  ];
};

function WeatherCall() {
  const [queryZip, setQueryZip] = useState("68123");
  //const [queryCountryCode, setQueryCC] = useState("us");
  const [
    { dataTemp, dataDesc, dataName, dataIcon, isLoading, isError },
    doFetch,
  ] = useDataApi(
    `http://api.openweathermap.org/data/2.5/weather?q=68123,us&units=imperial&appid=${APICONFIG}`,
    { hits: [] }
  );

  const loadData = () => {
    return isLoading ? (
      <div>Loading ...</div>
    ) : (
      <div>
        <WeatherCard
          temp={JSON.stringify(dataTemp)}
          desc={JSON.stringify(dataDesc).replace(/\"/g, "")}
          name={JSON.stringify(dataName).replace(/\"/g, "")}
          icon={JSON.stringify(dataIcon).replace(/\"/g, "")}
        />
      </div>
    );
  };

  const loadError = () => {
    return <div>Something went wrong ...</div>;
  };

  const weatherWizardAlignment = {
    position: "relative",
    alignItems: "center",
    left: "43%",
    top: "1%",
  };

  const buttonStyles = {
    display: "inline-block",
    padding: "0.35em 1.2em",
    border: "0.1em solid #FFFFFF",
    margin: "0 0.3em 0.3em 0",
    borderRadius: "0.12em",
    boxSizing: "border-box",
    textDecoration: "none",
    fontFamily: "'Roboto',sans-serif",
    fontWeight: "300",
    color: "#FFFFFF",
    textAlign: "center",
    transition: "all 0.2s",
    backgroundColor: "#888"
  };

  return (
    <Fragment>
      <form
        onSubmit={(event) => {
          doFetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${queryZip},us&units=imperial&appid=${APICONFIG}`
          );

          event.preventDefault();
        }}
        style={weatherWizardAlignment}
      >
        <input
          type="text"
          value={queryZip}
          onChange={(event) => setQueryZip(event.target.value)}
        />
        <button style={buttonStyles} type="submit">
          Weather Wizard
        </button>
      </form>

      {isError ? loadError() : loadData()}
    </Fragment>
  );
}

export default WeatherCall;


